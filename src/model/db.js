const mongojs = require('mongojs')
const db = mongojs('localhost/CityOfHelsinki', ['people'])

exports.get = function () {
    return db
}
