import React from 'react';
import {NavbarPanel} from '../components/Navbar';
import {EventsPanel} from '../components/Events';
import {SearchPanel} from "../components/Search";
import axios from "axios";

export const Home = () => {

    return(
        <div>
            <NavbarPanel/>
            <SearchPanel/>
            <EventsPanel/>
        </div>
    );
}