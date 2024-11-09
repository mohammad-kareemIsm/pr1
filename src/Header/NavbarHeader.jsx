import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function NavbarHeader() {
  return (
    <Navbar  fixed="top" expand="lg" className="bg-body-tertiary" dir='rtl'>
      <Container>
          <Nav className="justify-content-end">
            <Nav.Link href="#home">الصفحة الرئيسية</Nav.Link>
            <Nav.Link href="#link">تسجيل</Nav.Link>
          

          </Nav>
      </Container>
    </Navbar>
   
  );
}

export default NavbarHeader;