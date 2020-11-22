const express = require('express');
const bodyParser = require('body-parser');
const {MongoClient} = require('mongodb');
const stream = require('getstream');

var cors = require('cors');
const app = express();


//CAROL COMMENTING
const password = 'Carol1234';
const uri = `mongodb+srv://carol:${password}@cluster0.zyzjm.mongodb.net/?retryWrites=true&w=majority`;
const mongo = new MongoClient(uri);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// The following code is to circumvent weird CORS errors
// reference: https://github.com/axios/axios/issues/853#issuecomment-351554276
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

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

    // Gets all the organizations, modeled after Carol's example
    app.get('/allOrgs', (request, response) => {
        db.collection('Organizations').find({})
            .toArray()
            .then((result) => {
                response.status(200).json(result)
            })
            .catch((error) => {
                response.status(400).send(error.message);
            })
    });

    // -----------------------------------------------------------------------
    // ---------------------------- Event Queries ----------------------------
    // -----------------------------------------------------------------------

    // Search up events via keywords using POST request. If no event exists, returns an empty array.
    // Postman: Pass in a JSON object with an array of keywords to Body -> raw and change text to JSON
    // Ex. {
    //     "keywords": [
    //         "Rocket",
    //         "Lab"
    //     ]
    // }
    app.post('/lookupEventsByKeywords', async (request, response) => {
        console.log("request params: " +  request.body.keywords);
        const keywords = request.body.keywords;
        db.collection('Events').find({
            keywords: { $all : keywords }
        })
            .toArray()
            .then((result) => {
                response.status(200).json(result)
            })
            .catch((error) => {
                response.status(400).send(error.message);
            })
    });

    // Add event
    app.post('/addEvent', async (request, response) => {
        let exists = false;
        await db.collection('Events').find({
            name : request.body.name
        }).toArray()
            .then((result) => {
                // if there's a club with that name already, don't add again
                if (result.length > 0) {
                    response.status(400).json("Event already exists!")
                    exists = true;
                    console.log('Event exists');
                }
            })

        if (!exists) { // only if the org doesn't yet exist, add it. (if it already exists, skip adding it)
            console.log('Adding event');
            let newOrg =
                {
                    organization: request.body.organization,
                    time: request.body.time,
                    name: request.body.name,
                    keywords: request.body.keywords,
                    description: request.body.description,
                    created: new Date(Date.now()).toISOString()
                };

            await db.collection('Events').insertOne(newOrg, (err, result) => {
                if (err) {
                    console.log('Failed to add org: ' + err);
                    response.status(400).json('Failed to add event');
                } else {
                    //console.log('org added successfully!');
                    response.status(200).json('Successfully added event!');
                }
            })
        }
    });

    // TODO: Edit event
    // Edit event is going to be tricky. We're going to have to figure this out later
    // The problem is that every field can be changed. We need something from
    // request.query to look up that event in the collection, but "title" can change.
    // If you think you have a solution to this, go for it! Something that might work is if
    // we just keep track of how many insertions were done. Then we could have an eventID
    // = # insertions done so far + 1. That should be unique. However, getting this data
    // to persist will be difficult (we shut off the server, insertions done would reset to 0,
    // I'd imagine).
    /*app.post('/editEvent', async (request, response) => {
        let exists = false;
        await db.collection('Events').find({
            eventID : request.query.eventID
        }).toArray()
            .then((result) => {
                // if there's an event with that title already, then edit
                if (result.length > 0) {
                    exists = true;
                }
                else if (result.length == 0) {
                    response.status(400).json("Cannot edit an event that does not exist!")
                }
            })

        if (exists) { // only if the User does exist, edit it. (if it doesn't exists, don't edit it)
            console.log('Editing Event');

            await db.collection('Event').updateOne(
                { eventID: request.query.eventID },
                {
                    $set: {
                        organization: request.query.organization,
                        time: request.query.time,
                        title: request.query.title,
                        keywords: request.query.keywords,
                        description: request.query.description
                    },
                    $currentDate: { lastModified: true }
                },
                (err, result) => {
                    if (err) {
                        response.status(400).json('Failed to edit event');
                    } else {
                        response.status(200).json('Successfully edited Event!');
                    }
                })
        }
    });*/

    // delete event
    app.post('/deleteEvent', async (request, response) => {
    const name = request.body.name;
    // first look for the name
    let exists = false;
    await db.collection('Events').find({
        name : name
    }).toArray()
        .then((result) => {
            // if there's a club with that name already, then we can delete
            if (result.length > 0) {
                exists = true;
            }
            else {
                console.log("Event doesn't exist!")
                response.status(400).json("Can't delete an event that doesn't exist")
            }
        })

    if (exists) {
        await db.collection('Events').deleteOne({name: name}, (err, result) => {
            if (err) {
                console.log('Failed to delete org: ' + err);
                response.status(400).json('Failed to delete event');
            } else {
                //console.log('org deleted successfully!');
                response.status(200).json('Successfully deleted event!');
            }
        })
    }
});

    // ---------------------------------------------------------------------
    // ---------------------------- Org Queries ----------------------------
    // ---------------------------------------------------------------------

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
                // if there's a club with that name already, then we can delete
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

    // updates an org's information
    // to update the keywords in Postman you need to create different key, value pairs for each array entry.
    // Ex: key: keywords[0], value: Rocket
    app.post('/editOrg', async (request, response) => {
        let exists = false;
        await db.collection('Organizations').find({
            name : request.query.name
        }).toArray()
            .then((result) => {
                // if there's a club with that name already, don't add again
                if (result.length > 0) {
                    //response.status(400).json("Org already exists!")
                    exists = true;
                    console.log('Org exists');
                }
            })

        if (exists) { // only if the org exists do we attempt to update the information
            console.log('Editing org');
            await db.collection('Organizations').updateOne(
                { name : request.query.name },
                {
                    $set: {
                        description: request.query.description,
                        school : request.query.school,
                        keywords :request.query.keywords,
                    },
                    $currentDate: {
                        created: true
                    }
                },
                (err, result) => {
                    if (err) {
                        //console.log('Failed to delete org: ' + err);
                        response.status(400).json('Failed to  lol org');
                    } else {
                        //console.log('org deleted successfully!');
                        response.status(200).json('Successfully edited org!');
                    }
                })
        }
    });

    // Adds a User to the Org, only if the user and org exists and the user is not already in the org
    app.post('/addUserToOrg', async (request, response) => {
        let exists = false;
        let exists2 = false;
        let exists3 = false;
        // Check if the user exists
        await db.collection('Users').find({
            username : request.query.username
        }).toArray()
            .then((result) => {
                if (result.length > 0) {
                    exists = true;
                }
                else {
                    response.status(400).json("User does not exist!")
                }
            })

        // Check if the org exists
        await db.collection('Organizations').find({
            name : request.query.organization
        }).toArray()
            .then((result) => {
                if (result.length > 0) {
                    exists2 = true;
                }
                else {
                    response.status(400).json("Cannot add a User to an Org that doesn't exist!")
                }
            })

        // If the user and org exist, check if the User is already in tha Org
        if(exists && exists2) {
            await db.collection('Organizations').find({
                users : request.query.username
            }).toArray()
                .then((result) => {
                    if (result.length > 0) {
                        exists3 = true;
                        response.status(400).json("User already is in that org!")
                    }
                })
        }

        if (exists && exists2 && !exists3) { // Only if User exists and User is not already in that Org
            console.log('Adding User to Org');

            await db.collection('Organizations').updateOne(
                { name : request.query.organization },
                {
                    $push : {
                        users : request.query.username
                    },
                    $currentDate : {
                        created: true
                    }
                },
                (err, result) => {
                    if (err) {
                        response.status(400).json('Failed to add User to Org');
                    } else {
                        response.status(200).json('Successfully added User to Org!');
                    }
                })
        }
    });
    
    // Deletes a User from the Org, only if the user and org exists and the user is in the org
    app.post('/deleteUserFromOrg', async (request, response) => {
        let exists = false;
        let exists2 = false;
        let exists3 = false;
        // Check if the user exists
        await db.collection('Users').find({
            username : request.query.username
        }).toArray()
            .then((result) => {
                if (result.length > 0) {
                    exists = true;
                }
                else {
                    response.status(400).json("User does not exist!")
                }
            })

        // Check if the org exists
        await db.collection('Organizations').find({
            name : request.query.organization
        }).toArray()
            .then((result) => {
                if (result.length > 0) {
                    exists2 = true;
                }
                else {
                    response.status(400).json("Cannot delete a User from an Org that doesn't exist!")
                }
            })

        // If the user and org exist, check if the User is already in tha Org
        if(exists && exists2) {
            await db.collection('Organizations').find({
                users : request.query.username
            }).toArray()
                .then((result) => {
                    if (result.length > 0) {
                        exists3 = true;
                    }
                    else {
                        response.status(400).json("User is not in that org!")
                    }
                })
        }

        if (exists && exists2 && exists3) { // Only if User exists and User is in that Org
            console.log('Deleting User from Org');

            await db.collection('Organizations').updateOne(
                { name : request.query.organization },
                {
                    $pull : {
                        users : request.query.username
                    },
                    $currentDate : {
                        created: true
                    }
                },
                (err, result) => {
                    if (err) {
                        response.status(400).json('Failed to delete User from Org');
                    } else {
                        response.status(200).json('Successfully deleted User from Org!');
                    }
                })
        }
    });

    // Adds an Event to the Org, only if the event and org exists and the event is not already in the org
    app.post('/addEventToOrg', async (request, response) => {
        let exists = false;
        let exists2 = false;
        let exists3 = false;
        // Check if the event exists
        await db.collection('Events').find({
            eventID : request.query.id
        }).toArray()
            .then((result) => {
                if (result.length > 0) {
                    exists = true;
                }
                else {
                    response.status(400).json("Event does not exist!")
                }
            })

        // Check if the org exists
        await db.collection('Organizations').find({
            name : request.query.organization
        }).toArray()
            .then((result) => {
                if (result.length > 0) {
                    exists2 = true;
                }
                else {
                    response.status(400).json("Cannot add a Event to an Org that doesn't exist!")
                }
            })

        // If the user and org exist, check if the User is already in tha Org
        if(exists && exists2) {
            await db.collection('Organizations').find({
                events : request.query.id
            }).toArray()
                .then((result) => {
                    if (result.length > 0) {
                        exists3 = true;
                        response.status(400).json("Event already is in that org!")
                    }
                })
        }

        if (exists && exists2 && !exists3) { // Only if Event exists and Event is not already in that Org
            console.log('Adding Event to Org');

            await db.collection('Organizations').updateOne(
                { name : request.query.organization },
                {
                    $push : {
                        events : request.query.id
                    },
                    $currentDate : {
                        created: true
                    }
                },
                (err, result) => {
                    if (err) {
                        response.status(400).json('Failed to add Event to Org');
                    } else {
                        response.status(200).json('Successfully added Event to Org!');
                    }
                })
        }
    });

    // Deletes an Event from the Org, only if the event and org exists and the event is in the org
    app.post('/deleteEventFromOrg', async (request, response) => {
        let exists = false;
        let exists2 = false;
        let exists3 = false;
        // Check if the user exists
        await db.collection('Events').find({
            _id : request.query.id
        }).toArray()
            .then((result) => {
                if (result.length > 0) {
                    exists = true;
                }
                else {
                    response.status(400).json("Event does not exist!")
                }
            })

        // Check if the org exists
        await db.collection('Organizations').find({
            name : request.query.organization
        }).toArray()
            .then((result) => {
                if (result.length > 0) {
                    exists2 = true;
                }
                else {
                    response.status(400).json("Cannot delete an Event from an Org that doesn't exist!")
                }
            })

        // If the user and org exist, check if the User is already in tha Org
        if(exists && exists2) {
            await db.collection('Organizations').find({
                events : request.query.id
            }).toArray()
                .then((result) => {
                    if (result.length > 0) {
                        exists3 = true;
                    }
                    else {
                        response.status(400).json("Event is not in that org!")
                    }
                })
        }

        if (exists && exists2 && exists3) { // Only if User exists and User is in that Org
            console.log('Deleting Event from Org');

            await db.collection('Organizations').updateOne(
                { name : request.query.organization },
                {
                    $pull : {
                        events : request.query.id
                    },
                    $currentDate : {
                        created: true
                    }
                },
                (err, result) => {
                    if (err) {
                        response.status(400).json('Failed to delete Event from Org');
                    } else {
                        response.status(200).json('Successfully deleted Event from Org!');
                    }
                })
        }
    });


    // ----------------------------------------------------------------------
    // ---------------------------- User Queries ----------------------------
    // ----------------------------------------------------------------------

    // Returns a user given the username. If no user exists, returns an empty array.
    app.get('/getUser', (request, response) => {
        console.log("request params: " +  request.query.username);
        db.collection('Users').find({
            username: request.query.username
        })
            .toArray()
            .then((result) => {
                response.status(200).json(result)
            })
            .catch((error) => {
                response.status(400).send(error.message);
            })
    });

    // inserts a new user, only if there isn't another user with the same username
    app.post('/addUser', async (request, response) => {
        let exists = false;
        await db.collection('Users').find({
            username : request.query.username
        }).toArray()
            .then((result) => {
                // if there's a User with that name already, don't add again
                if (result.length > 0) {
                    response.status(400).json("Username is taken!")
                    exists = true;
                    console.log('Username is taken');
                }
            })

        if (!exists) { // only if the User does not exist, add it. (if it already exists, skip adding it)
            console.log('Adding User');
            let newUser =
                {
                    username: request.query.username,
                    password: request.query.password,
                    firstName: request.query.firstName,
                    lastName: request.query.lastName,
                    memberOrgs: [],
                    created: new Date(Date.now()).toISOString()
                };

            await db.collection('Users').insertOne(newUser, (err, result) => {
                if (err) {
                    //console.log('Failed to add org: ' + err);
                    response.status(400).json('Failed to add User');
                } else {
                    //console.log('org added successfully!');
                    response.status(200).json('Successfully added User!');
                }
            })
        }
    });

    // Edits a user, only if there is a user that is found given a username (can update everything but username)
    app.post('/editUser', async (request, response) => {
        let exists = false;
        await db.collection('Users').find({
            username : request.query.username
        }).toArray()
            .then((result) => {
                // if there's a User with that name already, it is okay to edit
                if (result.length > 0) {
                    exists = true;
                }
                else if (result.length == 0) {
                    response.status(400).json("Cannot edit a user that does not exist!")
                }
            })

        if (exists) { // only if the User does exist, edit it. (if it doesn't exists, don't edit it)
            console.log('Editing User');

            await db.collection('Users').updateOne(
                { username: request.query.username },
                {
                    $set: {
                        password: request.query.password,
                        firstName: request.query.firstName,
                        lastName: request.query.lastName
                    },
                    $currentDate: { lastModified: true }
                },
                (err, result) => {
                if (err) {
                    response.status(400).json('Failed to edit User');
                } else {
                    response.status(200).json('Successfully edited User!');
                }
            })
        }
    });

    // deletes a User by username, only if it exists
    app.post('/deleteUser', async (request, response) => {
        const username = request.query.username;
        // first look for the Username
        let exists = false;
        await db.collection('Users').find({
            username : username
        }).toArray()
            .then((result) => {
                // if there's a User with that name already, we can delete
                if (result.length > 0) {
                    exists = true;
                }
                else
                    response.status(400).json("Can't delete an User with a username that doesn't exist!")
            })

        if (exists) {
            await db.collection('Users').deleteOne({username: username}, (err, result) => {
                if (err) {
                    //console.log('Failed to delete User: ' + err);
                    response.status(400).json('Failed to delete User');
                } else {
                    //console.log('org deleted successfully!');
                    response.status(200).json('Successfully deleted User!');
                }
            })
        }
    });

    // Given a username and password, return true if the combination exists in the database (is correct). Otherwise, false
    app.get('/login', (request, response) => {
        db.collection('Users').find({
            username: request.body.username,
            password: request.body.password
        })
            .toArray()
            .then((result) => {
                if (result.length == 0) // if there are no results, return false
                    response.status(200).json('False');
                else
                    response.status(200).json('True');
            })
            .catch((error) => {
                response.status(400).send(error.message);
            })
    });

    // adds an org to the user, only if the user exists and the org is not already in the user
    app.post('/addOrgToUser', async (request, response) => {
        let exists = false;
        let exists2 = false;
        let exists3 = false;
        // Check if the user exists
        await db.collection('Users').find({
            username : request.query.username
        }).toArray()
            .then((result) => {
                if (result.length > 0) {
                    exists = true;
                }
                else {
                    response.status(400).json("Cannot add an org to a user that doesn't exist!")
                }
            })

        // Check if the org exists
        await db.collection('Organizations').find({
            name : request.query.organization
        }).toArray()
            .then((result) => {
                if (result.length > 0) {
                    exists3 = true;
                }
                else {
                    response.status(400).json("Org doesn't exist!")
                }
            })

        // If the user and org exist, check if the org is already in that user
        if(exists && exists3) {
            await db.collection('Users').find({
                username : request.query.username,
                memberOrgs : request.query.organization
            }).toArray()
                .then((result) => {
                    // if there's a User with that name already, don't add again
                    if (result.length > 0) {
                        exists2 = true;
                        response.status(400).json("User already is in that org!")
                    }
                })
        }

        if (exists && exists3 && !exists2) { // Only if User exists and User is not already in that Org
            console.log('Adding Org to User');
            await db.collection('Users').updateOne(
                { username : request.query.username },
                {
                    $push : {
                        memberOrgs : request.query.organization
                    },
                    $currentDate : {
                        created: true
                    }
                },
                (err, result) => {
                    if (err) {
                        response.status(400).json('Failed to add Org to User');
                    } else {
                        response.status(200).json('Successfully added Org to User!');
                    }
                })
        }
    });

    // deletes an org from a certain user, only if the user exists and the org is already in the user
    app.post('/deleteOrgFromUser', async (request, response) => {
        let exists = false;
        let exists2 = false;
        let exists3 = false;
        // Check if the user exists
        await db.collection('Users').find({
            username : request.query.username
        }).toArray()
            .then((result) => {
                if (result.length > 0) {
                    exists = true;
                }
                else {
                    response.status(400).json("Cannot delete an org from a user that doesn't exist!")
                }
            })

        // Check if the org exists
        await db.collection('Organizations').find({
            name : request.query.organization
        }).toArray()
            .then((result) => {
                if (result.length > 0) {
                    exists2 = true;
                }
                else {
                    response.status(400).json("Org doesn't exist!")
                }
            })

        // If the user and org exist, check if the org is already in that user
        if(exists && exists2) {
            await db.collection('Users').find({
                username : request.query.username,
                memberOrgs : request.query.organization
            }).toArray()
                .then((result) => {
                    // if there's a User with that name already, don't add again
                    if (result.length > 0) {
                        exists3 = true;
                    }
                    else {
                        response.status(400).json("User is not in that org!")
                    }
                })
        }

        if (exists && exists2 && exists3) { // Only if User and Org exists and User is in that Org
            console.log('Deleting Org From User');
            await db.collection('Users').updateOne(
                { username : request.query.username },
                {
                    $pull : {
                        memberOrgs : request.query.organization
                    },
                    $currentDate : {
                        created: true
                    }
                },
                (err, result) => {
                    if (err) {
                        response.status(400).json('Failed to delete Org from User');
                    } else {
                        response.status(200).json('Successfully deleted Org from User!');
                    }
                })
        }
    });

    // ----------------------------------------------------------------------
    // ------------------------- Notification Queries -----------------------
    // ----------------------------------------------------------------------

    // inserts a new notification regardless if something existed earlier.
    // Date should be input as ISO format but not necessary
    app.post('/addNotification', async (request, response) => {
        console.log('Adding Notification');
        let newNotification =
            {
                organization: request.query.organization,
                title: request.query.title,
                description: request.query.description,
                date: new Date(request.query.date),
                created: new Date(Date.now())
            };

        await db.collection('Notifications').insertOne(newNotification, (err, result) => {
            if (err) {
                //console.log('Failed to add org: ' + err);
                response.status(400).json('Failed to add notification');
            } else {
                //console.log('org added successfully!');
                response.status(200).json('Successfully added notification!');
            }
        })
    });

    // deletes a User by username, only if it exists
    app.post('/deleteNotification', async (request, response) => {
        const title = request.query.title;
        // first look for the Username
        let exists = false;
        await db.collection('Notifications').find({
            title : title
        }).toArray()
            .then((result) => {
                // if there's a Notification with that name already, we can delete
                if (result.length > 0) {
                    exists = true;
                }
                else
                    response.status(400).json("Can't delete a Notification with a title that doesn't exist!")
            })

        if (exists) {
            await db.collection('Notifications').deleteOne({title: title}, (err, result) => {
                if (err) {
                    //console.log('Failed to delete User: ' + err);
                    response.status(400).json('Failed to delete Notification');
                } else {
                    //console.log('org deleted successfully!');
                    response.status(200).json('Successfully deleted Notification!');
                }
            })
        }
    });

    //Gets back a today's notification and adds them to the getstreams API stream
    //Note: Doesn't add the right thing to the streams API
    app.get('/getNotification', (request, response) => {
        //console.log("request params: " +  request.query.username);
        const start = new Date();
        start.setHours(0,0,0,0);
        const end = new Date();
        end.setHours(23,59,59,999);
        db.collection('Notifications').find({
            date: {
                $gte: start,
                $lte: end
            }
        })
            .toArray()
            .then((result) => {
                console.log("Printing: " + JSON.stringify(result));

                const client = stream.connect(
                    'g3xp36f3dr8u',
                    'zb8k2ambvhu87y6hay6bn2bezk58dy3fpx2b3vqdjjcer26jed723nwkbabznj7b',
                );
                const notificationFeed = client.feed('user', 'notifications')
                notificationFeed.addActivity({
                    actor: 'notifications',
                    verb: 'attend',
                    object : item.title,
                    time: item.date,
                    foreign_id: 'im not sure'
                });
                response.status(200).json(result)
            })
            .catch((error) => {
                response.status(400).send(error.message);
            })
    });

    // Retrieve feed from Stream
    app.get('/feed', async (request, response) => {
        const client = stream.connect(
            'g3xp36f3dr8u',
            'zb8k2ambvhu87y6hay6bn2bezk58dy3fpx2b3vqdjjcer26jed723nwkbabznj7b',
        );
        //TODO: resolve undefined username from cookies!
        let timeline = client.feed('timeline', 'notifications');
        await timeline.follow('user', 'notifications');
        const feed = await timeline.get();
        console.log(feed);
        response.status(200).send(feed);
    });


});

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(4000, function () {
    console.log('Listening on port 4000!');
});