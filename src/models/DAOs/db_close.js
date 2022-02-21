'use strict'
// cuenta cuenta
// consulta sql = CREATE ROLE cuenta WITH LOGIN PASSWORD 'cuenta';
// CREATE DATABASE platziverse;
// GRANT ALL PRIVILEGES ON DATABASE platziverse TO andrea

// clase de sequelize contructor
const Sequalize = require('sequelize')
const config = require('../../config/config')
const configmysql = config().configmysql

module.exports = function closeConnection () {
  let sequelize = new Sequalize(configmysql)
  sequelize.close().then(() => {
    return true
  }).catch(err => {
    console.error('No fue posible cerrar la sesion', err)
    return false
  })
}
