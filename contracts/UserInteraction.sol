//SPDX-License-Identifier: Unlicense
pragma solidity 0.8.10;

import "hardhat/console.sol";
import './RootContract.sol';
import './ChainlinkOracle.sol';

/// @notice this contact extends Root, makes use of Reentrancy Guard to protect the withdrawal, and implements user functions


contract UserInteraction is RootContract {

        //Mappings 
        
        mapping(uint => uint) public totalSongCount;
        
        mapping(address => bool) public userAlbumPurchase;

        mapping(address => uint) public userPlayBalance;

        // State Var and Contract Instance

        uint totalAlbumsPurchased = 0;

        PriceConsumerV3 public ChainLinkContract;

        //Events

        event SongPlayed(uint _songID, bool success);

        event AlbumPurchased(uint _albumID, bool success);

        event AmountDeposited(address _depositer, uint _amount, bool success);
        
        event WithdrawalComplete(address withdrawee, uint _amount, uint current_balance, bool success);
        
        constructor() {
            ChainLinkContract = PriceConsumerV3(0x80d1188714a4d2B4BEfeC0571ed583d4b03C4b1B);
        }  

        /// @notice retrieves current ETH price from the Chainklink oracle to calculate stream/album prices in fiat
        function getEthPriceToday() public view returns(int256) {
            return ChainLinkContract.getLatestPrice();
        }


        //User Deposit

        /// @notice registers users' play bank deposit
        function depositBalance() public payable userRegistered {
        
            userPlayBalance[msg.sender] += msg.value;

            emit AmountDeposited(msg.sender, msg.value, true);
        }

        /// @notice retrieves user play balance
        function getDepositBalance() public view returns(uint) {
            return userPlayBalance[msg.sender];
        }

        /// @notice lets users withdraw excess eth from their play balance if they desposited too much
        /// @param _amount desired withdrawal amount
        function withdrawBalance(uint256 _amount) external userRegistered {
            require(_amount <= userPlayBalance[msg.sender], "not enough value");
            
            userPlayBalance[msg.sender] -= _amount;

             (bool sent, ) = payable(msg.sender).call{value:_amount}("");
            require(sent, "Failed to send Ether");
            
            
            emit WithdrawalComplete(msg.sender, _amount, userPlayBalance[msg.sender], true);
        }
        
        //Play and Buy operations

        /// @notice stream payment function. If the user owns the stream then the stream is free. 
        /// @dev this function still needs to be called to upstate playcount state.  Could be streamlined into batches so that every play isn't a txn.
        /// @param albumID placeholder album ID for the moment
        function Play(uint albumID, uint songID) public userRegistered returns(bool){
            uint price = userAlbumPurchase[msg.sender] ? 0 : 1308805763219;
            require(userPlayBalance[msg.sender] > 0, "deposit eth to listen");
               

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
        /// @notice get total all user count of a song
        function getPlayCount(uint songID) public view returns(uint) {
            return totalSongCount[songID];
        /// @return returns the total playcount of a song
        }

        /// @notice get user specific play count of a song
        function getUserPlayCount(uint albumID, uint songID) public view returns(uint) {
            return albumStats[msg.sender][albumID].songStats[songID].playCount;

        /// @return returns user playcount of a song
        }

        /// @notice gets total plays of all songs on the platform
        /// @dev this function needs to be reworked if there are dynamic artist uploads
        function getAggregatePlayCount(uint songID, uint songID2, uint songID3) public view returns(uint) {
            return totalSongCount[songID] + totalSongCount[songID2] + totalSongCount[songID3];
        
        /// @return returns total song plays on platform
        }
          
        /// @notice Purchases album and refunds any excess in the playbank
        /// @dev requires full value for msg.value and then adjust price within function, rather than adjusting price on frontend to reduce tampering risk
        function Buy(uint albumID) payable external userRegistered {
            //change this to chainlink oracle price
            uint price = 2621229059106300;
            require(msg.value == price, "price too low");
            
            int adjustedPrice = userPlayBalance[msg.sender] > 0 ? int(userPlayBalance[msg.sender]) - int(price) : int(price);
            
            registeredUsers[msg.sender].userAlbumsOwned.push(albumID);
            userAlbumPurchase[msg.sender] = true;
            totalAlbumsPurchased += 1;

            if (adjustedPrice > 0) {
                userPlayBalance[msg.sender] = 0;
                (bool sent, ) = payable(msg.sender).call{value: uint(adjustedPrice)}("");
                require(sent, "Failed to send Ether");
                
            } else {
                userPlayBalance[msg.sender] = 0;
                (bool sent, ) = owner.call{value: uint(adjustedPrice)}("");
                require(sent, "Failed to send Ether");
                
            }
            
            emit AlbumPurchased(albumID, true);
        }
     
        /// @notice check if user owns album
        function getAlbumOwnership() public view returns(bool) {
            if (userAlbumPurchase[msg.sender] == true) {
                return true;
            } else {
                return false;
            }
        }

        /// @notice gets number of all albums purchased on the platform
        function getTotalAlbumsPurchased() public view returns(uint) {
            return totalAlbumsPurchased;
        }

        /// @notice restricted to owner.  withdraws full balance from contract
        /// @dev this is currently safety net backdoor. this should be worked in a second version.
        function ownerRedirectFullBalance(address destination) public onlyOwner {
         
            (bool sent, ) = payable(destination).call{value: address(this).balance}("");
            require(sent, "Failed to send Ether");
        }
    }




