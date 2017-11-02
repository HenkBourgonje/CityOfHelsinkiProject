const express = require('express')
const app = express()
const hbs = require('express-handlebars')
const path = require('path');

// MongoDB Connection
const mongo = require(path.resolve('db.js'))
const db = mongo.get()

// Static files location declaration
app.use(express.static(path.join(__dirname, 'resources/css')))

// Handlebars Express initialisation
app.engine('handlebars', hbs({defaultLayout: 'main', layoutsDir: __dirname + '/views/layouts'}))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'handlebars')

// Importing functions from the exports module from functions.js
let functions = require('./functions.js')

/**
 * Homepage route
 */
app.get('/', (req, res) => {
    functions.getDataFromDB(function (people) {
        res.render('home', {dashboard_content: people})

    })
})

/**
 * Individual page route
 */
// Individual document retrieval route
app.get('/individual/:id', (req, res) => {
    functions.findById(req.params.id, function (document) {
        res.render('individual', {individual_content: document})
    })
})

/**
 * Data submission route
 */
app.post('/submit', (req, res) => {
    db.people.insert(req.body)
    res.send("OK")
})

app.listen(3000, () => console.log('Running on port 3000...'))
