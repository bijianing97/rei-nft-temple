import { expect, assert } from "chai";
import { ethers } from "hardhat";

describe("NFT", function () {
  before(async function () {
    this.uri = "uri";
    this.signers = await ethers.getSigners();
    this.deployer = this.signers[0];
    this.whitelist = [];
    for (let i = 1; i <= 12; i++) {
      this.whitelist.push(this.signers[i]);
    }
    const REINFT = await ethers.getContractFactory(
      "ReiGenesisProposalBadgesNFT",
      this.deployer
    );
    this.nft = await REINFT.deploy(this.uri);
    this.nftInstance = await this.nft.deployed();
  });

  it("should mint correctly", async function () {
    expect(await this.nftInstance.balanceOf(this.deployer.address, 0)).to.equal(
      "0"
    );
    await this.nftInstance.mint(0, this.deployer.address);
    expect(await this.nftInstance.balanceOf(this.deployer.address, 0)).to.equal(
      "1"
    );
  });

  it("should batchMint correctly", async function () {
    const whitelistAddress: any = [];
    await Promise.all(
      this.whitelist.map(async (account: any) => {
        expect(await this.nftInstance.balanceOf(account.address, 0)).to.equal(
          "0"
        );
        whitelistAddress.push(account.address);
      })
    );
    await this.nftInstance.batchMint(0, whitelistAddress);
    await Promise.all(
      whitelistAddress.map(async (address: any) => {
        expect(await this.nftInstance.balanceOf(address, 0)).to.equal("1");
      })
    );
  });

  it("should mint and batchMint failed", async function () {
    try {
      await this.nftInstance
        .connect(this.signers[1])
        .mint(this.deployer.address);
      assert.fail("should't succeed");
    } catch (err) {}

    try {
      await this.nftInstance
        .connect(this.signers[1])
        .batchMint([this.deployer.address]);
      assert.fail("should't succeed");
    } catch (err) {}
  });
});
