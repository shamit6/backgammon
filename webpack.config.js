var webpack = require("webpack");
var path = require("path");
 
var DEV = path.resolve(__dirname, "dev");
var OUTPUT = path.resolve(__dirname, "output");

var config = {
  entry: [DEV + "/app/index.js"],
  output: {
    path: OUTPUT,
    publicPath: "http://localhost:8080/output/",
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
  }
};
 
module.exports = config;