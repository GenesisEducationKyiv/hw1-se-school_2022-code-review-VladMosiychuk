const testAsset = 'BTC'
const testCurrency = 'UAH'
const typingDelayMs = 200
const COINBASE_URL = 'https://www.coinbase.com/'
const userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36'
const selectors = {
  root: '#root',
  main: {
    explore_nav: '[title="Explore"]'
  },
  explore: {
    assetsTable: '.cds-table-top40r1 tbody span[role="presentation"]',
    searchInput: '#searchInput',
    assetList: '#searchDropdownInput [data-testid="price-page-searchDropdown-assetslist"]',
    firstAssetName: '#searchDropdownInput li>div>div>:last-child'
  },
  asset: {
    currencySelector: '#asset-page-currency-selector',
    currencySelectorInput: 'input[data-testid="asset-page-currency-selector"]',
    firstCurrencyInSelectorList: 'ul[role="listbox"] :first-child',
    assetSummary: '[aria-label="Asset summary"]>:last-child span'
  }
}

export { 
  testAsset,
  testCurrency,
  typingDelayMs,
  COINBASE_URL,
  userAgent,
  selectors
}