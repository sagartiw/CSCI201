import React from 'react';
import {NavbarPanel} from '../components/Navbar';
import {EventsPanel} from '../components/EventsPanel';

export const Home = () => {
    return(
        <div>
            <NavbarPanel/>
            <EventsPanel/>
        </div>
    );

}