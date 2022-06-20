import { ethers } from "hardhat";

async function main() {
  const owner = (await ethers.getSigners())[0].address;
  const chainID = (await ethers.provider.getNetwork()).chainId;
  console.log("owner:", owner, "chainId:", chainID);
  const NFT = await ethers.getContractFactory("ReiGenesisProposalBadgesNFT");
  const nft = await NFT.deploy(
    process.env.name!,
    process.env.symbol!,
    process.env.uri!
  );

  const nftContract = await nft.deployed();
  console.log(
    "ReiGenesisProposalBadgesNFT depolyed at address:",
    nftContract.address
  );
  console.log("nft name is:", await nftContract.name());
  console.log("nft symbol is:", await nftContract.symbol());
  console.log("nft token uri:", await nftContract.tokenURI(1));
}

main().catch((error) => {
  console.log(error);
  process.exitCode = 1;
});
