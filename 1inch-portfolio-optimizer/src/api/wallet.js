import { BrowserProvider } from 'ethers';

export async function connectWallet() {
  if (window.ethereum) {
    try {
      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      return { provider, signer, address };
    } catch (err) {
      console.error("Wallet connection failed:", err);
      throw err;
    }
  } else {
    alert("MetaMask is not installed!");
    throw new Error("MetaMask not installed");
  }
}
