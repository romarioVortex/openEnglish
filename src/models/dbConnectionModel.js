'use strict'

// sequelize
const setupDatabase = require('./DAOs/db')

// NOTE:  Modelos

const setupMoviesTypesModel = require('./modelsVo/moviesTypes')

// NOTE:  DAOs

const setupMoviesTypes = require('./DAOs/moviesTypes')

// const setupMetric = require('./lib/metric')

const defautls = require('defaults')

// const setup = require('./setup')

let MoviesTypes

async function cargarBaseDatos(config) {
  config = defautls(config, {
    dialect: 'mysql',
    pool: {
      max: 10,
      min: 0,
      idle: 10000
    },
    query: {
      raw: true
    }
  })

  // inicia la base de datos
  const sequelize = await setupDatabase(config)
  const setupMoviesTypesMod = await setupMoviesTypesModel(config)

  // NOTE: Validacion de si la BD esta correcta

  await sequelize.authenticate()

  // NOTE: Relaciones



  // NOTE: Preparamos los servicios a exportar

  MoviesTypes = setupMoviesTypes(setupMoviesTypesMod)

  //  llave primaria o forenea realacion de modelos y agentes por un dato en especial
  //  const Agent = setupAgent(AgenteModel)
  //  const Metric = setupMetric(MetricsModel, AgenteModel)
  //  llave primaria o forenea realacion de modelos y agentes por un dato en especial
  //  const Agent = setupAgent(AgenteModel)
  //  const Metric = setupMetric(MetricsModel, AgenteModel)
  //  const Agent = setupAgent(AgenteModel)
  //  const Metric = setupMetric(MetricsModel, AgenteModel)
}

module.exports = async function(config) {
  if (!MoviesTypes) {
    await cargarBaseDatos(config)
  }

  return {
    MoviesTypes
  }
}
