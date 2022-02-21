'use strict'

const jwt = require('jsonwebtoken')
/*const db = require('../models/dbConnectionModel')
const dbConnect = require('../models/DAOs/db')
const configmysql = config().configmysql*/
const config = require('../config/config')
const secret = config().secret
const {
  respuesta,
  errorCliente
} = require('../respuestas/respuestas');

const {
  asyncMiddleware
} = require('../middlewares/errorHandle');


// NOTE: Import de usuarios
/*
let Usuarios
let sequelize

const postgres = asyncMiddleware(async function() {
  const services = await db(configmysql)
  Usuarios = services.Usuarios
  sequelize = await dbConnect(configmysql)
})

postgres()
*/
const middelwares = {
  validateTokenJWT: async function(req, res, next) {

    const auth = req.headers.token
    if (auth) {
      const token = auth;

      let usuario
      try {
        usuario = jwt.verify(token, secret);
      } catch (error) {
        usuario = false;
      }

      if (!usuario._id) {
        usuario = false
      }

      if (usuario) {
        let usuario_id = usuario._id;
        let usuarioBD = await Usuarios.findById(usuario_id);

        if (!usuarioBD.sesion_activa) {
          return errorCliente(req, res, null, 401, false, 'hubo un error intentalo mas tarde', 'El usuario no tiene sesion iniciada', 401);
        } else {
          req.user = usuarioBD
          next();
        }
      } else {
        return errorCliente(req, res, null, 401, false, 'hubo un error intentalo mas tarde', 'token invalido', 401);
      }
    } else {
      return errorCliente(req, res, null, 401, false, 'hubo un error intentalo mas tarde', 'token faltante', 401);
    }
  },
  generateTokenJWT: (info) => {
    const token = jwt.sign(info, secret);
    return token;
  }
}
module.exports = middelwares
