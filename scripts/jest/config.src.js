module.exports = {
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/index.ts',
    '!src/**/*.spec.{ts,tsx}',
    '!src/**/*.stories.{ts,tsx}'
  ],
  coverageReporters: ['json', 'json-summary', 'lcov', 'text', 'clover'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json'],
  preset: 'ts-jest',
  rootDir: process.cwd(),
  roots: ['<rootDir>/src'],
  setupFilesAfterEnv: ['<rootDir>/scripts/jest/setupJest.ts'],
  testMatch: ['<rootDir>/src/**/*.spec.ts?(x)'],
  transform: { '^.+\\.(js|tsx?)$': 'ts-jest' }
}
