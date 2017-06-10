const webpack = require('webpack');
const meta = require('./package.json');

module.exports = {
  entry: './src/Container.js',
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
    ]
  },
  output: {
    path: __dirname + '/dist',
    filename: 'container.js',
    library: 'Container',
    libraryTarget: 'umd',
  },
  devServer: {
    contentBase: './dist',
  },
  devtool: 'source-map',
  plugins: [
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.BannerPlugin([
      `${meta.name} - ${meta.version}`,
      `${meta.homepage}`,
      `${meta.copyright}`,
    ].join('\n'))
  ]
};
