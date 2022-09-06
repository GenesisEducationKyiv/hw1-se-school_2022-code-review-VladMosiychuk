import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { CryptoTicker } from '../common/enums/crypto.ticker'
import { BinanceAPIClient } from '../service/rate/rate.service'

export async function getRateHandler(req: Request, res: Response) {

  const rateProvider = new BinanceAPIClient()
  const price = await rateProvider.getTickerPrice(CryptoTicker.BTCUAH)
  const formattedPrice = price.toFixed(2)

  res.setHeader('Content-Type', 'application/json')
  return res.status(StatusCodes.OK).send(formattedPrice)
}