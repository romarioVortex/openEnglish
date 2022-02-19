'use strict'
const express = require('express')
const router = express.Router()

// NOTE: Importe de En rutadores

const moviesRouter = require('./moviesRoute')

// NOTE: setup de view engine

router.use('/movies', moviesRouter)

module.exports = router;
