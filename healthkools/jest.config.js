module.exports = {
  preset: 'react-native',
  setupFilesAfterEnv: ['./setupTests.js'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|react-native-vector-icons|@react-native))/',
  ],
  maxWorkers: 1,
  // collectCoverage: true,
  collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}', '!src/**/*.d.ts'],
};
