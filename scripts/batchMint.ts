import fs from "fs";
import path from "path";
import { ethers } from "hardhat";

async function main() {
  const deployer = (await ethers.getSigners())[0].address;
  const chainId = (await ethers.provider.getNetwork()).chainId;
  const whitelistPath = path.join(__dirname, "../whitelist.txt");
  if (!fs.existsSync(whitelistPath)) {
    throw new Error("whitelist.txt does not exsit");
  }
  const whitelist = fs
    .readFileSync(whitelistPath, "utf-8")
    .split("\n")
    .map((address) => {
      address = address.trim();
      if (!ethers.utils.isAddress(address)) {
        throw new Error("invalid address: " + address);
      }
      return address;
    });
  console.log(
    "deployer:",
    deployer,
    "whitelist size:",
    whitelist.length,
    "chainId:",
    chainId,
    "\n"
  );

  const nft = await ethers.getContractFactory("ReiFansNFT");
  const nftInstance = nft.attach(process.env.nftAddress!);
  for (let i = 0; i < Math.ceil(whitelist.length / 10); i++) {
    const users = whitelist.slice(i * 10, i * 10 + 10);
    const tx = await nftInstance.batchMint(0, users);
    await tx.wait();
    console.log("mint to:", users);
  }
  console.log("mint finished");

  for (let i = 0; i < whitelist.length; i++) {
    const number = await nftInstance.balanceOf(whitelist[i], 0);
    console.log(`${whitelist[i]} has ${number} nft`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
