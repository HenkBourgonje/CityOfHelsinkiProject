const mongojs = require('mongojs')
const db = mongojs('bourgonjehenk:CityOfHelsinki@ds021356.mlab.com:21356/city_of_helsinki_project', ['people'])

/**
 * Enabled the files that require this file to connect to the database
 * @returns {Database}
 */
exports.get = function () {
    return db
}
