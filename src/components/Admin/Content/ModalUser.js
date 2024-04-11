// import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { FaCloudUploadAlt } from "react-icons/fa";
import { FcPlus } from "react-icons/fc";
import { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { toast } from 'react-toastify';
import { postCreateUser, putUpdateUser } from '../../../services/apiServices';
import _ from 'lodash';
function ModalUser(props) {
    const { show, setShow, loadUser, stateModal, dataUpdate, resetDataUpdate, dataView } = props;
    const handleClose = () => {
        setShow(false);
        setEmail("");
        setImage("");
        setPassword("");
        setPreviewImage("");
        setRole("USER");
        setUsername("");
        resetDataUpdate();
    };
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('USER');
    const [previewImage, setPreviewImage] = useState('');
    const [image, setImage] = useState('');
    const handleUploadImage = (e) => {
        if (e && e.target && e.target.files && e.target.files[0]) {
            setPreviewImage(URL.createObjectURL(e.target.files[0]));
            setImage(e.target.files[0]);
        } else {
            setPreviewImage('');
        }
    }
    const onDrop = useCallback(acceptedFiles => {
        setPreviewImage(URL.createObjectURL(acceptedFiles[0]));
        setImage(acceptedFiles[0]);
    }, [])
    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    useEffect(() => {
        if (stateModal === 'UPDATE' && !_.isEmpty(dataUpdate)) {
            setEmail(dataUpdate.email);
            setRole(dataUpdate.role);
            setUsername(dataUpdate.username);
            setImage("");
            if (dataUpdate.image) {
                setPreviewImage(`data:image/jpeg;base64,${dataUpdate.image}`);
            }
        } else if (stateModal === 'VIEW' && !_.isEmpty(dataView)) {
            setEmail(dataView.email);
            setRole(dataView.role);
            setUsername(dataView.username);
            setImage("");
            if (dataView.image) {
                setPreviewImage(`data:image/jpeg;base64,${dataView.image}`);
            }
        }
    }, [dataUpdate, dataView, stateModal])
    const handleSubmitCreateUser = () => {
        //validate
        const isValidEmail = validateEmail(email);
        if (!isValidEmail) {
            toast.error("Invalid Email !!!");
            return;
        }
        if (!password) {
            toast.error("Invalid Password !!!");
            return;
        }
        if (!username) {
            toast.error("Invalid Username !!!");
            return;
        }
        postCreateUser(email, password, username, role, image)
            .then(res => {
                if (res && res.EC === 0) {
                    toast.success("Create successfully !!!");
                    handleClose();
                    loadUser();
                } else if (res.EC === 1) {
                    toast.warning(res.EM);
                }
            }).catch(err => console.log(err));
    }
    const handleSubmitUpdateUser = () => {
        //validate
        if (!username) {
            toast.error("Invalid Username !!!");
            return;
        }
        putUpdateUser(username, role, image, dataUpdate.id)
            .then(res => {
                if (res && res.EC === 0) {
                    toast.success("Save successfully !!!");
                    handleClose();
                    loadUser();
                } else if (res.EC === 1) {
                    toast.warning(res.EM);
                }
            }).catch(err => console.log(err));
    }
    const { getRootProps, isDragActive, getInputProps } = useDropzone({ onDrop })
    return (
        <>
            <Modal
                size='xl'
                show={show}
                onHide={handleClose}
                backdrop={'static'}
                className='modal-adduser'>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {
                            stateModal !== '' && stateModal === 'ADD' ? "Add new user" : stateModal !== '' && stateModal === 'UPDATE' ? "Update user" : stateModal !== '' && stateModal === 'VIEW' ? "View user" : ""
                        }
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3">
                        <div className={stateModal === 'ADD' ? "col-md-6" : "col-md-12"}>
                            <label className="form-label">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                value={email}
                                disabled={stateModal === 'ADD' ? false : true}
                                placeholder='Enter email'
                                onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        {
                            stateModal === 'ADD' &&
                            <div className="col-md-6">
                                <label className="form-label">Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    value={password}
                                    placeholder='Enter password'
                                    onChange={(e) => setPassword(e.target.value)} />
                            </div>
                        }
                        <div className="col-md-6">
                            <label className="form-label">Username</label>
                            <input
                                type="text"
                                className="form-control"
                                value={username}
                                placeholder='Enter username'
                                onChange={(e) => setUsername(e.target.value)} />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Role</label>
                            <select className="form-select"
                                disabled={stateModal !== 'VIEW' ? false : true}
                                value={role}
                                onChange={(e) => setRole(e.target.value)}>
                                <option defaultValue={role} value={'USER'}>USER</option>
                                <option value={'ADMIN'}>ADMIN</option>
                            </select>
                        </div>
                        {
                            stateModal !== '' && stateModal !== 'VIEW' && <div className='col-md-12'>
                                <label className="form-label label-upload" htmlFor='Upload'><FcPlus /> Upload Image</label>
                                <input
                                    type='file'
                                    id='Upload'
                                    className='form-control'
                                    hidden
                                    {...getInputProps()}
                                    onChange={(e) => handleUploadImage(e)} />
                            </div>
                        }
                        <div className='col-md-12 img-preview'  {...(stateModal !== 'VIEW' ? getRootProps() : {})}>
                            {(previewImage !== '' && !isDragActive) ? (
                                <img src={previewImage} alt='' />
                            ) : isDragActive ? (
                                <p>Drop the files here ...</p>
                            ) : (
                                <span>
                                    <FaCloudUploadAlt size={'3em'} />
                                    <br />
                                    Drag & drop a file here, or click to select files
                                </span>
                            )}

                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    {
                        stateModal !== '' && stateModal !== 'VIEW' && <Button variant="primary" onClick={() => {
                            if (stateModal === 'ADD')
                                handleSubmitCreateUser()
                            else
                                handleSubmitUpdateUser()
                        }}>
                            {
                                stateModal === 'ADD' ? "Create" : "Save"
                            }
                        </Button>
                    }
                </Modal.Footer>
            </Modal >
        </>
    );
}
export default ModalUser