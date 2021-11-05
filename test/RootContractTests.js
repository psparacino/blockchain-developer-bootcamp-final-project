const { expect } = require("chai");
const { ethers } = require("hardhat");


//const provider = new ethers.providers.Web3Provider(window.ethereum);
//const signer = provider.getSigner(0);

describe("RootContract Tests", function () {
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

    it("have an album counter", async function() {
        //expect(await userContract.albumCounter.toNumber()).to.equal(1);
        const counter = await userContract.albumCounter();
        expect(counter.toNumber()).to.equal(1);
    });

    it("register user", async function() {
        await userContract.RegisterAddress({from : owner.address});
        const result2 = await userContract.verifyRegistration({from : owner.address});
        expect(result2).to.equal(true);
    });

    it("have struct for User", async function() {
        //expect({User: {registered: true}}).to.have.deep.property('User.registered', true);
        await userContract.RegisterAddress({from : owner.address});
        const result = await userContract.getRegisteredAddress(owner.address);
        expect(result[0], result[1]).to.equal(true, 0)
      });

    it("have struct for Song", async function() {
    //expect({User: {registered: true}}).to.have.deep.property('User.registered', true);
    const result = await userContract.getSongInfo(0);
    expect(result[0], result[1], result[2].toNumber()).to.equal(1, "Shenanigans", 0)
    });
      
  
  });