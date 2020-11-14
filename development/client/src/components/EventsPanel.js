import React, {Component} from "react";
import { Link } from 'react-router-dom';
import {
    ListGroup,
    ListGroupItem,
    Button
} from "reactstrap";

export const EventsPanel = () => {
    return(
        <>
            <ListGroup className="mt-4">
                <ListGroupItem className="d-flex">
                    <strong>User One</strong>
                    <div className="ml-auto">
                        <Link className="btn btn-warning mr-1" to="/EditEvent/1">Edit</Link>
                        <Button color="danger">Delete</Button>
                    </div>
                </ListGroupItem>

                <ListGroupItem className="d-flex">
                    <strong>User Two</strong>
                    <div className="ml-auto">
                        <Link className="btn btn-warning mr-1" to="/EditEvent/2">Edit</Link>
                        <Button color="danger">Delete</Button>
                    </div>
                </ListGroupItem>

            </ListGroup>
        </>
    )
}