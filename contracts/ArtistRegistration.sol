//SPDX-License-Identifier: Unlicense

pragma solidity ^0.8.0;

import './RootContract.sol';

contract ArtistRegistration is RootContract {
            
        mapping(address => Album[]) public artistAlbums;

        modifier artistRegistered {
        require(registeredArtists[msg.sender].registered == true); 
        _;
    }
        
    
}
