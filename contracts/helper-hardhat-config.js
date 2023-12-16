const { ethers } = require("hardhat")

const networkConfig = {
    31337: {
        name: "localhost",
        share1: "30",
        share2: "60",
        functionsRouter: "0xb83E47C2bC239B3bf370bc41e1459A34b41238D0",
        subscriptionId: 1,
        gasLimit: 1000000,
        donId: "0x66756e2d657468657265756d2d7365706f6c69612d3100000000000000000000",
    },
    11155111: {
        name: "sepolia",
        functionsRouter: "0xb83E47C2bC239B3bf370bc41e1459A34b41238D0",
        subscriptionId: "",
        gasLimit: "300000",
        donId: "0x66756e2d657468657265756d2d7365706f6c69612d3100000000000000000000",
    },
}

const developmentChains = ["hardhat", "localhost"]

module.exports = { networkConfig, developmentChains }
