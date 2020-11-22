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

    const onSubmit = () => {
        const newEvent = {
            id: uuid,
            name
        }
        login(newEvent);
        history.push("/");

        let requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(payload)
        };
        let payload = {
            'username': username,
            'password': password
        };

        let url = "localhost:4000/login";

        fetch(url, requestOptions)
            .then((response) => {

                if(response.Json == 200)
                    localStorage.setItem('userName', null );

                if (response.Json == 400)
                    localStorage.setItem('userName', null );
            })

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
        <Input type="text" name="name" onChange={e => setUsername(e.target.value)} placeholder="Username"></Input>
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
