
const path = require('path')

module.exports = {
  entry: './js/presto.js',
  output: {
    filename: 'presto.js',
    path: path.resolve(__dirname, '../priv/static'),
    library: 'Presto',
    libraryTarget: 'umd',
    globalObject: 'this'
  },
  module: {
    rules: [
      {
        test: path.resolve(__dirname, './js/presto.js'),
        use: [{
          loader: 'expose-loader',
          options: 'Presto'
        }]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  plugins: []
}