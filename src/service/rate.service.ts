import axios from 'axios'

export async function getRate() {
  
  const result = await axios.get('https://api.binance.com/api/v3/ticker/price?symbol=BTCUAH')
  
  return parseFloat(result.data.price).toFixed(2)
}