const axios = require('axios');

export default (state, action) => {
    switch(action.type){
        case 'REMOVE_EVENT':
            // Axios explanation:
            // From my understanding, axios essentially sends an HTTP request to the backend.
            // In order to get this to work, make sure to npm start the front end and
            // nodemon the backend. When this code is triggered, Axios sends a POST
            // request to endpoint /deleteEvent with data action.payload. From there,
            // the back end takes over. Feel free to ask me (Sam) for more information!
            console.log(action.payload);
            axios({
                method: 'post',
                url: 'http://localhost:4000/deleteEvent',
                data: action.payload, // action.payload just looks like { id: v4(options, buf, offset), name: "Test" }
            }).catch(function (error) {
                console.log(error);
            });
            return {
                ...state,
                events: state.events.filter(event => {
                    return event.id !== action.payload;
                })
            }
        case 'ADD_EVENT':
            // Currently, add event doesn't work because the parameters of action.payload don't
            // match what addEvent is expecting (specifically, addEvent is expecting action.payload.title,
            // but only action.payload.name exists. just different names for the parameter). Nonetheless,
            // You can tell it is working by either checking the MongoDB database or checking the backend
            // console! We can fix this later pretty easily
            console.log(action.payload);
            console.log(action.payload.name);
            axios({
                method: 'post',
                url: 'http://localhost:4000/addEvent',
                data: action.payload,
            }).catch(function (error) {
                console.log(error);
        });

            return {
                ...state,
                events: [action.payload, ...state.events]
            }
        case 'EDIT_EVENT':
            const updateEvent = action.payload; // updateEvent.name is the name of the event
            const updateEvents = state.events.map(event =>{
                if(event.id === updateEvent.id){
                    return updateEvent;
                }
                return event;
            })

            return{
                events: updateEvents
            }

        default:
            return state;
    }
}