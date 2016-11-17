'use strict';

var webpack = require('webpack');

module.exports = {
  entry: './browser/app.jsx',
  output: {
    path: __dirname,
    filename: './public/bundle.js'
  },
  externals: {
    three: "{default: window.THREE}",
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
        exclude: /(bower_components)/,
        loader: 'babel',
        query: {
          presets: ['react', 'es2015', 'stage-2', 'stage-0']
        }
      }
    ]
  }
};