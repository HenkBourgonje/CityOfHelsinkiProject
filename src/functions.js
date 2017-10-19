var path = require('path');
// require('handlebars');


// MongoDB connection
var mongo = require('/Users/henkbourgonje/Desktop/CityOfHelsinkiProject/src/db.js')
var db = mongo.get()

function findAll() {
  db.people.find(function (err, people) {
    console.log(people)
    return people
  })
}

findAll()
