import React, { useCallback } from 'react'
import { FaCloudUploadAlt } from "react-icons/fa";
import { FcPlus } from "react-icons/fc";
import { useDropzone } from 'react-dropzone';
import { toast } from 'react-toastify';
import { postUpdateUser } from '../../../services/apiServices';
const UpdateProfile = (props) => {
    const { setPreviewImage, setImage, username, email, role, t, previewImage, setEmail, setUsername, setRole, image, handleClose, setProfileUser } = props
    const handleUploadImage = (e) => {
        if (e && e.target && e.target.files && e.target.files[0]) {
            setPreviewImage(URL.createObjectURL(e.target.files[0]));
            setImage(e.target.files[0]);
        } else {
            setPreviewImage('');
        }
    }
    const handleSubmitUpdateProfile = async (e) => {
        e.preventDefault();
        if (!username) {
            toast.error("Invalid Username !!!");
            return;
        }
        let res = await postUpdateUser(username, image)
        if (res && res.EC === 0) {
            toast.success(res.EM);
            setProfileUser([]);
            handleClose();
        } else {
            toast.error(res.EM);
        }
    }
    const onDrop = useCallback(acceptedFiles => {
        setPreviewImage(URL.createObjectURL(acceptedFiles[0]));
        setImage(acceptedFiles[0]);
    }, [setPreviewImage, setImage])
    const { getRootProps, isDragActive, getInputProps } = useDropzone({ onDrop })
    return (
        <>
            <form className="row g-3 modal-adduser" onSubmit={(e) => handleSubmitUpdateProfile(e)}>
                <div className={"col-md-12"}>
                    <label className="form-label">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        value={email}
                        placeholder={t(`users.enter-email`)}
                        onChange={(e) => setEmail(e.target.value)} disabled />
                </div>
                <div className="col-md-6">
                    <label className="form-label">{t(`users.username`)}</label>
                    <input
                        type="text"
                        className="form-control"
                        value={username}
                        placeholder={t(`users.enter-username`)}
                        onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div className="col-md-6">
                    <label className="form-label">{t(`users.role`)}</label>
                    <select className="form-select"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}>
                        <option defaultValue={role} value={'USER'}>USER</option>
                        <option value={'ADMIN'}>ADMIN</option>
                    </select>
                </div>
                <div className='col-md-12'>
                    <label className="form-label label-upload" htmlFor='Upload'><FcPlus /> {t(`users.upload`)}</label>
                    <input
                        type='file'
                        id='Upload'
                        className='form-control'
                        hidden
                        {...getInputProps()}
                        onChange={(e) => handleUploadImage(e)} />
                </div>
                <div className='col-md-12 img-preview'  {...getRootProps()}>
                    {(previewImage !== '' && !isDragActive) ? (
                        <img src={previewImage} alt='' />
                    ) : isDragActive ? (
                        <p>Drop the files here ...</p>
                    ) : (
                        <span>
                            <FaCloudUploadAlt size={'3em'} />
                            <br />
                            {t(`users.dropfile`)}
                        </span>
                    )}

                </div>
                <div className='d-flex justify-content-end mt-3'>
                    <button type='submit' className='btn btn-primary col-2'>Save</button>
                </div>
            </form>
        </>
    )
}

export default UpdateProfile