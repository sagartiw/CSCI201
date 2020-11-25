import React, {useState, useContext} from 'react';
import { GlobalContext } from "../context/GlobalState";
import { useHistory } from 'react-router-dom';


import { NavbarPanel } from "../components/Navbar";

export const LoggedOut = () => {
    const [name, setName] = useState('');
    const{ login } = useContext(GlobalContext);
    const history = useHistory();


    const [UserUsername, setUsername] = useState("");
    const [UserPassword, setPassword] = useState("");
    const [attemptMessage, setAttemptMessage] = useState("");
    const [loginSuccess, setLoginSuccess] = useState(false);

    return(
        <div>
            <NavbarPanel/>
            <h2 className={"mt-2"}>Loggged out! Thanks! </h2>
        </div>
    )
}
