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
      { test: /\.json$/, loader: 'json-loader' },
    	{
    		test: /\.jsx?$/,
    		exclude: /node_modules/,
    		loader: 'babel-loader',
    		query: { presets: ['es2015','react','stage-2']}
    	},
      {
          test: /\.png$/,
          loader: "file-loader"
      },
      {
        test: /\.css$/,
        loader: combineLoaders([
          { loader: 'style-loader' }
          ,
          {
            loader: 'css-loader',
            query: { modules: true, localIdentName: '[name]__[local]___[hash:base64:5]' }
          }
        ])
      }
    ]
  },
  resolve: {
    extensions: ['.css','.js','.jsx','.json']
  }
};

module.exports = config;