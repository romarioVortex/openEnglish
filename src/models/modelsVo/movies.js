'use strict'
const Sequalize = require('sequelize')
const setuDatabase = require('../DAOs/db')

module.exports = function setupMoviesTypesModel(config) {
  const sequalize = setuDatabase(config)
  return sequalize.define('movies', {

    movie_id: {
      type: Sequalize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    Title: {
      type: Sequalize.STRING,
      allowNull: false
    },
    Year: {
      type: Sequalize.STRING,
      allowNull: false
    },
    imdbID: {
      type: Sequalize.STRING,
      allowNull: false,
      unique: true
    },
    movieType_id: {
      type: Sequalize.INTEGER,
      allowNull: false,
      references: {
        model: "moviesTypes",
        key: "movieType_id"
      }
    },
    Poster: {
      type: Sequalize.STRING,
      allowNull: false
    },
  }, {
    charset: 'utf8',
    collate: 'utf8_unicode_ci',
    freezeTableName: false,
    tableName: 'movies',
    timestamps: false
  })
}
