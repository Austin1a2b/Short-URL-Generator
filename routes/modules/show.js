const express = require('express')
const router = express.Router()
const randomString = require('../../models/randomstring')

const Record = require('../../models/record')

//轉換 短網址
router.post('/', (req, res) => {
  const inputURL = req.body.URL
  let shortURL = ''
  //1. 先檢查 資料庫 有無 相同 URL  
  Record.find()
    .lean()
    .then(dataArry => {
      const result = dataArry.find(record => {
        return record.originURL === inputURL
      })
      // 後續用來判斷  是否有重複 , 
      const judgment = result || 'noRepeat'
      //---輸入相同網址時，產生一樣的縮址。
      if (judgment !== 'noRepeat') {
        shortURL = result.shortURL
      } else {
        //2. 無相同URL 則給 網址+5碼英數亂碼        
        shortURL = `http://localhost:3000/${randomString(5)}`
        Record.create({ originURL: inputURL, shortURL: shortURL })
      }
      res.render('show', { shortURL: shortURL })
    })
})

module.exports = router