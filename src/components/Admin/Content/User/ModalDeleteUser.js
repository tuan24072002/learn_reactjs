import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { deleteUser } from '../../../../services/apiServices';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

function ModalDeleteUser(props) {
    const { show, setShow, dataDelete, loadUser } = props
    const handleClose = () => setShow(false);
    const { t } = useTranslation();
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
                    <Modal.Title>{t(`users.delete-user`)}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {t(`users.q-delete`)} <br />
                    <b className='text-danger'>Email: {dataDelete.email}</b>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        {t(`quizzes.close`)}
                    </Button>
                    <Button variant="danger" onClick={() => handleDeleteUser()}>
                        {t(`quizzes.yes`)}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalDeleteUser;