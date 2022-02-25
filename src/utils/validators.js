async function ValidacionFechas (fechaDb) {
  if (fechaDb) {
    var fecha = new Date()
    var ano = fecha.getFullYear()
    var mes = fecha.getMonth() + 1
    var dia = fecha.getDate()
    console.log(ano, mes, dia)

    var fechaenvio = fechaDb.split('-')
    var ano2 = parseInt(fechaenvio[0])
    var mes2 = parseInt(fechaenvio[1])
    var dia2 = parseInt(fechaenvio[2])
    console.log(ano2, mes2, dia2)
    if (ano === ano2 && mes === mes2) {
      if (dia2 <= dia) {
        return true
      }
    }
  }
  return false
}

/**
 * [movieType Esta funcion Recibe un string con el nombre del tipo de pelicula que deberia ser y retorna un entero con el id que representa el tipo]
 * @param  {[String]} type               [Nombre del tipo de pelicula a comparar con su movieType_id]
 * @return {[Integer]}      [Entero que representa el movieType_id en base de datos]
 */

function movieType (type) {
  if (type === 'movie') {
    return 1
  }else if (type === 'series') {
    return 2
  }else if (type === 'episode') {
    return 3
  }else {
    return 4
  }
}

module.exports = {
  ValidacionFechas,
  movieType
}
