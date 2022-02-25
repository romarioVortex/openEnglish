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
    port: process.env.PORT || 3001,
    portArchivos: 3000,
    hostArchivos: 'localhost',
    host: 'localhost',
    secure: false,
    charset: 'utf8',
    //Rango de paginacion
    rango:15,
    operacionesemail: 'romario.restrepo@parquesoftbogota.com',
    configmysql: {
      database: process.env.DB_NAME || 'openenglish',
      username: process.env.DB_USER || 'root',
      password: process.env.DB_PASS || 'password',
      host: process.env.DB_HOST || '0.0.0.0',
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
