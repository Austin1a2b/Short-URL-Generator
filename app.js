const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')

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
      const length = result || 'noRepeat'
      if (length !== 'noRepeat') {
        shortURL = result.shortURL
      } else {
        //2. 無相同URL 尚未製作 亂碼器
        shortURL = 'random URL'
        Record.create({ originURL: inputURL, shortURL: 'http://localhost/3000/test3' })
      }
      res.render('show', { shortURL: shortURL })
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