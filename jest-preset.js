module.exports = {
    presets: [
      "@babel/preset-env",
      "@babel/preset-react"
    ]
  };
module.exports = {
  // ...

  setupFilesAfterEnv: ['jest-localstorage-mock'],
  transform: {
    '^.+\.jsx?$': 'babel-jest',
  },
 };