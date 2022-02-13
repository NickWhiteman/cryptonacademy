
const hre = require("hardhat");

async function main() {

  const Donation = await hre.ethers.getContractFactory("DonationETH");
  const donator = await Donation.deploy();

  await donator.deployed();

  console.log("Donation deployed to:", donator.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
