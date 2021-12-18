const express = require('express')
const exphbs = require('express-handlebars')
require('./config/mongoose')
const routes = require('./routes')

const port = 3000
const Record = require('./models/record')

const app = express()
app.use(express.urlencoded({ extended: true }))
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(routes)

app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})