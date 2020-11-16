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

export const Login = () => {
    const [name, setName] = useState('');
    const{ login } = useContext(GlobalContext);
    const history = useHistory();

    const onSubmit = () => {
        const newEvent = {
            id: uuid,
            name
        }
        login(newEvent);
        history.push("/");
    }

    const onChange = (e) =>{
        setName(e.target.value);
    }

    return(

    <div>

        <NavbarPanel/>

        <h2>Sign-in or Register! </h2>
        <p></p>
        <p>Login: </p>
        <Input type="text" name="name" onChange={onChange} placeholder="Username"></Input>
        <Input type="text" name="name" onChange={onChange} placeholder="Password"></Input>
        <p>
        </p>
        <button className="btn btn-primary">Sign-in</button>
        <br></br>
        <br></br>
        <p>Register: </p>
        <Input type="text" name="name" onChange={onChange} placeholder="Username"></Input>
        <Input type="text" name="name" onChange={onChange} placeholder="Password"></Input>
        <p>
        </p>
        <button className="btn btn-primary">Register</button>
    </div>

    )
}
