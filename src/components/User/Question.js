import _ from 'lodash';
import React from 'react'

const Question = (props) => {
    const { data, index, handleCheckBox } = props;
    if (_.isEmpty(data)) {
        return <></>
    }

    const handleOnChangeCheckBox = (e, answerId, questionId) => {
        handleCheckBox(answerId, questionId);
    }
    return (
        <>
            {
                data && data.image ?
                    <div className='q-image'>
                        <img src={`data:image/jpeg;base64,${data.image}`} alt='' />
                    </div> : <div className='q-image'></div>
            }
            <div className='question'>Question {index + 1}: {data.description}</div>
            <div className='answer'>
                {
                    data && data.answer && data.answer.length > 0 && data.answer.map((items, index) => {
                        return (
                            <div key={`answer-${index}`} className='answer-child'>
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        checked={items.answers.isSelected}
                                        onChange={(e) => handleOnChangeCheckBox(e, items.answers.id, data.questionId)}
                                        id={`check-${index}`} />
                                    <label className="form-check-label" htmlFor={`check-${index}`}>
                                        {items.answers.description}
                                    </label>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}

export default Question