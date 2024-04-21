import _ from 'lodash';
import React, { useState } from 'react'
import Lightbox from 'react-18-image-lightbox';
const Question = (props) => {
    const { data, index, handleCheckBox, t } = props;
    const [open, setOpen] = useState(false);
    if (_.isEmpty(data)) {
        return <>Not found data</>
    }
    const handleOnChangeCheckBox = (e, answerId, questionId) => {
        handleCheckBox(answerId, questionId);
    }
    return (
        <>
            {
                data && data.image ?
                    <div className='q-image' >
                        <img src={`data:image/jpeg;base64,${data.image}`} alt='' onClick={() => setOpen(true)} />
                        {
                            open && <div style={{ zIndex: 100000 }}><Lightbox mainSrc={`data:image/jpeg;base64,${data.image}`} imageTitle={data.description} onCloseRequest={() => setOpen(false)} /></div>
                        }
                    </div> : <div className='q-image'></div>
            }


            <div className='question'>{t(`admin.questions`)} {index + 1}: {data.description}</div>
            <div className='answer'>
                {
                    data && data.answer && data.answer.length > 0 && data.answer.map((items, index) => {
                        return (
                            <div key={`answer-${index}`} className='answer-child'>
                                <label className="form-check" htmlFor={`check-${index}`}>
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        checked={items.answers.isSelected}
                                        onChange={(e) => handleOnChangeCheckBox(e, items.answers.id, data.questionId)}
                                        id={`check-${index}`} />
                                    <label className="form-check-label" htmlFor={`check-${index}`}>
                                        {items.answers.description}
                                    </label>
                                </label>
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}

export default Question