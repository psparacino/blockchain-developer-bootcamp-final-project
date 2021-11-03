async function main() {
    // We get the contract to deploy
    const UserInteraction = await ethers.getContractFactory("UserInteraction");
    const userinteraction = await UserInteraction.deploy();
  
    console.log("UserInteraction deployed to:", userinteraction.address);

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