const CompressionPlugin = require('compression-webpack-plugin');
const BrotliPlugin = require('brotli-webpack-plugin');
const path = require('path')

module.exports = {
  plugins: [
    new CompressionPlugin({
      filename: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0.8
    }),
    new BrotliPlugin({
      filename: '[path].br[query]',
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0.8
    })
  ],
  mode: 'production',
  entry: './client/src/index.jsx',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.css$/,
        use: [{
          loader: 'style-loader',
        },
        {
          loader: 'css-loader',
          options: {
            modules: true,
          },
        },
        ],
      },
    ],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './client/dist'),
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
  },
};
