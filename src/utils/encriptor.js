const crypto = require('crypto')
const configserve = require('../config/config')
const exec = require('child_process').exec
const encryptionMethod = configserve().encryptionMethod
const secret = configserve().secretEncript
const iv = secret.substr(0, 16);
const path = require('path')


var encrypt = function (plain_text) {
    plain_text.toString()
    var encryptor = crypto.createCipheriv(encryptionMethod, secret, iv);
    return encryptor.update(plain_text, 'utf8', 'base64') + encryptor.final('base64');
};

var decrypt = function (encryptedMessage) {
    var decryptor = crypto.createDecipheriv(encryptionMethod, secret, iv);
    return decryptor.update(encryptedMessage, 'base64', 'utf8') + decryptor.final('utf8');
};

var makeid = function (length) {
    var result = ''
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    var charactersLength = characters.length
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength))
    }
    return result
}

let codificarBase64 = function (data) {
    return Buffer.from(data).toString('base64')
}

module.exports.encrypt = encrypt
module.exports.decrypt = decrypt
module.exports.makeid = makeid
module.exports.codificarBase64 = codificarBase64
