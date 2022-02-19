function validaPatrones(valor1,patron){
  let valor = valor1
  let patro = patron
  return patron.test(valor)
}

let patronCorreo = /^(?:[^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*|"[^\n"]+")@(?:[^<>()[\].,;:\s@"]+\.)+[^<>()[\]\.,;:\s@"]{2,63}$/i
let pateinSMS = /^([0-9])*$/
let patronAlfaNum = /^([a-zA-Z0-9]){1,16}$/
module.exports = {validaPatrones,patronCorreo,pateinSMS,patronAlfaNum}
