module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src', '<rootDir>/test'],
  testMatch: [
    '**/__tests__/**/*.+(ts|tsx|js)',
    '**/?(*.)+(spec|test).+(ts|tsx|js)',
  ],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  moduleNameMapping: {
    '^src/(.*)$': '<rootDir>/src/$1',
  },
  collectCoverageFrom: ['src/**/*.(t|j)s'],
  coverageDirectory: '../coverage',
  moduleFileExtensions: ['ts', 'js', 'json'],
};
