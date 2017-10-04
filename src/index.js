var express = require('express')
var app = express()

var mongojs = require('mongojs')
var db = mongojs('localhost/CityOfHelsinki', ['people'])

app.listen(3000, () => console.log('Running on port 3000...'))
