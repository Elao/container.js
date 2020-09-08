const meta = require('./package.json');
const { BannerPlugin } = require('webpack');

module.exports = {
  entry: './src/index.js',
  output: {
    path: __dirname,
    filename: 'container.js',
    library: 'containerjs',
    libraryTarget: 'umd',
    globalObject: 'this',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: { presets: ['@babel/preset-env'] }
        }
      }
    ]
  },
  plugins: [
    new BannerPlugin([
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
