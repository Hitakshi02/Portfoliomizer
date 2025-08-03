import axios from 'axios';

const CORS_PROXY = "https://corsproxy.io/?"; // simple public proxy

export async function fetchBalances(address) {
  const apiUrl = `${CORS_PROXY}https://api.1inch.dev/balance/v1.2/1/balances/${address}`;

  console.log("📤 Fetching balances for:", address);
  try {
    const response = await axios.get(apiUrl, {
      headers: { 
        Authorization: `Bearer ${process.env.REACT_APP_1INCH_API_KEY}` 
      },
    });
    console.log("✅ API Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Error fetching balances:", error.message);
    return null;
  }
}
