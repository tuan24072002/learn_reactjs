import React from 'react'
import { ImSpinner10 } from "react-icons/im";
const LoadingFetch = () => {
    return (
        <div className='d-flex gap-2 justify-content-center align-items-center vh-100'>
            <h3 className='text-secondary '>Loading...</h3>
            <ImSpinner10 className="loader-icon" size={'2em'} />
        </div>
    )
}

export default LoadingFetch 