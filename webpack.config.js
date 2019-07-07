const path = require('path');

module.exports = {
  mode: 'development',
  watch: 'true',
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
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, '/client/dist'),
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
  },
};
