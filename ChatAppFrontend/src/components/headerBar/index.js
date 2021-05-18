import React, { useState } from 'react';
import {Nav, Navbar, NavDropdown} from 'react-bootstrap';
import { Redirect, useHistory } from 'react-router';
import './headerBar.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { Link } from 'react-router-dom';

const HeaderBar = () => {
  const [isLogout, setIsLogOut] = useState(false);
  const history = useHistory()

  const userInfo = JSON.parse(localStorage.getItem('userInfo')) && JSON.parse(localStorage.getItem('userInfo'))
  const handleProfile = () => {
    userInfo?.username && history.push(`/profile/${userInfo?.username}`)
  };
  const handleLogout = () => {
    localStorage.clear();
    setIsLogOut(true);
  };
  return isLogout ? (
    <Redirect to="/login" />
  ) : (
    <Navbar bg="light" expand="lg">
      <Link to='/message'><Navbar.Brand>Chat App</Navbar.Brand></Link>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
        </Nav>
        <NavDropdown
          title={userInfo?.username || 'User Information'}
          id="basic-nav-dropdown"
          className="align-items-end"
        >
          <NavDropdown.Item onClick={handleProfile}><FontAwesomeIcon icon={faUser} /> Your profile</NavDropdown.Item>
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
