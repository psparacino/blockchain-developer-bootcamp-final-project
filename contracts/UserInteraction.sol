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
        
        mapping(address => bool) public userPurchase;
        
        //keep track of deployed payment channels

        mapping(address => address) public userPaymentChannel;

        //should use a constructor to demystify the songs and what the paths represent below(?)

        
        //Play and Buy operations

        function Play(uint albumID, uint songID) payable public userRegistered {
            uint current_song_count = albumStats[msg.sender][albumID].songStats[songID].playCount;
            if (current_song_count > 1) {
                current_song_count + 1;
                albumStats[msg.sender][albumID].totalSongPlays + 1;
                albumDirectory[1].songList[songID].playCount + 1;
            // @dev will call function from payment channel here
            } else {
                current_song_count = 1;
                albumStats[msg.sender][albumID].totalSongPlays = 1;
                albumDirectory[1].songList[songID].playCount = 1;
            }
            owner.transfer(msg.value);

            //https://ethereum.stackexchange.com/questions/50237/how-to-split-funds-in-single-send-transaction
          
        }

        function Buy(uint albumID) payable public /*add modifier check */ {
            //require(msg.value == price, "price too low");
            
            
            owner.transfer(msg.value);
            registeredUsers[msg.sender].userAlbumsOwned.push(albumID);
            userPurchase[msg.sender] = true;
        }

        function getAlbumOwnership() public view returns(bool) {
            if (userPurchase[msg.sender] == true) {
                return true;
            } else {
                return false;
            }
        }



        //handling individual Payment Channels

        function getUserChannelAddress() public view returns(address) {
            return userPaymentChannel[msg.sender];
        }

        function newPaymentChannel(address payable _vault, uint _duration) public returns(address userChannel) {

            userChannel = address(new PaymentChannelFactory(_vault, _duration));
            userPaymentChannel[msg.sender] = userChannel;
            return userChannel;
        
    }

   
    }





//should have songID generator. albumID + Song ID