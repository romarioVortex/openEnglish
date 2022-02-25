'use strict'
// cuenta cuenta
// consulta sql = CREATE ROLE cuenta WITH LOGIN PASSWORD 'cuenta';
// CREATE DATABASE platziverse;
// GRANT ALL PRIVILEGES ON DATABASE platziverse TO andrea

// clase de sequelize contructor
const Sequalize = require('sequelize')
let sequelize = null

module.exports = function setupDatabase(config) {
  if (!sequelize) {
    sequelize = new Sequalize(config)
    sequelize.authenticate().then(() => {
      console.log('DB Conection ok: '+ config.database)

      // NOTE: Sincronizacion forzada del sequelize

      sequelize.sync({
        alter: true 
      }).then(() => {
        console.log("Todos los modelos Sincronizados correctamente.");
      }).catch(err => {
        console.error('No fue posible sincronizar los modelos: ', err)
      })
    }).catch(err => {
      console.error('Unable to connect to the database:', err)
    })
  }

  return sequelize
}
