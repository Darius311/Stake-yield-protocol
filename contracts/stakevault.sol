// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./4_StakeToken.sol";

contract StakeVault{

    StakeToken public stakeToken;
    mapping(address => uint256) public balances;
    address token;
    event Staked(address indexed user, uint256 amount);
    event Unstaked(address indexed user, uint256 amount);

    constructor(address _tokenAddress){
        stakeToken = StakeToken(_tokenAddress);
    }

    function stake(uint256 amount) public {
        // Set up variables
        uint256 burnAmount = (amount * 2) / 100;
        uint256 netAmount = amount - burnAmount;

        // Updates balance on users stake account
        stakeToken.transferFrom(msg.sender, address(this), amount);
        balances[msg.sender] += netAmount;
        
        // Burns 2% using the burn function within stake token
        stakeToken.burn(burnAmount);

        // Message to the frontend
        emit Staked(msg.sender, amount);
    }

    function unstake(uint256 amount) public {
        require(amount <= balances[msg.sender], "Amount exceeds balance");
        
        // Set up variables
        uint256 burnAmount = (amount * 2) / 100;
        uint256 netAmount = amount - burnAmount;

        // Updates balance on users account
        balances[msg.sender] -= amount;
        stakeToken.transfer(msg.sender, netAmount);

        // Contract burns 2% before sending back tokens
        stakeToken.burn(burnAmount);

        // Message to the frontend
        emit Unstaked(msg.sender, amount);
    }

    function getStakedBalance(address userAddress) public view returns (uint256) {
        // Get balance staked within vault
        return(balances[userAddress]);
    }
}