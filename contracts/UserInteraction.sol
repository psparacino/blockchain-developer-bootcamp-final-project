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
        
        mapping(address => uint) public userPurchases;
        
        //keep track of deployed payment channels

        mapping(address => address) public userPaymentChannel;

        //should use a constructor to demystify the songs and what the paths represent below
        constructor () {}
        
        //need to fix this function
        function Play(uint albumID, uint songID) payable public userRegistered {
            uint current_song_count = albumStats[msg.sender][albumID].songStats[songID].playCount;
            if (current_song_count > 1) {
                current_song_count + 1;
                albumStats[msg.sender][albumID].totalSongPlays + 1;
            // @dev will call function from payment channel here
            } else {
                current_song_count = 1;
                albumStats[msg.sender][albumID].totalSongPlays = 1;
            }

            //https://ethereum.stackexchange.com/questions/50237/how-to-split-funds-in-single-send-transaction
          
        }

        function Buy(uint albumID, uint price) payable public userRegistered returns(bool) {
            require(msg.value > price);
            registeredUsers[msg.sender].userAlbumsOwned.push(albumID);
            //will call function from payment channel instance here
            owner.transfer(msg.value);
            return true;
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