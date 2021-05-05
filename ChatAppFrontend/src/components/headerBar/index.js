import React, { useState } from 'react';
import {Nav, Navbar, NavDropdown} from 'react-bootstrap';
import { Redirect } from 'react-router';
import './headerBar.css'

const HeaderBar = () => {
  const [isLogout, setIsLogOut] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLogOut(true);
  };
  return isLogout ? (
    <Redirect to="/login" />
  ) : (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="#home">Chat App</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#link">Room</Nav.Link>
        </Nav>
        <NavDropdown
          title="Dropdown"
          id="basic-nav-dropdown"
          className="align-items-end"
        >
          <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
        </NavDropdown>
        {/* <Form inline>
      <FormControl type="text" placeholder="Search" className="mr-sm-2" />
      <Button variant="outline-success">Search</Button>
    </Form> */}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default HeaderBar;
