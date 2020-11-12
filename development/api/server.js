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
    // UPDATE: Carol fixed the keywords endpoint - use request.query rather than request.params since we're not using router
    // TODO: Lookup by multiple keywords
    app.get('/lookupEventsByKeyword', (request, response) => {
        console.log("request params: " +  request.query.keywords);
        db.collection('Events').find({
            keywords: { $all : [request.query.keywords] }  // doesn't seem to work if multiple keywords are requested
        })                                  // to make an array in postman: keywords[0] = 'Rocket', keywords[1] = 'Lab', etc.
            .toArray()
            .then((result) => {
                response.status(200).json(result)
            })
            .catch((error) => {
                response.status(400).send(error.message);
            })
    });

    // inserts a new org, only if it doesn't yet exist
    app.post('/addOrg', async (request, response) => {
        let exists = false;
        await db.collection('Organizations').find({
            name : request.query.name
        }).toArray()
            .then((result) => {
                // if there's a club with that name already, don't add again
                if (result.length > 0) {
                    response.status(400).json("Org already exists!")
                    exists = true;
                    console.log('Org exists');
                }
            })

        if (!exists) { // only if the org doesn't yet exist, add it. (if it already exists, skip adding it)
            console.log('Adding org');
            let newOrg =
                {
                    name: request.query.name,
                    users: [],
                    events: [],
                    description: request.query.description,
                    school: request.query.school,
                    keywords: request.query.keywords,
                    created: new Date(Date.now()).toISOString()
                };

            await db.collection('Organizations').insertOne(newOrg, (err, result) => {
                if (err) {
                    //console.log('Failed to add org: ' + err);
                    response.status(400).json('Failed to add org');
                } else {
                    //console.log('org added successfully!');
                    response.status(200).json('Successfully added org!');
                }
            })
        }
    });

    // deletes an org by name, only if it exists
    app.post('/deleteOrg', async (request, response) => {
        const name = request.query.name;
        // first look for the name
        let exists = false;
        await db.collection('Organizations').find({
            name : name
        }).toArray()
            .then((result) => {
                // if there's a club with that name already, don't add again
                if (result.length > 0) {
                    exists = true;
                }
                else
                    response.status(400).json("Can't delete an org that doesn't exist")
            })

        if (exists) {
            await db.collection('Organizations').deleteOne({name: name}, (err, result) => {
                if (err) {
                    //console.log('Failed to delete org: ' + err);
                    response.status(400).json('Failed to delete org');
                } else {
                    //console.log('org deleted successfully!');
                    response.status(200).json('Successfully deleted org!');
                }
            })
        }
    });
});

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(4000, function () {
    console.log('Listening on port 4000!');
});