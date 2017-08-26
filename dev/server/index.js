

import express from 'express'
import path from 'path'
import passport from 'passport'
import {Strategy} from 'passport-local'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import expressSession from 'express-session'
import webpack from 'webpack'
import {create} from './server'
import db from './data/db'
import dal from './data/dal'
import http from 'http'
import register from './routes/register'
import statistics from './routes/statistics'
import {graphqlExpress, graphiqlExpress} from 'apollo-server-express'
import schema from './data/graphql/schema'

let STATIC_FILES_DIRECTORY = (process.env.NODE_ENV === 'production')?
  path.resolve(__dirname, '..'):path.resolve(__dirname, '../content')


const port = process.env.PORT || 4445;
const app = express();


app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(expressSession({
  secret: 'amit sha3',
  resave: true,
  saveUninitialized: true,
  // cookie: {secure:true},
}))
app.use(passport.initialize())
app.use(passport.session())

if (process.env.NODE_ENV === 'production'){
  console.log("production env");
}else{

	var webpackConfig = require(process.env.WEBPACK_CONFIG || '../../webpack.config');
	var compiler = webpack(webpackConfig);

	app.use(require("webpack-dev-middleware")(compiler, {
	    noInfo: true, publicPath: webpackConfig.output.publicPath
	}));

	app.use(require("webpack-hot-middleware")(compiler, {
	    log: console.log, path: '/__webpack_hmr', heartbeat: 10 * 1000
	  }));
}

passport.serializeUser((user, cb) => {
  cb(null, user.username);
});

passport.deserializeUser((username, cb) => {
  const user = dal.getUserByUsername(username);
  return cb(null, user);
});

passport.use(new Strategy(
    (username, password, cb) => {
      const user = dal.getUserByPassword(username, password);
      return cb(null, {...user, password:undefined});
  }));



app.post('/login', (req, res, next) => {
  if (req.body.playAsGuest){
    res.json({user:{username:req.body.username, playAsGuest:true}})
  }else{
    passport.authenticate('local', (err, user, info) => {
      if (err) { return next(err) }
      if (!user) { return res.status(403).json({error:'Username or password are Incorrect.'}) }
      req.logIn(user, (err) => {
        if (err) { return next(err) }
        res.json({user:user})
      })
    })(req, res, next)
  }
})


app.post('/isAuthenticated', (req, res)=>{
  if (req.isAuthenticated()){
    res.json(req.user)
  }else{
    res.json({})
  }
})

function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()){
    return next()
  }
  res.redirect('/login')
}

app.get('/login', (req, res)=>{
  res.sendFile(path.join(STATIC_FILES_DIRECTORY, 'index.html'))
})

app.get('/main*', isAuthenticated, (req, res)=>{
  res.sendFile(path.join(STATIC_FILES_DIRECTORY, 'index.html'))
})


app.get('/logout', (req, res)=>{
  req.logout()
  res.redirect('/login')
})

app.use('/', express.static(STATIC_FILES_DIRECTORY));
app.use('/register', register)
app.use('/statistics', statistics)

app.use('/graphql', bodyParser.json(), graphqlExpress({schema}))
app.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql',
}));

const httpServer = new http.Server(app);

create(httpServer);

httpServer.listen(port);
