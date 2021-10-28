const { expect } = require("chai");
const { ethers } = require("hardhat");


//const provider = new ethers.providers.Web3Provider(window.ethereum);
//const signer = provider.getSigner(0);

describe("OwnershipToken Tests", function () {
    let OT;
    let TokenContract;
    let owner;
    let addr1;

    beforeEach(async function () {
        OT= await ethers.getContractFactory('OwnershipToken');
        [owner, addr1] = await ethers.getSigners();
        TokenContract = await OT.deploy();
        await TokenContract.deployed();
      
    });

    it("should mint and then transfer a token to addr1", async function() {
        await TokenContract.safeMint(addr1.address);
        expect(await TokenContract.balanceOf(addr1.address)).to.equal(1);
    });
  });