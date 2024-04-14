import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
// import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
function Header() {
  const navigate = useNavigate();
  const isAuthenticated = useSelector(state => state.user.isAuthenticated)
  const account = useSelector(state => state.user.account)
  const handleLogout = () => {
    localStorage.removeItem('persist:root');
    window.location.replace('/login');
  }
  return (
    <Navbar expand="lg" className="bg-body-tertiary bg-light">
      <Container>
        <NavLink className='navbar-brand' to={"/"}>Quiz Exam</NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavLink className='nav-link' to={"/"}>Home</NavLink>
            <NavLink className='nav-link' to={"/users"}>User</NavLink>
            {
              account.role === 'ADMIN' && <NavLink className='nav-link' to={"/admins"}>Admin</NavLink>
            }
          </Nav>
          <Nav className='d-flex gap-3'>
            {
              isAuthenticated && isAuthenticated === true ?
                <>
                  <NavDropdown title={account.username} id='basic-nav-dropdown'>
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                    <NavDropdown.Item onClick={() => handleLogout()}>Log out</NavDropdown.Item>
                  </NavDropdown>
                </> :
                <>
                  <button className='btn-login' onClick={() => navigate("/login")}>Log in</button>
                  <button className='btn-signup' onClick={() => navigate('/register')}>Sign up</button>
                </>
            }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;