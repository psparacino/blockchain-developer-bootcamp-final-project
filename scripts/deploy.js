async function main() {
    // We get the contract to deploy
    const UserInteraction = await ethers.getContractFactory("UserInteraction");
    const userinteraction = await UserInteraction.deploy();
  
    console.log("UserInteraction deployed to:", userinteraction.address);
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });