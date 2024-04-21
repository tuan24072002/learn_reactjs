import React, { useCallback, useEffect, useRef, useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import { getAllUser } from '../../services/apiServices';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import PerfectScrollbar from 'react-perfect-scrollbar';
import _ from 'lodash';
import '../../styles/ModalProfile.scss';
import UpdateProfile from './Profile/UpdateProfile';
import ChangePassword from './Profile/ChangePassword';
import History from './Profile/History';
const ModalProfile = (props) => {
    const { t } = useTranslation();
    const { show, setShow } = props;
    const account = useSelector(state => state.user.account);
    const [allUser, setAllUser] = useState([]);
    const [profileUser, setProfileUser] = useState([]);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('USER');
    const [previewImage, setPreviewImage] = useState('');
    const [image, setImage] = useState('');
    const [showPass, setShowPass] = useState(false);
    const passwordFieldRef = useRef(null);
    const newPasswordFieldRef = useRef(null);
    const confirmNewPasswordFieldRef = useRef(null);
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const handleClose = () => {
        setUsername('');
        setEmail('');
        setRole('');
        setPreviewImage('');
        setImage('');
        setPassword('');
        setConfirmNewPassword('');
        setNewPassword('');
        setShow(false);
    };
    const [activeTab, setActiveTab] = useState(1);
    const fetchDataUser = useCallback(async () => {
        let res = await getAllUser();
        if (res && res.EC === 0) {
            setAllUser(res.DT);
        } else {
            toast.error(res.EM);
        }
    }, [])
    useEffect(() => {
        if (!_.isEmpty(allUser)) {
            let data = allUser.find(i => i.email === account.email);
            setProfileUser(data);
        }
    }, [account.email, allUser])
    useEffect(() => {
        fetchDataUser();
        if (!email || !role || !username) {
            setUsername(profileUser.username);
            setEmail(profileUser.email);
            setRole(profileUser.role);
            if (profileUser.image) {
                setImage(profileUser.image);
                setPreviewImage(`data:image/jpeg;base64,${profileUser.image}`);
            }
        }
    }, [email, role, username, profileUser.email, profileUser.image, profileUser.role, profileUser.username, fetchDataUser])






    return (
        <Modal size='xl' show={show} onHide={handleClose} backdrop={'static'}>
            <Modal.Header closeButton>
                <Modal.Title>Manage User Profile</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <ul className="nav nav-tabs mb-3">
                    <li className="nav-item" onClick={() => setActiveTab(1)}>
                        <button className={`nav-link ${activeTab === 1 && 'active'}`}>
                            Main Profile
                        </button>
                    </li>
                    <li className="nav-item" onClick={() => setActiveTab(2)}>
                        <button className={`nav-link ${activeTab === 2 && 'active'}`}>
                            Change Password
                        </button>
                    </li>
                    <li className="nav-item" onClick={() => setActiveTab(3)}>
                        <button className={`nav-link ${activeTab === 3 && 'active'}`}>
                            History
                        </button>
                    </li>
                </ul>
                <div className="tab-content">
                    <div className={`tab-pane fade ${activeTab === 1 && 'show active'}`}>
                        <UpdateProfile
                            previewImage={previewImage}
                            setPreviewImage={setPreviewImage}
                            setImage={setImage}
                            username={username}
                            email={email}
                            role={role}
                            t={t}
                            setEmail={setEmail}
                            setUsername={setUsername}
                            setRole={setRole}
                            image={image}
                            handleClose={handleClose}
                            setProfileUser={setProfileUser} />
                    </div>
                    <div className={`tab-pane fade ${activeTab === 2 && 'show active'}`}>
                        <ChangePassword
                            handleClose={handleClose}
                            password={password}
                            setPassword={setPassword}
                            newPassword={newPassword}
                            setNewPassword={setNewPassword}
                            confirmNewPassword={confirmNewPassword}
                            setConfirmNewPassword={setConfirmNewPassword}
                            showPass={showPass}
                            setShowPass={setShowPass}
                            passwordFieldRef={passwordFieldRef}
                            newPasswordFieldRef={newPasswordFieldRef}
                            confirmNewPasswordFieldRef={confirmNewPasswordFieldRef} />
                    </div>
                    <div className={`tab-pane fade ${activeTab === 3 && 'show active'}`}>
                        <PerfectScrollbar>
                            <History />
                        </PerfectScrollbar>
                    </div>
                </div>
            </Modal.Body>
        </Modal >
    )
}

export default ModalProfile