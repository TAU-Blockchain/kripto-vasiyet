const { network, ethers } = require("hardhat")
const { networkConfig, developmentChains } = require("../helper-hardhat-config")
const { verify } = require("../utils/verify")

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId = network.config.chainId

    console.log("Deploying NFT collection...")

    const myToken = await deploy("MyToken", {
        from: deployer,
        args: [],
        log: true,
        waitConfirmations: network.config.blockConfirmations || 1,
        gasLimit: 10000000,
    })

    if (
        !developmentChains.includes(network.name) &&
        process.env.ETHERSCAN_API_KEY
    ) {
        await verify(myToken.address, [])
    }
    console.log("Token contract was deployed!")

    const myTokenContract = await ethers.getContract("MyToken", deployer)

    let tx = await myTokenContract.mintNft()
    await tx.wait(1)
    tx = await myTokenContract.mintNft()
    await tx.wait(1)

    let balance = await myTokenContract.balanceOf(deployer)
    console.log("Balance: ", balance.toString())

    console.log("Deploying ERC20...")

    const myERC20 = await deploy("MyERC20", {
        from: deployer,
        args: [],
        log: true,
        waitConfirmations: network.config.blockConfirmations || 1,
        gasLimit: 10000000,
    })

    if (
        !developmentChains.includes(network.name) &&
        process.env.ETHERSCAN_API_KEY
    ) {
        await verify(myERC20.address, [])
    }
    console.log("Token contract was deployed!")

    const myERC20Contract = await ethers.getContract("MyERC20", deployer)

    tx = await myERC20Contract.mintToken()
    await tx.wait(1)
    tx = await myERC20Contract.mintToken()
    await tx.wait(1)

    balance = await myERC20Contract.balanceOf(deployer)
    console.log("Balance: ", balance.toString())
}

module.exports.tags = ["all", "myToken"]
