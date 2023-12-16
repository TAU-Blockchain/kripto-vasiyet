const { ethers, getNamedAccounts, network } = require("hardhat")
const { networkConfig } = require("../helper-hardhat-config")

async function main() {
    const chainId = network.config.chainId
    const deployer = (await getNamedAccounts()).deployer
    const heir1 = (await getNamedAccounts()).heir1
    const testament = await ethers.getContract("Testament", deployer)
    const tokenContract = networkConfig[chainId][tokenContract]

    const tx = await testament.removeHeirForERC721(tokenContract, tokenId)
    await tx.wait(1)

    const heir1Address = await testament.getHeirForERC721("0")
    const heir1Nft = await testament.getNftForERC721("0")
    const heir1TokenId = await testament.getTokenIdForERC721("0")
    console.log(
        `Heir 1: ${heir1Address} | Nft: ${heir1Nft} | Token Id: ${heir1TokenId}`
    )
    const inheritance1Info = await testament.erc721Heirs(heir1, tokenContract)
    console.log("Inheritance of heir 1: ", inheritance1Info.toString())
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
