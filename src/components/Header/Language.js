import React from 'react'
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useTranslation } from 'react-i18next';

const Language = () => {
    const { i18n } = useTranslation();
    const handleChangeLanguage = (language) => {
        i18n.changeLanguage(language)
    }
    return (
        <Nav className='ml-2'>
            <NavDropdown title={i18n.language === 'en' ? "English" : "Tiếng Việt"} id='basic-nav-dropdown2'>
                <NavDropdown.Item onClick={() => handleChangeLanguage('vi')}>Tiếng Việt</NavDropdown.Item>
                <NavDropdown.Item onClick={() => handleChangeLanguage('en')}>English</NavDropdown.Item>
            </NavDropdown>
        </Nav>
    )
}

export default Language