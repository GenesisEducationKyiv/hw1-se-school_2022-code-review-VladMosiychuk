import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { getBTCUAHRate } from '../service/rate/rate.service'

export async function getRateHandler(req: Request, res: Response) {

  const price = await getBTCUAHRate()
  const formattedPrice = price.toFixed(2)

  res.setHeader('Content-Type', 'application/json')
  return res.status(StatusCodes.OK).send(formattedPrice)
}