import Web3 from "web3";
import ABI from "./ABI.json";

export async function connectContract() {
    console.log(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS);

    if (!window.ethereum) throw new Error("Sem MetaMask instalada");

    const web3 = new Web3(window.ethereum);
    const accounts = await web3.eth.requestAccounts();

    if (!accounts || !accounts.length) throw new Error("Carteira não permitida");


    return new web3.eth.Contract(ABI, process.env.NEXT_PUBLIC_CONTRACT_ADDRESS, { from: accounts[0] });
}

export async function addLink({ url, linkId, feeInWei }: any): Promise<any> {
    await switchToBNBTestnet()
    const contract = await connectContract();
    return contract.methods.addLink(url, linkId, feeInWei).send();
}

export async function getLink(linkId: any): Promise<any> {
    await switchToBNBTestnet()
    const contract = await connectContract();
    return contract.methods.getLink(linkId).call();
}

export async function payLink(linkId: any, valueInWei: any): Promise<any> {
    await switchToBNBTestnet()
    const contract = await connectContract();
    return contract.methods.payLink(linkId).send({
        value: valueInWei
    });
}


async function switchToBNBTestnet() {
    if (!window.ethereum) throw new Error("MetaMask não encontrada");

    try {
        await window.ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: "0x61" }], // 97 decimal
        });
    } catch (error: any) {
        // Se a rede não estiver adicionada, adiciona

        if (error.code === 4902) {
            await window.ethereum.request({
                method: "wallet_addEthereumChain",
                params: [
                    {
                        chainId: "0x61",
                        chainName: "BNB Smart Chain Testnet",
                        rpcUrls: ["https://data-seed-prebsc-1-s1.binance.org:8545/"],
                        nativeCurrency: {
                            name: "BNB",
                            symbol: "TBNB",
                            decimals: 18,
                        },
                        blockExplorerUrls: ["https://testnet.bscscan.com"],
                    },
                ],
            });
        } else {
            throw error;
        }
    }
}

async function switchToPolygonAmoyTestnet() {
    if (!window.ethereum) throw new Error("MetaMask não encontrada");

    try {
        await window.ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: "0x13882" }], // 80002 decimal
        });
    } catch (error: any) {
        if (error.code === 4902) {
            await window.ethereum.request({
                method: "wallet_addEthereumChain",
                params: [
                    {
                        chainId: "0x13882", // 80002 decimal
                        chainName: "Polygon Amoy Testnet",
                        rpcUrls: ["https://rpc-amoy.polygon.technology/"],
                        nativeCurrency: {
                            name: "MATIC",
                            symbol: "MATIC",
                            decimals: 18,
                        },
                        blockExplorerUrls: ["https://www.oklink.com/amoy"],
                    },
                ],
            });
        } else {
            throw error;
        }
    }
}