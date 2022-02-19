module.exports = {
    /**
     * Atrapa errores en la solicitud de peticiones
     */
    asyncMiddleware: fn =>
        (req, res, next) => {
            Promise.resolve(fn(req, res, next))
                .catch(next)
        }
}