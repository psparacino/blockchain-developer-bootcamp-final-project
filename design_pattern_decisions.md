## Design Pattern Decisions

### Design Pattern Requirements

* Oracles: 
    This project uses the Chainlink Eth/Usd Kovan oracle to calculate daily stream/purchase prices
    
* Inheritance and Interfaces:
    The following libraries are used:
        * ReentrancyGuard (OpenZeppelin)
        * ERC721 (OpenZeppelin)
        * Ownable (OpenZeppelin)
        * Counters (OpenZeppelin)
* Access Control:
    Two modifiers, userRegistered and onlyOwner, restrict the majority of the functions to use by their respective party.  Only registered users can access the main app page, as well deposit, withdraw, play tracks or purchase albums. Only the owner can move the contract balance.
  




### Overall Design Decisions

