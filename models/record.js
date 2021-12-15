const mongoose = require('mongoose')
const Schema = mongoose.Schema

const recordSchema = new Schema({
  originURL: {
    type: String,
    require: true
  },
  shortURL: String,
})

module.exports = mongoose.model('Record', recordSchema)