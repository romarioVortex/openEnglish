'use strict'

const config = require('./src/config/config')
const PORT = config().port
const key = config().key
const cert = config().cert
const keyruta = config().keyruta
const certruta = config().certruta
const ca_root = config().ca_root
const ca_bundle = config().ca_bundle
const express = require('express')
const path = require('path')
const app = express()
const fs = require('fs')
const https = require('https');
const http = require('http').Server(app);
const session = require('express-session')
const routes = require('./src/routes');
const bodyParser = require('body-parser')
const morgan = require('morgan');
const db = require ('./src/models/DAOs/db')

if (process.env.NODE_ENV == 'production') {
  https.createServer({
    ca: [fs.readFileSync(ca_root), fs.readFileSync(ca_bundle)],
    key: fs.readFileSync(keyruta),
    cert: fs.readFileSync(certruta)
  }, app).listen(PORT, function() {
    console.log(`App listening on ${PORT} !`)
  })
} else {
  http.listen(PORT, async function() {
    console.log(`App listening on ${PORT} !`)
  })
}

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false
  },
  user: null
}))

app.use(bodyParser.json({
  limit: '10mb'
}))
app.use(bodyParser.urlencoded({
  limit: '10mb',
  extended: true
}))
app.use(morgan('dev'))

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS')
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')

  // intercepts OPTIONS method
  if (req.method === 'OPTIONS') {
    console.log('metodoptions')
    // respond with 200
    res.send(200)
  } else {
    // move on
    next()
  }
})

app.use('/static', express.static(path.join(__dirname, './src/public')))

app.use('/', routes);
