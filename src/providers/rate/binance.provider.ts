import axios from 'axios'
import { IRateProvider } from './rate.provider'

class BinanceAPIClient implements IRateProvider {

  private static get API_BASE(): string {
    return 'https://api.binance.com/api/v3'
  }

  async getTickerPrice(ticker: string): Promise<number> {

    const requestUrl = `${BinanceAPIClient.API_BASE}/ticker/price?symbol=${ticker}`
    const response = await axios.get(requestUrl)

    return parseFloat(response.data.price)
  }
}

export { BinanceAPIClient }