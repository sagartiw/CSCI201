import React, { useState } from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';

export const NavbarPanel = (props) => {
    const [collapsed, setCollapsed] = useState(true);

    const toggleNavbar = () => setCollapsed(!collapsed);

    return (
        <nav className="navbar navbar-expand-md navbar-light bg-light sticky-top mb-2">
            <div className="container-fluid">
                <a id="btn-click" className="navbar-brand" href="#">
                    <h1>HI THERE</h1>
                </a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarResponsive">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item active">
                            <a className="nav-link" href="#">HOME</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="learn.html">PROFILE</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}
