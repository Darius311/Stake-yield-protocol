// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// Import the Burnable extension for cleaner code
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
// Import Ownable for a robust ownership pattern
import "@openzeppelin/contracts/access/Ownable.sol";

// Inherit from both ERC20Burnable and Ownable
contract StakeToken is ERC20Burnable, Ownable {

    // The constructor calls the parent constructors.
    // ERC20() gets the name and symbol.
    // Ownable() sets the initial owner to msg.sender.
    constructor() ERC20("StakeToken", "STAKE") Ownable(msg.sender) {
        // Use a local variable for the initial supply to save gas
        uint256 initialSupply = 1000000 * 10**18;
        
        // Call the internal _mint function directly give owner max supply
        _mint(msg.sender, initialSupply);
    }

    // A new function only the owner can call, for demonstration
    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

    // The burn() function is already included for free from ERC20Burnable!
    // No need to write it ourselves.
}