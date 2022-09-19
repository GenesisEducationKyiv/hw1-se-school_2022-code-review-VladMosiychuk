import type { Config } from 'jest'

const config: Config = {
  roots: ['src'],
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    '@exmpl/(.*)': '<rootDir>/src/$1'
  }
}

export default config