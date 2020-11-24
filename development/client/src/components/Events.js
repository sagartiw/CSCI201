import React, {useContext, useEffect, useState} from "react";
import {GlobalContext} from "../context/GlobalState";
import { Link } from 'react-router-dom';
import axios from 'axios';
import {
    ListGroup,
    ListGroupItem,
    Button
} from "reactstrap";

export const EventsPanel = () => {
    const{ events, removeEvent } = useContext(GlobalContext);
    const [allEvents, setEvents] = useState('');

    useEffect(() => {
        let url = "http://localhost:4000/allEvents";
        axios.get(url)
            .then(function (response) {
                console.log(response.data);
                setEvents(response.data);
            })
    }, [])

    const onDelete = (name) => {
        let url = "http://localhost:4000/deleteEvent?name=" + name;
        axios.post(url, {
            name: name
        })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
        console.log("FINISHED DELETING")
    }

    return(
        <ListGroup className="mt-4">
            {allEvents.length > 0 ? (
                <>
                    {allEvents.map((allEvents) => (
                        <ListGroupItem className="d-flex" key={allEvents._id}>
                            <strong>{allEvents.name}</strong>
                            <div className="ml-auto">
                                <Link to={`/DetailEvent/${allEvents.name}`} color="success" className="btn btn-success mr-1">Details</Link>
                                <Link to={`/EditEvent/${allEvents.name}`} color="warning" className="btn btn-warning mr-1">Edit</Link>
                                {/*<Button onClick={() => removeEvent(allEvents.name)} color="danger">Delete</Button>*/}
                                <Button onClick={() => onDelete(allEvents.name)} color="danger">Delete</Button>
                            </div>
                        </ListGroupItem>
                    ))}
                </>
            ) : (
                <h4 className="text-center">No Events</h4>
            )}
        </ListGroup>
    )
}