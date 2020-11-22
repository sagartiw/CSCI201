import React from 'react';
import {useState} from 'react';
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


    function temp()
    {
        if (localStorage.getItem('username') != null)
            setIsLoggedIn(true);
        else setIsLoggedIn(false);
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
                       <Link className="btn btn-primary mr-1" to={"/Profile"}>My Profile</Link>
                   </NavItem>
                   }
                   {isLoggedIn == true &&
                   <NavItem>
                       <Link className="btn btn-primary" to={"/Login"}>Login</Link>
                   </NavItem>
                   }
               </Nav>
           </Container>
       </Navbar>
   )

}
