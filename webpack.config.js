var webpack = require("webpack");
var path = require("path");
 
var DEV = path.resolve(__dirname, "dev");
var OUTPUT = path.resolve(__dirname, "output");

var config = {
  entry: [DEV + "/server/server.js", DEV + "/app/index.js"],
  output: {
    path: OUTPUT,
    publicPath: "/output/",
    filename: "index.js"
  },
  devServer: {
  	inline: true,
  	port: 3333
  },
  module:{
  	loaders: [
  	{
  		test: /\.jsx?$/,
  		exclude: /node_modules/,
  		loader: 'babel-loader',
  		query: {
  			presets: ['es2015','react']
  		}
  	}]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  }
};
 
module.exports = config;