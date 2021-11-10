async function main() {
    
    const ChainlinkOracle = await ethers.getContractFactory("PriceConsumerV3");
    const chainlinkoracle = await ChainlinkOracle.deploy();
  
    console.log("ChainLinkOracle deployed to:", chainlinkoracle.address);
  }
  
  main()
    .then(() => process.exit(0))  
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });