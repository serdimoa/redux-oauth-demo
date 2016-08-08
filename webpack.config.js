global.Promise         = require('bluebird');

var webpack            = require('webpack');
var path               = require('path');


var plugins = [
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development')
    }
  }),
  new webpack.optimize.DedupePlugin(),
  new webpack.optimize.OccurenceOrderPlugin()
];

module.exports = {
  entry: ['babel-polyfill', './src/client.js'],
  debug: process.env.NODE_ENV !== 'production',
  resolve: {
    root:               path.join(__dirname, 'src'),
    modulesDirectories: ['node_modules'],
    extensions:         ['', '.js', '.jsx']
  },
  plugins,
  output: {
    path: `${__dirname}/public`,
    filename: 'bundle.js',
    publicPath: '/public'
  },
  module: {
    loaders: [
      { test: /\.jsx?$/, loader: 'babel', exclude: [/node_modules/, /public/] }
    ]
  },
  devtool: process.env.NODE_ENV !== 'production' ? 'source-map' : null,
  devServer: {
    headers: { 'Access-Control-Allow-Origin': '*' }
  }
};


