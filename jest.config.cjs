const {defaults} = require('jest-config');

module.exports = {
 ...defaults,
 preset: 'react-native',
 setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
 testEnvironment: 'jsdom',
 moduleFileExtensions: [...defaults.moduleFileExtensions, 'ts', 'tsx'],
 transformIgnorePatterns: [
    '/node_modules/(?!(react-native|@react-native|@react-navigation|@react-native\\/js-polyfills|<autre_module>))/',
  ],
};