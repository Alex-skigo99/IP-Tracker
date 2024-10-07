import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['<rootDir>/setupTests.ts'],  // Setup test file
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],     // File extensions for modules
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',                       // Transform TypeScript files using ts-jest
  },
  moduleNameMapper: {
    '\\.(gif|ttf|eot|svg|png)$': '<rootDir>/__ mocks __/fileMock.js',
    '\\.(css|less|scss)$': 'identity-obj-proxy',
  },
};

export default config;