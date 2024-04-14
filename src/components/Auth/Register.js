import React, { useEffect, useState } from 'react'
import '../../styles/Register.scss';
import { useNavigate } from 'react-router-dom'
import { postRegister } from '../../services/apiServices';
import { toast } from 'react-toastify';
import { FaEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { useSelector } from 'react-redux';
const Register = (props) => {
    // const { } = props;
    const isAuthenticated = useSelector(state => state.user.isAuthenticated)
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [check, setCheck] = useState(false);
    const [showPass, setShowPass] = useState(false);
    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };
    useEffect(() => {
        if (isAuthenticated) {
            navigate('/');
        }
    }, [isAuthenticated, navigate])
    const handleRegister = async () => {
        if (!validateEmail(email)) {
            toast.error('Invalid Email');
            return;
        }
        if (!password) {
            toast.error('Invalid Password');
            return;
        }
        if (!check) {
            toast.error("You haven't accepted our policies and standards");
            return;
        }
        let data = await postRegister(email, password, username)
        if (data && data.EC === 0) {
            toast.success(data.EM);
            navigate('/login')
        } else if (data.EC !== 0) {
            toast.error(data.EM);
        }
    }
    const passwordField = document.getElementById('passwordField');
    const handleShowOrHidePass = () => {
        if (!showPass && passwordField && passwordField.type) {
            setShowPass(true);
            if (passwordField)
                passwordField.type = "text";
        } else {
            setShowPass(false);
            if (passwordField)
                passwordField.type = "password";
        }
    }
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleRegister(event);
        }
    };
    return (
        <div className='register-container'>
            <div className='header'>
                <span>Already have an account?</span>
                <button onClick={() => navigate('/login')}>Login</button>
            </div>
            <div className='title col-4 mx-auto'><b>Quiz Exam</b></div>
            <div className='welcome col-4 mx-auto'>Get better data with conversational forms, surveys,<br /> quizzes & more.</div>
            <div className='content-form col-4 mx-auto'>
                <div className='row'>
                    <div className='form-group col-6'>
                        <label>Email (*)</label>
                        <input type='email'
                            className='form-control'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            onKeyDown={(e) => handleKeyDown(e)} />
                    </div>
                    <div className='form-group col-6'>
                        <label>Password (*)</label>
                        <div className='input-password'>
                            <input type='password'
                                id='passwordField'
                                className='form-control'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                onKeyDown={(e) => handleKeyDown(e)} />
                            {
                                showPass ? <FaRegEyeSlash className='eye' onClick={() => handleShowOrHidePass()} /> : <FaEye className='eye' onClick={() => handleShowOrHidePass()} />
                            }
                        </div>
                    </div>
                </div>
                <div className='form-group col-12'>
                    <label>Username</label>
                    <input type='text'
                        className='form-control'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        onKeyDown={(e) => handleKeyDown(e)} />
                </div>
                <div className='form-group col-12 d-flex gap-2'>
                    <input type='checkbox' value={check} onChange={() => setCheck(!check)} />
                    <label>You have accepted our policies and standards</label>
                </div>
                <div>
                    <button className='btn btn-dark' onClick={() => handleRegister()}>Sign up</button>
                </div>
                <div className='text-center' onClick={() => navigate("/")}>
                    <span className='back'>&#60;&#60; Go to Homepage</span>
                </div>
            </div>
        </div>
    )
}

export default Register