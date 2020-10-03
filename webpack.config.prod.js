var webpack = require("webpack");
var path = require("path");

var DEV = path.resolve(__dirname, "dev");
var OUTPUT = path.resolve(__dirname, "output");

var config = {
  entry: {
    app: [DEV + "/app/index.js"],
    html: DEV + "/content/index.html",
    vendor: ["react", "react-dom", "react-router"],
  },
  output: {
    path: OUTPUT,
    publicPath: "/",
    filename: "[name].js",
  },
  devServer: {
    inline: true,
    port: 4445,
    hot: true,
    // contentBase: OUTPUT,
    // historyApiFallback: {
    //   index: OUTPUT + "/index.html"
    // },
    // historyApiFallback: true
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        loader: ["file-loader?name=[name].[ext]"],
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: "babel-loader?cacheDirectory=true",
      },
      {
        test: /\.css$/,
        exclude: path.join(__dirname, "dev"),
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
          },
        ],
      },
      {
        test: /\.css$/,
        include: path.join(__dirname, "dev"),
        use: [
          "style-loader",
          "css-loader?modules&sourceMap&importLoaders=1&localIdentName=[local]___[hash:base64:5]",
          "postcss-loader",
        ],
      },
      {
        test: /\.svg(\?.*)?$/,
        loader:
          "url-loader?limit=10000&mimetype=image/svg+xml&name=images/[name].[ext]",
        // include: path.join(__dirname, 'client', 'assets'),
      },
      {
        test: /\.png$/,
        loader:
          "url-loader?limit=8192&mimetype=image/png&name=images/[name].[ext]",
        // include: path.join(__dirname, 'client', 'assets'),
      },
      {
        test: /\.gif$/,
        loader:
          "url-loader?limit=8192&mimetype=image/gif&name=images/[name].[ext]",
        // include: path.join(__dirname, 'client', 'assets'),
      },
      {
        test: /\.jpg$/,
        loader:
          "url-loader?limit=8192&mimetype=image/jpg&name=images/[name].[ext]",
        // include: path.join(__dirname, 'client', 'assets'),
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "url-loader?limit=10000&mimetype=application/font-woff",
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "file-loader",
      },
    ],
  },
  resolve: {
    extensions: [".json", ".js", ".jsx"],
  },
  plugins: [
    // new HtmlWebpackPlugin({
    //     filename: 'index.html',
    //     template: 'dev/content/index-prod.html',
    //     inject: true
    // }),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
    }),
    //  //  'process.env.HOSTNAME': JSON.stringify('localhost'),
    //    'process.env.PORT': 4445
    // }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ],
};
//process.traceDeprecation = true;
module.exports = config;
