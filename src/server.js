const express = require('express')
const app = express()
const hbs = require('express-handlebars')
const path = require('path')

// MongoDB Connection
const mongo = require(path.join(__dirname, '/model/db.js'))
const db = mongo.get()

const bodyParser = require('body-parser')

// Static files location declaration
app.use(express.static(path.join(__dirname, 'public/css')))
app.use(express.static(path.join(__dirname, 'public/images')))
app.use(express.static(path.join(__dirname)))

// Handlebars Express initialisation
app.engine('handlebars', hbs({defaultLayout: 'main', layoutsDir: __dirname + '/views/layouts'}))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'handlebars')

// Importing functions from the exports module from functions.js
let functions = require('./model/functions.js')

// JSON bodyparser for every route
app.use(bodyParser.json())

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
    // Find all info by applicant ID
    functions.findById(req.params.id, function (document) {

        let daycare_array = []

        // Loops through array of kindergarten preference id's
        for (let i = 0; i < document.kindergarten_choices.length; i++) {

            // Gets information according to the kindergarten ID and puts it in array, it
            // all has been covered, it renders the page.
            functions.getDaycares(document.kindergarten_choices[i], function (daycare_document) {
                daycare_array.push(daycare_document)

                if (daycare_array.length === document.kindergarten_choices.length) {
                    // console.log(daycare_array)
                    res.render('individual', {personal_info: document, daycare_info: daycare_array})
                }
            })
        }
    })
})

/**
 * Route that gets called when a child is being submitted to a daycare
 */
// TODO See what the steps are after the submission of the child. It has to be edited in the DB, but what more, email sent to parents?.....
app.get('/application_submit/:child_id/:daycare_id', (req, res) => {
    functions.changeStatus(req.params.child_id, 'closed')
    res.redirect('/')
})

/**
 * Data submission route
 */
app.post('/submit', (req, res) => {
    db.people.insert(req.body)
    res.send("OK")
})

/**
 * Port initialisation
 */
app.listen(3000, () => console.log('Running on port 3000...'))
