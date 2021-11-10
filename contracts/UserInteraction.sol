//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

import './RootContract.sol';
import './ChainlinkOracle.sol';


contract UserInteraction is RootContract {

        //total play count of song irrespective of user

        mapping(uint => uint) public totalSongCount;
        
        mapping(address => bool) public userAlbumPurchase;

        mapping(address => uint) public userPlayBalance;

        uint totalAlbumsPurchased = 0;

        PriceConsumerV3 public ChainLinkContract;

        
        
        //keep track of deployed payment channels

        //mapping(address => address) public userPaymentChannel;

        //Events

        event SongPlayed(uint _songID, bool success);

        event AlbumPurchased(uint _albumID, bool success);

        event AmountDeposited(address _depositer, uint _amount, bool success);
        
        event WithdrawalComplete(address withdrawee, uint _amount, uint current_balance, bool success);
        
        constructor() {
            ChainLinkContract = PriceConsumerV3(0x8A791620dd6260079BF849Dc5567aDC3F2FdC318);
        }  

        function getEthPriceToday() public view returns(int256) {
            return ChainLinkContract.getLatestPrice();
        }


        //User Deposit

        function depositBalance() public payable userRegistered {
        
            userPlayBalance[msg.sender] += msg.value;

            emit AmountDeposited(msg.sender, msg.value, true);
        }
        
        function getDepositBalance() public view returns(uint) {
            return userPlayBalance[msg.sender];
        }

        function withdrawBalance(uint256 _amount) external userRegistered {
            require(_amount <= userPlayBalance[msg.sender], "not enough value");
            
            userPlayBalance[msg.sender] -= _amount;

             (bool sent, ) = payable(msg.sender).call{value:_amount}("");
            require(sent, "Failed to send Ether");
            
            
            emit WithdrawalComplete(msg.sender, _amount, userPlayBalance[msg.sender], true);
        }

        /*
        function getEthPrice() public view returns(uint) {
            return uint(PriceConsumerV3.getLatestPrice());
        }
        */
        
        //Play and Buy operations

        function Play(uint albumID, uint songID) public userRegistered returns(bool){
            uint price = userAlbumPurchase[msg.sender] ? 0 : 1308805763219;
            require(userPlayBalance[msg.sender] > 0, "deposit eth to listen");
            //uint price = getEthPrice();        

            if (totalSongCount[songID] > 0) {
                albumStats[msg.sender][albumID].songStats[songID].playCount ++;
                totalSongCount[songID] ++; 
            } else {
            albumStats[msg.sender][albumID].songStats[songID].playCount = 1;
            totalSongCount[songID] = 1;     
            }
            
            userPlayBalance[msg.sender] -= price;

            emit SongPlayed(songID, true);
            return true;

          
        }

        function getPlayCount(uint songID) public view returns(uint) {
            return totalSongCount[songID];
        }

        function getUserPlayCount(uint albumID, uint songID) public view returns(uint) {
            return albumStats[msg.sender][albumID].songStats[songID].playCount;
        }


        function getAggregatePlayCount(uint songID, uint songID2, uint songID3) public view returns(uint) {
            return totalSongCount[songID] + totalSongCount[songID2] + totalSongCount[songID3];
        }

        function Buy(uint albumID) payable external userRegistered {
            //change this to chainlink oracle price
            uint price = 2621229059106300;
            require(msg.value == price, "price too low");
            
            userPlayBalance[msg.sender] -= price;

            (bool sent, ) = owner.call{value: price}("");
            require(sent, "Failed to send Ether");
            
            registeredUsers[msg.sender].userAlbumsOwned.push(albumID);
            userAlbumPurchase[msg.sender] = true;
            totalAlbumsPurchased += 1;

            emit AlbumPurchased(albumID, true);

            ///console.log("album successfully purchased");
        }

        function getAlbumOwnership() public view returns(bool) {
            if (userAlbumPurchase[msg.sender] == true) {
                return true;
            } else {
                return false;
            }
        }

        function getTotalAlbumsPurchased() public view returns(uint) {
            return totalAlbumsPurchased;
        }

        function ownerRedirectFullBalance(address destination) public onlyOwner {
         
            (bool sent, ) = payable(destination).call{value: address(this).balance}("");
            require(sent, "Failed to send Ether");
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