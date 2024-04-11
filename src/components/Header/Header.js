import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
// import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink, useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();
  return (
    <Navbar expand="lg" className="bg-body-tertiary bg-light">
      <Container>
        <NavLink className='navbar-brand' to={"/"}>Quiz Exam</NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavLink className='nav-link' to={"/"}>Home</NavLink>
            <NavLink className='nav-link' to={"/users"}>User</NavLink>
            <NavLink className='nav-link' to={"/admins"}>Admin</NavLink>
          </Nav>
          <Nav className='d-flex gap-3'>
            <button className='btn-login' onClick={() => navigate("/login")}>Log in</button>
            <button className='btn-signup' onClick={() => navigate('/register')}>Sign up</button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;