const { ethers, getNamedAccounts, network } = require("hardhat")
const { networkConfig } = require("../helper-hardhat-config")

async function main() {
    const chainId = network.config.chainId
    const deployer = (await getNamedAccounts()).deployer
    const heir1 = (await getNamedAccounts()).heir1
    // const share1 = networkConfig[chainId].share1
    const heir2 = (await getNamedAccounts()).heir2
    // const share2 = networkConfig[chainId].share2
    const testament = await ethers.getContract("Testament", deployer)

    const heirs = [heir1]

    const tx = await testament.removeHeir(heirs)
    await tx.wait(1)

    const totalShares = await testament.totalShares()
    console.log("Total shares: ", totalShares.toString())
    const heir1Address = await testament.getHeir("0")
    const heir1Share = await testament.getShare("0")
    console.log(`Heir 1: ${heir1Address} | Share: ${heir1Share}`)
    const share1Info = await testament.shares(heir2)
    console.log("Share of heir 1: ", share1Info.toString())
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })