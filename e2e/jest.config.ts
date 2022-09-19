import type { Config } from 'jest'

const config: Config = {
  verbose: true,
  testTimeout: 600000,
  preset: 'jest-puppeteer',
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  testMatch: ['**.test.ts'],
  testPathIgnorePatterns: ['/node_modules/', 'build']
}

export default config