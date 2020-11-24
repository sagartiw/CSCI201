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
        </>
    )
}