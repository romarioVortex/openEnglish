///Validar como hacerlo con otra tecnologia como redis
var mcache = require('memory-cache');

let cache = (duration) => {
    return (req, res, next) => {
        let key = '__express__' + req.originalUrl || req.url
        let cachedBody = mcache.get(key)
        if (cachedBody) {
            console.log("peticon desde cache");
            res.json(cachedBody)
            return
        } else {
            console.log("peticon desde base de datos");
            res.sendResponse = res.json
            res.json = (body) => {
                mcache.put(key, body, duration * 1000);
                res.sendResponse(body)
            }
            next()
        }
    }
}

module.exports = { cache }