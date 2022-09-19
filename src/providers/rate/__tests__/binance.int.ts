import { test, describe, expect } from '@jest/globals'
import { BinanceAPIClient } from '../binance.provider'

const client = new BinanceAPIClient()
const tickers = ['BTCUAH', 'ETHUAH', 'USDTUAH']

describe('Testing Binance API Client', () => {

  test('if can get ticker price', async () => {
    for (const ticker of tickers) {
      const price = await client.getTickerPrice(ticker)

      expect(price).toEqual(expect.any(Number))
      expect(price).toBeGreaterThan(0)
    }
  })

  test('if throws error when ivalid ticker is provided', async () => {
    const invalidTicker = 'BTCRUSSIANRUBLE'

    const gotPrice = await client.getTickerPrice(invalidTicker)
      .then(() => true)
      .catch(() => false)

    expect(gotPrice).toBe(false)
  })
})