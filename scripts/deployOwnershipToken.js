async function main() {

    const OwnershipToken = await ethers.getContractFactory("OwnershipToken");
    const ownershiptoken = await OwnershipToken.deploy();
  
    console.log("OwnershipToken deployed to:", ownershiptoken.address);
  }
  
  main()
    .then(() => process.exit(0))  
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });