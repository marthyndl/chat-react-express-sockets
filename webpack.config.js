const path = require('path');

module.exports = {
  entry: __dirname + '/src',
  output: {
    path: path.resolve(__dirname, '/'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  devtool:'source-maps',
  module:{
    loaders: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        query: {
          // presets are colection of plugins
          presets: ["es2015", "react"],
          plugins: ['transform-class-properties']
        }
      },
      {
        test: /\.(css|scss)$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ['file-loader']
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ['file-loader']
      }
    ]
  }
};
