import React from 'react'
import Question from '../Question';
const LeftContent = (props) => {
    const { t, id, dataQuiz, handleCheckBox, titleQuiz, index, setIndex } = props

    return (
        <>
            <div className='title'>
                {t(`users.quiz`)} {id}: {titleQuiz}
            </div>
            <hr />
            <div className='q-content'>
                <Question
                    t={t}
                    data={dataQuiz && dataQuiz.length > 0 && dataQuiz[index]}
                    index={index}
                    handleCheckBox={handleCheckBox} />
            </div>
            <div className='footer d-flex gap-2 justify-content-center'>
                <button onClick={() => setIndex(index - 1)} disabled={index > 0 ? false : true}>{t(`quizzes.back`)}</button>
                <button onClick={() => setIndex(index + 1)} disabled={index < dataQuiz.length - 1 ? false : true}>{t(`quizzes.next`)}</button>
            </div>
        </>
    )
}

export default LeftContent