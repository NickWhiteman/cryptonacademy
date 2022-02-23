const { task, web3 } = require("@nomiclabs/hardhat-web3");

task(
  "accounts", 
  "Prints the list of accounts", 
  async (taskArgs) => {
  const accounts = await web3.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

task(
  "deploy", 
  "Deploy contract", 
  async (taskArgs) => {
  try {
    const contract = await web3.ethers.getContractFactory("DonationETH");
    const donator = await contract.deploy();
    await donator.deployed();

    console.log("Contract was deployed");
  } catch (err) {
    console.log(`${err}`);
  }
});

task(
  "getBalance", 
  "Get balance on contract", 
  async (taskArgs) => {
  try {
    const contract = await web3.ethers.getContractFactory("DonationETH");
    const balance = await contract.balance;

    console.log(`Balance contract: ${balance}`);
  } catch (err) {
    console.log(`${err}`);
  }
});

task(
  "makeDonation", 
  "Make a donation", 
  async ({ _amount }) => {
  try {
    const contract = await web3.ethers.getContractFactory("DonationETH");
    await contract.makeDonation(_amount);
    const balance = await contract.balance;

    console.log(`Donation done ${balance}`);
  } catch (err) {
    console.log(`${err}`);
  }
});

task(
  "withdrawAll", 
  "Withdraw all to wallet", 
  async ({ _withdrawContract }) => {
  try {
    const contract = await web3.ethers.getContractFactory("DonationETH");
    await contract.withdrawAll(_withdrawContract);
    const balance = await contract.balance;

    console.log(`Withdraw all coins done, balance: ${balance}`);
  } catch (err) {
    console.log(`${err}`);
  }
});

task(
  "withdraw",
  "Withdraw to wallet",
  async ({ _withdrawContract, _amount }) => {
    try {
      const contract = await web3.ethers.getContractFactory("DonationETH");
      await contract.withdrawAll(_withdrawContract, _amount);
      const balance = await contract.balance;

      console.log(`Withdraw all coins done, balance: ${balance}`);
    } catch (err) {
      console.log(`${err}`);
    }
  }
);