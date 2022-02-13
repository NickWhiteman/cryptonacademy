const { expect } = require("chai");
const { ethers } = require("hardhat");

describe(() => {
  let Donation, donator;

  beforeEach(async () => {
    Donation = await ethers.getContractFactory("DonationETH");
    donator = await Donation.deploy();
    await donator.deployed();
  });

  describe("DonationETH", function () {

    it("Test Donation methods contract getBenefactors", async function () {  

      expect(await donator.getBenefactors()).to.equal([]);
    
    });
  
    it("Test Donation methods contract getListDonation", async function () {

      expect(await donator.getListDonation()).to.equal([]);

    });
  
    it("Test Donation methods contract getBalance", async function () {
  
      expect(await donator.getBalance()).to.equal(0);

    });
  
    it("Test Donation methods contract getAmountDonation", async function () {
  
      expect(await donator.getAmountDonation()).to.equal(0);

    });

  });

});
