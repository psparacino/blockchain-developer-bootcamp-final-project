// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract OwnershipToken is ERC721, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    mapping(address => uint) public tokenOwners;

    constructor() ERC721("BadSpotifyBad", "BSB") {}

    function safeMint(address to) public onlyOwner {
        uint tokenID = _tokenIdCounter.current();

        _safeMint(to, _tokenIdCounter.current());
        _tokenIdCounter.increment();


        tokenOwners[to] = tokenID;
    }

    function getTokenID(address tokenOwner) view public returns(uint) {
        return tokenOwners[tokenOwner];
    }
}