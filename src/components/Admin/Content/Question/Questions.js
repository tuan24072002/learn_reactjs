import Select from 'react-select';
import { useCallback, useEffect, useState } from 'react'
import '../../../../styles/Questions.scss'
import { FaPlusCircle, FaMinusCircle, FaMinusSquare, FaPlusSquare, FaImage } from "react-icons/fa";
import { v4 } from 'uuid';
import _ from 'lodash';
import { toast } from 'react-toastify';
import Lightbox from 'react-18-image-lightbox';
import { getAllQuiz, postQuestionForQuiz, postCreateNewAnswerForQuestion, getQuizWithQA, postUpsertQA } from '../../../../services/apiServices';
import { useTranslation } from 'react-i18next';
const initQuestions = [{
    id: v4(),
    description: '',
    imageFile: '',
    imageName: '',
    answers: [
        {
            id: v4(),
            description: '',
            isCorrect: false,
        }
    ]
}]
const Questions = (props) => {
    const { component, loadAllDataQuizFromQuizzes, listQuizFromQuizzes } = props
    const [open, setOpen] = useState(false);
    const { t } = useTranslation();
    const [listQuiz, setListQuiz] = useState([]);
    const [selectedQuiz, setSelectedQuiz] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const [dataImagePreview, setDataImagePreview] = useState({
        url: '',
        title: '',
    })
    const initSelect = [{ value: "", label: `${t(`quizzes.select`)}...` }]
    const [questions, setQuestions] = useState(initQuestions)

    const loadDataQuiz = async () => {
        let res = await getAllQuiz();
        if (res && res.EC === 0) {
            let newQuiz = res.DT.map((item) => {
                return {
                    value: item.id,
                    label: `${item.id} - ${item.name}`
                }
            })
            setListQuiz(newQuiz);
        }
        if (res && res.EC !== 0) {
            toast.error('Something wrong...');
        }
    }
    useEffect(() => {
        if (!component) {
            loadDataQuiz();
        } else {
            loadAllDataQuizFromQuizzes();
        }
    }, [loadAllDataQuizFromQuizzes, component])
    const base64ToFileObject = (url, filename, mimeType) => {
        if (url.startsWith('data:')) {
            var arr = url.split(','),
                mime = arr[0].match(/:(.*?);/)[1],
                bstr = atob(arr[arr.length - 1]),
                n = bstr.length,
                u8arr = new Uint8Array(n);
            while (n--) {
                u8arr[n] = bstr.charCodeAt(n);
            }
            var file = new File([u8arr], filename, { type: mime || mimeType });
            return Promise.resolve(file);
        }
        return fetch(url)
            .then(res => res.arrayBuffer())
            .then(buf => new File([buf], filename, { type: mimeType }));
    }
    const fileObjectToBase64 = (file) => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
    });
    const loadDataQA = useCallback(async (quizId) => {
        let res = await getQuizWithQA(quizId);
        if (res && res.EC === 0) {
            //convert base 64 to file object
            let newQA = []

            for (let i = 0; i < res.DT.qa.length; i++) {
                let q = res.DT.qa[i]
                if (q.imageFile) {
                    q.imageFile = await base64ToFileObject(`data:image/png;base64,${q.imageFile}`, `question-${q.id}.png`, 'image/png');
                    q.imageName = q.imageFile.name;
                }
                newQA.push(q);
            }
            setQuestions(newQA);
        }
    }, [])

    useEffect(() => {
        if (component && !_.isEmpty(selectedQuiz)) {
            loadDataQA(selectedQuiz.value);
        }
    }, [component, selectedQuiz, loadDataQA])
    const handleSelectQuiz = (e) => {
        setSelectedQuiz(e);
    }
    const handleAddRemoveQuestion = (type, id) => {
        if (type === 1) {
            const newQuestion = {
                id: v4(),
                description: '',
                imageFile: '',
                imageName: '',
                answers: [
                    {
                        id: v4(),
                        description: '',
                        isCorrect: false
                    }
                ]
            }
            setQuestions([...questions, newQuestion]);
        }
        if (type === 0) {
            const questionsClone = _.cloneDeep(questions)
            const newQuestions = questionsClone.filter(i => i.id !== id)
            setQuestions(newQuestions)
        }
    }
    const handleAddRemoveAnswer = (type, questionId, answerId) => {
        const questionsClone = _.cloneDeep(questions)
        let index = questionsClone.findIndex(i => i.id === questionId)
        if (type === 1) {
            const newAnswer = {
                id: v4(),
                description: '',
                isCorrect: false
            }
            questionsClone[index].answers.push(newAnswer)
            setQuestions(questionsClone)
        }
        if (type === 0) {
            questionsClone[index].answers = questionsClone[index].answers.filter(i => i.id !== answerId)
            setQuestions(questionsClone)
        }
    }
    const handleOnChange = (type, questionId, value) => {
        if (type === 'QUESTION') {
            const questionsClone = _.cloneDeep(questions)
            let index = questionsClone.findIndex(i => i.id === questionId)
            if (index > -1) {
                questionsClone[index].description = value;
                setQuestions(questionsClone);
            }

        }
    }
    const handleOnChangeFileQuestion = (questionId, e) => {
        const questionsClone = _.cloneDeep(questions)
        let index = questionsClone.findIndex(i => i.id === questionId)
        if (index > -1 && e.target && e.target.files && e.target.files[0]) {
            questionsClone[index].imageFile = e.target.files[0];
            questionsClone[index].imageName = e.target.files[0].name;
            setQuestions(questionsClone);
        }
    }
    const handleAnswerQuestion = (type, questionId, answerId, value) => {
        const questionsClone = [...questions]
        let index = questionsClone.findIndex(i => i.id === questionId)
        if (index > -1 && questionsClone[index].answers && questionsClone[index].answers.length > 0) {
            let indexAnswer = questionsClone[index].answers.findIndex(e => e.id === answerId)
            if (indexAnswer > -1) {
                if (type === 'CHECKBOX') {
                    questionsClone[index].answers[indexAnswer].isCorrect = value;
                }
                if (type === 'INPUT')
                    questionsClone[index].answers[indexAnswer].description = value;
                setQuestions(questionsClone);
            }
        }
    }
    const handleSubmitQuestionForQuiz = async () => {
        setIsSubmit(true)
        let isValidAnswer = true, isValidQuestion = true;
        let countIsCorrect = 0;
        for (let i = 0; i < questions.length; i++) {
            if (questions[i].description === '') {
                isValidQuestion = false;
                break;
            }
            for (let j = 0; j < questions[i].answers.length; j++) {
                if (questions[i].answers[j].isCorrect) {
                    countIsCorrect++;
                }
                if (questions[i].answers[j].description === '' || countIsCorrect === 0) {
                    isValidAnswer = false;
                    break;
                }
            }
            if (!isValidAnswer || !isValidQuestion) {
                break;
            }
        }
        if (countIsCorrect === 0) {
            toast.error('Please choose a correct answer !');
            return;
        }
        if (!isValidQuestion || !isValidAnswer) {
            return;
        }

        if (isValidQuestion && isValidAnswer) {
            for (const question of questions) {
                const q = await postQuestionForQuiz(selectedQuiz.value, question.description, question.imageFile);
                for (const answer of question.answers) {
                    let res = await postCreateNewAnswerForQuestion(answer.description, answer.isCorrect, q.DT.id);
                    if (res && res.EC === 0) {
                        toast.success('Creacted Question and Answer Successfully !!!');
                        setQuestions(initQuestions);
                    }
                }
            }
        }
    }
    const handleSubmitSaveQA = async () => {
        setIsSubmit(true);
        let isValidAnswer = true, isValidQuestion = true;
        let countIsCorrect = 0;
        let indexQuestion = 0, indexAnswer = 0;
        for (let i = 0; i < questions.length; i++) {
            indexQuestion = i
            if (questions[i].description === '') {
                isValidQuestion = false;
                break;
            }
            for (let j = 0; j < questions[i].answers.length; j++) {
                if (questions[i].answers[j].isCorrect) {
                    countIsCorrect++;
                }
                if (questions[i].answers[j].description === '') {
                    isValidAnswer = false;
                    indexAnswer = j;
                    break;
                }
            }
            if (!isValidAnswer || !isValidQuestion) {
                break;
            }
        }
        if (countIsCorrect === 0) {
            toast.error(`Please choose a correct question-${indexQuestion + 1} answer-${indexAnswer + 1}`);
            return;
        }
        if (!isValidQuestion || !isValidAnswer) {
            return;
        }

        if (isValidQuestion && isValidAnswer) {
            let questionClone = _.cloneDeep(questions);

            // File object to base64
            for (let question of questionClone) {
                if (question.imageFile) {
                    question.imageFile = await fileObjectToBase64(question.imageFile);
                    question.imageName = '';
                }
            }

            let res = await postUpsertQA({
                quizId: selectedQuiz.value,
                questions: questionClone.map((item) => ({
                    id: item.id,
                    description: item.description,
                    imageFile: item.imageFile,
                    imageName: '',
                    answers: item.answers.map((data) => ({
                        id: data.id,
                        description: data.description,
                        isCorrect: data.isCorrect
                    }))
                }))
            });
            if (res && res.EC === 0) {
                toast.success(res.EM);
            } else {
                toast.error(res.EM);
            }
        }
    }
    return (
        <div className='questions-container'>
            {
                !component &&
                <div className='title'>
                    {t(`sidebar.manage-questions`)}
                </div>
            }
            <div className='add-new-question'>
                <div className='col-12 form-group'>
                    <label>{t(`quizzes.select`)}</label>
                    <Select
                        onChange={(e) => handleSelectQuiz(e)}
                        defaultValue={initSelect}
                        options={component ? listQuizFromQuizzes : listQuiz}
                        isClearable
                        isSearchable
                        className={`form-control ${_.isEmpty(selectedQuiz) && isSubmit && 'is-invalid'}`} />
                </div>
                {questions && questions.length > 0 && questions.map((item, index) => {
                    return (
                        <div className='question-main mb-4' key={`questions-${index}`}>
                            <div className='mt-3 form-group question-content'>
                                {t(`quizzes.add-question`)}:
                                <div className="form-floating mb-3 col-12">
                                    <input type="text"
                                        className={`form-control ${item.description === '' && isSubmit && 'is-invalid'}`}
                                        placeholder=''
                                        value={item.description}
                                        onChange={(e) => handleOnChange('QUESTION', item.id, e.target.value)} />
                                    <label>{t(`quizzes.description-quiz-1`)} {index + 1} {t(`quizzes.description-quiz-2`)}</label>
                                </div>
                                <div className='d-flex col-12 justify-content-between align-items-center'>
                                    <div className='col-6 mb-3 group-upload'>
                                        <label className='icon-image' htmlFor={`uploadImage-${index}`}><FaImage size={'1.3em'} /></label>
                                        <input
                                            type='file'
                                            id={`uploadImage-${index}`}
                                            hidden
                                            onChange={(e) => handleOnChangeFileQuestion(item.id, e)} />
                                        <span onClick={() => {
                                            if (item.imageName !== '') {
                                                setOpen(!open)
                                                setDataImagePreview({
                                                    url: URL.createObjectURL(item.imageFile),
                                                    title: item.imageName
                                                })
                                            }
                                        }}>{item.imageName !== '' ? <span className='image-name'>{item.imageName}</span> : t(`quizzes.upload`)}</span>
                                    </div>
                                    <div className='w-fit d-flex gap-2'>
                                        <span onClick={() => handleAddRemoveQuestion(1, item.id)}><FaPlusCircle size='2em' style={{ color: 'red' }} className='icon-action' /></span>
                                        {
                                            questions.length > 1 ? <span onClick={() => handleAddRemoveQuestion(0, item.id)}><FaMinusCircle size='2em' style={{ color: 'blue' }} className='icon-action' /></span> : <></>
                                        }
                                    </div>
                                </div>
                            </div>
                            {
                                item.answers && item.answers.length > 0 && item.answers.map((data, index) => {
                                    return (
                                        <div className='answers-content mt-3' key={data.id}>
                                            <input
                                                className="form-check-input isCorrect"
                                                type="checkbox"
                                                checked={data.isCorrect}
                                                onChange={(e) => handleAnswerQuestion('CHECKBOX', item.id, data.id, e.target.checked)} />
                                            <div className="form-floating col-6 answer-name">
                                                <input type="text"
                                                    className={`form-control ${data.description === '' && isSubmit && 'is-invalid'}`}
                                                    placeholder=''
                                                    value={data.description}
                                                    onChange={(e) => handleAnswerQuestion('INPUT', item.id, data.id, e.target.value)}
                                                />
                                                <label>{t(`quizzes.description-answer`)} {index + 1}</label>
                                            </div>
                                            <div className='col-3 action'>
                                                <span><FaPlusSquare size='2em' style={{ color: 'red' }} className='icon-action' onClick={() => handleAddRemoveAnswer(1, item.id, data.id)} /></span>
                                                {
                                                    item.answers.length > 1 && <span><FaMinusSquare size='2em' style={{ color: 'blue' }} className='icon-action' onClick={() => handleAddRemoveAnswer(0, item.id, data.id)} /></span>
                                                }
                                            </div>
                                        </div>
                                    )
                                })
                            }

                        </div>
                    )
                })}
                {questions && questions.length > 0 && component ?
                    <div>
                        <button onClick={() => handleSubmitSaveQA()} className='btn btn-success'>{t(`quizzes.save`)} Q&A</button>
                    </div> :
                    <div>
                        <button onClick={() => handleSubmitQuestionForQuiz()} className='btn btn-primary'>{t(`quizzes.create`)} Q&A</button>
                    </div>
                }
                {
                    open && <div style={{ zIndex: 100000 }}><Lightbox mainSrc={dataImagePreview.url} imageTitle={dataImagePreview.title} onCloseRequest={() => setOpen(false)} /></div>
                }
            </div>
        </div>
    )
}

export default Questions