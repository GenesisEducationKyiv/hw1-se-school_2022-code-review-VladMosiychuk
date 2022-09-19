import { PuppeteerLaunchOptions } from 'puppeteer'

const options: PuppeteerLaunchOptions = {
  headless: true,
  args: ['--disable-infobars', '--window-size=1920,1080'],
  product: 'chrome'
}

export default options