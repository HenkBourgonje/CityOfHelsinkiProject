var mongojs = require('mongojs')
var db = mongojs('localhost/CityOfHelsinki', ['people'])

exports.get = function() {
  return db
}
