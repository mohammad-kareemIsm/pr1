import React, { useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
export function Navigation() {
   const [isAuth, setIsAuth] = useState(false);
   useEffect(() => {
     if (localStorage.getItem('access_token') !== null) {
        setIsAuth(true); 
      }
    }, [isAuth]);
     return ( 
      <div>
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="/">QAW</Navbar.Brand>           
          <Nav className="me-auto"> 
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link as={Link} to="/help">Help</Nav.Link>
{/*           {isAuth ? <Nav.Link href="/">Home</Nav.Link> : null} */}
          </Nav>
          <Nav>
          <NavDropdown title={<i className="bi bi-person-circle"></i>} id="profile-dropdown" style={{ width: '50px', height: '50px' }}>
            <NavDropdown.Item as={Link} to="/profile">Profile</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/logout">Logout</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/changepassword">change password</NavDropdown.Item>
          </NavDropdown>
          <Nav.Link href="/login">Login</Nav.Link> 
         <Nav.Link href="/signup">Signup</Nav.Link>
{/*           {isAuth ? <Nav.Link href="/logout">Logout</Nav.Link> :  
                    <Nav.Link href="/login">Login</Nav.Link> && <Nav.Link href="/signup">Signup</Nav.Link>
          } */}
          </Nav>
          
        </Navbar>
       </div>
     );
}

export default Navigation