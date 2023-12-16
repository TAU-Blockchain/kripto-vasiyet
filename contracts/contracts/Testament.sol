// SPDX-License-Identifier: MIT

pragma solidity 0.8.20;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {AutomationCompatibleInterface} from "@chainlink/contracts/src/v0.8/automation/AutomationCompatible.sol";
import {FunctionsClient} from "@chainlink/contracts/src/v0.8/functions/dev/v1_0_0/FunctionsClient.sol";
import {FunctionsRequest} from "@chainlink/contracts/src/v0.8/functions/dev/v1_0_0/libraries/FunctionsRequest.sol";

error InvalidArrayLength();
error InvalidSharesInput();
error UnexpectedRequest();

contract Testament is Ownable, AutomationCompatibleInterface, FunctionsClient {
    using FunctionsRequest for FunctionsRequest.Request;

    struct Heir {
        address heir;
        uint256 share;
    }

    bool public isAlive = true;

    uint256 public latestTimestamp;
    uint256 public timeInterval = 2 minutes;

    address[] public inheritableTokens;

    mapping(address heir => uint256 share) public shares;
    uint256 public totalShares;
    Heir[] public heirs;

    address public functionsRouter;
    string public source = "";
    uint64 public subscriptionId;
    uint32 public gasLimit;
    bytes32 public donID;

    bytes32 public lastRequestId;
    string public lastResponse;
    string public lastError;

    constructor(
        address _functionsRouter,
        uint64 _subscriptionId,
        uint32 _gasLimit,
        bytes32 _donID
    ) Ownable(msg.sender) FunctionsClient(_functionsRouter) {
        functionsRouter = _functionsRouter;
        subscriptionId = _subscriptionId;
        gasLimit = _gasLimit;
        donID = _donID;
    }

    function addHeir(
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
            for (uint256 j; j < heirs.length; j++) {
                if (heirs[j].heir == _heirs[i]) {
                    heirs[j] = Heir(_heirs[i], _shares[i]);
                    _isExisted = true;
                }
            }
            if (!_isExisted) {
                heirs.push(Heir(_heirs[i], _shares[i]));
            }
        }
    }

    function removeHeir(address[] memory _heirs) public onlyOwner {
        for (uint256 i; i < _heirs.length; i++) {
            delete shares[_heirs[i]];
            totalShares -= shares[_heirs[i]];
            uint256[] memory _indexesToRemove = new uint256[](_heirs.length);
            for (uint256 j; j < heirs.length; j++) {
                if (heirs[j].heir == _heirs[i]) {
                    _indexesToRemove[i] = j;
                }
            }
            for (uint256 k; k < _indexesToRemove.length; k++) {
                removeIndex(_indexesToRemove[k]);
            }
        }
    }

    function requestData() public {
        FunctionsRequest.Request memory req;
        req.initializeRequestForInlineJavaScript(source);
        // string[] memory args = new string[](1);
        // if (args.length > 0) req.setArgs(args);
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
                for (uint256 j; j < heirs.length; j++) {
                    _token.transferFrom(
                        owner(),
                        heirs[j].heir,
                        ((_balance * heirs[j].share) / 100)
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

    function removeIndex(uint _index) public {
        require(_index < heirs.length, "index out of bound");

        for (uint i = _index; i < heirs.length - 1; i++) {
            heirs[i] = heirs[i + 1];
        }
        heirs.pop();
    }

    function getHeir(uint256 _index) public view returns (address) {
        return heirs[_index].heir;
    }

    function getShare(uint256 _index) public view returns (uint256) {
        return heirs[_index].share;
    }
}
