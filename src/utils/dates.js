let moment = require('moment')



let today = new Date();
let dd = today.getDate();
let mm = today.getMonth()+1;
let yyyy = today.getFullYear();
let mesMaxEnvio = mm + 3;
let anioMaximo = yyyy;

if (mesMaxEnvio > 12) {
    let mestmp = mesMaxEnvio - 12;
    mesMaxEnvio = addZeroDate(mestmp);
    anioMaximo = anioMaximo + 1;
}


/**
 * Retorna la fecha actual en formato (yyy-mm-dd)
 */
function fechaHoy(){
let year = yyyy;
let month = addZeroDate(mm);
let day = addZeroDate(dd);
return year + '-' + month + '-' + day;
}

/**
 * Retorna la fecha actual adelantada (3 meses) en formato (yyy-mm-dd)
 * para un atributo de un Input
 */
function anioMesDiaInput(){
   return anioMaximo + '-' + mesMaxEnvio + '-' + dd;
}


/**
 *  Retorna la fecha actual adelantada (3 meses) en formato (dd-mm-yyy)
 * para visualiazion cliente
 */
function anioMesDia(){
    return dd + '/' + mesMaxEnvio + '/' + anioMaximo;
}

function addZeroDate(data){
    if (data < 10) {
        data = '0' + data;
        return data
    }else{
      return data+'';
    }
}
function addZeroDatex3(data){
    if (data < 10) {
        data = '0' + data;
      }
      return data;
}
function getFechasolicitud() {
let fecha = new Date()
fecha = fecha.getTime()
fecha = new Date(fecha)

let ano = fecha.getFullYear()
let mesd = fecha.getMonth()+1
let diad = fecha.getDate()
let horad = fecha.getHours()
let minutod = fecha.getMinutes()
let segundod = fecha.getSeconds()+2
let millisegundod = fecha.getMilliseconds()

let mes  = addZeroDate(mesd)
let dia = addZeroDate(diad)
let hora = addZeroDate(horad)
let minuto = addZeroDate(minutod)
let segundo = addZeroDate(segundod)

//let milisegundosadicional = millisegundod

return  ano+mes+dia+hora+minuto+segundo+'.'+millisegundod

}
function fechasmayorUnano(date){
  //console.log('date',date)
  const datenow = new Date()
  const myDateObj = new Date(date)

  const fecha = new Date( myDateObj.getFullYear()+1,myDateObj.getMonth(),myDateObj.getDate())
  const datenows = new Date(  datenow.getFullYear(),datenow.getMonth(),datenow.getDate())
  //console.log('fecha',fecha,'datenow',datenow)
  return moment(fecha).isAfter(datenow);  
}

/* Función que suma o resta días a una fecha, si el parámetro
   días es negativo restará los días*/
function sumarOrestarDias(fecha, dias){
    fecha.setDate(fecha.getDate() + dias);
    return fecha;
}

module.exports={
    fechaHoy,
    anioMesDia,
    anioMesDiaInput,
    addZeroDate,
    getFechasolicitud,
    fechasmayorUnano,
    sumarOrestarDias
}
