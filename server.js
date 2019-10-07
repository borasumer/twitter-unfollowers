const express = require('express')
const userList = require('user-list')

const app = express()
app.use(express.json())
app.use('view engine', 'pug')

const port = process.env.port || 5000

app.listen(port, () => {
  console.log(`Server is listening on port: ${port}`)
})

app.get('/', (req, res) => {

})