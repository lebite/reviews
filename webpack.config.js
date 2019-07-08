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
        use: [{
          loader: 'style-loader',
        },
        {
          loader: 'css-loader',
          options: {
            modules: true,
            modules: {
              localIdentname: '[path][name]__[local]__[hash:base64:5]',
            },
          },
        },
        ],
      },
    ],
  },
  output: {
    filename: 'bundle.js',
    path: __dirname + '/client/dist',
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
  },
};
