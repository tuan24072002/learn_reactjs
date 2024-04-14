import React, { useEffect, useState } from 'react';
import '../../styles/Login.scss';
import { useNavigate } from 'react-router-dom'
import { postLogin } from '../../services/apiServices';
import { toast } from 'react-toastify';
import { FaEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { useDispatch } from 'react-redux';
import { doLogin } from '../../redux/action/userAction';
import { ImSpinner10 } from "react-icons/im";
import { useSelector } from 'react-redux';
const Login = (props) => {
    // const { } = props;
    const isAuthenticated = useSelector(state => state.user.isAuthenticated)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPass, setShowPass] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        if (isAuthenticated) {
            navigate('/');
        }
    }, [isAuthenticated, navigate])
    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };
    const handleLogin = async () => {
        if (!validateEmail(email)) {
            toast.error('Invalid Email');
            return;
        }
        if (!password) {
            toast.error('Invalid Password');
            return;
        }

        setIsLoading(true)
        let data = await postLogin(email, password)
        if (data && data.EC === 0) {
            dispatch(doLogin(data));
            toast.success(data.EM);
            setIsLoading(false);
            navigate('/');
        } else if (data.EC !== 0) {
            toast.error(data.EM);
            setIsLoading(false);
        }
    }
    const passwordField = document.getElementById('passwordField');
    const handleShowOrHidePass = () => {
        if (!showPass) {
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
            handleLogin(event);
        }
    };
    return (
        <div className='login-container'>
            <div className='header'>
                <span>Don't have an account yet?</span>
                <button onClick={() => navigate('/register')}>Sign up</button>
            </div>
            <div className='title col-4 mx-auto'><b>Quiz Exam</b></div>
            <div className='welcome col-4 mx-auto'>Hello, who’s this?</div>
            <div className='content-form col-4 mx-auto'>
                <div className='form-group'>
                    <label>Email</label>
                    <input type='email'
                        className='form-control'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onKeyDown={(e) => handleKeyDown(e)} />
                </div>
                <div className='form-group'>
                    <label>Password</label>
                    <div className='input-password'>
                        <input type='password'
                            id='passwordField'
                            value={password}
                            className='form-control'
                            onChange={(e) => setPassword(e.target.value)}
                            onKeyDown={(e) => handleKeyDown(e)} />
                        {
                            showPass ? <FaRegEyeSlash className='eye' onClick={() => handleShowOrHidePass()} /> : <FaEye className='eye' onClick={() => handleShowOrHidePass()} />
                        }

                    </div>
                </div>
                <span className='forgot-password'>Forgot password ?</span>
                <div>
                    <button
                        className='btn btn-dark'
                        onClick={() => handleLogin()}
                        disabled={isLoading}
                        onSubmit={() => handleLogin()}>
                        {isLoading && <ImSpinner10 className="loader-icon" />}
                        <span>Login</span>
                    </button>
                </div>
                <div className='text-center' onClick={() => navigate("/")}>
                    <span className='back'>&#60;&#60; Go to Homepage</span>
                </div>
            </div>
        </div>
    )
}

export default Login