import React, { useState } from 'react'
import TimerCountDown from './TimerCountDown';
import ModalExamNotComplete from './ModalExamNotComplete';

const RightContent = (props) => {
  const { handleFinishQuiz, dataQuiz, index, setIndex, setTimeOver, isFinished, t } = props;
  const [show, setShow] = useState(false);
  const [unAnswer, setUnAnswer] = useState([]);
  const getClassQuestion = (question, indexList) => {
    let rs = 'question'
    if (question && question.answer.length > 0) {
      //find 1 => result
      let isAnswered = question.answer.find(a => a.answers.isSelected === true);
      if (isAnswered) {
        rs += ' selected';
      }
      if (index === indexList) {
        rs += ' active'
      }
    }
    return rs
  }
  const handleChooseAnswer = (index) => {
    setIndex(index)
  }
  const handleClickFinish = () => {
    setUnAnswer([])
    let countQuestionAnswer = 0;
    dataQuiz.forEach((question, index) => {
      const isAnswered = question.answer.some(a => a.answers.isSelected);
      if (isAnswered) {
        countQuestionAnswer++;
      } else {
        setUnAnswer(prevUnAnswer => [...prevUnAnswer, index + 1]);
      }
    })
    if (countQuestionAnswer === dataQuiz.length) {
      handleFinishQuiz();
    } else {
      setShow(true);
    }
  }
  return (
    <>
      <div className='main-timer'>
        <TimerCountDown
          isFinished={isFinished}
          setTimeOver={setTimeOver}
          handleFinishQuiz={handleFinishQuiz}
        />
      </div>
      <hr />
      <div className='main-question'>
        {
          dataQuiz && dataQuiz.length > 0 && dataQuiz.map((data, indexList) => {
            return (
              <div
                className={`${getClassQuestion(data, indexList)}`}
                key={`list-question-${indexList}`}
                onClick={() => handleChooseAnswer(indexList)}
              >{indexList + 1}</div>
            )
          })
        }
      </div>
      <div className='footer'>
        <button className='btn btn-warning' onClick={() => handleClickFinish()}>{t(`quizzes.finish`)}</button>
      </div>
      <ModalExamNotComplete show={show} setShow={setShow} handleFinishQuiz={handleFinishQuiz} unAnswer={unAnswer} />
    </>
  )
}

export default RightContent