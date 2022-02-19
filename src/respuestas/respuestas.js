/*
Repuesta con los parametros resultado, status, exitoso, novedad, mensaje, codigo
 */
exports.respuesta = function (req, res, resultado, status, exitoso, novedad, mensaje) {
    return res.status(status || 200).json({
        exitoso: exitoso || true,
        codigo: status || 200,
        mensaje: mensaje || 'Proceso realizado Correctamente.',
        resultado: resultado || null,
        novedad: novedad || null
    })
}

exports.errorCliente = function (req, res, resultado, status, exitoso, novedad, mensaje) {
    return res.status(status || 401).json({
        exitoso: exitoso || false,
        codigo: status || 401,
        mensaje: mensaje || 'hubo un error inténtelo mas tarde.',
        resultado: resultado || null,
        novedad: novedad || null
    })
}
