import axios from 'axios'
import config from '../config'

export async function getRate() {
  
  const result = await axios.get(config.BINANCE_API_URL)
  
  return parseFloat(result.data.price).toFixed(2)
}