import React, {useContext, useEffect, useState} from "react";
import {GlobalContext} from "../context/GlobalState";
import { Link } from 'react-router-dom';
import axios from 'axios';
import {
    ListGroup,
    ListGroupItem,
    Button, FormGroup, Label, Input, Form
} from "reactstrap";

export const SearchPanel = () =>{
    const{events, removeEvent} = useContext(GlobalContext);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState('');

    const loadEvents = () => {
        console.log("WE HAVE REACHED LOAD EVENTS");
        let url = "http://localhost:4000/lookupEventsByKeywords";
        axios.post(url, {
            "keywords": [searchQuery]
        })
        .then(function (response) {
            console.log(response);
            setSearchResults(response.data);
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

            <div className="md-form active-cyan active-cyan-2 mb-3">
                <input className="form-control" type="text" placeholder="Search" aria-label="Search"></input>
            </div>

            <ListGroup className="mt-4">
                {searchResults.length > 0 ? (
                    <>
                        {searchResults.map((searchResults) => (
                            <ListGroupItem className="d-flex" key={searchResults._id}>
                                <strong>{searchResults.name}</strong>
                                <div className="ml-auto">
                                    <Link to={`/DetailEvent/${searchResults._id}`} color="success" className="btn btn-success mr-1">Details</Link>
                                    <Link to={`/EditEvent/${searchResults._id}`} color="warning" className="btn btn-warning mr-1">Edit</Link>
                                    <Button onClick={() => removeEvent(searchResults._id)} color="danger">Delete</Button>
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