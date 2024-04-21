import React, { useState } from 'react'
import { FaEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { postChangePasswordUser } from '../../../services/apiServices';
import { toast } from 'react-toastify';
const ChangePassword = (props) => {
    const { passwordFieldRef, newPasswordFieldRef, confirmNewPasswordFieldRef, showPass, setShowPass, password, setPassword, newPassword, setNewPassword, confirmNewPassword, setConfirmNewPassword, handleClose } = props
    const [isSubmit, setIsSubmit] = useState(false);
    const handleShowOrHidePass = () => {
        const fields = [
            passwordFieldRef.current,
            newPasswordFieldRef.current,
            confirmNewPasswordFieldRef.current
        ];
        fields.forEach(field => {
            if (field) {
                field.type = showPass ? "password" : "text";
            }
        });

        setShowPass(!showPass);
    }
    const handleSubmitChangePassword = async (e) => {
        e.preventDefault();
        setIsSubmit(true)
        if (!password || !newPassword || !confirmNewPassword) {
            return;
        }
        if (newPassword === password) {
            toast.warning(`The password and new password do not change !`);
            return;
        }
        if (confirmNewPassword === newPassword) {
            let res = await postChangePasswordUser(password, newPassword);
            if (res && res.EC === 0) {
                toast.success(res.EM);
                handleClose();
            } else {
                toast.error(res.EM);
            }
        } else {
            toast.error("Confirm new password does not match !");
        }
    }
    return (
        <>
            <form className="row g-3 content-form" onSubmit={(e) => handleSubmitChangePassword(e)}>
                <div className={"col-md-12"}>
                    <label className="form-label">Current password (*)</label>
                    <div className='input-password'>
                        <input
                            id='passwordField'
                            type="password"
                            ref={passwordFieldRef}
                            className={`form-control ${!password && isSubmit && 'is-invalid'}`}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} />
                        {
                            showPass ? <FaRegEyeSlash className='eye'
                                onClick={() => {
                                    handleShowOrHidePass()
                                }} /> : <FaEye className='eye'
                                    onClick={() => {
                                        handleShowOrHidePass()
                                    }} />
                        }
                    </div>
                </div>
                <div className="col-md-6">
                    <label className="form-label">New password (*)</label>
                    <div className='input-password'>
                        <input
                            id='newPasswordField'
                            type="password"
                            ref={newPasswordFieldRef}
                            className={`form-control ${!newPassword && isSubmit && 'is-invalid'}`}
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)} />
                        {
                            showPass ? <FaRegEyeSlash className='eye' onClick={() => {
                                handleShowOrHidePass()
                            }} /> : <FaEye className='eye' onClick={() => {
                                handleShowOrHidePass()
                            }} />
                        }
                    </div>
                </div>
                <div className="col-md-6">
                    <label className="form-label">Confirm new password (*)</label>
                    <div className='input-password'>
                        <input
                            id='confirmNewPasswordField'
                            type="password"
                            ref={confirmNewPasswordFieldRef}
                            className={`form-control ${!confirmNewPassword && isSubmit && 'is-invalid'}`}
                            value={confirmNewPassword}
                            onChange={(e) => setConfirmNewPassword(e.target.value)} />
                        {
                            showPass ? <FaRegEyeSlash className='eye' onClick={() => {
                                handleShowOrHidePass()
                            }} /> : <FaEye className='eye' onClick={() => {
                                handleShowOrHidePass()
                            }} />
                        }
                    </div>
                </div>
                <div className='d-flex justify-content-end mt-3'>
                    <button type='submit' className='btn btn-warning col-2'>Save</button>
                </div>
            </form>
        </>
    )
}

export default ChangePassword