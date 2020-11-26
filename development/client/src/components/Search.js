import React, {useContext, useState} from "react";
import {GlobalContext} from "../context/GlobalState";
import { Link } from 'react-router-dom';
import axios from 'axios';
import {
    ListGroup,
    ListGroupItem,
    Button, Input
} from "reactstrap";

export const SearchPanel = () =>{
    const{removeEvent} = useContext(GlobalContext);
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
                <Input onChange={(e) => setSearchQuery(e.target.value)} value={searchQuery} type="text" placeholder="Search by Keyword (lowercase only)"></Input>
                <Button color="success" size="lg" block onClick={loadEvents}>Search</Button>
            </div>

            <ListGroup className="mt-4">
                {searchResults.length > 0 ? (
                    <>
                        {searchResults.map((searchResults) => (
                            <ListGroupItem className="d-flex" key={searchResults._id}>
                                <strong>{searchResults.name}</strong>
                                <div className="ml-auto">
                                    <Link to={`/DetailEvent/${searchResults.name}`} color="success" className="btn btn-success mr-1">Details</Link>
                                    <Link to={`/EditEvent/${searchResults.name}`} color="warning" className="btn btn-warning mr-1">Edit</Link>
                                    <Button onClick={() => removeEvent(searchResults.name)} color="danger">Delete</Button>
                                </div>
                            </ListGroupItem>
                        ))}
                    </>
                ) : (
                    <h4 className="text-center">No Filtered Events</h4>
                )}
            </ListGroup>
            <hr></hr>
        </>
    )
}