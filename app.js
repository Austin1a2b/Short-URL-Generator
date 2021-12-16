const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const randomString = require('./models/randomstring')

const app = express()
app.use(express.urlencoded({ extended: true }))
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

mongoose.connect('mongodb://localhost/record')
const db = mongoose.connection

const port = 3000

const Record = require('./models/record')

app.get('/', (req, res) => {
  res.render('index')
})

//轉換 短網址
app.post('/show', (req, res) => {
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

//輸入短網址 => 到其他網站
app.get('/:random', (req, res) => {
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
        //後續再製作一個  短網址有誤的頁面?
      }
    })
})

db.on('error', () => {
  console.log('mongodb error!')
})
// 連線成功
db.once('open', () => {
  console.log('mongodb connected!')
})

app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})