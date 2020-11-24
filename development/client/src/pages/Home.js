import React from 'react';
import {NavbarPanel} from '../components/Navbar';
import {EventsPanel} from '../components/EventsPanel';
import {SearchPanel} from "../components/Search";

export const Home = () => {
    return(
        <div>
            <NavbarPanel/>
            <SearchPanel/>
            <EventsPanel/>
        </div>
    );
}