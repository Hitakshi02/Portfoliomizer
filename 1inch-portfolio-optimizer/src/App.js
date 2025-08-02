import React, { useState } from 'react';
import { BrowserProvider } from 'ethers';

function App() {
  const [walletAddress, setWalletAddress] = useState('');

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const provider = new BrowserProvider(window.ethereum); // Ethers v6
        const signer = await provider.getSigner();
        const address = await signer.getAddress();
        setWalletAddress(address);
      } catch (err) {
        console.error('Wallet connection failed:', err);
      }
    } else {
      alert('MetaMask is not installed!');
    }
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <h2>🦊 1inch Portfolio Optimizer</h2>
      <button onClick={connectWallet}>Connect Wallet</button>
      {walletAddress && (
        <p>
          Connected Wallet: <strong>{walletAddress}</strong>
        </p>
      )}
    </div>
  );
}

export default App;
