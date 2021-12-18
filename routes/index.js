const express = require('express')
const router = express.Router()

const home = require('./modules/home')
router.use('/', home)

const show = require('./modules/show')
router.use('/show', show)


module.exports = router