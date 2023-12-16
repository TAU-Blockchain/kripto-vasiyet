// SPDX-License-Identifier: MIT

pragma solidity 0.8.20;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {Strings} from "@openzeppelin/contracts/utils/Strings.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {IERC721} from "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import {AutomationCompatibleInterface} from "@chainlink/contracts/src/v0.8/automation/AutomationCompatible.sol";
import {FunctionsClient} from "@chainlink/contracts/src/v0.8/functions/dev/v1_0_0/FunctionsClient.sol";
import {FunctionsRequest} from "@chainlink/contracts/src/v0.8/functions/dev/v1_0_0/libraries/FunctionsRequest.sol";

error InvalidArrayLength();
error InvalidSharesInput();
error UnexpectedRequest();
error InvalidTokenId();

contract Testament is Ownable, AutomationCompatibleInterface, FunctionsClient {
    using FunctionsRequest for FunctionsRequest.Request;
    using Strings for uint256;

    struct ERC20Heir {
        address heir;
        uint256 share;
    }

    struct ERC721Heir {
        address nft;
        uint256 tokenId;
        address heir;
    }

    uint256 public immutable identity;

    bool public isAlive = true;

    uint256 public latestTimestamp;
    uint256 public timeInterval = 2 minutes;

    address[] public inheritableTokens;

    mapping(address heir => uint256 share) public shares;
    uint256 public totalShares;
    ERC20Heir[] public erc20Heirs;

    mapping(address nft => mapping(uint256 tokenId => address heir))
        public erc721Inheritances;
    ERC721Heir[] public erc721Heirs;

    address public functionsRouter;
    string public source = "";
    uint64 public subscriptionId;
    uint32 public gasLimit;
    bytes32 public donID;

    bytes32 public lastRequestId;
    string public lastResponse;
    string public lastError;

    constructor(
        uint256 _identity,
        address[] memory _inheritableTokens,
        address _functionsRouter,
        uint64 _subscriptionId,
        uint32 _gasLimit,
        bytes32 _donID
    ) Ownable(msg.sender) FunctionsClient(_functionsRouter) {
        identity = _identity;
        inheritableTokens = _inheritableTokens;
        functionsRouter = _functionsRouter;
        subscriptionId = _subscriptionId;
        gasLimit = _gasLimit;
        donID = _donID;
    }

    function addHeirForERC20(
        address[] memory _heirs,
        uint256[] memory _shares
    ) public onlyOwner {
        if (_heirs.length != _shares.length) {
            revert InvalidArrayLength();
        }
        uint256 _totalShares = totalShares;
        for (uint256 i; i < _heirs.length; i++) {
            if (_totalShares - shares[_heirs[i]] + _shares[i] > 100) {
                revert InvalidSharesInput();
            } else {
                totalShares = _shares[i] - shares[_heirs[i]];
            }
        }
        for (uint256 i; i < _heirs.length; i++) {
            shares[_heirs[i]] = _shares[i];
            bool _isExisted = false;
            for (uint256 j; j < erc20Heirs.length; j++) {
                if (erc20Heirs[j].heir == _heirs[i]) {
                    erc20Heirs[j] = ERC20Heir(_heirs[i], _shares[i]);
                    _isExisted = true;
                }
            }
            if (!_isExisted) {
                erc20Heirs.push(ERC20Heir(_heirs[i], _shares[i]));
            }
        }
    }

    function removeHeirForERC20(address[] memory _heirs) public onlyOwner {
        for (uint256 i; i < _heirs.length; i++) {
            delete shares[_heirs[i]];
            totalShares -= shares[_heirs[i]];
            uint256[] memory _indexesToRemove = new uint256[](_heirs.length);
            for (uint256 j; j < erc20Heirs.length; j++) {
                if (erc20Heirs[j].heir == _heirs[i]) {
                    _indexesToRemove[i] = j;
                }
            }
            for (uint256 k; k < _indexesToRemove.length; k++) {
                removeERC20HeirIndex(_indexesToRemove[k]);
            }
        }
    }

    function addHeirForERC721(
        address _heir,
        address _nft,
        uint256 _tokenId
    ) public onlyOwner {
        IERC721 _nftContract = IERC721(_nft);
        if (_nftContract.ownerOf(_tokenId) != msg.sender) {
            revert InvalidTokenId();
        }
        if (erc721Inheritances[_nft][_tokenId] != _heir) {
            erc721Inheritances[_nft][_tokenId] = _heir;
            erc721Heirs.push(ERC721Heir(_nft, _tokenId, _heir));
        }
    }

    function removeHeirForERC721(
        address _nft,
        uint256 _tokenId
    ) public onlyOwner {
        delete erc721Inheritances[_nft][_tokenId];
        for (uint256 i; i < erc721Heirs.length; i++) {
            if (erc721Heirs[i].nft == _nft) {
                if (erc721Heirs[i].tokenId == _tokenId) {
                    removeERC721HeirIndex(i);
                }
            }
        }
    }

    function requestData() public {
        FunctionsRequest.Request memory req;
        req.initializeRequestForInlineJavaScript(source);
        string[] memory args = new string[](1);
        args[0] = Strings.toString(identity);
        if (args.length > 0) req.setArgs(args);
        lastRequestId = _sendRequest(
            req.encodeCBOR(),
            subscriptionId,
            gasLimit,
            donID
        );
    }

    function fulfillRequest(
        bytes32 _requestId,
        bytes memory _response,
        bytes memory _err
    ) internal override {
        if (lastRequestId != _requestId) {
            revert UnexpectedRequest();
        }
        lastResponse = string(_response);
        lastError = string(_err);
        if (keccak256(_response) == keccak256(bytes("1"))) {
            for (uint256 i; i < inheritableTokens.length; i++) {
                IERC20 _token = IERC20(inheritableTokens[i]);
                uint256 _balance = _token.balanceOf(owner());
                for (uint256 j; j < erc20Heirs.length; j++) {
                    _token.transferFrom(
                        owner(),
                        erc20Heirs[j].heir,
                        ((_balance * erc20Heirs[j].share) / 100)
                    );
                }
            }
            isAlive = false;
        }
    }

    function checkUpkeep(
        bytes calldata /* checkData */
    )
        external
        view
        override
        returns (bool upkeepNeeded, bytes memory /* performData */)
    {
        upkeepNeeded =
            (isAlive) &&
            (block.timestamp - latestTimestamp >= timeInterval);
    }

    function performUpkeep(bytes calldata /* performData */) external override {
        requestData();
    }

    function removeERC20HeirIndex(uint _index) public {
        require(_index < erc20Heirs.length, "index out of bound");

        for (uint i = _index; i < erc20Heirs.length - 1; i++) {
            erc20Heirs[i] = erc20Heirs[i + 1];
        }
        erc20Heirs.pop();
    }

    function removeERC721HeirIndex(uint _index) public {
        require(_index < erc721Heirs.length, "index out of bound");

        for (uint i = _index; i < erc721Heirs.length - 1; i++) {
            erc721Heirs[i] = erc721Heirs[i + 1];
        }
        erc721Heirs.pop();
    }

    function getHeirForERC20(uint256 _index) public view returns (address) {
        return erc20Heirs[_index].heir;
    }

    function getShareForERC20(uint256 _index) public view returns (uint256) {
        return erc20Heirs[_index].share;
    }

    function getHeirForERC721(uint256 _index) public view returns (address) {
        return erc721Heirs[_index].heir;
    }

    function getNftForERC721(uint256 _index) public view returns (address) {
        return erc721Heirs[_index].nft;
    }

    function getTokenIdForERC721(uint256 _index) public view returns (uint256) {
        return erc721Heirs[_index].tokenId;
    }
}
