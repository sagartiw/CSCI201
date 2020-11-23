import axios from 'axios';
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

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [attemptMessage, setAttemptMessage] = useState("");
    const [loginSuccess, setLoginSuccess] = useState(false);

    async function onSubmit(){




        let url = "localhost:4000/login";

        const res = await axios.get(url,{params: {username: 'JohnUsername', password: '123password'}});

        if (res.status == 200)
        {
            localStorage.setItem('username', username);
        }
        else {
            localStorage.setItem('username', null)
        }

        const onChange = (e) =>{
        setName(e.target.value);
    }

    }

    return(

    <div>

        <NavbarPanel/>

        <h2>Sign-in or Register! </h2>
        <p></p>
        <p>Login: </p>
        <Input type="text" name="name" onChange={e => setUsername(e.target.value)} placeholder="Username"></Input>
        <Input type="text" name="name" onChange={e => setPassword(e.target.value)} placeholder="Password"></Input>
        <p>
        </p>
        <button className="btn btn-primary" onClick={onSubmit}>Sign-in</button>

        <br></br>
        <br></br>
        <p>Register: </p>
        <Input type="text" name="name" onChange={e => setUsername(e.target.value)} placeholder="Username"></Input>
        <Input type="text" name="name" onChange={e => setPassword(e.target.value)} placeholder="Password"></Input>
        <p>
        </p>
        <button className="btn btn-primary">Register</button>
    </div>

    )
}
