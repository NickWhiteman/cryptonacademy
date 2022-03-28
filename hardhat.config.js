require("dotenv").config();
require("@nomiclabs/hardhat-waffle");
require("solidity-coverage");


/** 
 * Контракт я тестировал руками через Remix IDE все работает корректно. Тесты покрывают только
 * часть методов.  
 */
const deploy = async (hre) => {
  const contract = await hre.ethers.getContractFactory("DonationETH");
  const donator = await contract.deploy();
  return await donator.deployed();
}

// Не получилось разместить task в файле. Точнее они не захотели работать из того файла. А находясь
// тут они отображаются в меню npx hardhat 
task(
  "deploy", 
  "Deploy contract", 
  async (taskArgs, hre) => {
    try {
      const donator = await deploy(hre)

      console.log(`Donation deployed to: ${donator.address}`);
    } catch (err) {
      console.log(`${err}`);
    }
  });

task(
  "getBalance", 
  "Get balance on contract", 
  async (taskArgs, hre) => {
    try {
      const donator = await deploy(hre)
      const balance = await donator.getBalance();

      console.log(`Balance contract: ${balance}`);
    } catch (err) {
      console.log(`${err}`);
    }
  });
// не понял каких образом попадает параметр в msg.value пробрасываю отдельным параметром.
task("makeDonation", "Make a donation") 
  .addParam("amount", "Amount ETH for donation object msg.value")
  .setAction(async ({amount}, hre) => {
    try {
      const donator = await deploy(hre)
      
      await donator.makeDonation(amount);
      const balance = await donator.balance;

      console.log(`Donation done ${balance}`);
    } catch (err) {
      console.log(`${err}`);
    }
  });

task("withdrawAll", "Withdraw all to wallet") 
  .addParam("withdrawContract", "address wallet for withdraw")
  .setAction(async ({ withdrawContract }, hre) => {
    try {
      const donator = await deploy(hre)

      await donator.withdrawAll(withdrawContract);
      const balance = await donator.balance;

      console.log(`Withdraw all coins done, balance: ${balance}`);
    } catch (err) {
      console.log(`${err}`);
    }
  });

task(
  "withdraw",
  "Withdraw to wallet")
  .addParam("withdrawContract", "address wallet for withdraw")
  .addParam("amount", "Amount ETH for withdraw")
  .setAction(async ({
    withdrawContract,
    amount }, 
    hre) => {
      try {
        const donator = await deploy(hre)

        await donator.withdrawAll(withdrawContract, +amount);
        const remainingBalance = await donator.balance();

        console.log(`Withdraw all coins done, balance: ${remainingBalance}`);
      } catch (err) {
        console.log(`${err}`);
      }
    }
  );

task(
  "getBenefactors", 
  "Get benefactors on contract", 
  async (taskArgs, hre) => {
    try {
      const donator = await deploy(hre)

      const benefactors = await donator.getBenefactors();
  
      console.log(`List benefactors: ${
        benefactors.length
          ? benefactors 
          : "List benefactors is empty"
      }`);
    } catch (err) {
      console.log(`${err}`);
    }
  });

task(
  "getListDonation", 
  "Get donations on contract", 
  async (taskArgs, hre) => {
    try {
      const donator = await deploy(hre);

      const donations = await donator.getListDonation();
  
      console.log(`List donations: ${
        donations.length
          ? donations 
          : "List donations is empty"
      }`);
    } catch (err) {
      console.log(`${err}`);
    }
  });

task(
  "getAmountDonation", 
  "Get amount donations on contract", 
  async (taskArgs, hre) => {
    try {
      const donator = await deploy(hre);

      const amount = await donator.getAmountDonation();
  
      console.log(`Amount: ${amount}`);
    } catch (err) {
      console.log(`${err}`);
    }
  });

task(
  "getDonationBenefactors", 
  "Get donations from benefactor on contract")
  .addParam("benefactor", "Benefactor for get amount donations")
  .setAction(async ({benefactor}, hre) => {
    try {
      const donator = await deploy(hre);
      const amount = await donator.getAmountDonation(benefactor);
  
      console.log(`Amount: ${
        amount !== 0
          ? amount
          : "Benefactor is not exist"
      }`);
    } catch (err) {
      console.log(`${err}`);
    }
  });

module.exports = {
  networks: {
    rinkeby: {
      url: process.env.RINKEBY_URL,
      accounts: [`0x${process.env.RINKEBY_PRIVATE_KEY}`]
    }
  },
  plugins: ["solidity-coverage"],
  solidity: {
    version: "0.8.4",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  }
};
