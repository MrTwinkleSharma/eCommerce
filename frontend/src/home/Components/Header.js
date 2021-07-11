import React from 'react';
import {Navbar, Nav, NavDropdown, Form, FormControl, Button} from 'react-bootstrap';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css'
const Header = ()=>{

    return <>
    <Navbar bg="light" expand="lg">
    <Navbar.Brand href="#home">E-MarketPlace</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
        <Nav.Link href="#home">Home</Nav.Link>
        <Nav.Link href="#link">Authenticate</Nav.Link>
        <NavDropdown title="Explore" id="basic-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">Electronics</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">Health</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Beauty</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">Sports</NavDropdown.Item>
        </NavDropdown>
        </Nav>
        <Form inline>
        <FormControl type="text" placeholder="Search for Products, Brands, and More" className="mr-sm-2" style={{width:'400px'}}/>
        <Button variant="outline-success">Search</Button>
        </Form>
    </Navbar.Collapse>
    </Navbar>
  </>
}

export default Header;
