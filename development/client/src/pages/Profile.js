import React, {useState, useContext, useEffect} from 'react';
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
import axios from "axios";

export const Profile = (props) => {
    const [name, setName] = useState('');
    const{ profile } = useContext(GlobalContext);
    const history = useHistory();
    const [userData, setUserData] = useState('');

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

    useEffect(() => {
        //use axios to make call to /getUser to get current user data by username
        let url = 'http://localhost:4000/getUser'
        axios.get(url, {params:{username: localStorage.getItem('username')}})
            .then(function(response) {
                console.log(response.data);
                setUserData(response.data[0]);
            })
    },[])

    return(

                <div className="card">

                        <NavbarPanel/>

                        <h1>Name: {userData.firstName + " " + userData.lastName}</h1>
                        <p>Email: {userData.email}</p>
                        <p>Description: {userData.description}</p>
                        <p>
                        </p>
                        <Link className="btn btn-primary" to={"/EditProfile"}>Edit Profile</Link>
                </div>

    )
}
