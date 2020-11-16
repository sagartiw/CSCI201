import React from 'react';
import { Link } from 'react-router-dom';
import {
    Navbar,
    Nav,
    NavItem,
    NavbarBrand,
    Container
} from 'reactstrap';

export const NavbarPanel = () => {
   return(
       <Navbar className="mb-2" color="dark" dark>
           <Container>
               <NavbarBrand href={"/"}>StuOrgCentral</NavbarBrand>
               <Nav>
                   <NavItem>
                       <Link className="btn btn-primary" to={"/AddEvent"}>Add Event</Link>
                   </NavItem>
                   <NavItem>
                       <Link className="btn btn-primary" to={"/Profile"}>My Profile</Link>
                   </NavItem>
               </Nav>
           </Container>
       </Navbar>
   )

}
