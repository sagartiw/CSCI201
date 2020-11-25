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

export const EditProfile = (props) => {
    const [user, setUserData] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [description, setDescription] = useState('');
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
        console.log("FINISHED SUBMITTING")
        history.push("/");
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

            {/*<Input type="text" name="name" onChange={onChangeName} placeholder="Name"></Input>*/}
            {/*<Input type="text" name="name" onChange={onChangeEmail} placeholder="Email"></Input>*/}
            {/*<Input type="text" name="name" onChange={onChangeDescription} placeholder="Description"></Input>*/}
            {/*<p>*/}
            {/*</p>*/}
            {/*<button className="btn btn-primary">Submit</button>*/}
            <Form onSubmit={onSubmit} style={{maxWidth: "30rem", padding:"1rem"}}>
                <>
                    <FormGroup>
                        <Label>First Name</Label>
                        <Input type="text" value={firstName} onChange={firstNameChange}></Input>
                    </FormGroup>
                    <FormGroup>
                        <Label>Last Name</Label>
                        <Input type="text" value={lastName} onChange={lastNameChange}></Input>
                    </FormGroup>
                    <FormGroup>
                        <Label>Password</Label>
                        <Input type="text" value={password} onChange={passwordChange}></Input>
                    </FormGroup>
                    <FormGroup>
                        <Label>Email</Label>
                        <Input type="text" name="Email" value={email} onChange={emailChange} placeholder={user.organization}></Input>
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