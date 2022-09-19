import puppeteer from 'puppeteer-extra'
import { Browser, Page } from 'puppeteer'
import StealthPlugin from 'puppeteer-extra-plugin-stealth'
import options from '../launch-config'
import {
  delay,
  getElementText,
  getAPIPrice,
  getPriceDifference
} from './coinbase.utils'
import {
  testAsset,
  testCurrency,
  typingDelayMs,
  COINBASE_URL,
  userAgent,
  selectors
} from './coinbase.options'

puppeteer.use(StealthPlugin())

describe('Explore and asset search testing', () => {
  let browser: Browser
  let page: Page

  beforeAll(async () => {
    browser = await puppeteer.launch(options)
    page = await browser.newPage()

    await page.setUserAgent(userAgent)
    await page.setJavaScriptEnabled(true)
  })

  afterEach(async () => {
    await delay(5000)
  })

  afterAll(async () => {
    await page.close()
    await browser.close()
  })

  test('Can visit main page', async () => {
    await page.goto(COINBASE_URL)
    await page.waitForSelector(selectors.main.explore_nav)

    const title = await page.title()

    expect(title).toContain('Coinbase')
  })

  test('Can navigate to Explore Page', async () => {
    await page.click(selectors.main.explore_nav)
    await page.waitForSelector(selectors.explore.searchInput)

    const explorePageUrl = page.url()

    expect(explorePageUrl).toContain('/explore')
  })

  test('Explore asset search works', async () => {
    await page.type(selectors.explore.searchInput, testAsset, { delay: typingDelayMs })
    await page.waitForSelector(selectors.explore.assetList)

    const foundAssetName = await getElementText(page, selectors.explore.firstAssetName)

    expect(testAsset).toBe(foundAssetName)
  })

  test('Can open Asset Page', async () => {
    await page.click(selectors.explore.firstAssetName)
    const assetPageTarget = await browser.waitForTarget(target => target.opener() === page.target())
    const assetPage = await assetPageTarget.page()
    if (!assetPage)
      throw new Error('Unable to open Asset Page')
    page = assetPage

    await page.bringToFront()
    await page.waitForSelector(selectors.root)
    const assetPageTitle = await page.title()

    expect(assetPageTitle).toContain(testAsset)
  })

  test('Currency selector on Asset Page works', async () => {
    await page.click(selectors.asset.currencySelector)
    await page.type(selectors.asset.currencySelectorInput, testCurrency, { delay: typingDelayMs })
    await page.waitForSelector(selectors.asset.firstCurrencyInSelectorList)
    await page.click(selectors.asset.firstCurrencyInSelectorList)

    const selectedCurrency = await getElementText(page, selectors.asset.currencySelector)

    expect(selectedCurrency).toContain(testCurrency)
  })

  test('Provides valid asset price', async () => {

    const assetSummary = await getElementText(page, selectors.asset.assetSummary)
    const clearPrice = assetSummary.replace(/[^\d\.]+/g, '')
    const price = parseFloat(clearPrice)
    const apiPrice = await getAPIPrice(testAsset, testCurrency)
    const priceDifference = getPriceDifference(price, apiPrice)

    expect(priceDifference).toBeLessThan(1.0)
  })
})