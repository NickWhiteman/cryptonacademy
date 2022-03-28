//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

import "hardhat/console.sol";

/*
*   Я нашел готовые решения в интернете, но не могу себе позволить использовать чужой код, поэтому
*   доработал свой контракт. Тестировал на корректность работы в Remix IDE
*   Сделать решение лучше на данном этапе для меня не представляется возможным. 
*/
contract DonationETH {
    address private owner;
    address private donationAddress;
    uint amountAllBenefactors;
    mapping(address => address) benefactors;
    mapping(address => uint) listDonation;
    mapping(address => uint) listBenefactorAmountDonation;

    constructor() {
        owner = msg.sender;
        donationAddress = address(this);
    }

    function makeDonation() public payable {
        require(
            msg.value >= 0.001 ether,
            "Need enter amount Ether"
        );
        listDonation[msg.sender] = msg.value;
        listBenefactorAmountDonation[msg.sender] += msg.value;
        amountAllBenefactors += msg.value;
        benefactors[msg.sender] = msg.sender;
    }

    function getBalance() public view returns(uint) {

        return donationAddress.balance ;
    
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
        require(
            owner == msg.sender && 
            donationAddress.balance >= _amount, 
            "The amount exceeds the available balance"
        );

        address payable receiver = payable(_withdrawContract);
        receiver.transfer(_amount);
    }

    function getBenefactors(address _benefactor) public view returns(address) {
        require(
            owner == msg.sender, 
            "You are not an owner"
        );
        require(
            benefactors[_benefactor] != _benefactor, 
            "Benefactors not exists"
        );

        return benefactors[_benefactor];
    }

    function getListDonation(address _benefactor) public view returns(uint) {
        require(
            owner == msg.sender, 
            "You are not an owner"
        );

        return listDonation[_benefactor];
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

        return listBenefactorAmountDonation[_benefactors];
    }
}