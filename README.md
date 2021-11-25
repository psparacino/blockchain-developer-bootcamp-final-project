# JustStreamIt - A Decentralized Audio Player

JustStreamIt requires kovan eth to interact.  Get kETH here--> [https://faucets.chain.link/]

JustStreamIt allows users to stream music in an on-demand model that charges micropayments per stream instead of monthly subscriptions.  All transactions are public which discourages the prefential payout models of central streaming services.  

Users can also choose to purchase which will then allow them to stream any of the songs without charge.  On purchase they will receive an ERC721 token verifying their purchase of the album.

The next implementation with registered artists will use a payment splitter contract combined with a micropayment channel to send funds directly to artists with less transactions/gas fees.

## User Flow

If the user is not connected to Metamask they will be prompted to do so. After connecting to Metamask, the user be prompted to register for the platform in the top left corner. This action will register their address as user of the platform and unlock all platform functionality.

There are two main areas of the platform: streaming functionality and buy functionality.

The audio player contains an 'album' of three songs (::cough:: all taken from my own albums).  To listen to these songs the user must stream a micropayment of approximately .005USD.  To do this, they must first deposit ETH into the play bank below the audio player. Streams will deduct the micropayment from the bank balance. If they have deposited too much, they can withdraw using the 'withdraw button'.  Updated song statistics and the current streaming and album price (based on the current eth price sourced using a Chainlink oracle) is located on the righthand side of the screen. 

The buy functionality is located on the lefthand side of the screen.  After the album is purchased, the user will be able to stream in perpetuity without paying micropayments for every stream. Their entire player bank balance will also be automatically refunded. As a proof of purchase the user will receive an ERC721 token.

## App and Contract Locations

* [JustStreamIt](https://psparacino.github.io/blockchain-developer-bootcamp-final-project/)
* [Screencast Walkthough](https://www.youtube.com/watch?v=Tfu7MnyHeGE&feature=youtu.be)
* [Kovan Main Contract (Root+UserInteraction) Address](https://kovan.etherscan.io/address/0x83A71D391677f78BbED848b414635EdCE6e6E9b4)
* [Kovan OwnershipToken Contract Address](https://kovan.etherscan.io/address/0xfea39ED3c5FeA0248ec1E7453726a0Cf0c4E6E06)
* Main Ethereum Address for NFT certification: 0xe4632110872c2213b6E0C5B7b6a88583124a15a0

## Contract Details

* [Design Pattern Decisions](./design_pattern_decisions.md)
* [Avoiding Common Attacks](./avoiding_common_attacks.md)
* [Deployed Contract Addresses (Kovan)](./deployed_addresses.txt)




## File structure

```
├── contracts                 X Contracts Folder
├── public                    X Public App Info
├── scripts                   X Scripts to deploy contracts. Deploy-2 is only for the Chainlink oracle contract. 
├── src                       X Main folder containing frontend and artifacts (required to have artifacts in src for create-react-app)
│   ├── artifacts             X Contract artifacts
|   ├── assets                X Audio and visual assets for tracks
│   ├── components            X Various React components for frontend build
│   └── hooks                 X Custom hooks to identify Ethereum, confirm registration etc.   
├── node_modules              X NodeJS libraries
└── test                      X Contract tests using Chai and Hardhat
```

## Dependencies, Testing, .env Population

### Running Tests:
After cloning the repo: 
1. Install dependencies `npm install`.
2. Confirm Hardhat is installed. In terminal, enter `npx hardhat`. If commands appear then hardhat is installed.
3. If needed: [Install Hardhat](https://hardhat.org/getting-started/#installation)
4. Run the contract tests: `npx hardhat test`

### Local Set-up:
1. Install dependencies: `npm install`
2. To start front end: `npm run start`.
3. Localhost at: `http://localhost:3000/`
4. Connect to Kovan in Metamask.

### Populating .env file
1. REACT_APP_PRIVATE_KEY : private key to wallet
2. REACT_APP_INFURA_URL : Infura URL endpoint

