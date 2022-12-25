import { BigNumber, ethers } from "ethers";

const swthTokenContractAddress: string =
    "0xc0ecb8499d8da2771abcbf4091db7f65158f1468";

// Taken from https://docs.bscscan.com/misc-tools-and-utilities/public-rpc-nodes
const bscRpcNode = "https://bsc-dataseed1.binance.org/";

const provider = new ethers.providers.JsonRpcProvider(bscRpcNode);

const addresses: string[] = [
    "0xb5d4f343412dc8efb6ff599d790074d0f1e8d430",
    "0x0020c5222a24e4a96b720c06b803fb8d34adc0af",
    "0xd1d8b2aae2ebb2acf013b803bc3c24ca1303a392",
];

/** 
 * Taken from https://docs.ethers.org/v5/single-page/#/v5/api/contract/example/
 * - balanceOf(address owner): Returns the balance of owner for this ERC-20 token.
 * - decimals(): Returns the number of decimal places used by this ERC-20 token.
 */
const abi = [
    "function balanceOf(address owner) view returns (uint256)",
    "function decimals() view returns (uint8)",
];

const contract = new ethers.Contract(swthTokenContractAddress, abi, provider);

/**
 * Returns the String representing the balance amount in the given format.
 * @param balance The BigNumber representing the amount
 * @param decimals The number of decimal places used
 * @returns The String output of the balance amount
 */
function convertBalance(balance: BigNumber, decimals: number) {
    const formattedBalance = ethers.utils.formatUnits(balance, decimals);
    return ethers.utils.commify(formattedBalance);
}

/**
 * Prints the balance amount for each of the addresses to look up.
 */
async function retrieveHolders() {
    const decimals = await contract.decimals();
    for (const address of addresses) {
        const balance = await contract.balanceOf(address);
        const balanceOutput = convertBalance(balance, decimals);
        console.log(`${address} ${balanceOutput}`);
    }
}

retrieveHolders();
