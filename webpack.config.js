const webpack = require('webpack');
const meta = require('./package.json');

module.exports = {
  mode: process.env.NODE_ENV,
  devtool: process.env.NODE_ENV === 'production' ? undefined : 'source-map',
  entry: './src/index.js',
  output: {
    path: __dirname + '/dist',
    filename: 'container.js',
    library: 'containerjs',
    libraryTarget: 'umd',
  },
  devServer: {
    contentBase: './dist',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env'],
        }
      },
    ]
  },
  plugins: [
    //new webpack.optimize.UglifyJsPlugin(),
    new webpack.BannerPlugin([
      `${meta.name} - ${meta.version}`,
      `${meta.homepage}`,
      `${meta.copyright}`,
    ].join('\n'))
  ],
  resolve: {
    alias: {
      'container': `${__dirname}/`,
    }
  }
};
