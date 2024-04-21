import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';
import Language from './Language';
import { useTranslation } from 'react-i18next';
import Setting from './Setting';
import { useSelector } from 'react-redux';
import { DiReact } from "react-icons/di";
function Header() {
  const account = useSelector(state => state.user.account)
  const { t } = useTranslation();
  return (
    <Navbar expand="lg" className="bg-body-tertiary bg-light">
      <Container>
        <NavLink className='navbar-brand d-flex align-items-center' to={"/"}><DiReact size={"1.5em"} color='00bfff' className='icon-brand' />{t('header.brand')}</NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavLink className='nav-link' to={"/"}>{t('header.nav1')}</NavLink>
            <NavLink className='nav-link' to={"/users"}>{t('header.nav2')}</NavLink>
            {
              account.role === 'ADMIN' && <NavLink className='nav-link' to={"/admins"}>{t('header.nav3')}</NavLink>
            }
          </Nav>
          <Setting />
          <Language />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;