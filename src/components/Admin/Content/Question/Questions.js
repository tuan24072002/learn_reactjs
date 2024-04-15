import Select from 'react-select';
import { useState } from 'react'
import '../../../../styles/Questions.scss'
import { FaPlusCircle, FaMinusCircle, FaMinusSquare, FaPlusSquare, FaImage } from "react-icons/fa";
import { v4 } from 'uuid';
import _ from 'lodash';
import { toast } from 'react-toastify';
import Lightbox from 'react-18-image-lightbox';
const options = [
    { value: 'EASY', label: 'EASY' },
    { value: 'MEDIUM', label: 'MEDIUM' },
    { value: 'HARD', label: 'HARD' }
]
const Questions = () => {
    const [selectedQuiz, setSelectedQuiz] = useState({});
    const [open, setOpen] = useState(false);
    const [dataImagePreview, setDataImagePreview] = useState({
        url: '',
        title: '',
    })
    const [questions, setQuestions] = useState([
        {
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
    ])
    const handleSelectQuiz = () => {
        setSelectedQuiz({})
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
    const handleSubmitQuestionForQuiz = () => {
        // console.log(questions);
        questions.map(question => {
            if (question.description === '') {
                toast.error('Invalid Question Description');
                return <></>
            }
            else if (question.imageName === '' || question.imageFile === '') {
                toast.error('Invalid Question Image');
                return <></>
            } else {
                question.answers.map(answer => {
                    if (answer.description === '') {
                        toast.error('Invalid Answer Description');
                        return <></>
                    }
                    return <></>
                })
                return <></>
            }
        })
    }
    return (
        <div className='questions-container'>
            <div className='title'>
                Manage Questions
            </div>
            <div className='add-new-question'>
                <div className='col-12 form-group'>
                    <label>Select Quiz:</label>
                    <Select
                        onChange={handleSelectQuiz}
                        defaultValue={selectedQuiz}
                        options={options}
                        isClearable
                        isSearchable
                        className='' />
                </div>
                {questions && questions.length > 0 && questions.map((item, index) => {
                    return (
                        <div className='question-main mb-4' key={`questions-${index}`}>
                            <div className='mt-3 form-group question-content'>
                                Add Questions:
                                <div className="form-floating mb-3 col-12">
                                    <input type="text"
                                        className="form-control"
                                        placeholder=''
                                        value={item.description}
                                        onChange={(e) => handleOnChange('QUESTION', item.id, e.target.value)} />
                                    <label>Question {index + 1} 's Description</label>
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
                                        }}>{item.imageName !== '' ? item.imageName : '0 file is uploaded'}</span>
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
                                                    className="form-control"
                                                    placeholder=''
                                                    value={data.description}
                                                    onChange={(e) => handleAnswerQuestion('INPUT', item.id, data.id, e.target.value)}
                                                />
                                                <label>Answer {index + 1}</label>
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
                {questions && questions.length > 0 &&
                    <div>
                        <button onClick={() => handleSubmitQuestionForQuiz()} className='btn btn-primary'>Save Question</button>
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