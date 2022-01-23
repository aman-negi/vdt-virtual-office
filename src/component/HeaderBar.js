import React, { Component } from 'react';
import {Navbar, Nav, NavDropdown } from 'react-bootstrap';


class HeaderBar extends Component{
    render(){
        return(
            <div>

                    <Navbar collapseOnSelect fixed="top" expand="lg" bg="dark" variant="dark">
                    <Navbar.Brand href="#home">
                        VDT Enterprisies</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
                    
                        <Nav className="justify-content-end">
                            
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/#about">About</Nav.Link>
                        <NavDropdown title="Work" id="collasible-nav-dropdown">
                            <NavDropdown.Item href="/login">Sign In</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="/signup">Sign Up</NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link href="/blogs/RankingSystem">blogs</Nav.Link>
                        <Nav.Link href="/#contactus">Contact Us</Nav.Link>
                        </Nav>
                    
                    </Navbar.Collapse>
                    </Navbar>

            </div>
        )
    }
}

export default HeaderBar;