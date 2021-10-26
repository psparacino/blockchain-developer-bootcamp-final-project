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

    it("owner should be defined", async function() {
      expect(await userContract.owner()).to.equal(owner.address);
    });

    it("should register user", async function() {
      await userContract.RegisterAddress({from : owner.address});
      const result2 = await userContract.verifyRegistration({from : owner.address});
      expect(result2).to.equal(true);
    });
  
  
    it("should deposit a balance of 100 to the player bank", async function () {
      await userContract.RegisterAddress({from : owner.address});
      await userContract.depositBalance({from : owner.address, value : 100});
      const result = (await userContract.getDepositBalance({from : owner.address})).toNumber();
      expect(result).to.equal(100);

    });
  });