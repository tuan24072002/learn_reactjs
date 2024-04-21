import React from 'react'
import video_homepage from '../../assets/audios/video-homepage.mp4';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next';
const Home = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const isAuthenticated = useSelector(state => state.user.isAuthenticated)
    return (
        <div className='homepage-container'>
            <div className='homepage-content'>
                <div className='title-1'>
                    <div dangerouslySetInnerHTML={{ __html: t('homepage.title1') }} />
                </div>
                <div className='title-2'>
                    <div dangerouslySetInnerHTML={{ __html: t('homepage.title2') }} />
                </div>
                <div className='title-3'>
                    {isAuthenticated
                        ? <button onClick={() => navigate('/users')}>{t('homepage.title3_1')}</button>
                        : <button onClick={() => navigate('/login')}>{t('homepage.title3_2')}</button>}
                </div>
            </div>
            <div className='homepage-video'>
                <video autoPlay loop muted>
                    <source src={video_homepage} type='video/mp4'></source>
                </video>
            </div>
        </div>
    )
}

export default Home