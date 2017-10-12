var express = require('express')
var bodyParser = require('body-parser')
var app = express()

// MongoDB Connection
var mongojs = require('mongojs')
var db = mongojs('localhost/CityOfHelsinki', ['people'])

// JSON bodyparser for every route
app.use(bodyParser.json())

// Data submission route
app.post('/submit', (req, res) => {
  // res.send(req.body.childId)

  var childInfo = {
    'child_id': req.body.childId,
    'name': req.body.name,
    'kindergarten_choices': req.body.kindergarten_choices
  }

  db.people.insert(childInfo)
  res.send(childInfo)
})


app.listen(3000, () => console.log('Running on port 3000...'))
