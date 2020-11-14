import React from 'react';
import { Link } from 'react-router-dom';
import {
    Form,
    FormGroup,
    Label,
    Input,
    Button
} from 'reactstrap';
import {NavbarPanel} from "../components/Navbar";

export const EditEvent = () => {
    return(
        <div>
            <NavbarPanel/>
            <Form style={{maxWidth: "30rem", padding:"1rem"}}>
                <FormGroup>
                    <Label>Name</Label>
                    <Input type="text" placeholder="Enter Name"></Input>
                </FormGroup>
                <Button type="submit">Edit Name</Button>
                <Link to="/" className="btn btn-danger ml-2">Cancel</Link>
            </Form>
        </div>
    )
}