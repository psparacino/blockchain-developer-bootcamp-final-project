//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

import './RootContract.sol';
import './PaymentChannelFactory.sol';


/*
library Verification {
    //placeholder

}
*/
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
        
        event WithdrawalComplete(address withdrawee, uint _amount);


        //should use a constructor to demystify the songs and what the paths represent below(?)


        //User Deposit
        function depositBalance(uint _amount) public payable {
            
            require(_amount > 0);
            require(msg.value == _amount);
            owner.transfer(_amount);
            
            userPlayBalance[msg.sender] += _amount;

            emit AmountDeposited(msg.sender, _amount);

        }
        
        function getDepositBalance() public view returns(uint) {
            return userPlayBalance[msg.sender];
        }

        function withdrawBalance() public payable userRegistered {
            //require(userPlayBalance[msg.sender] > 0, "user balance is Zero");

            address payable withdrawee = payable(msg.sender);

            uint balance = userPlayBalance[withdrawee];

            userPlayBalance[msg.sender] = 0;
            
            withdrawee.transfer(balance);
            
            emit WithdrawalComplete(msg.sender, balance);

            
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
            
            owner.transfer(msg.value);
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