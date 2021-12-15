const mongoose = require('mongoose')
const Record = require('../record')
mongoose.connect('mongodb://localhost/record')

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  Record.create({
    originURL: 'http://www.google.com.tw/',
    shortURL: 'http://localhost/3000/test5',
  })
  console.log('seed success')
})