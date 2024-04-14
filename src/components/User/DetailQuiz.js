import React, { useCallback, useEffect, useState } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import { getDetailQuiz, postSubmitQuiz } from '../../services/apiServices';
import _ from 'lodash';
import { ImSpinner10 } from "react-icons/im";
import '../../styles/DetailQuiz.scss';
import Question from './Question';
import { Link } from 'react-router-dom';
import ModalResultQuiz from './ModalResultQuiz';
import { toast } from 'react-toastify';
const DetailQuiz = () => {
    const location = useLocation();
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [dataQuiz, setDataQuiz] = useState([]);
    const [index, setIndex] = useState(0);
    const [show, setShow] = useState(false);
    const [dataModalResult, setDataModalResult] = useState({});
    const fetchQuestions = useCallback(async () => {
        let res = await getDetailQuiz(id);
        if (res && res.EC === 0) {
            const rs = _.chain(res.DT)
                .groupBy('id')
                .map((value, key) => {
                    let answer = [];
                    let description, image = null;
                    value.forEach((item) => {
                        answer.push(item);
                        description = item.description
                        image = item.image
                        item.answers.isSelected = false
                    })
                    return { 'questionId': key, answer, description, image }
                }).value()
            setDataQuiz(rs);
        }
        setIsLoading(false)
    }, [id])
    useEffect(() => {
        setIsLoading(true);
        fetchQuestions();
    }, [fetchQuestions])
    const handleCheckBox = (answerId, questionId) => {
        let dataQuizClone = [...dataQuiz];
        let question = dataQuizClone.find(e => +e.questionId === +questionId)
        if (question && question.answer) {
            question.answer = question.answer.map((item) => {
                if (+item.answers.id === +answerId) {
                    item.answers.isSelected = !item.answers.isSelected;
                } else {
                    item.answers.isSelected = false;
                }
                return item;
            })
        }
        let index = dataQuizClone.findIndex(item => +item.questionId === +questionId)
        if (index > -1) {
            dataQuizClone[index] = question
            setDataQuiz(dataQuizClone);
        }
    }
    const handleFinishQuiz = async () => {
        const data = {
            "quizId": id,
            "answers": []
        }
        let answer = [];
        if (dataQuiz && dataQuiz.length > 0) {
            dataQuiz.forEach((item) => {
                let questionId = +item.questionId;
                let userAnswerId = [];
                item.answer.forEach((a) => {
                    if (a.answers.isSelected === true) {
                        userAnswerId.push(a.answers.id)
                    }
                })
                answer.push({
                    questionId: questionId,
                    userAnswerId: userAnswerId
                })
            })
            data.answers = answer;
            //submit api
            let res = await postSubmitQuiz(data);
            if (res && res.EC === 0) {
                setDataModalResult(res.DT)
                setShow(true);
            } else {
                toast.error('Something wrong...');
            }
        }
    }
    return (
        isLoading ? <div className='text-center'><span className='text-secondary fw-bold'>Loading...</span><ImSpinner10 className="loader-icon" /></div> :
            dataQuiz && dataQuiz.length > 0 ?
                <div className='detail-quiz-container'>
                    <div className='left-content'>
                        <div className='title'>
                            Quiz {id}: {location?.state?.quizTitle}
                        </div>
                        <hr />
                        {/* <div className='q-body'>
                            <img src='' alt='' />
                        </div> */}
                        <div className='q-content'>
                            <Question
                                data={dataQuiz && dataQuiz.length > 0 && dataQuiz[index]}
                                index={index}
                                handleCheckBox={handleCheckBox} />
                        </div>
                        <div className='footer d-flex gap-2 justify-content-center'>
                            <button onClick={() => setIndex(index - 1)} disabled={index > 0 ? false : true}>Back</button>
                            <button onClick={() => setIndex(index + 1)} disabled={index < dataQuiz.length - 1 ? false : true}>Next</button>
                        </div>
                    </div>
                    <div className='right-content'>
                        <div className='footer'>
                            <button className='btn btn-warning' onClick={() => handleFinishQuiz()}>Finish</button>
                        </div>
                    </div>
                    <ModalResultQuiz show={show} setShow={setShow} dataModalResult={dataModalResult} />
                </div>
                : <div className='alert alert-danger container mt-5 d-flex justify-content-center flex-column border'>
                    <h3>This quiz don't have any question</h3>
                    <Link to={'/users'}>&lt;&lt;Go back to previous link</Link>
                </div>
    )
}

export default DetailQuiz