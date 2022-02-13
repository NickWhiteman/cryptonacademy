//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract DonationETH {
    address private owner;
    address private donationAddress;
    address[] benefactors;
    mapping(address => uint) listAmountDonation;
    uint[] listDonation;
    uint amountAllBenefactors;

    constructor() {
        owner = msg.sender;
        donationAddress = address(this);
    }

    function makeDonation() public payable {
        require(
            msg.value >= .001 ether,
            "Need enter amount Ether"
        );
        listDonation.push(msg.value);
        listAmountDonation[msg.sender] += msg.value;
        amountAllBenefactors += msg.value;
        benefactors.push(msg.sender);
    }

    function getBalance() public view returns(uint) {
        return donationAddress.balance;
    }

    function withdrawAll(address _withdrawContract) public payable {
        require(
            owner == msg.sender && 
            donationAddress.balance > 0, 
            "You are not an owner"
        );

        address payable receiver = payable(_withdrawContract);
        receiver.transfer(donationAddress.balance);
    }

    // _amount uint256  00000000000000000000 ETH
    function withdraw(
        address _withdrawContract, 
        uint _amount
    ) public payable {
        require(
            owner == msg.sender && 
            donationAddress.balance > 0, 
            "You are not an owner"
        );

        address payable receiver = payable(_withdrawContract);
        receiver.transfer(_amount);
    }

    function getBenefactors() public view returns(address[] memory) {
        require(
            owner == msg.sender, 
            "You are not an owner"
        );

        return benefactors;
    }

    function getListDonation() public view returns(uint[] memory) {
        require(
            owner == msg.sender, 
            "You are not an owner"
        );

        return listDonation;
    }

    function getAmountDonation() public view returns(uint) {
        require(
            owner == msg.sender, 
            "You are not an owner"
        );

        return amountAllBenefactors;
    }

    function getDonationBenefactors(address _benefactors) public view returns(uint) {
        require(
            owner == msg.sender, 
            "You are not an owner"
        );

        return listAmountDonation[_benefactors];
    }
}