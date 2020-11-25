import axios from 'axios';
import React, {useState, useContext} from 'react';
import { GlobalContext } from "../context/GlobalState";
import { Link, useHistory } from 'react-router-dom';
<<<<<<< Updated upstream

import { NavbarPanel } from "../components/Navbar";

export const LoggedOut = () => {
=======
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
>>>>>>> Stashed changes
    const [name, setName] = useState('');
    const{ login } = useContext(GlobalContext);
    const history = useHistory();

<<<<<<< Updated upstream
    const [UserUsername, setUsername] = useState("");
    const [UserPassword, setPassword] = useState("");
=======
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
>>>>>>> Stashed changes
    const [attemptMessage, setAttemptMessage] = useState("");
    const [loginSuccess, setLoginSuccess] = useState(false);


<<<<<<< Updated upstream
=======

>>>>>>> Stashed changes
    return(

        <div>

            <NavbarPanel/>

<<<<<<< Updated upstream
            <h2>Loggged out! Thanks! </h2>

=======
            <h1>You are logged out. Thanks for coming!</h1>
>>>>>>> Stashed changes
        </div>

    )
}
