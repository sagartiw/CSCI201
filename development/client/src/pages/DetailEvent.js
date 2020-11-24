import React, {useState, useContext, useEffect} from 'react';
import { GlobalContext } from "../context/GlobalState";
import { Link, useHistory } from 'react-router-dom';
import {
    Form,
    FormGroup,
    Label,
    Input,
    Button
} from 'reactstrap';
import {NavbarPanel} from "../components/Navbar";
import axios from "axios";

export const DetailEvent = (props) => {
    const [selectedEvent, setSelectedEvent] = useState({
        name: ''
    });
    const{ events, editEvent } = useContext(GlobalContext);
    const history = useHistory();
    const currentEventName = props.match.params.name;

    useEffect(() => {
        let url = "http://localhost:4000/getEvent";
        axios.get(url)
            .then(function (response) {
                console.log(response.data);
                setSelectedEvent(response.data);
            })
    }, [currentEventName, events])


    return(
        <div>
            <NavbarPanel/>
            <Form style={{maxWidth: "30rem", padding:"1rem"}}>
                <FormGroup>
                    <Label>Name</Label>
                    <Input type="text" name="name" value={selectedEvent.name} placeholder="Enter Name"></Input>
                </FormGroup>
                <Link to="/" className="btn btn-danger ml-2">Cancel</Link>
            </Form>
        </div>
    )
}