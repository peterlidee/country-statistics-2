const webpack = require('webpack')
const { parsed: localEnv } = require('dotenv').config()

module.exports = {
  reactStrictMode: true,
  webpack(config) {
    config.plugins.push(new webpack.EnvironmentPlugin(localEnv))
    return config
  }
}