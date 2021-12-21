const express = require('express')
const router = express.Router()
const Record = require('../../models/record')

router.get('/', (req, res) => {
  res.render('index')
})

//輸入短網址 => 到其他網站
router.get('/:random', (req, res) => {
  const random = req.params.random
  const inputshortURL = `http://localhost:3000/${random}`
  Record.find({ shortURL: inputshortURL })
    .lean()
    .then(data => {
      console.log(data)
      if (data.length !== 0) {
        res.redirect(data[0].originURL)
      } else {
        res.render('show', { Nodata: 'Nodata' })
      }
    })
})
module.exports = router