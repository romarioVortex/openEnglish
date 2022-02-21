
const {
  respuesta,
  errorCliente
} = require('../respuestas/respuestas');
const config = require('../config/config');
const urlAPI = config().urlAPI
const axios = require('axios')
const { asyncMiddleware } = require('../middlewares/errorHandle');

/**
 * [buscarPelicula Esta es la funcion que se encarga de hacer la consulta a la API para saber la pelicula]
 * @param  {[string]} title*                  [Require* title to search]
 * @param  {[string]} type                  [type of element to search]
 * @param  {[number]} year                  [year of release to search]
 * @param  {[number]} page                  [page to search]
 * @return {[array]} respuesta            [Esta seria la respuesta de la consutla a la api]
 */

function buscarPelicula(title,type,year,page) {
  return new Promise(resolve => {
    let variables = "i=tt3896198&apikey=5eec5adc&s=" + title

    if (type) {
      variables = variables + '&' + 'type=' + type
    }
    if (year) {
      variables = variables + '&' + 'y=' + year
    }
    if (page) {
      variables = variables + '&' + 'page=' + page
    }

    console.log("ANTES:------------------------");
    console.log(variables);

    console.log("DESPUES de consultar los datos en api:");
    axios.get(`${urlAPI}?${variables}`).then((result) => {
      result.data.exitoso = true
      console.log("result.data");
      console.log(result.data);
      if (result.data.Response == 'False') {
        result.data.exitoso = false
      }
      resolve(result.data)
    }).catch((err) => {
      err.response.data.exitoso = false
      console.log("error",err);
      resolve(err.response.data)
    })
  });
}


module.exports = {
  buscarPelicula
};
