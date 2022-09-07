export interface IRateProvider {
    getTickerPrice(ticker: string): Promise<number>
}