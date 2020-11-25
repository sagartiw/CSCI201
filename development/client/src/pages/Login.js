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

    const [UserUsername, setUsername] = useState("");
    const [UserPassword, setPassword] = useState("");
    const [UserFirstName, setUserFirstName] = useState("");
    const [UserLastName, setUserLastName] = useState("");

    async function onSubmit(){

        let url = "http://localhost:4000/login";


        const res = await axios.get(url,{params: {username: 'JohnUsername', password: '123password'}});


        if (res.status == 200)
        {
            localStorage.setItem('username', UserUsername);
            window.location.replace("http://localhost:3000");
        }
        else {
            localStorage.setItem('username', null);
            window.location.reload(false);
        }



    }

    async function onRegister() {
        let url = "http://localhost:4000/addUser";

        const res = await axios.post(url, {username: UserUsername, password: UserPassword, firstName: UserFirstName, lastName: UserLastName});

        if(res.status === 200){
            localStorage.setItem('username', UserUsername);
            window.location.replace("http://localhost:3000");
        }
        else if(res.status === 400){
            alert("Username already exists!");
            localStorage.setItem('username', null);
            window.location.reload(false);
        }
        else{
            localStorage.setItem('username', null);
            window.location.reload(false);
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
            <Input type="text" name="name" onChange={e => setUserFirstName(e.target.value)} placeholder="First Name"></Input>
            <Input type="text" name="name" onChange={e => setUserLastName(e.target.value)} placeholder="Last Name"></Input>
            <p>
            </p>
            <button className="btn btn-primary" onClick={onRegister}>Register</button>
        </div>

    )
}
