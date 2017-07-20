import path from 'path';
import http from 'http';
import express from 'express';
import webpack from 'webpack';
//import webpackConfig from process.env.WEBPACK_CONFIG || './webpack.config';
import {create} from './server';

var webpackConfig = require(process.env.WEBPACK_CONFIG || './webpack.config');
var compiler = webpack(webpackConfig);

const port = process.env.PORT || 4445;
const app = express();

if (process.env.NODE_ENV==='development'){
		app.use(require("webpack-hot-middleware")(compiler));
		app.use(require("webpack-dev-middleware")(compiler, {
		    noInfo: true, publicPath: webpackConfig.output.publicPath
	}));
}

app.use('/', express.static(path.resolve(__dirname, '..')));

const httpServer = new http.Server(app);

create(httpServer);

httpServer.listen(port);
