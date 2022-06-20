import { expect, assert } from "chai";
import { ethers } from "hardhat";

describe("NFT", function () {
  before(async function () {
    this.name = "name";
    this.symbol = "symbol";
    this.uri = "uri";
    this.signers = await ethers.getSigners();
    this.deployer = this.signers[0];
    this.whitelist = [];
    for (let i = 1; i <= 12; i++) {
      this.whitelist.push(this.signers[i]);
    }
    const reiNFT = await ethers.getContractFactory(
      "ReiGenesisProposalBadgesNFT",
      this.deployer
    );
    this.nft = await reiNFT.deploy(this.name, this.symbol, this.uri);
    this.nftInstance = await this.nft.deployed();
  });

  it("should correctly init", async function () {
    expect(await this.nftInstance.name()).be.equal(this.name);
    expect(await this.nftInstance.symbol()).be.equal(this.symbol);
    expect(await this.nftInstance.tokenURI(1)).be.equal(this.uri);
  });

  it("should mint correctly", async function () {
    expect(await this.nftInstance.balanceOf(this.deployer.address)).to.equal(
      "0"
    );
    await this.nftInstance.mint(this.deployer.address);
    expect(await this.nftInstance.balanceOf(this.deployer.address)).to.equal(
      "1"
    );
  });

  it("should batchMint correctly", async function () {
    const whitelistAddress: any = [];
    await Promise.all(
      this.whitelist.map(async (account: any) => {
        expect(await this.nftInstance.balanceOf(account.address)).to.equal("0");
        whitelistAddress.push(account.address);
      })
    );
    await this.nftInstance.batchMint(whitelistAddress);
    await Promise.all(
      whitelistAddress.map(async (address: any) => {
        expect(await this.nftInstance.balanceOf(address)).to.equal("1");
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
