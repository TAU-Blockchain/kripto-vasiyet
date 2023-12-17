// SPDX-License-Identifier: MIT

pragma solidity 0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract MyToken is ERC721 {
    uint256 private tokenCounter;

    constructor() ERC721("MyToken", "MYT") {
        tokenCounter = 0;
    }

    function mintNft() public {
        _safeMint(msg.sender, tokenCounter);
        tokenCounter = tokenCounter + 1;
    }

    function getTokenCounter() public view returns (uint256) {
        return tokenCounter;
    }
}
