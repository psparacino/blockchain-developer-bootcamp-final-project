const { expect } = require("chai");
const { ethers } = require("hardhat");


//const provider = new ethers.providers.Web3Provider(window.ethereum);
//const signer = provider.getSigner(0);

describe("UserInteraction Tests", function () {
    let UI;
    let userContract;
    let owner;
    let addr1;

    beforeEach(async function () {
      UI = await ethers.getContractFactory('UserInteraction');
     [owner, addr1] = await ethers.getSigners();
      userContract = await UI.deploy();
      await userContract.deployed();
      
    });
  
    it("deposit a balance of 100 to the player bank", async function () {
      await userContract.RegisterAddress({from : owner.address});
      await userContract.depositBalance({from : owner.address, value : 100});
      const result = (await userContract.getDepositBalance({from : owner.address})).toNumber();
      expect(result).to.equal(100);
    });


    it("deposit 100, then withdraw 50 from player balance", async function () {
      await userContract.RegisterAddress({from : owner.address});
      await userContract.depositBalance({from : owner.address, value : 100});
      await userContract.withdrawBalance(50, {from : owner.address});
      const result = (await userContract.getDepositBalance({from : owner.address})).toNumber();
      expect(result).to.equal(50);
    });

    it("playing song deducts from player balance and updates song counter", async function () {
      await userContract.RegisterAddress({from : owner.address});
      await userContract.depositBalance({from : owner.address, value : 1308805763220});
      await userContract.Play(1, 1,{from : owner.address});
      const balance = (await userContract.getDepositBalance({from : owner.address})).toNumber();
      const playCount= (await userContract.getPlayCount(1)).toNumber();
      expect(balance, playCount).to.equal(1, 1);
    });

    it("buying album deducts from player balance and album ownership", async function () {
      await userContract.RegisterAddress({from : owner.address});
      await userContract.depositBalance({from : owner.address, value : 2621229059106301});
      await userContract.Buy(1,{from : owner.address, value : 2621229059106300});
      const balance = (await userContract.getDepositBalance({from : owner.address})).toNumber();
      const ownership = (await userContract.getAlbumOwnership());
      expect(balance, ownership).to.equal(1, true);
    });



   

    
  });