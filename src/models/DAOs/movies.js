'use strict'
const closeConnection = require('./db_close')

module.exports = function setupMovies(Movies,MoviesTypes) {

  function findAllByCond(cond) {
    cond.include = [{
      model:MoviesTypes,
      attributes:['movieType']
    }]
    cond.raw = false
    const result = Movies.findAll(cond)

    // NOTE: Cierre de sesion
    closeConnection()
    return result
  }

  function findById(id) {
    const cond = {
      where: {
        movie_id: id
      }
    }
    const result = Movies.findOne(cond)

    // NOTE: Cierre de sesion
    closeConnection()
    return result
  }

  async function create(movie) {
    const result = await Movies.create(movie)

    // NOTE: Cierre de sesion
    closeConnection()
    return result.toJSON()
  }

  async function update(Movie,t) {

    const cond = {
      where: {
        movie_id: Movie.movie_id
      },
      transaction: t
    }
    const update = await Movies.update(Movie, cond)

    // NOTE: Cierre de sesion
    closeConnection()
    return update
  }

  function test() {
    const result = Movies.findOne({
      limit: 1
    })

    // NOTE: Cierre de sesion
    closeConnection()
    return result
  }

  function deleteById(id) {
    const cond = {
      where: {
        movie_id: id
      }
    }
    const result = Movies.destroy(cond)

    // NOTE: Cierre de sesion
    closeConnection()
    return result
  }

  async function createMultiple(movie) {
    const result = await Movies.bulkCreate(movie)

    // NOTE: Cierre de sesion
    closeConnection()
    return result
  }

  async function countByCond(cond) {
    cond.include = [MoviesTypes]
    cond.raw = false
    const result = await Movies.count(cond)
    // NOTE: cierre de session despues de la consulta

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
    createMultiple,
    countByCond
  }
}
