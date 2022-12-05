const { AccountId, PrivateKey } = require("@hashgraph/sdk");
const { hethers } = require("@hashgraph/hethers");

// owner 
const signerId = AccountId.fromString("0.0.48939753");
const signerKey = PrivateKey.fromString("e47ab8a2ef52dfc010dc74a61dd89b3e0f44ecde60ac949c5e032b09f35ffc6a"); 

const aliceId = AccountId.fromString("0.0.48941746");


const walletAddress = hethers.utils.getAddressFromAccount(signerId);
const aliceAddress = hethers.utils.getAddressFromAccount(aliceId);

const contractadd = '0000000000000000000000000000000002eae9df';
const ABI = [
	{
		"inputs": [],
		"name": "getName",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "pure",
		"type": "function"
	}
];


async function main() {
	const provider = hethers.providers.getDefaultProvider("testnet");

	const eoaAccount = {
		account: signerId,
		privateKey: `0x${signerKey.toStringRaw()}`, 
	};
	const wallet = new hethers.Wallet(eoaAccount, provider);
	console.log(`\n- Alice's address: ${aliceAddress}`);
	console.log(`\n- Wallet address: ${wallet.address}`);
	console.log(`\n- Wallet public key: ${wallet.publicKey}`);

	const balance = await wallet.getBalance(walletAddress);
	console.log(`\n- Wallet address balance: ${hethers.utils.formatHbar(balance.toString())} hbar`);




	console.log(`\n- INTERACT WITH THE DEPLOYED CONTRACT`);

		const contract =  new hethers.Contract( contractadd , ABI , provider )
		let c = contract.connect(wallet)
		console.log(await c.getName({gasLimit: 500000}))
		
	
	
}
main();
