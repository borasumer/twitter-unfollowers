const express = require('express')
const Twitter = require('twitter')

const app = express()

var client = new Twitter({
  consumer_key: 'WBSjO0c2ednAJfdsIKOTuK5TU',
  consumer_secret: 'cHJYRxp6RDobzha7sKtmfWS2Y4JYT4cCGB9JEoxsUL0jfBlcO2',
  access_token_key: '828556655654797312-uwOWZJh1t3jW6ge7K1WunyLoeXoWmyX',
  access_token_secret: 'elW8m0SKxRj8y9ZOgsfYmqKPtfxg74g9CfXqKUEThIbue'
});

const port = process.env.port || 5000

app.listen(port, () => {
  console.log(`Server is listening on port: ${port}`)
})

var params = { screen_name: 'allrational' }
var not_followers = []
app.get('/followers', (req, res) => {

  client.get('followers/ids', params, function (error, data, response) {
    var followers = data.ids

    client.get('friends/ids', params, function (error, data, response) {
      var friends = data.ids
      friends.forEach((person) => {
        if (followers.indexOf(person) === -1) {
          not_followers.push(person)
        }
      })
    })
    not_followers = not_followers.slice(0, 99)
    var not_followers_string = not_followers.join()
    client.get('users/lookup', { user_id: not_followers_string }, function (error, data, response) {
      console.log(data)
    })
  })

})