import React, {useState, useContext, useEffect} from 'react';
import { GlobalContext } from "../context/GlobalState";
import { Link, useHistory } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import {
    Form,
    FormGroup,
    Label,
    Input,
    Button, Col, ListGroupItem, ListGroup
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

                <div>


                        <NavbarPanel/>
                    <ListGroup className="mt-4">
                        <ListGroupItem className="d-flex">
                            <Col xs="6"><strong>Username</strong></Col>
                            <Col xs="6">{userData.username}</Col>
                        </ListGroupItem>
                        <ListGroupItem className="d-flex">
                            <Col xs="6"><strong>Password</strong></Col>
                            <Col xs="6">{userData.password}</Col>
                        </ListGroupItem>
                        <ListGroupItem className="d-flex">
                            <Col xs="6"><strong>Name</strong></Col>
                            <Col xs="6">{userData.firstName + " " + userData.lastName}</Col>
                        </ListGroupItem>
                        <ListGroupItem className="d-flex">
                            <Col xs="6"><strong>Email</strong></Col>
                            <Col xs="6">{userData.email}</Col>
                        </ListGroupItem>
                        <ListGroupItem className="d-flex">
                            <Col xs="6"><strong>Description</strong></Col>
                            <Col xs="6">{userData.description}</Col>
                        </ListGroupItem>
                    </ListGroup>

                    <Link className="btn btn-outline-primary mt-2" to={"/EditProfile"}>Edit Profile</Link>
                </div>

    )
}
