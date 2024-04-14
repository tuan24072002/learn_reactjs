import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function ModalResultQuiz(props) {
    const { show, setShow, dataModalResult } = props
    const handleClose = () => setShow(false);
    const handleConfirm = async () => {
        console.log(dataModalResult);
    }
    return (
        <>
            <Modal show={show} onHide={handleClose} backdrop={'static'}>
                <Modal.Header closeButton>
                    <Modal.Title>Your result...</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>Total question: <b className='text-danger'>{dataModalResult.countTotal}</b></div>
                    <div>Total correct answer: <b className='text-danger'>{dataModalResult.countCorrect}</b></div>
                    {/* <div>Total complete: <b className='text-danger'>{totalCompleted}</b></div> */}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="warning" onClick={() => handleConfirm()}>
                        Show answer
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalResultQuiz;