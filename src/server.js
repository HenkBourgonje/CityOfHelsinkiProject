var express = require('express')
var bodyParser = require('body-parser')
var app = express()
var hbs  = require('express-handlebars')
var path = require('path');

// MongoDB Connection
var mongo = require(path.resolve('src/db.js'))
var db = mongo.get()

app.engine('handlebars', hbs({defaultLayout: 'main', layoutsDir: __dirname + '/views/layouts'}));
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'handlebars');

// JSON bodyparser for every route
app.use(bodyParser.json())

//Init
app.get('/', (req, res) => {
  res.render('home')
})

// Data submission route
app.post('/submit', (req, res) => {
  var childInfo = {
    'name': req.body.name,
    'gender': req.body.gender,
    'age': req.body.age,
    'status': req.body.status,
    'application_date': req.body.application_date,
    'start_date': req.body.start_date,
    'address': req.body.address,
    'kindergarten_choices': req.body.kindergarten_choices
  }
  db.people.insert(childInfo)
  res.send("OK")
})

app.listen(3000, () => console.log('Running on port 3000...'))
