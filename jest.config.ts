import type { Config } from 'jest';

const config: Config = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  moduleDirectories: ['node_modules', 'src'],
  testMatch: ['**/+(*.)spec.+(ts)'],
  coverageReporters: ['html', 'text-summary'],
};

export default config;
