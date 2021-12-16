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
    shortURL: 'http://localhost:3000/test1',
  },
    {
      originURL: 'https://tw.yahoo.com/',
      shortURL: 'http://localhost:3000/test2',
    })
  console.log('seed success')
})