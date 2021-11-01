//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

/*
library Verification {
    //placeholder

}
*/

contract RootContract is ReentrancyGuard {

    address public owner;

    uint public albumCounter;

    mapping(address => User) public registeredUsers;

    mapping(uint => Song) public songList;

    mapping(address => mapping(uint => Album)) public albumStats; //Albums user has listened to.
    
    mapping(address => uint) internal balances;  

    event UserRegistered(address registree, bool registered);


    struct User {
        bool registered;
        uint[] userAlbumsOwned;
    }
    
    struct Artist {
        bool registered;
        Album[] albums;
        uint totalAlbumSales;
        uint totalSongPlays;
        
    }

    struct Album {
        uint albumID;
        address artist;
        string albumName;
        Song[] songList;
        mapping(uint => Song) songStats;                 //user --> album id=>songNumber
        uint totalAlbumPurchases;
        uint totalSongPlays;
    }
    

    struct Song {
        uint songID;
        string songName;
        uint playCount;
    }


    modifier userRegistered {
        require(registeredUsers[msg.sender].registered == true); 
        _;
    }

    constructor() {
        owner = payable(msg.sender);
        albumCounter = 1;

        songList[1] = Song(1, 'FutureClub', 0);
    }
 
    function RegisterAddress() public returns(bool) {
        registeredUsers[msg.sender].registered = true; 
        registeredUsers[msg.sender].userAlbumsOwned.push(0);
        emit UserRegistered(msg.sender, true);
        return true;      
    }
    // functions to update arrays https://deanschmid1.medium.com/using-function-to-modify-structs-directly-in-solidity-mappings-809ccce6201b

    function getRegisteredAddress(address userAddress) public view returns(bool registration, uint256[] memory albumsOwned) {   
        return (registeredUsers[userAddress].registered, registeredUsers[userAddress].userAlbumsOwned);       
    }

    function verifyRegistration() view public returns(bool) {
        if (registeredUsers[msg.sender].registered == true) {
            return true;
        } else {
            return false;
        }
    }

    function getSongInfo(uint songNumber) view public returns(uint id, string memory title, uint playCount) {
        return (songList[songNumber].songID, songList[songNumber].songName, songList[songNumber].playCount);
    }


    receive() external payable {}
    fallback () external payable {}


}