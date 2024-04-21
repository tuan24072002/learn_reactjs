import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';
import Accordion from 'react-bootstrap/Accordion';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
function ModalResultQuiz(props) {
    const { show, setShow, dataModalResult, timeOver, dataQuizWithQA } = props
    const [showAnswer, setShowAnswer] = useState(false);
    const { t } = useTranslation()
    const navigate = useNavigate();
    const handleClose = () => {
        setShow(false)
        navigate('/users');
    };
    const handleConfirm = async () => {
        setShowAnswer(!showAnswer);
    }
    return (
        <>
            <Modal size='xl' show={show} onHide={handleClose} backdrop={'static'}>
                <Modal.Header closeButton>
                    <Modal.Title>{t(`result.title`)}...</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {
                        timeOver && <div><b className='text-danger'>{t(`result.appease`)}</b></div>
                    }
                    <div>{t(`result.total-questions`)}: <b className='text-danger'>{dataModalResult.countTotal}</b></div>
                    <div>{t(`result.total-correct-answers`)}: <b className='text-danger'>{dataModalResult.countCorrect}</b></div>
                    <div>{t(`result.your-score`)}: <b className='text-danger'>{!Number.isInteger(+dataModalResult.countCorrect * 10 / dataModalResult.countTotal) ? ((+dataModalResult.countCorrect * 10 / dataModalResult.countTotal).toFixed(1)) : (+dataModalResult.countCorrect * 10 / dataModalResult.countTotal).toFixed(0)} / 10</b></div>
                    {
                        +dataModalResult.countCorrect >= +dataModalResult.countTotal / 2 ? <div className='fw-bold text-danger'>{t(`result.infor-congra`)}</div> : <div className='fw-bold text-secondary'>{t(`result.infor-sorry`)}</div>
                    }
                    {
                        showAnswer &&
                        <Accordion className='mt-3'>
                            {
                                dataQuizWithQA && dataQuizWithQA.qa.length > 0 && dataQuizWithQA.qa.map((data, index) => {
                                    return (
                                        <Accordion.Item eventKey={index}>
                                            <Accordion.Header>{t(`admin.questions`)} {index + 1}: {data.description}</Accordion.Header>
                                            <Accordion.Body>
                                                {
                                                    data && data.answers.length > 0 && data.answers.map((value, indexA) => {
                                                        return (
                                                            <div className="form-check">
                                                                <input
                                                                    disabled
                                                                    className="form-check-input"
                                                                    type="checkbox"
                                                                    checked={value.isCorrect}
                                                                    id={`check-${indexA}`} />
                                                                <label className="form-check-label">
                                                                    {value.description}
                                                                </label>
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </Accordion.Body>
                                        </Accordion.Item>
                                    )
                                })
                            }
                        </Accordion>
                    }
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        {t(`quizzes.close`)}
                    </Button>
                    <Button variant="warning" onClick={() => handleConfirm()}>
                        {
                            showAnswer ? t(`result.hide`) : t(`result.show`)
                        }
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalResultQuiz;