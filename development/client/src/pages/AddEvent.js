import React, {useState, useContext} from 'react';
import { GlobalContext } from "../context/GlobalState";
import { Link, useHistory } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import {
    Form,
    FormGroup,
    Label,
    Input,
    Button
} from 'reactstrap';
import { NavbarPanel } from "../components/Navbar";

export const AddEvent = () => {
    const [name, setName] = useState('');
    const [organization, setOrganization] = useState('');
    const [time, setTime] = useState('');
    const [desc, setDescription] = useState('');
    const{ addEvent } = useContext(GlobalContext);
    const history = useHistory();

    const onSubmit = () => {
        const newEvent = {
            id: uuid,
            name: name,
            organization: organization,
            time: time,
            description: desc
        }
        addEvent(newEvent);
        history.push("/");
    }

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

    return(
        <>
            <NavbarPanel/>
            <Form onSubmit={onSubmit} style={{maxWidth: "30rem", padding:"1rem"}}>
                <FormGroup>
                    <Label>Name</Label>
                    <Input type="text" value={name} onChange = {nameChange} placeholder="Enter Name"></Input>
                </FormGroup>

                <FormGroup>
                    <Label>Organization</Label>
                    <Input type="text" value={organization} onChange = {organizationChange} placeholder="Enter Organization"></Input>
                </FormGroup>

                <FormGroup>
                    <Label>Time</Label>
                    <Input type="text" value={time} onChange = {timeChange} placeholder="Enter Time"></Input>
                </FormGroup>

                <FormGroup>
                    <Label>Description</Label>
                    <Input type="text" value={desc} onChange = {descChange} placeholder="Enter Description"></Input>
                </FormGroup>

                <Button type="submit">Submit</Button>
                <Link to="/" className="btn btn-danger ml-2">Cancel</Link>
            </Form>

        </>
    )
}