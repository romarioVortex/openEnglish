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
/*const db = require('../../models/dbConnectionModel')
const dbConnect = require('../../models/DAOs/db')
const configpostgres = config().configpostgres*/
const api = require('../../utils/api')

// NOTE: Import de modelos
/*
let Usuarios
let sequelize

const postgres = asyncMiddleware(async function() {
  const services = await db(configpostgres)
  Usuarios = services.Usuarios
  sequelize = await dbConnect(configpostgres)
})

postgres()
*/
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

module.exports = {
  searchMovie
}
