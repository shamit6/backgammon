var webpack = require("webpack");
var path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var combineLoaders = require("webpack-combine-loaders");

var DEV = path.resolve(__dirname, "dev");
var OUTPUT = path.resolve(__dirname, "output");

var config = {
  entry: [
    "webpack-hot-middleware/client",
     DEV + "/app/index.js"
     ],
  output: {
    path: OUTPUT,
    // publicPath: "/output/",
    filename: "index-app.js"
  },
  devServer: {
  	inline: true,
    port:4445
  },
  module:{
  	loaders: [
  	{
  		test: /\.jsx?$/,
  		exclude: /node_modules/,
  		loader: 'babel-loader',
  		query: {
  			presets: ['es2015','react','stage-2']
  		}
  	},
    { 
      test: /\.png$/, 
      loader: "file-loader" 
    },
    {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract(
        combineLoaders([{
          loader: 'css-loader',
          options: {
            modules: true,
            localIdentName: '[name]__[local]___[hash:base64:5]'
          }
        }]))
    }]
  },
  resolve: {
    extensions: ['.css','.js', '.jsx']
  },
  plugins: [
        new ExtractTextPlugin('styles-[hash].css'),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'dev/content/index-prod.html',
            inject: true
        }),
        // TODO: check why cross-env does not work with webpack commad
        new webpack.DefinePlugin({
          'process.env.NODE_ENV': JSON.stringify('production'),//,
         //  'process.env.HOSTNAME': JSON.stringify('localhost'),
           'process.env.PORT': 4445
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    ]
};
//process.traceDeprecation = true; 
module.exports = config;
