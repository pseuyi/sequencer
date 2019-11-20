' ';

var webpack = require('webpack');

module.exports = {
  entry: './browser/app.jsx',
  output: {
    path: __dirname,
    publicPath: '/sequencer/',
    filename: './public/bundle.js'
  },
  externals: {
    three: "(function() { var th = Object.create(window.THREE); Object.defineProperty(th, '__esModule', {value: false}); return th })()",
    Tone: 'Tone'
  },
  context: __dirname,
  devtool: 'source-map',
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      {
        test: /jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'stage-2', 'stage-0']
        }
      }
    ]
  }
};
