import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useTranslation } from 'react-i18next';

function ModalExamNotComplete(props) {
    const { show, setShow, handleFinishQuiz, unAnswer } = props;
    const { t } = useTranslation();
    const handleClose = () => {
        setShow(false);
    };
    const handleSubmit = () => {
        setShow(false);
        handleFinishQuiz();
    }
    return (
        <>
            <Modal show={show} onHide={handleClose} backdrop={'static'}>
                <Modal.Header closeButton>
                    <Modal.Title>{t(`warning.title`)}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>{t(`warning.content-1`)}<br />
                        {t(`admin.questions`)}
                        {
                            unAnswer && unAnswer.length > 0 && unAnswer.map((value, index) => {
                                return (
                                    <span className='text-danger fw-bold' key={`unanswer-${index}`}> {index < unAnswer.length - 1 ? `${value},` : value} </span>
                                )
                            })
                        }{t(`warning.content-2`)}<br />
                        {t(`warning.content-3`)}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        {t(`quizzes.close`)}
                    </Button>
                    <Button variant="warning" onClick={() => handleSubmit()}>
                        {t(`warning.submit`)}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalExamNotComplete;