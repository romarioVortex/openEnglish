'use strict'
const closeConnection = require('./db_close')

module.exports = function setupMoviesTypes(MoviesTypes) {

  function findAllByCond(cond) {
    const result = MoviesTypes.findAll(cond)

    // NOTE: Cierre de sesion
    closeConnection()
    return result
  }

  function findById(id) {
    const cond = {
      where: {
        movieTypes_id: id
      }
    }
    const result = MoviesTypes.findOne(cond)

    // NOTE: Cierre de sesion
    closeConnection()
    return result
  }

  async function create(movieTypes) {
    const result = await MoviesTypes.create(movieTypes)

    // NOTE: Cierre de sesion
    closeConnection()
    return result.toJSON()
  }

  async function update(MovieTypes,t) {

    const cond = {
      where: {
        movieTypes_id: MovieTypes.movieTypes_id
      },
      transaction: t
    }
    const update = await MoviesTypes.update(MovieTypes, cond)

    // NOTE: Cierre de sesion
    closeConnection()
    return update
  }

  function test() {
    const result = MoviesTypes.findOne({
      limit: 1
    })

    // NOTE: Cierre de sesion
    closeConnection()
    return result
  }

  function deleteById(id) {
    const cond = {
      where: {
        movieTypes_id: id
      }
    }
    const result = MoviesTypes.destroy(cond)

    // NOTE: Cierre de sesion
    closeConnection()
    return result
  }

  async function createMultiple(movieTypes) {
    const result = await MoviesTypes.bulkCreate(movieTypes)

    // NOTE: Cierre de sesion
    closeConnection()
    return result
  }

  return {
    findAllByCond,
    findById,
    create,
    update,
    test,
    deleteById,
    createMultiple
  }
}
