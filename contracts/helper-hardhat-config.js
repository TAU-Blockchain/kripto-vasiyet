const { ethers } = require("hardhat")

const networkConfig = {
    31337: {
        name: "localhost",
        identity: "777",
        share1: "30",
        share2: "60",
        inheritableTokens: ["0x7b79995e5f793A07Bc00c21412e50Ecae098E7f9"],
        functionsRouter: "0xb83E47C2bC239B3bf370bc41e1459A34b41238D0",
        subscriptionId: 1,
        gasLimit: 1000000,
        donId: "0x66756e2d657468657265756d2d7365706f6c69612d3100000000000000000000",
    },
    11155111: {
        name: "sepolia",
        identity: "777",
        share1: "30",
        share2: "60",
        inheritableTokens: [
            // "0x7b79995e5f793A07Bc00c21412e50Ecae098E7f9",
            // "0x779877A7B0D9E8603169DdbD7836e478b4624789",
        ],
        functionsRouter: "0xb83E47C2bC239B3bf370bc41e1459A34b41238D0",
        subscriptionId: "1863",
        gasLimit: "300000",
        donId: "0x66756e2d657468657265756d2d7365706f6c69612d3100000000000000000000",
    },
}

const developmentChains = ["hardhat", "localhost"]

module.exports = { networkConfig, developmentChains }
