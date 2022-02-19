'use strict'
const nodemailer = require('nodemailer')
module.exports = function config() {
  const configEmail = nodemailer.createTransport({
    // host: 'smtp.gmail.com', // account.smtp.host,
    // port: 465, // account.smtp.port,
    // secure: true, // account.smtp.secure,
    service: 'Gmail',
    auth: {
      user: 'romario.restrepo@parquesoftbogota.com',
      pass: 'gnonsegmrquontqv'
    }
  })

  const config = {
    encryptionMethod: 'AES-256-CBC',
    secretEncript: 'My32charPasswordAndInitVectorStr',
    port: process.env.PORT || 3000,
    portArchivos: 3001,
    hostArchivos: 'localhost',
    host: 'localhost',
    secure: false,
    charset: 'utf8',
    operacionesemail: 'romario.restrepo@parquesoftbogota.com',
    configmysql: {
      database: process.env.DB_NAME || 'nlqgtsejm4evdm3x',
      username: process.env.DB_USER || 't6a96ty4mokbywo5',
      password: process.env.DB_PASS || 'gp770qbh0ji6w2ve',
      host: process.env.DB_HOST || 'xefi550t7t6tjn36.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
      port: 3306,
      dialect: 'mysql',
      logging: false,
      freezeTableName: false,
      /*pool: {
          max: 100,//cantidad maxima de conexiones
          min: 1,//cantidad minima de conexiones
          idle: 16000//tiempo para cerrar conecciones
      },*/
      // setup:false,   si setup esta en true borrara todas las base de datos y las bolvera a crear
      //logging: s => console.log(s), //muestra todo lo de la base de datos
      define: {
        charset: 'utf8',
        collate: 'utf8_general_ci',
        timestamps: true
      }
    },
    transporter: configEmail,
    secret: 'secretoJWT',
    keyruta: `/etc/httpd/ssl/server.key`,
    certruta: `/etc/httpd/ssl/server.crt`,
    ca_root: `/etc/httpd/ssl/ca_root.ctr`,
    ca_bundle: `/etc/httpd/ssl/ca_bundle.ctr`,
    urlAPI:'http://www.omdbapi.com/'
  }

  return config
}