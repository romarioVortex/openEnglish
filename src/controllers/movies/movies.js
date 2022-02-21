'use strict'

const {
  asyncMiddleware,
} = require('../../middlewares/errorHandle');
const encriptor = require('../../utils/encriptor');
const {
  respuesta,
  errorCliente,
} = require('../../respuestas/respuestas');
const axios = require('axios')
const config = require('../../config/config');
const db = require('../../models/dbConnectionModel')
const dbConnect = require('../../models/DAOs/db')
const configmysql = config().configmysql
const api = require('../../utils/api')

// NOTE: Import de modelos

let MoviesTypes
let sequelize

const postgres = asyncMiddleware(async function() {
  const services = await db(configmysql)
  MoviesTypes = services.MoviesTypes
  sequelize = await dbConnect(configmysql)
})

postgres()

/**
 * [buscarPelicula     Se encarga de listar todos los repositorios de la persona]
 * @param  {[type]} req               [description]
 * @param  {[type]} res               [description]
 * @return {[type]}     [description]
 */

let searchMovie = asyncMiddleware(async function(req, res) {

  let {
    title,
    year,
    type,
    page
  } = req.query

  if (title == '') {
    return errorCliente(req, res, null, 200, false, 'No se consiguio la pelicula',"A title has not been written", 400)
  }

  // NOTE: Consulta de de movies

  let consulta = await api.buscarPelicula(title,type,year,page)

  if (consulta.exitoso) {
    try {
      consulta.elementInPage = consulta.Search.length
      consulta.totalPage = consulta.totalResults/10
      console.log(typeof consulta.Error);
/*
      // NOTE: Validacion para evitar datos duplicados

      let aux = false
      let respuesta = []

      for (var i = 0; i < consulta.Search.length; i++) {
        for (var j = 0; j < consulta.Search.length; i++) {
          if (consulta.Search[i].imdbID === consulta.Search[j].imdbID) {
            if (aux) {
              consulta.splice(i,1)
            }
            aux = true
          }
        }
        aux = false
      }
*/
      return respuesta(req, res, consulta, 201, false, null, "Datos directo de enpoint")
    } catch (e) {
      console.log(e);
      return errorCliente(req, res, null, 200, false, 'No se consiguio la pelicula',"A title has not been written", 400)
    }
  }else {
    if (typeof consulta.Error == 'string'){
      return errorCliente(req, res, null, 200, false, 'No se consiguio la pelicula', consulta.Error, 400)
    }else {
      return errorCliente(req, res, null, 200, false, 'ha ocurrido un error al enviar los datos al endpoint', 'Movie Not Found', 400)
    }
  }

})

/**
 * [getTypeOfMovies    Trae la informacion de los tipos de peliculas que hay]
 * @param  {[type]} req               [description]
 * @param  {[type]} res               [description]
 * @return {[type]}     [description]
 */

let getTypeOfMovies = asyncMiddleware(async function(req, res) {

  // NOTE: enviamos el listado de tipos de peliculas

  try {
    let types = await MoviesTypes.findAllByCond()
    return respuesta(req, res, types, 201, true, null, null)
  } catch (e) {
    return errorCliente(req, res, null, 201, false, "Ocurrio un error al momento de buscar la informacion" + e, "Not found")
  }

})

/**
 * [fillDataBase                 Se encarga de realizar la carga a la base de datos]
 * @param  {[type]} req               [description]
 * @param  {[type]} res               [description]
 * @return {[type]}     [description]
 */

let fillDataBase = asyncMiddleware(async function(req, res) {

  // NOTE: Creamos el array de objetos a crear

  let array = [
    {
      movieType_id: 1,
      movieType: 'movie'
    },
    {
      movieType_id: 2,
      movieType: 'series'
    },
    {
      movieType_id: 3,
      movieType: 'episode'
    }
  ]
  let types = []

  try {
    let types = await MoviesTypes.createMultiple(array)
    return respuesta(req, res, types, 201, true, null, null)
  } catch (e) {
    return errorCliente(req, res, null, 201, false, "Ocurrio un error al momento de buscar la informacion" + e, "Types its already create")
  }

})

module.exports = {
  searchMovie,
  getTypeOfMovies,
  fillDataBase
}
