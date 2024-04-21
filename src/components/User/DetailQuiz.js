import React, { useCallback, useEffect, useState } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import { getDetailQuiz, getQuizWithQA, postSubmitQuiz } from '../../services/apiServices';
import _ from 'lodash';
import { ImSpinner10 } from "react-icons/im";
import '../../styles/DetailQuiz.scss';
import { Link } from 'react-router-dom';
import ModalResultQuiz from './ModalResultQuiz';
import { toast } from 'react-toastify';
import RightContent from './Content/RightContent';
import LeftContent from './Content/LeftContent';
import Language from '../Header/Language'
import { useTranslation } from 'react-i18next';
const DetailQuiz = () => {
    const location = useLocation();
    const { t } = useTranslation();
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [dataQuiz, setDataQuiz] = useState([]);
    const [show, setShow] = useState(false);
    const [dataModalResult, setDataModalResult] = useState({});
    const [index, setIndex] = useState(0);
    const [isFinished, setIsFinished] = useState(false);
    const [timeOver, setTimeOver] = useState(false);
    const [dataQuizWithQA, setDataQuizWithQA] = useState([]);
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
                    answer = _.orderBy(answer, ['id'], ['asc']);
                    return { 'questionId': key, answer, description, image }
                }).value()
            setDataQuiz(rs);
        }
        setIsLoading(false)
    }, [id])

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
    const handleFinishQuiz = useCallback(async () => {
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
                setIsFinished(true);
                setShow(true);
            } else {
                toast.error('Something wrong...');
            }
        }
    }, [dataQuiz, id])
    const loadQuizWithQA = useCallback(async () => {
        let res = await getQuizWithQA(id);
        if (res && res.EC === 0) {
            setDataQuizWithQA(res.DT);
        } else {
            toast.error(res.EM);
        }
    }, [id])
    useEffect(() => {
        setIsLoading(true);
        fetchQuestions();
        loadQuizWithQA()
    }, [fetchQuestions, loadQuizWithQA, location?.state?.quizTitle])
    return (
        isLoading ? <div className='text-center'><span className='text-secondary fw-bold'>Loading...</span><ImSpinner10 className="loader-icon" /></div> :
            dataQuiz && dataQuiz.length > 0 ?
                <>
                    <div className='header-detail-quiz'>
                        <nav aria-label="breadcrumb" className="breadcrumb-nav">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><Link to={'/'}>{t(`header.nav1`)}</Link></li>
                                <li className="breadcrumb-item"><Link to={'/users'}>{t(`header.nav2`)}</Link></li>
                                <li className="breadcrumb-item active" aria-current="page">{t(`admin.quizzes`)}</li>
                            </ol>
                        </nav>
                        <div className='language'><Language /></div>
                    </div>
                    <div className='detail-quiz-container'>
                        <div className='left-content'>
                            <LeftContent
                                t={t}
                                index={index}
                                setIndex={setIndex}
                                id={id}
                                titleQuiz={location?.state?.quizTitle}
                                dataQuiz={dataQuiz}
                                handleCheckBox={handleCheckBox} />
                        </div>
                        <div className='right-content'>
                            <RightContent
                                t={t}
                                index={index}
                                setIndex={setIndex}
                                dataQuiz={dataQuiz}
                                handleFinishQuiz={handleFinishQuiz}
                                setShow={setShow}
                                setTimeOver={setTimeOver}
                                isFinished={isFinished} />
                        </div>
                        <ModalResultQuiz
                            show={show}
                            setShow={setShow}
                            dataModalResult={dataModalResult}
                            timeOver={timeOver}
                            dataQuizWithQA={dataQuizWithQA} />
                    </div>
                </>
                : <div className='alert alert-danger container mt-5 d-flex justify-content-center flex-column border'>
                    <h3>This quiz don't have any question</h3>
                    <Link to={'/users'}>&lt;&lt;Go back to previous link</Link>
                </div>
    )
}

export default DetailQuiz