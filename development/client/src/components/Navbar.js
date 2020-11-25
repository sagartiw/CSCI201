import React from 'react';
import {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import {
    Navbar,
    Nav,
    NavItem,
    NavbarBrand,
    Container
} from 'reactstrap';

export const NavbarPanel = () => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const loggedin = localStorage.getItem('username')
        console.log("username is " + localStorage.getItem('username'));
        if (loggedin != null) {
            setIsLoggedIn(true);
            console.log("user logged in");
        }
        else setIsLoggedIn(false);
    }, [])

    async function onLogOut()
    {
        localStorage.removeItem('username');

    }

   return(
       <Navbar className="mb-2" color="dark" dark>
           <Container>
               <NavbarBrand href={"/"}>StuOrgCentral</NavbarBrand>
               <Nav>
                   {isLoggedIn == true &&
                       <NavItem>
                           <Link className="btn btn-primary mr-1" to={"/AddEvent"}>Add Event</Link>
                       </NavItem>
                   }
                   {isLoggedIn == true &&
                       <NavItem>
                           <Link className="btn btn-primary mr-1" to={`/Profile`}>My Profile</Link>
                       </NavItem>
                   }
                   {isLoggedIn == true &&
                   <NavItem>
                       <Link className="btn btn-primary mr-1" onClick={onLogOut} to={`/LoggedOut`}>Log Out</Link>
                   </NavItem>
                   }


                   {isLoggedIn == false &&
                   <NavItem>
                       <Link className="btn btn-primary" to={`/Login`}>Login</Link>
                   </NavItem>
                   }
               </Nav>
           </Container>
       </Navbar>
   )

}
