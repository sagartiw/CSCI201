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

export const EditProfile = () => {
    const [name, setName] = useState('');
    const{ editProfile } = useContext(GlobalContext);
    const history = useHistory();

    const onSubmit = () => {
        const newEvent = {
            id: uuid,
            name
        }
        editProfile(newEvent);
        history.push("/");
    }

    const onChange = (e) =>{
        setName(e.target.value);
    }

    return(

                <div>

                    <NavbarPanel/>

                    <h2>Edit Profile </h2>
                    <p></p>

                    <Input type="text" name="name" onChange={onChange} placeholder="Name"></Input>
                    <Input type="text" name="name" onChange={onChange} placeholder="Email"></Input>
                    <Input type="text" name="name" onChange={onChange} placeholder="Description"></Input>
                    <p>
                    </p>
                    <button className="btn btn-primary">Submit</button>
                </div>

    )
}