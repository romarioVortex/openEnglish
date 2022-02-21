'use strict'
const Sequalize = require('sequelize')
const setuDatabase = require('../DAOs/db')

module.exports = function setupMoviesTypesModel(config) {
  const sequalize = setuDatabase(config)
  return sequalize.define('moviesTypes', {

    movieType_id: {
      type: Sequalize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    movieType: {
      type: Sequalize.STRING,
      allowNull: false
    }
  }, {
    charset: 'utf8',
    collate: 'utf8_unicode_ci',
    freezeTableName: false,
    tableName: 'moviesTypes',
    timestamps: false
  })
}
