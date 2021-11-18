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
    Two modifiers, userRegistered and onlyOwner, restrict the majority of the functions to use by their respective party.  Only registered users can access the main app page, as well deposit, withdraw, play tracks or purchase albums. Only the owner can move the main contract balance.
  

### Overall Design Framework

 The central streaming service model is the quintessential 'black box' that the transparency of web3 seeks to overthrow. The twisted incentives and pennies on the dollar compensation model of central streaming services has gutted the music industry. While indeed record comapnies use to act as gatekeepers and traditional models didnt allow for the 'access' afforded by web2 streaming, record labels were also able to offer financial and logistical support to chosen artists, all supported by passive income in the form of album sales. Given that album sales have all but evaporated, the significant sums attached to music's value now are merely traded back and forth between the large streaming companies and record companies for licensing agreements with little to none ever trickling back down to the artists.  This has resulted in a massive drop in artist compensation, and even a lack of resources to continute to create their art.

 Web3 can solve that problem. It has the ability to excise all the middlemen who flock around the intangible quantity of a successful artist hoping to get a piece of the fallout and action for questionable contributions.  With web3, the value can flow directly from fan to artist in a verifiable and fair manner.

 With this POC decentralized streaming audio player, listeners are charged micropayments per stream split directly to the artist without the preferential payout model of Spotify (higher played artists receive more than lower streamed artists, increasing the disparity). Listeners are thus only charged for the music they consume, rather than billed indiscrimately in a reocurring subscription model.  This model also increases the incentive to purchase the album, and the potential for much-needed passive artist income, as the listener can then stream without continuing to pay micropayments.

