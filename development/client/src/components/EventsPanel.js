import React, {useContext} from "react";
import {GlobalContext} from "../context/GlobalState";
import { Link } from 'react-router-dom';
import {
    ListGroup,
    ListGroupItem,
    Button
} from "reactstrap";

export const EventsPanel = () => {
    const{ events, removeEvent } = useContext(GlobalContext);
    return(
        <ListGroup className="mt-4">
            {events.length > 0 ? (
                <>
                    {events.map(event => (
                        <ListGroupItem className="d-flex" key={event.id}>
                            <strong>{event.name}</strong>
                            <div className="ml-auto">
                                <Link to={`/DetailEvent/${event.id}`} color="success" className="btn btn-success mr-1">Details</Link>
                                <Link to={`/EditEvent/${event.id}`} color="warning" className="btn btn-warning mr-1">Edit</Link>
                                <Button onClick={() => removeEvent(event.id)} color="danger">Delete</Button>
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