import React from 'react'
import video_homepage from '../../assets/audios/video-homepage.mp4';
const Home = () => {

    return (
        <div className='homepage-container'>
            <div className='homepage-video'>
                <video autoPlay loop muted>
                    <source src={video_homepage} type='video/mp4'></source>
                </video>
            </div>
            <div className='homepage-content'>
                <div className='title-1'>Make forms <br />
                    worth filling out</div>
                <div className='title-2'>Get more data—like signups, feedback, and anything else
                    —with forms designed to be <b>refreshingly different.</b></div>
                <div className='title-3'>
                    <button>Get started - it's free</button>
                </div>
            </div>
        </div>
    )
}

export default Home