import React, { useState } from 'react';
import { BrowserProvider } from 'ethers';
import { fetchBalances } from './api/balance';
import { connectWallet } from './api/wallet';
import BalanceDisplay from './components/balancedisplay';

alert("🚨 App.js is mounted!");


function App() {
  console.log("🔧 Initializing 1inch Portfolio Optimizer...");
  const TEST_WALLET = "0X000";

  const [walletAddress, setWalletAddress] = useState('');
  const [balances, setBalances] = useState(null);

  const handleConnect = async () => {
   try {
    const { address } = await connectWallet();
    setWalletAddress(address);
    const balanceData = await fetchBalances(address);
    setBalances(balanceData);
  } catch (error) {
    console.error("Connection failed", error);
  }
};

const handleUseTestWallet = async () => {
  try {
    console.log("Using test wallet");
    setWalletAddress(TEST_WALLET);
    const balanceData = await fetchBalances(TEST_WALLET);
    console.log("✅ Balances fetched:", balanceData);
   
    setBalances(balanceData);
  } catch (error) {
    console.error("Test wallet fetch failed", error);
  }
};

const disconnectWallet = () => {
  setWalletAddress('');
  setBalances(null);
};


  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <h2>🦊 1inch Portfolio Optimizer</h2>

      {!walletAddress ? (
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
        <button onClick={handleConnect}>Connect Wallet</button>{' '}
        <button onClick={handleUseTestWallet}>🧪 Use Test Wallet</button>
        <button onClick={() => console.log("🚀 Clicked test button")}>Click Me</button>

        </div>
      ) : (
        <>
          <p>
            Wallet Connected: <strong>{walletAddress}</strong>
          </p>
          <button onClick={disconnectWallet}>🔌 Disconnect</button>
          <BalanceDisplay balances={balances} />
        </>
      )}
    </div>
  );
}

export default App;
