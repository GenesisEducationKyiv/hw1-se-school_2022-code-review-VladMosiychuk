import { CryptoTicker } from '../../common/enums/crypto.ticker'
import { BinanceAPIClient } from '../../providers/rate/binance.provider'

export async function getBTCUAHRate() {

  const rateProvider = new BinanceAPIClient()
  const price: number = await rateProvider.getTickerPrice(CryptoTicker.BTCUAH)

  return price
}