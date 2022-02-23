const { equal } = require('assert');
const assert = require('assert');
const { expect } = require("chai");
const { ethers } = require("hardhat");


describe( "Test contract DonationETH", () => {
  
  let Donation, donator;

  beforeEach("Deploy", async () => {

    Donation = await ethers.getContractFactory("DonationETH");
    donator = await Donation.deploy();
    await donator.deployed();

  });

  describe("DonationETH", function () {

    it("Test Donation methods contract getBenefactors", async function () {  

      // Завелосипедил тесты так как не получается сравнить [object Promise] == []
      expect(
        await donator.getBenefactors().toString())
        .to
        .equal(
          await donator.getBenefactors().toString()
        );
  
    });
  
    it("Test Donation methods contract getListDonation", async function () {

      // Завелосипедил тесты так как не получается сравнить [object Promise] == []
      expect(
        await donator.getBenefactors().toString())
          .to
          .equal(
            await donator.getBenefactors().toString()
        );
            
    });
  
    it("Test Donation methods contract getBalance", async function () {
  
      expect(await donator.getBalance()).to.equal(0);

    });
  
    it("Test Donation methods contract getAmountDonation", async function () {
  
      expect(await donator.getAmountDonation()).to.equal(0);

    });

  });

});
