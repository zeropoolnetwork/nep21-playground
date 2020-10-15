NEP21 token example
==============


This smart contract providing NEP21 token.


## Prerequisite
Ensure `near-shell` is installed by running:

```
near --version
```

If needed, install `near-shell`:

```
npm install near-shell -g
```


## Building this contract
To make the build process compatible with multiple operating systems, the build process exists as a script in `package.json`.
There are a number of special flags used to compile the smart contract into the wasm file.
Run this command to build and place the wasm file in the `res` directory:
```bash
npm run build
```

**Note**: Instead of `npm`, users of [yarn](https://yarnpkg.com) may run:
```bash
yarn build
```

## Using this contract

### Deploy to local net
Build and deploy this smart contract to a development account. This development account will be created automatically and is not intended to be permanent. Please see the "Standard deploy" section for creating a more personalized account to deploy to.

Fill `.env` with the following data

```bash
DEPLOYER_ACCOUNT=test1.node0
DEPLOYER_PRIVATE_KEY=ed25519:....
NODE_URL=http://neardevnode.zeropool.network:3030/
NETWORK_ID=default
WASM_FILE=res/nep21_token.wasm

```

and run

```bash
node deploy.js
```

