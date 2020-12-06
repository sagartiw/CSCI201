import React, {Component} from 'react';
import {NavbarPanel} from '../components/Navbar';
import {EventsPanel} from '../components/Events';
import {SearchPanel} from "../components/Search";
import axios from "axios";
import { useAlert } from 'react-alert';

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            'notifications' : [],
        };
        this.renderMyData = this.renderMyData.bind(this);
    }

    componentDidMount() {
        this.renderMyData();
    }

    renderMyData() {
        let url = "http://localhost:4000/feed";
        axios.get(url)
            .then((response) => {
                this.setState({ 'notifications' : response.data})
                /*for(let i = 0; i < this.state.notifications.length; i++) {
                    window.alert("You have an event: " + this.state.notifications[i]);
                }*/
                window.alert("You have an event: " + this.state.notifications[0] + "\nThere may be more alerts, but they have been suppressed in this version of our application.");
            })
        console.log("HERE: " + this.state.notifications);
    }


        render() {
        return(
            <div>
                <NavbarPanel/>
                <SearchPanel/>
                <EventsPanel/>
            </div>
        );
    }
}

export default Home;