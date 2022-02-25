'use strict'

// sequelize
const setupDatabase = require('./DAOs/db')

// NOTE:  Modelos

const setupMoviesTypesModel = require('./modelsVo/moviesTypes')
const setupMoviesModel = require('./modelsVo/movies')

// NOTE:  DAOs

const setupMoviesTypes = require('./DAOs/moviesTypes')
const setupMovies = require('./DAOs/movies')

// const setupMetric = require('./lib/metric')

const defautls = require('defaults')

// const setup = require('./setup')

let MoviesTypes
let Movies

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
  const setupMoviesMod = await setupMoviesModel(config)

  // NOTE: Validacion de si la BD esta correcta

  await sequelize.authenticate()

  // NOTE: Relaciones

  setupMoviesMod.belongsTo(setupMoviesTypesMod, {
    foreignKey: 'movieType_id'
  })
  setupMoviesTypesMod.hasOne(setupMoviesMod, {
    foreignKey: 'movieType_id'
  })

  // NOTE: Preparamos los servicios a exportar

  MoviesTypes = setupMoviesTypes(setupMoviesTypesMod)
  Movies = setupMovies(setupMoviesMod,setupMoviesTypesMod)

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
  if (
    !MoviesTypes &&
    !Movies
  ) {
    await cargarBaseDatos(config)
  }

  return {
    MoviesTypes,
    Movies
  }
}
