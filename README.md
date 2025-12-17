# StakeYield Protocol

A DeFi staking platform where users deposit tokens into a smart contract. Every transaction burns 2% of the tokens, creating deflationary pressure. The stack contains: Solidity contracts, a React frontend, and deployed to the Sepolia testnet. 

## 🎥 Demo
[Watch demo video](https://youtu.be/M6Cof5z0Hv0)

## 🚀 Features
- **Custom ERC20 Token** with 2% burn on every stake transaction
- **Secure Staking Vault** for deposit/withdrawal management
- **Real-time Balance Updates** without page refresh
- **Transaction State Management** with loading modals and confirmations
- **Wallet Integration** via RainbowKit (MetaMask, WalletConnect, etc.)

## 🛠️ Tech Stack

**Smart Contracts:**
- Solidity ^0.8.20
- OpenZeppelin Contracts (ERC20, Ownable, ReentrancyGuard)
- Remix IDE for development & deployment

**Frontend:**
- React 18 + TypeScript
- Vite (Build Tool)
- Wagmi v2 (Ethereum interactions)
- RainbowKit (Wallet connection)
- Chakra UI (Component library)
- Lottie (Animations)

**Network:**
- Ethereum Sepolia Testnet

## 📝 Smart Contract Architecture

### StakeToken (ERC20)
- Standard ERC20 implementation with burn functionality
- 1,000,000 initial supply
- Burn on transfer capability for deflationary mechanics

### StakeVault
- Manages user deposits and withdrawals
- Implements 2% burn fee on stake
- Secure withdrawal mechanism
- Event emissions for frontend tracking

## 📍 Deployed Contracts (Sepolia)
- **STAKE Token:** `0x3c6D4d299086B12992042D59A0c304a3014a12e8` ([View on Etherscan](https://sepolia.etherscan.io/address/0x3c6D4d299086B12992042D59A0c304a3014a12e8))
- **Staking Vault:** `0x85fc4476426AbD81194f3646c9Ba1E6f8b4C3B7A` ([View on Etherscan](https://sepolia.etherscan.io/address/0x85fc4476426AbD81194f3646c9Ba1E6f8b4C3B7A))

## 💻 Local Development

### Prerequisites
- Node.js v18+
- MetaMask or compatible Web3 wallet
- Sepolia ETH (for testing)

### Installation
1. **Clone the repository**

`git clone https://github.com/yourusername/StakeYield-Protocol.git`
`cd StakeYield-Protocol`

2. **Install dependencies**

`npm install`
or if you use yarn
`yarn install`

3. **Configure Environment**
Create a `.env` file in the root directory if you need to override default RPCs (optional for local testing with public providers):

`VITE_WALLET_CONNECT_PROJECT_ID=your_project_id_here`

4. **Run the development server**

`npm run dev`

5. **Open the App**
Visit `http://localhost:5173` (or `http://localhost:3000`) in your browser.

## ⚠️ Testing Note

This protocol runs on the **Ethereum Sepolia Testnet**.

To interact with the dApp (Stake/Unstake), you need:
1. **Sepolia ETH** (for gas fees) - Available from [Sepolia Faucet](https://sepoliafaucet.com/).
2. **STAKE Tokens** - These are custom ERC20 tokens minted to the contract deployer.

**Don't have tokens?**
Please watch the **[Demo Video]([link-to-video](https://youtu.be/M6Cof5z0Hv0))** to see the full transaction lifecycle, including token approval, staking, and balance updates with the burn mechanism in action.
