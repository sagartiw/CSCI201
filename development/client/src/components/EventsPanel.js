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
            <h1>Events List</h1>
            <div className="container-fluid padding mt-4 mb-4">
                <div className="row justify-content-center">
                    <div className="col-auto">
                        <table id="eventTable" className="table table-bordered table-hover table-responsive mt-4">
                            <thead>
                            <tr>
                                <th>Event Title</th>
                                <th>Date</th>
                                <th>Category</th>
                                <th>City</th>
                                <th>Event Details</th>
                                <th>Update Event</th>
                                <th>Delete Event</th>
                            </tr>
                            </thead>
                        </table>
                    </div>
                </div>
            </div>
            <ListGroup>
                <ListGroupItem className="d-flex">
                    <strong>User One</strong>
                    <div className="ml-auto">
                        <Link className="btn btn-warning mr-1" to="/EditEvent/1">Edit</Link>
                        <Button color="danger">Delete</Button>
                    </div>
                </ListGroupItem>

            </ListGroup>
        </>
    )
}