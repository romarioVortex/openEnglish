'use strict'
const router = require('express').Router();

const {
  searchMovie
} = require('../controllers/movies/movies');
const {validateTokenJWT} = require('../middlewares/auth');

// NOTE: Routes Get

router.get('/',searchMovie)

module.exports = router;
