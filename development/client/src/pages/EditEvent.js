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

export const EditEvent = (props) => {
    const [selectedEvent, setSelectedEvent] = useState({
        id: '',
        name: ''
    });
    const{ events, editEvent } = useContext(GlobalContext);
    const history = useHistory();
    const currentEventId = props.match.params.id;

    useEffect(() => {
        const eventId = currentEventId;
        const selectedEvent = events.find(event => event.id === eventId)
        setSelectedEvent(selectedEvent)
    }, [currentEventId, events])

    const onSubmit = () => {
        editEvent(selectedEvent);
        history.push("/");
    }

    const onChange = (e) =>{
        setSelectedEvent({...selectedEvent, [e.target.name]: e.target.value})
    }

    return(
        <div>
            <NavbarPanel/>
            <Form onSubmit={onSubmit} style={{maxWidth: "30rem", padding:"1rem"}}>
                <FormGroup>
                    <Label>Name</Label>
                    <Input type="text" name="name" value={selectedEvent.name} onChange={onChange} placeholder="Enter Name"></Input>
                </FormGroup>
                <Button type="submit">Edit Name</Button>
                <Link to="/" className="btn btn-danger ml-2">Cancel</Link>
            </Form>
        </div>
    )
}