import React, { useEffect, useState } from 'react'
import { getQuizByUser } from '../../services/apiServices';
import '../../styles/ListQuiz.scss'
import { useNavigate } from 'react-router-dom'
import Loading from '../LoadingFetch';
import { useTranslation } from 'react-i18next';

const ListQuiz = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [arrQuiz, setArrQuiz] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        setIsLoading(true);
        getDataQuiz();
    }, [])
    const getDataQuiz = async () => {
        let res = await getQuizByUser();
        if (res && res.EC === 0) {
            setArrQuiz(res.DT);
            setIsLoading(false);
        }
    }
    return (
        isLoading ? <Loading />
            : <div className='list-quiz-container container'>
                {
                    arrQuiz.length > 0 ? arrQuiz.map((data, index) => {
                        return (
                            <div className="card" style={{ width: "18rem" }} key={`${index}-quiz`}>
                                <div className='card-image'>
                                    <img src={`data:image/jpeg;base64,${data.image}`} alt="..." />
                                </div>
                                <div className="card-body">
                                    <h5 className="card-title">{t(`users.quiz`)} {index + 1}</h5>
                                    <p className="card-text">{data.description}</p>
                                    <button
                                        onClick={() => navigate(`/quiz/${data.id}`, { state: { quizTitle: data.description } })}
                                        className="btn btn-primary btn-start-now">{t(`users.start`)}</button>
                                </div>
                            </div>
                        )
                    }) : <div className='alert alert-warning container mt-3 fw-bold text-secondary'>You don't have any quiz now...</div>
                }
            </div>
    )
}

export default ListQuiz