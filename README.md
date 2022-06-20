# rei-GenesisProposalBadgesNFT Project


## Install
```shell
npm install
```
## Build
```shell
npm run build
```

## Test
```shell 
npm run test:nft
```
## Environment variables
- `PRIVATE_KEY`:Deployer private key
- `name`:Name of the contract
- `sympol`:Symbol of the contract
- `uri`:URI of the nft
- `nftAddress`:Address of the nft after deploy

## Scripts

**deploy**

Deploy the contract according to the environment variables.

**mint** 

Batch mint the nft to the WihteList.

### Deploy 

#### Deploy to Testnet
- run `cp .env.example .env` and edit the settings in`.env`
- run `npm run deploy -- --network reitestnet`

#### Deploy to Mainnet
- run `cp .env.example .env` and edit the settings in`.env`
- run `npm run deploy -- --network reimainnet`


You will get Address of the contract in the console, change the `nftAddress` in the environment variables.
### Mint

#### Mint to Testnet
- run `cp whitelist.example.txt whitelist.txt` and put your whitelist in `whitelist.txt`
- run `npm run mint -- --network reitestnet`
  
- #### Mint to Mainnet
- run `cp whitelist.example.txt whitelist.txt` and put your whitelist in `whitelist.txt`
- run `npm run mint -- --network reimainnet`