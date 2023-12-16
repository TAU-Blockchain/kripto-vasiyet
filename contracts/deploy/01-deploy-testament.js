const { network, ethers } = require("hardhat")
const { networkConfig, developmentChains } = require("../helper-hardhat-config")
const { verify } = require("../utils/verify")

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId = network.config.chainId

    const identity = networkConfig[chainId].identity
    const inheritableTokens = networkConfig[chainId].inheritableTokens
    const functionsRouter = networkConfig[chainId].functionsRouter
    const subscriptionId = networkConfig[chainId].subscriptionId
    const gasLimit = networkConfig[chainId].gasLimit
    const donId = networkConfig[chainId].donId

    const args = [
        identity,
        inheritableTokens,
        functionsRouter,
        subscriptionId,
        gasLimit,
        donId,
    ]

    console.log("Deploying NFT collection...")

    const testament = await deploy("Testament", {
        from: deployer,
        args: args,
        log: true,
        waitConfirmations: network.config.blockConfirmations || 1,
        gasLimit: 10000000,
    })

    if (
        !developmentChains.includes(network.name) &&
        process.env.ETHERSCAN_API_KEY
    ) {
        await verify(testament.address, args)
    }
    console.log("Token contract was deployed!")
}

module.exports.tags = ["all", "testament"]
