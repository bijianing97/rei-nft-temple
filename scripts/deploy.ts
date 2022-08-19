import { ethers } from "hardhat";

async function main() {
  const owner = (await ethers.getSigners())[0].address;
  const chainID = (await ethers.provider.getNetwork()).chainId;
  console.log("owner:", owner, "chainId:", chainID);
  const NFT = await ethers.getContractFactory("KoreanCommunityNFT");
  const nft = await NFT.deploy(process.env.uri!);

  const nftContract = await nft.deployed();
  console.log("KoreanCommunityNFT depolyed at address:", nftContract.address);
}

main().catch((error) => {
  console.log(error);
  process.exitCode = 1;
});
