const Twitter = require('twitter')

module.exports = (res, screen_name) => {
  var client = new Twitter({
    consumer_key: 'WBSjO0c2ednAJfdsIKOTuK5TU',
    consumer_secret: 'cHJYRxp6RDobzha7sKtmfWS2Y4JYT4cCGB9JEoxsUL0jfBlcO2',
    access_token_key: '828556655654797312-uwOWZJh1t3jW6ge7K1WunyLoeXoWmyX',
    access_token_secret: 'elW8m0SKxRj8y9ZOgsfYmqKPtfxg74g9CfXqKUEThIbue'
  });


  var params = { screen_name }
  var non_followers = []
  var users_nonfollowers = []

  client.get('followers/ids', params, (error, followers_result, response) => {
    if (error) {
      throw error;
    }
    var followers = followers_result.ids


    client.get('friends/ids', params, (error, friends_result, response) => {
      if (error) {
        throw error
      }
      var following = friends_result.ids

      following.forEach(person => {
        if (followers.indexOf(person) === -1) {
          non_followers.push(person)
        }
      })
      //console.log(non_followers)
      //non_followers = non_followers.slice(0, 10)
      var ids = non_followers.join()
      client.get('users/lookup', { user_id: ids }, (error, users, response) => {
        users.map(user => {
          var userObject = {
            name: user.name,
            screen_name: user.screen_name,
            avatar: user.profile_image_url
          }
          users_nonfollowers.push(userObject)
        })
        res.render('list', { users: users_nonfollowers })
      })
    })
  })
}
