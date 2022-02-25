'use strict'

const {
  asyncMiddleware,
} = require('../../middlewares/errorHandle');
const encriptor = require('../../utils/encriptor');
const {
  respuesta,
  errorCliente,
} = require('../../respuestas/respuestas');
const config = require('../../config/config');
const db = require('../../models/dbConnectionModel')
const dbConnect = require('../../models/DAOs/db')
const configmysql = config().configmysql
const rango = config().rango
const api = require('../../utils/api')
const validators = require('../../utils/validators')

// NOTE: Import de modelos

let MoviesTypes
let Movies
let sequelize

const postgres = asyncMiddleware(async function() {
  const services = await db(configmysql)
  MoviesTypes = services.MoviesTypes
  Movies = services.Movies
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

  if (title == '' || title == undefined) {
    return errorCliente(req, res, null, 200, false, 'No se consiguio la pelicula',"A title has not been written", 400)
  }

  if (page == '' || page == undefined) {
    page = 1
  }

  // NOTE: inicializamos las condiciones de busqueda

  let cond ={
    where : {
      Title:title
    }
  }

  if (type != undefined) {
    cond.where.movieType_id = type
  }

  if (year != undefined) {
    cond.where.Year = year
  }

  // NOTE: Consultamos el total de registros para generar la pagina

  let cantidad = await Movies.countByCond(cond)

  // NOTE: Consulta de de movies

  let consulta = await Movies.findAllByCond(cond)

  cond.offset = page * rango
  cond.limit = rango
console.log("consulta",consulta);
  if (consulta != null) {
    consulta.totalPage = cantidad/10
    return respuesta(req, res, consulta, 201, false, null, "Datos directo de enpoint")
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

  // NOTE: Creamos el array de objetos a crear para la tabla moviesTypes

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
    },
    {
      movieType_id: 4,
      movieType: 'Other no unspecified'
    }
  ]

  let types = []
  let novedad = ''

  // NOTE: guardamos en la base de datos la informacion de moviesTypes y generamos una novedad

  try {
    let types = await MoviesTypes.createMultiple(array)
    novedad += 'movie types save successfully. '
  } catch (e) {
    novedad += "movie types's already save. "
  }

  // NOTE: Consulta de peliculas con el fin de saber lo que se encuentra en la pagina 1 y el total de paginas a consultar

  let consulta = await api.buscarPelicula('love',false,'2020','1')
  let registrosPagina = []
  let aux

  // NOTE: En caso de exitoso calculamos el total de paginas e iniciamos proceso de revisar todas las paginas

  if (consulta.exitoso) {
    let totalPage = Math.floor(consulta.totalResults/10)

    // NOTE: Se guarda la primera pagina automaticamente

    for (let m in consulta.Search) {
      registrosPagina.push(consulta.Search[m])
    }

    // NOTE: comenzamos el proceso de validacion de informacion de todas las paginas

    for (var i = 2; i <= totalPage; i++) {
      consulta = await api.buscarPelicula('love',false,'2020',i)

      // NOTE: en caso que la consulta sea exitosa manejamos la informaicono principalmente del movieType y guardamos al final la pagina entera

      if (consulta.exitoso) {
        for (let j in consulta.Search) {
          registrosPagina.push(consulta.Search[j])
        }
      }else {

        // NOTE: en caso que la consulta no sea exitosa aguregamos en la novedad que no fue posible ver la x pagina desde la api

        novedad += `Ha ocurrido un error al consultar la pagina ${i} de la api. `
      }
    }

    // NOTE: Validacion de dulpicados sobre el total de registros pagina

    for (let m in registrosPagina) {
      aux = false
      registrosPagina[m].movieType_id = validators.movieType(registrosPagina[m].Type)
      for (var n in registrosPagina) {
        if (registrosPagina[m].imdbID === registrosPagina[n].imdbID) {
          if (aux) {
            registrosPagina.splice(n,1)
          }
          aux = true
        }
      }
    }

    // NOTE: Verificamos el listado de ids totales en bd

    let imdbIDInBd = await Movies.findAllByCond({
      where: {
        imdbID: registrosPagina.map(h => h.imdbID)
      },
      attributes: ['imdbID']
    })

    // NOTE: Eliminamos los registros duplicados de base de datos con la consulta

    if (imdbIDInBd != null) {
      for (let o in registrosPagina) {
        aux = false
        for (var p in imdbIDInBd) {
          if (imdbIDInBd[p].imdbID === registrosPagina[o].imdbID) {
            console.log("imdbIDInBd[p].imdbID ------------------------------------------------",imdbIDInBd[p].imdbID);
            console.log("registrosPagina[o].imdbID------------------------------------------------",registrosPagina[o].imdbID);
            if (aux) {
              registrosPagina.splice(o,1)
            }
            aux = true
          }
        }
      }
    }

    try {
      await Movies.createMultiple(registrosPagina)
    } catch (e) {
      console.log(`Ocurrido un error al guardar los registros : ====`,e);
      novedad += `Ha ocurrido un error al guardar los datos de la api en la base de datos. `
    }

    // NOTE: Respuesta positiva al final del ciclo de consultas de la pagina

    return respuesta(req, res, {types,registrosPagina, cantidad: registrosPagina.length}, 201, true, novedad, null)
  }else {

    // NOTE: Respuestas en caso de erorres al principio de la busqueda

    if (typeof consulta.Error == 'string'){
      return errorCliente(req, res, null, 200, false, novedad, consulta.Error, 400)
    }else {
      return errorCliente(req, res, null, 200, false, novedad, 'an unexpected error occurred while querying the api', 400)
    }
  }

})

module.exports = {
  searchMovie,
  getTypeOfMovies,
  fillDataBase
}
