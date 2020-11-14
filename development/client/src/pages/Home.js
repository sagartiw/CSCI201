import React from 'react';
import {NavbarPanel} from '../components/Navbar';
import {EventsPanel} from '../components/EventsPanel';
import {Link} from "react-router-dom";

export const Home = () => {
    return(
        <div>
            <NavbarPanel/>
            <EventsPanel/>
        </div>
    );

}