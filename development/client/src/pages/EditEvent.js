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

export const EditEvent = (props) => {
    const [name, setName] = useState('');
    let [organization, setOrganization] = useState('');
    let [time, setTime] = useState('');
    let [desc, setDescription] = useState('');
    let [keyword, setKeyword] = useState('');
    const [selectedEvent, setSelectedEvent] = useState('');
    const{ events, editEvent } = useContext(GlobalContext);
    const history = useHistory();
    const currentEventName = props.match.params.name;

    useEffect(() => {
        let url = "http://localhost:4000/getEvent?name=" + currentEventName;
        axios.get(url)
        .then(function (response) {
            console.log(response.data);
            setSelectedEvent(response.data);
        })
    }, [currentEventName, events])

    const nameChange = (e) =>{
        setName(e.target.value);
    }

    const organizationChange = (e) =>{
        setOrganization(e.target.value);
    }

    const timeChange = (e) =>{
        setTime(e.target.value);
    }

    const descChange = (e) =>{
        setDescription(e.target.value);
    }

    const keywordChange = (e) =>{
        setKeyword(e.target.value);
    }

    //Somehow adds a new event instead of properly editing.
    const onSubmit = () => {
        if(organization.length === 0) {
            organization = selectedEvent.organization;
        }
        if(time.length === 0) {
            time = selectedEvent.time;
        }
        if(desc.length === 0) {
            desc = selectedEvent.description;
        }
        let url = "http://localhost:4000/editEvent"
                    + "?name=" + currentEventName
                    + "&organization=" + organization
                    + "&time=" + new Date(time).toISOString()
                    + "&description=" + desc;
        axios.post(url)
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
        history.go(0);
        history.push("/");
        window.location.replace("http://localhost:3000");
    }

    const onSubmitKeyword = () => {
        let url = "http://localhost:4000/addKeyword"
            + "?name=" + currentEventName
            + "&keyword=" + keyword;
        axios.post(url)
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
        // history.go(0);
        // history.push("/");
        // window.location.replace("http://localhost:3000");
    }

    return(
        <div>
            <NavbarPanel/>
            {selectedEvent.length > 0 ? (
                <div>
                    <Form onSubmit={onSubmit} style={{maxWidth: "30rem", padding:"1rem"}}>
                            <>
                                {selectedEvent.map((selectedEvent) => (
                                    <FormGroup>
                                        <Label>Name</Label>
                                        <Input type="text" value={selectedEvent.name} onChange={nameChange}></Input>
                                    </FormGroup>
                                ))}
                                {selectedEvent.map((selectedEvent) => (
                                    <FormGroup>
                                        <Label>Organization</Label>
                                        <Input type="text" name="Organization" value={organization} onChange={organizationChange} placeholder={selectedEvent.organization}></Input>
                                    </FormGroup>
                                ))}
                                {selectedEvent.map((selectedEvent) => (
                                    <FormGroup>
                                        <Label>Time</Label>
                                        <Input type="text" name="Time" value={time} onChange={timeChange} placeholder={selectedEvent.time}></Input>
                                    </FormGroup>
                                ))}
                                {selectedEvent.map((selectedEvent) => (
                                    <FormGroup>
                                        <Label>Description</Label>
                                        <Input type="text" name="description" value={desc} onChange={descChange} placeholder={selectedEvent.description}></Input>
                                    </FormGroup>
                                ))}

                                <Button type="submit">Submit</Button>
                                <Link to="/" className="btn btn-danger ml-2">Cancel</Link>
                            </>
                    </Form>
                    <Form onSubmit={onSubmitKeyword} style={{maxWidth: "30rem", padding:"1rem"}}>
                        <>
                            {selectedEvent.map((selectedEvent) => (
                                <FormGroup>
                                    <Label>Keyword</Label>
                                    <Input type="text" name="keyword" value={keyword} onChange={keywordChange} placeholder="Add a keyword"></Input>
                                </FormGroup>
                            ))}

                            <Button type="submit">Add</Button>
                        </>
                    </Form>
                </div>

                ) : (
                <h4 className="text-center">Error finding event :(</h4>
                )}
            <Link to="/" className="btn btn-outline-primary ml-2 mt-2">Return Home</Link>
        </div>
    )
}