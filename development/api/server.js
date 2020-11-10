const express = require('express');
const bodyParser = require('body-parser');
const {MongoClient} = require('mongodb');

var cors = require('cors');
const app = express();


//CAROL COMMENTING
const password = 'Carol1234';
const uri = `mongodb+srv://carol:${password}@cluster0.zyzjm.mongodb.net/?retryWrites=true&w=majority`;
const mongo = new MongoClient(uri);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//connect to mongodb database
mongo.connect(function (err) {
    if (!err) {
        console.log("successfully connected to database!" );
    } else {
        console.log("error connecting to database.");
    }

    const db = mongo.db('rso_board');

    // write your endpoints for getting + adding data here. the below is an example retrieving all objects from Users collection
    app.get('/allUsers', (request, response) => {
       db.collection('Users').find({})
           .toArray()
           .then((result) => {
               response.status(200).json(result)
           })
           .catch((error) => {
               response.status(400).send(error.message);
           })
    });

    // Gets all the events, modeled after Carol's example
    app.get('/allEvents', (request, response) => {
       db.collection('Events').find({})
           .toArray()
           .then((result) => {
               response.status(200).json(result)
           })
           .catch((error) => {
               response.status(400).send(error.message);
           })
    });

    // Search for an event by a SINGLE keyword
    // ISSUE: Doesn't work. Doesn't return any results ever
    // The problem is that, apparently, request.params is always blank
    // TODO: Lookup by multiple keywords
    app.get('/lookupEventsByKeyword', (request, response) => {
        console.log(request.params);
        db.collection('Events').find({
            keywords: { $all : ['Rocket', 'Lab'] }  // usually, it would be $all : request.params.keywords
        })
            .toArray()
            .then((result) => {
                response.status(200).json(result)
            })
            .catch((error) => {
                response.status(400).send(error.message);
            })
        }
    )

    app.get('/lookupOrgsByKeyword', (request, response) => {
        console.log(request.params);
        db.collection('Organizations').find({
            keywords: { $all: request.params.keywords } //this never returns anything. request.params is always blank
        })
            .toArray()
            .then((result) => {
                response.status(200).json(result)
            })
            .catch((error) => {
                response.status(400).send(error.message);
            })
        }
    )

    app.get('/lookupOrgsBySchool', (request, response) => {
            db.collection('Organizations').find({
                school: 'Viterbi' // putting request.params.school here doesn't seem to route my Postman request to this query
            })
                .toArray()
                .then((result) => {
                    response.status(200).json(result)
                })
                .catch((error) => {
                    response.status(400).send(error.message);
                })
        }
    )
});

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(4000, function () {
    console.log('Listening on port 4000!');
});