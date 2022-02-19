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

module.exports.ValidacionFechas = ValidacionFechas
