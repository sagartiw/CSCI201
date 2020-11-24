import React, {useContext, useEffect, useState} from "react";
//import {GlobalContext} from "../context/GlobalState";
import { Link } from 'react-router-dom';
import axios from 'axios';
import {
    ListGroup,
    ListGroupItem,
    Button, FormGroup, Label, Input, Form
} from "reactstrap";

export const SearchPanel = () =>{
    //const{events, removeEvent} = useContext(GlobalContext);
    const [searchQuery, setSearchQuery] = useState('');

    const loadEvents = () => {
        console.log("WE HAVE REACHED LOAD EVENTS");
        let url = "http://localhost:4000/lookupEventsByKeywords";
        axios.post(url, {
            "keywords": [searchQuery]
        })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    return (
        <>
            <div>
                <Form style={{maxWidth: "30rem", padding:"1rem"}}>
                    <FormGroup>
                        <Label>Search</Label>
                        <Input onChange={(e) => setSearchQuery(e.target.value)} value={searchQuery} type="text" placeholder="Enter Search Term"></Input>
                    </FormGroup>
                    <Button onClick={loadEvents}>Enter</Button>
                </Form>
            </div>

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
        </>
    )
}