import React, {useContext, useEffect, useState} from "react";
import {GlobalContext} from "../context/GlobalState";
import { Link } from 'react-router-dom';
import axios from 'axios';
import {
    ListGroup,
    ListGroupItem,
    Button
} from "reactstrap";

export const SearchPanel = () =>{
    const{events, removeEvent} = useContext(GlobalContext);
    const [searchResults, setSearch] = useState('');

    useEffect( () => {
        let url = "http://localhost:4000/lookupEventsByKeywords";
        axios.post(url, {params: {keywords: userInput}})
    })

    axios.post('/user', {
        firstName: 'Fred',
        lastName: 'Flintstone'
    })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
}