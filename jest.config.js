export default {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  testMatch: [
    '<rootDir>/src/**/__tests__/**/*.(js|jsx)',
    '<rootDir>/src/**/?(*.)(test|spec).(js|jsx)'
  ],
  collectCoverageFrom: [
    'src/**/*.(js|jsx)',
    '!src/main.jsx',
    '!src/**/*.stories.*',
    '!src/api/*',
    '!**/node_modules/**'
  ],
  globals: {
    TextEncoder: TextEncoder,
    TextDecoder: TextDecoder,
  }
};