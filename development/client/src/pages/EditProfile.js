import React, {useState, useContext, useEffect} from 'react';
import { GlobalContext } from "../context/GlobalState";
import { Link, useHistory } from 'react-router-dom';
import {
    Form,
    FormGroup,
    Label,
    Input,
    Button
} from 'reactstrap';
import { NavbarPanel } from "../components/Navbar";
import axios from "axios";

export const EditProfile = (props) => {
    const [user, setUserData] = useState('');
    let [firstName, setFirstName] = useState('');
    let [lastName, setLastName] = useState('');
    let [password, setPassword] = useState('');
    let [email, setEmail] = useState('');
    let [description, setDescription] = useState('');
    const{ editProfile } = useContext(GlobalContext);
    const history = useHistory();

    useEffect(() => {
        let url = "http://localhost:4000/getUser";
        axios.get(url, {params:{username: localStorage.getItem('username')}})
            .then(function(response) {
                console.log(response.data);
                setUserData(response.data[0]);
            })
    },[])

    const onSubmit = () => {
        let url = "http://localhost:4000/editUser";
        if(firstName.length == 0) {
            firstName = user.firstName;
        }
        if(lastName.length == 0) {
            lastName = user.lastName;
        }
        if(password.length == 0) {
            password = user.password;
        }
        if(email.length == 0) {
            email = user.email;
        }
        if(description.length == 0) {
            description = user.description;
        }
        axios.post(url, {
            username: localStorage.getItem('username'),
            firstName: firstName,
            lastName: lastName,
            password: password,
            email: email,
            description: description
        })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
        history.go(0);
        console.log("FINISHED SUBMITTING")
        history.push("/Profile");
        window.location.replace("http://localhost:3000/Profile");
    }

    const firstNameChange = (e) =>{
        setFirstName(e.target.value);
    }

    const lastNameChange = (e) =>{
        setLastName(e.target.value);
    }

    const passwordChange = (e) => {
        setPassword(e.target.value);
    }

    const emailChange = (e) =>{
        setEmail(e.target.value);
    }

    const descriptionChange = (e) =>{
        setDescription(e.target.value);
    }

    return(

        <div>

            <NavbarPanel/>

            <h2>Edit Profile </h2>
            <p></p>

            <Form onSubmit={onSubmit} style={{maxWidth: "30rem", padding:"1rem"}}>
                <>
                    <FormGroup>
                        <Label>First Name</Label>
                        <Input type="text" value={firstName} onChange={firstNameChange} placeholder={user.firstName}></Input>
                    </FormGroup>
                    <FormGroup>
                        <Label>Last Name</Label>
                        <Input type="text" value={lastName} onChange={lastNameChange} placeholder={user.lastName}></Input>
                    </FormGroup>
                    <FormGroup>
                        <Label>Password</Label>
                        <Input type="text" value={password} onChange={passwordChange}></Input>
                    </FormGroup>
                    <FormGroup>
                        <Label>Email</Label>
                        <Input type="text" name="Email" value={email} onChange={emailChange} placeholder={user.email}></Input>
                    </FormGroup>
                    <FormGroup>
                        <Label>Description</Label>
                        <Input type="text" name="Description" value={description} onChange={descriptionChange} placeholder={user.description}></Input>
                    </FormGroup>

                    <Button type="submit">Submit</Button>
                    <Link to="/" className="btn btn-danger ml-2">Cancel</Link>
                </>
            </Form>
        </div>

    )
}