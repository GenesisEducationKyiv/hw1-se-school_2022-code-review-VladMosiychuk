import { Request, Response } from 'express'
import { getRate } from '../service/rate.service'

export async function getRateHandler(req: Request, res: Response) {

  const price = await getRate()

  res.setHeader('Content-Type', 'application/json')
  return res.send(price)
}