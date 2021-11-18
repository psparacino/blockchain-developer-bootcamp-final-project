# JustStreamIt - A Decentralized Audio Player

JustStreamIt requires kovan eth to interact.  Get kETH here--> [https://faucets.chain.link/]

JustStreamIt allows users to stream music in an on-demand model that charges micropayments per stream instead of monthly subscriptions.  All transactions are public which discourages the prefential payout models of central streaming services.  

Users can also choose to purchase which will then allow them to stream any of the songs without charge.  On purchase they will receive an ERC721 token verifying their purchase of the album.

The next implementation with registered artists will use a payment splitter contract combined with a micropayment channel to send funds directly to artists with less transactions/gas fees.

## App and Contract Locations

* [JustStreamIt](https://psparacino.github.io/blockchain-developer-bootcamp-final-project/)
* [Kovan Main Contract (Root+UserInteraction) Address](https://kovan.etherscan.io/address/0x83A71D391677f78BbED848b414635EdCE6e6E9b4)
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

## Dependencies, Testing, Local Hardhat Development, .env Population

### Local Set-up:
1. Install dependencies: `npm i`
2. Start front end: `npm run start`.
3. Localhost at: `http://localhost:3000/`
4. Connect to Kovan in Metamask
   
### Tests:
1. Confirm Hardhat is installed.
2. If needed: [Install Hardhat](https://hardhat.org/getting-started/#installation)
3. Run the contract tests: `npx hardhat test`

### Hardhat Local Development:
1. [Install Hardhat](https://hardhat.org/getting-started/#installation)--> `npm install --save-dev hardhat.`
2. `npm install` for everything else.
3. Start a local Hardhat node: `npx hardhat node`.
4. Deploy contracts: `npx hardhat run --network localhost scripts/deploy.js`
5. Copy UserInteraction and OwnershipToken addresses from console into src/hooks/useContractObjectRepo.js

### Populating .env file
If you choose to use your own .env variables, two are required:
1. REACT_APP_PRIVATE_KEY : private key to wallet
2. REACT_APP_INFURA_URL : url to your infura endpoint

