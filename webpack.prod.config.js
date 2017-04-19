var webpack = require("webpack");
var path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');

var DEV = path.resolve(__dirname, "dev");
var OUTPUT = path.resolve(__dirname, "output");

var config = {
  entry: [DEV + "/app/index.js"],
  output: {
    path: OUTPUT,
    //x`publicPath: "/output/",
    filename: "index.js"
  },
  devServer: {
  	inline: true
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
  	}]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'dev/content/index-prod.html',
            inject: true
        }),
        // TODO: check why cross-env does not work with webpack commad
        webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production'),
        'process.env.PORT': JSON.stringify('4445')
      }
    ]
};
 
module.exports = config;
