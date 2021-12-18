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
  Record.find()
    .lean()
    .then(dataArry => {
      const result = dataArry.find(record => {
        return record.shortURL === inputshortURL
      })
      const judgment = result || 'noData'
      if (judgment !== 'noData') {
        res.redirect(result.originURL)
      } else {
        res.render('show', { Nodata: judgment })
      }
    })
})

module.exports = router