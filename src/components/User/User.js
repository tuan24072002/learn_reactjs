import React from 'react'
import ListQuiz from './ListQuiz'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const User = () => {
    const isAuthenticated = useSelector(state => state.user.isAuthenticated)
    return (
        <div>
            {
                isAuthenticated ? <ListQuiz /> :
                    <div className='alert alert-danger container mt-5 d-flex justify-content-center flex-column border'>
                        <h3>You aren't logged in</h3>
                        <Link to={'/login'}>Go to login &gt;&gt;</Link>
                    </div>
            }
        </div>
    )
}

export default User