//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

/*
library Verification {
    //placeholder

}
*/

contract RootContract {

    address payable owner;

    uint albumCounter;

    uint private platform;

    mapping(address => User) public registeredUsers;

    mapping(address => Artist) public registeredArtists;

    mapping(uint => Album) public albumDirectory;

    mapping(address => mapping(uint => Album)) public albumStats; //Albums user has listened to.
    
    mapping(address => uint) balances;  


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
        mapping(uint => Song) songStats;                 //user --> album id=>songID
        uint totalAlbumPurchases;
        uint totalSongPlays;
    }
    

    struct Song {
        uint songID;
        string songTitle;
        string songName;
        uint playCount;
    }


    modifier userRegistered {
        require(registeredUsers[msg.sender].registered == true); 
        _;
    }

    constructor() {
        owner = payable(msg.sender);
    }

    function RegisterAddress() public returns(bool) {   
        return registeredUsers[msg.sender].registered = true;       
    }
    // functions to update arrays https://deanschmid1.medium.com/using-function-to-modify-structs-directly-in-solidity-mappings-809ccce6201b

    function verifyRegistration() view public returns(bool) {
        if (registeredUsers[msg.sender].registered == true) {
            return true;
        } else {
            return false;
        }

    }
    
    
    function getRegisteredAddress(address userAddress) view public returns(bool) {
        console.log("User is registered", registeredUsers[msg.sender].registered);
        return registeredUsers[userAddress].registered;
    }




}







//should have songID generator. albumID + Song ID