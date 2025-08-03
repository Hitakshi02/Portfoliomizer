import React from 'react';
function BalanceDisplay({ balances }) {
  console.log("📊 Received balances prop:", balances);

  if (!balances || Object.keys(balances).length === 0) {
    return <p>No balances found. This wallet may be empty.</p>;
  }

  // Filter out zero balances
  const filtered = Object.entries(balances).filter(
    ([, value]) => parseFloat(value?.balance || value) > 0
  );

  if (filtered.length === 0) {
    return <p>All token balances are 0.</p>;
  }

  return (
    <div>
      <h3>Token Balances</h3>
      <ul>
        {filtered.map(([tokenAddress, value]) => (
          <li key={tokenAddress}>
            <strong>{value?.symbol || tokenAddress}</strong>:{" "}
            {value?.balance || value}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BalanceDisplay;
