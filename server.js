const express = require('express')
const userList = require('./user-list')
const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
//app.use(express.json())
app.set('view engine', 'pug')

app.get('/', (req, res) => {
  res.render('index')
})

app.post('/get_users', (req, res) => {
  var screen_name = req.body.handle
  var users = userList(res, screen_name)
})
app.post('/unfollow_user', (req, res) => {
  var screen_name = req.body.handle
  var users = userList(res, screen_name)
})

const port = process.env.port || 3000
app.listen(port, () => {
  console.log(`Server is listening on port: ${port}`)
})