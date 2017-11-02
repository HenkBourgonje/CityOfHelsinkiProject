
// MongoDB connection
const mongo = require('./db.js')
const db = mongo.get()

const mongojs = require('mongojs')

/**
 * Function that fetches all documents from the DB to show on the main page of the application.
 * @param callback Function that gets called after the search in the DB is done.
 */
exports.getDataFromDB = function (callback) {
    db.people.find(function (err, results) {
        callback(results)
    })
}

/**
 * Function that returns the Mongo Object that belongs to the ID given in the parameters.
 * @param id The ID of the document generated by MongoDB.
 * @param callback Function that gets after the search is done in the DB that returns the right document.
 */
exports.findById = function (id, callback) {
    db.people.findOne({_id: mongojs.ObjectId(id)}, function (err, personDocument) {
        callback(personDocument)
    })
}