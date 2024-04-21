import React, { useState } from 'react'
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { postLogout } from '../../services/apiServices';
import { toast } from 'react-toastify';
import { doLogout } from '../../redux/action/userAction';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ModalProfile from '../User/ModalProfile';

const Setting = (props) => {
    const [show, setShow] = useState(false);
    const navigate = useNavigate();
    const { t } = useTranslation();
    const account = useSelector(state => state.user.account)
    const isAuthenticated = useSelector(state => state.user.isAuthenticated)
    const dispatch = useDispatch();
    const handleLogout = async () => {
        let res = await postLogout(account.email, account.refresh_token);
        if (res && res.EC === 0) {
            dispatch(doLogout());
            toast.success(res.EM);
            navigate('/login');
        } else {
            toast.error(res.EM);
        }
    }

    return (
        <>
            <Nav className='d-flex gap-3'>
                {
                    isAuthenticated && isAuthenticated === true ?
                        <>
                            <NavDropdown title={account.username} id='basic-nav-dropdown'>
                                <NavDropdown.Item onClick={() => setShow(true)}>{t('header.profile')}</NavDropdown.Item>
                                <NavDropdown.Item onClick={() => handleLogout()}>{t('header.logout')}</NavDropdown.Item>
                            </NavDropdown>
                        </> :
                        <>
                            <button className='btn-login' onClick={() => navigate("/login")}>{t('header.login')}</button>
                            <button className='btn-signup' onClick={() => navigate('/register')}>{t('header.signup')}</button>
                        </>
                }
            </Nav>
            <ModalProfile show={show} setShow={setShow} />
        </>
    )
}

export default Setting