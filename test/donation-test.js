const { expect } = require("chai");
const { ethers } = require("hardhat");


describe( "Test contract DonationETH", () => {
  
  let Donation, donator, owner, addr1, addr2;

  beforeEach("Deploy", async () => {

    Donation = await ethers.getContractFactory("DonationETH");
    donator = await Donation.deploy();
    await donator.deployed();
    [owner, addr1, addr2] = await ethers.getSigners();

  });

  /** 
   * Не могу получить owner контракта для тестирования.  
   */
  // describe("Deployment", function() {

  //   it("Should set the right owner ", async () => {
  //     expect(await donator.owner()).to.equal(owner.address);
  //   });
    
  // });

  /** 
   * Я так и не смог справиться с пониманием тестирвания контрактов. 
   * вв моей практики тесты редкость. Но я наверстаю. 
   */
  describe("DonationETH", function () {

    it("Test Donation methods contract getBenefactors", async function () {  

      expect(await donator.getBenefactors("0xe75697551A41AE8bfcc39b72f0AAf3415479B223"))
        .to
        .equal("0x0000000000000000000000000000000000000000");
  
    });
  
    it("Test Donation methods contract getListDonation", async function () {

      expect(await donator.getListDonation("0xe75697551A41AE8bfcc39b72f0AAf3415479B223"))
          .to
          .equal("0x0000000000000000000000000000000000000000");
            
    });
  
    it("Test Donation methods contract getBalance", async function () {
  
      expect(await donator.getBalance()).to.equal(0);

    });
  
    it("Test Donation methods contract getAmountDonation", async function () {
  
      expect(await donator.getAmountDonation()).to.equal(0);

    });

  });

});
