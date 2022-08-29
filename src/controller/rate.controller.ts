import { Request, Response } from 'express'
import { getRate } from '../service/rate.service'

export async function getRateHandler(req: Request, res: Response) {

  // Fetch current rate
  const price = await getRate()

  // Send a response
  res.setHeader('Content-Type', 'application/json')
  return res.send(price)
}