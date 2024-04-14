import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { deleteUser } from '../../../../services/apiServices';
import { toast } from 'react-toastify';

function ModalDeleteUser(props) {
    const { show, setShow, dataDelete, loadUser } = props
    const handleClose = () => setShow(false);
    const handleDeleteUser = async () => {
        let data = await deleteUser(dataDelete.id);
        if (data && data.EC === 0) {
            toast.success("Delete successful !!!");
            handleClose();
            loadUser();
        }
        if (data && data.EC !== 0) {
            toast.error(data.EM);
        }
    }
    return (
        <>
            <Modal show={show} onHide={handleClose} backdrop={'static'}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete user</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure delete this user? <br />
                    <b className='text-danger'>Email: {dataDelete.email}</b>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="danger" onClick={() => handleDeleteUser()}>
                        Yes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalDeleteUser;