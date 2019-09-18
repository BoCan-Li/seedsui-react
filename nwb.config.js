var path = require('path')

module.exports = {
  type: 'react-component',
  npm: {
    esModules: true,
    umd: {
      global: 'UMD',
      externals: {
        react: 'React'
      }
    }
  },
  webpack: {
    rules: {
      less: {
        data: '@import "_variables"',
        includePaths: [path.resolve('src/index.js')]
      }
    },
    autoprefixer: '> 1%, last 2 versions, Firefox ESR, ios >= 8',
  }
}
