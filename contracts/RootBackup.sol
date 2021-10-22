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
    
    receive() external payable {}
    
    
    fallback () external payable {}




}

contract UserInteraction is RootContract {

        //total play count of song irrespective of user

        mapping(uint => uint) public totalSongCount;
        
        mapping(address => bool) public userAlbumPurchase;

        mapping(address => uint) public userPlayBalance;
        
        //keep track of deployed payment channels

        //mapping(address => address) public userPaymentChannel;

        //Events

        event SongPlayed(uint _songID);

        event AlbumPurchased(uint _albumID);

        event AmountDeposited(address _depositer, uint _amount);
        
        event WithdrawalComplete(address withdrawee, uint _amount, uint newBalance);


        //should use a constructor to demystify the songs and what the paths represent below(?)


        //User Deposit

        function depositBalance(uint _amount) public payable {
            
            require(_amount > 0);
            require(msg.value == _amount);
            
            (bool sent, ) = address(this).call{value: _amount}("");
            require(sent, "Failed to send Ether");
            
            userPlayBalance[msg.sender] += _amount;
            

            emit AmountDeposited(msg.sender, _amount);

        }
        

        
        function getDepositBalance() public view returns(uint) {
            return userPlayBalance[msg.sender];
        }
        

        function withdrawBalance(uint _amount) external userRegistered {
            require(_amount <= userPlayBalance[msg.sender], "not enough value");
            //require(_amount == msg.value, "_amount doesn't equal msg.value");
            
            address withdrawee = payable(msg.sender);
 
            (bool sent, ) = withdrawee.call{value: _amount}("transfer success");
            require(sent, "Failed to send Ether");
            
            userPlayBalance[msg.sender] -= _amount;
   
            
            emit WithdrawalComplete(msg.sender, _amount, userPlayBalance[msg.sender]);
            
        }
        

        
        //Play and Buy operations

        function Play(uint albumID, uint songID) public userRegistered returns(bool){
            uint price = 1308805763219;
            uint current_song_count = albumStats[msg.sender][albumID].songStats[songID].playCount;

            //require(msg.value == price);  

            if (totalSongCount[songID] > 0) {
                current_song_count ++;
                totalSongCount[songID] ++; 
            } else {
            current_song_count = 1;
            totalSongCount[songID] = 1;     
            }
            
            
            userPlayBalance[msg.sender] -= price;

            emit SongPlayed(songID);
            return true;

            //https://ethereum.stackexchange.com/questions/50237/how-to-split-funds-in-single-send-transaction
          
        }

        function getPlayCount(uint songID) public view returns(uint) {
            return totalSongCount[songID];
        }


        function Buy(uint albumID) payable public /*add modifier check */ {
            //change this to chainlink oracle price
            uint price = 2621229059106300;
            require(msg.value == price, "price too low");
            

            (bool sent, ) = owner.call{value: price}("");
            require(sent, "Failed to send Ether");
            
            registeredUsers[msg.sender].userAlbumsOwned.push(albumID);
            userAlbumPurchase[msg.sender] = true;

            emit AlbumPurchased(albumID);

            console.log("album successfully purchased");
        }

        function getAlbumOwnership() public view returns(bool) {
            if (userAlbumPurchase[msg.sender] == true) {
                return true;
            } else {
                return false;
            }
        }
        
                
        
        function getVaultAddress() public view returns(address) {
            return address(this);
        }
        
        function getVault() public view returns(uint) {
            return address(this).balance;
        }

        //handling individual Payment Channels
        /*
        function getUserChannelAddress() public view returns(address) {
            return userPaymentChannel[msg.sender];
        }

        function newPaymentChannel(address payable _vault, uint _duration) public returns(address userChannel) {

            userChannel = address(new PaymentChannelFactory(_vault, _duration));
            userPaymentChannel[msg.sender] = userChannel;
            return userChannel;      
        }
        */
    }





//should have songID generator. albumID + Song ID