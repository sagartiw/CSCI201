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

export const Profile = () => {
    const [name, setName] = useState('');
    const{ profile } = useContext(GlobalContext);
    const history = useHistory();

    const onSubmit = () => {
        const newEvent = {
            id: uuid,
            name
        }
        profile(newEvent);
        history.push("/");
    }

    const onChange = (e) =>{
        setName(e.target.value);
    }

    return(

                <div className="card">

                        <NavbarPanel/>

                        <h1>Name: </h1>
                        <p>Joined: </p>
                        <p>Email: </p>
                        <p>Description: </p>
                        <p>
                        </p>
                        <Link className="btn btn-primary" to={"/EditProfile"}>Edit Profile</Link>
                </div>

    )
}
