const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const { engine } = require('express/lib/application')

const app = express()
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

mongoose.connect('mongodb://localhost/record')
const db = mongoose.connection

const port = 3000

app.get('/', (req, res) => {
  res.render('index')
})

db.on('error', () => {
  console.log('mongodb error!')
})
// 連線成功
db.once('open', () => {
  console.log('mongodb connected!')
})

app.listen(port, () => {
  console.log(`http://localhost/${port}`)
})