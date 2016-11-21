'use strict';

var webpack = require('webpack');

module.exports = {
  entry: './browser/app.jsx',
  output: {
    path: __dirname,
    filename: './public/bundle.js'
  },
  externals: {
    three: "(function() { var th = Object.create(window.THREE); Object.defineProperty(th, '__esModule', {value: false}); return th })()",
  },
  context: __dirname,
  devtool: 'source-map',
  resolve: {
    extensions: ['', '.js', '.jsx'], 
    root: __dirname,
    modulesDirectories : ["/browser/tone"]
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