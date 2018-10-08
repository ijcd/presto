const path = require('path')

module.exports = {
  entry: './js/presto.js',
  output: {
    filename: 'presto.js',
    path: path.resolve(__dirname, '../priv/static'),
    library: 'Presto',
    libraryTarget: 'umd'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  plugins: [
    // // expose $ and jQuery to global scope.
    // new webpack.ProvidePlugin({
    //   $: 'cash',
    //   // cash: 'cash'
    // })
  ]
}