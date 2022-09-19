import axios from 'axios'
import { Page } from 'puppeteer'

export async function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export async function getElementText(page: Page, selector: string) {
  return await page.$eval(selector, el => el.innerText) as string
}

export async function getAPIPrice(asset: string, currency: string): Promise<number> {
  const requestUrl = `https://api.coinbase.com/v2/prices/${asset}-${currency}/spot`
  const response = await axios.get(requestUrl)

  return parseFloat(response.data.data.amount)
}

export function getPriceDifference(price: number, apiPrice: number): number {
  const absoluteDifference = Math.abs(price - apiPrice)
  const averagePrice = (price + apiPrice) / 2.0

  return absoluteDifference / averagePrice * 100
}