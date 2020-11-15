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
    const{ addEvent } = useContext(GlobalContext);
    const history = useHistory();

    const onSubmit = () => {
        const newEvent = {
            id: uuid,
            name
        }
        addEvent(newEvent);
        history.push("/");
    }

    const onChange = (e) =>{
        setName(e.target.value);
    }

    return(
        <>
            <NavbarPanel/>
            <Form onSubmit={onSubmit} style={{maxWidth: "30rem", padding:"1rem"}}>
                <FormGroup>
                    <Label>Name</Label>
                    <Input type="text" value={name} onChange = {onChange} placeholder="Enter Name"></Input>
                </FormGroup>
                <Button type="submit">Submit</Button>
                <Link to="/" className="btn btn-danger ml-2">Cancel</Link>
            </Form>
        </>
    )
}