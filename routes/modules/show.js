const express = require('express')
const router = express.Router()
const randomString = require('../../models/randomstring')

const Record = require('../../models/record')

//轉換 短網址
router.post('/', (req, res) => {
  const inputURL = req.body.URL
  let shortURL = ''
  //1. 先檢查 資料庫 有無 相同 URL  
  Record.find({ originURL: inputURL })
    .lean()
    .then(data => {
      //輸入相同網址時，產生一樣的縮址。
      if (data.length !== 0) {
        shortURL = data[0].shortURL
      } else {
        shortURL = `http://localhost:3000/${randomString(5)}`
        Record.create({ originURL: inputURL, shortURL: shortURL })
      }
      res.render('show', { shortURL: shortURL })
    })
})

module.exports = router