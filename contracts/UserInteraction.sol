//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

/*
library Verification {
    //placeholder

}
*/

contract UserInteraction {

    address public owner;

    mapping(address => Album[]) public artistAlbums;

    mapping(address => uint) public userPurchases;

    mapping(address => User) public registeredUsers;

    

    struct Album {
        uint albumID;
        string albumName;
        mapping(uint => string) songTitles;  //ID --> titles
        mapping(uint => uint) songPlayCounts; //song ID--> Total play Counts
        uint totalAlbumPurchases;
    }

    struct User {
        bool registered;
        uint[] albumsOwned;
        mapping(uint => uint) songPlayCounts;
    }

    modifier UserSignedIn {
        require(registeredUsers[msg.sender].registered == true); 
        _;
    }

    constructor() public {
        owner = msg.sender;
    }

    function RegisterAddress() private returns(bool) {
        return registeredUsers[msg.sender].registered = true;
    }
    // functions to update arrays https://deanschmid1.medium.com/using-function-to-modify-structs-directly-in-solidity-mappings-809ccce6201b


    function Play() private UserSignedIn {
        
        
    }
}


//should have songID generator. albumID + Song ID