import React, {useState, useContext, useEffect} from 'react';
import { GlobalContext } from "../context/GlobalState";
import { Link, useHistory } from 'react-router-dom';
import {
    Form,
    FormGroup,
    Label,
    Input,
    Button, ListGroupItem, ListGroup, Col
} from 'reactstrap';
import {NavbarPanel} from "../components/Navbar";
import axios from "axios";

export const DetailEvent = (props) => {
    // const{ events, editEvent } = useContext(GlobalContext);
    const [selectedEvent, setSelectedEvent] = useState('');
    // const history = useHistory();
    const currentEventName = props.match.params.name;

    useEffect(() => {
        let url = "http://localhost:4000/getEvent?name=" + currentEventName;
        axios.get(url)
            .then(function (response) {
                console.log(response.data);
                setSelectedEvent(response.data);
            })
    }, [])


    return(
        <div>
            <NavbarPanel/>
            <ListGroup className="mt-4">
                {selectedEvent.length > 0 ? (
                    <>
                        {selectedEvent.map((selectedEvent) => (
                            <ListGroupItem className="d-flex">
                                <Col xs="6"><strong>Name</strong></Col>
                                <Col xs="6">{selectedEvent.name}</Col>
                            </ListGroupItem>
                        ))}
                        {selectedEvent.map((selectedEvent) => (
                            <ListGroupItem className="d-flex">
                                <Col xs="6"><strong>Organization</strong></Col>
                                <Col xs="6">{selectedEvent.organization}</Col>
                            </ListGroupItem>
                        ))}
                        {selectedEvent.map((selectedEvent) => (
                            <ListGroupItem className="d-flex">
                                <Col xs="6"><strong>Description</strong></Col>
                                <Col xs="6">{selectedEvent.description}</Col>
                            </ListGroupItem>
                        ))}
                    </>
                ) : (
                    <h4 className="text-center">No Events</h4>
                )}
            </ListGroup>
            <Link to="/" className="btn btn-outline-primary mr-2 mt-2">Return Home</Link>
        </div>
    )
}