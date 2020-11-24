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
    const []

    useEffect( () => {
        let url = "http://localhost:4000/lookupEventsByKeywords";
        axios.post(url, {params: {keywords: userInput}})
    })
}