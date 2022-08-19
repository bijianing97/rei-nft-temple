// SPDX-License-Identifier: GPL-3.0-or-later

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract ReiFansNFT is Context, ERC1155Supply, Ownable {
    using Strings for uint256;
    string public baseURI = "";

    constructor(string memory baseUri) ERC1155(baseUri) {
        _setBaseURI(baseUri);
    }

    function mint(uint256 tokenId, address to) public onlyOwner {
        _mint(to, tokenId, 1, "");
    }

    function batchMint(uint256 tokenId, address[] memory to) public onlyOwner {
        for (uint256 i = 0; i < to.length; i++) {
            mint(tokenId, to[i]);
        }
    }

    function _setBaseURI(string memory newuri) internal onlyOwner {
        baseURI = newuri;
    }

    function resetBaseURI(string memory newUri) public onlyOwner {
        _setBaseURI(newUri);
    }

    function uri(uint256 tokenId) public view override returns (string memory) {
        return string(abi.encodePacked(baseURI, tokenId.toString(), ".json"));
    }
}
