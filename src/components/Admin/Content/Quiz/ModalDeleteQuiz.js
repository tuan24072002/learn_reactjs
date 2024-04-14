import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { deleteQuiz } from '../../../../services/apiServices';
import { toast } from 'react-toastify';

const ModalDeleteQuiz = (props) => {
    const { show, setShow, dataDelete, loadDataQuiz } = props
    const handleClose = () => setShow(false);
    const handleDeleteQiz = async () => {
        let data = await deleteQuiz(dataDelete.id);
        if (data && data.EC === 0) {
            toast.success("Delete successful !!!");
            handleClose();
            loadDataQuiz();
        }
        if (data && data.EC !== 0) {
            toast.error(data.EM);
        }
    }

    return (
        <>
            <Modal show={show} onHide={handleClose} backdrop={'static'}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete quiz</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure delete this quiz? <br />
                    <b className='text-danger'>Name Quiz: {dataDelete.name}</b>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="danger" onClick={() => handleDeleteQiz()}>
                        Yes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalDeleteQuiz