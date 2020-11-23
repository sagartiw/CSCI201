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

    return(
        <ListGroup className="mt-4">
            {allEvents.length > 0 ? (
                <>
                    {allEvents.map((allEvents) => (
                        <ListGroupItem className="d-flex" key={allEvents._id}>
                            <strong>{allEvents.name}</strong>
                            <div className="ml-auto">
                                <Link to={`/DetailEvent/${allEvents._id}`} color="success" className="btn btn-success mr-1">Details</Link>
                                <Link to={`/EditEvent/${allEvents._id}`} color="warning" className="btn btn-warning mr-1">Edit</Link>
                                <Button onClick={() => removeEvent(allEvents._id)} color="danger">Delete</Button>
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