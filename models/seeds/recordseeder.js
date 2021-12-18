const Record = require('../record')
const db = require('../../config/mongoose')

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