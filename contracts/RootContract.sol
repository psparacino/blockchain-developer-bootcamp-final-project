//SPDX-License-Identifier: Unlicense
pragma solidity 0.8.10;

import "hardhat/console.sol";

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

    /// @title JustStreamIt
    /// @notice this contract provides a mechanism to listen to music via micropayments and buy the album outright.
    /// @notice as second iteration of this project would include an artist registry and payment splitter contract with payments going directly to the artist.
    /// @author Peter Sparacino
    /// @dev everything should work!
contract RootContract is ReentrancyGuard {
    /// @notice registration and data storage functionality
    /// @dev data is stored in a cross referenced manner to ease retrieval. could be streamline for a reduction of operations.

    address public owner;

    uint public albumCounter;

    mapping(address => User) public registeredUsers;

    mapping(uint => Song) public songList;

    mapping(address => mapping(uint => Album)) public albumStats; //Albums user has listened to.

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

    /// @notice ensures all wallets that interact with app are easily findable

    modifier userRegistered {
        require(registeredUsers[msg.sender].registered == true); 
        _;
    }

    /// @dev essentially the Ownable implementation to get around a shadowed declaration of owner
    modifier onlyOwner {
        require(msg.sender == owner); 
    _;
}

    constructor() {
        owner = payable(msg.sender);
        albumCounter = 1;

        songList[0] = Song(1, 'Shenanigans', 0);
        songList[1] = Song(2, 'InterDweller', 0);
        songList[2] = Song(3, 'La Storia', 0);
    }
 
    /// @notice registers wallet as a platform user
    function RegisterAddress() public returns(bool) {
        registeredUsers[msg.sender].registered = true; 
        registeredUsers[msg.sender].userAlbumsOwned.push(0);
        emit UserRegistered(msg.sender, true);
        return true;      
    }

    /// @notice get users registration status and the albums they own
    function getRegisteredAddress(address userAddress) public view returns(bool registration, uint256[] memory albumsOwned) {   
        return (registeredUsers[userAddress].registered, registeredUsers[userAddress].userAlbumsOwned);       
    }

    /// @notice registation verification
    function verifyRegistration() view public returns(bool) {
        if (registeredUsers[msg.sender].registered == true) {
            return true;
        } else {
            return false;
        }
    }

    /// @notice retrive information about indiviudal songs
    /// @param songNumber individual songs are ID'd by a hardcoded # at the moment.
    /// @dev this strcuture would change with registered artists who can upload their own material
    function getSongInfo(uint songNumber) view public returns(uint id, string memory title, uint playCount) {
        return (songList[songNumber].songID, songList[songNumber].songName, songList[songNumber].playCount);
        /// @return song id #, song name, current playcount
    }

    


    receive() external payable {}
    fallback () external payable {}


}