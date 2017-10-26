// MongoDB connection
const mongo = require('./db.js')
const db = mongo.get()

const mongojs = require('mongojs')



exports.getDataFromDB = function (callback) {
    db.people.find(function (err, results) {
        callback(results)
    })
}

exports.findById = function (id, callback) {
    db.people.findOne({ _id: mongojs.ObjectId(id)}, function (err, personDocument) {
        callback(personDocument)
    })
}

exports.returnResult = function (result) {
    return result
}