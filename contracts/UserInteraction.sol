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
        
        event WithdrawalComplete(address withdrawee, uint _amount, uint current_balance);


        //should use a constructor to demystify the songs and what the paths represent below(?)


        //User Deposit

        function depositBalance() public payable userRegistered {
            require(msg.value > 0);
            userPlayBalance[msg.sender] += msg.value;
       
            emit AmountDeposited(msg.sender, msg.value);
        }
        
        function getDepositBalance() public view returns(uint) {
            return userPlayBalance[msg.sender];
        }

        function withdrawBalance(uint256 _amount) external userRegistered {
            require(_amount <= userPlayBalance[msg.sender], "not enough value");
            //check for reentrancy
            userPlayBalance[msg.sender] -= _amount;

            (bool sent, ) = msg.sender.call{value:_amount}("");
            require(sent, "Failed to send Ether");
            
            
            emit WithdrawalComplete(msg.sender, _amount, userPlayBalance[msg.sender]);
        }


        
        //Play and Buy operations

        function Play(uint albumID, uint songID) public userRegistered returns(bool){
            require(userPlayBalance[msg.sender] > 0, "deposit eth to listen");
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

        function Buy(uint albumID) payable public userRegistered {
            //change this to chainlink oracle price
            uint price = 2621229059106300;
            require(msg.value == price, "price too low");
            

            (bool sent, ) = owner.call{value: price}("");
            require(sent, "Failed to send Ether");
            
            registeredUsers[msg.sender].userAlbumsOwned.push(albumID);
            userAlbumPurchase[msg.sender] = true;

            emit AlbumPurchased(albumID);

            ///console.log("album successfully purchased");
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