'use strict'
const router = require('express').Router();

const {
  searchMovie,
  getTypeOfMovies,
  fillDataBase
} = require('../controllers/movies/movies');
const {validateTokenJWT} = require('../middlewares/auth');

// NOTE: Routes Get

router.get('/',searchMovie)
router.get('/t',getTypeOfMovies)

// NOTE: Routes Post

router.post('/',fillDataBase)

module.exports = router;
