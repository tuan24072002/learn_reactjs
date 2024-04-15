import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { FaCloudUploadAlt } from "react-icons/fa";
import { FcPlus } from "react-icons/fc";
import { useCallback, useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { toast } from 'react-toastify';
import { postCreateQuiz, putUpdateQuiz } from '../../../../services/apiServices';
import Select from 'react-select';
import _ from 'lodash';

const options = [
    { value: 'EASY', label: 'EASY' },
    { value: 'MEDIUM', label: 'MEDIUM' },
    { value: 'HARD', label: 'HARD' }
]
const ModalQuiz = (props) => {
    const { show, setShow, stateModal, loadDataQuiz, dataUpdate, dataView, resetDataUpdate } = props;
    const [previewImage, setPreviewImage] = useState('');
    const [description, setDescription] = useState('');
    const [name, setName] = useState('');
    const [difficulty, setDifficulty] = useState(null);
    const [quizImage, setQuizImage] = useState('');
    const handleClose = () => {
        setShow(false);
        setPreviewImage('');
        setDescription('');
        setName('');
        setDifficulty('');
        setQuizImage('');
        resetDataUpdate();
    };
    const handleSelectChange = (selectedOption) => {
        if (selectedOption) {
            setDifficulty(selectedOption);
        }

    };
    const handleUploadImage = (e) => {
        if (e && e.target && e.target.files && e.target.files[0]) {
            setPreviewImage(URL.createObjectURL(e.target.files[0]));
            setQuizImage(e.target.files[0]);
        } else {
            setPreviewImage('');
        }
    }
    const onDrop = useCallback(acceptedFiles => {
        setPreviewImage(URL.createObjectURL(acceptedFiles[0]));
        setQuizImage(acceptedFiles[0]);
    }, [])
    const { getRootProps, isDragActive, getInputProps } = useDropzone({ onDrop })
    useEffect(() => {
        if (stateModal === 'UPDATE' && !_.isEmpty(dataUpdate)) {
            setName(dataUpdate.name);
            setDescription(dataUpdate.description);
            setDifficulty(options.find(i => i.value === dataUpdate.difficulty));
            setQuizImage(dataUpdate.quizImage);
            if (dataUpdate.image) {
                setPreviewImage(`data:image/jpeg;base64,${dataUpdate.image}`);
            }
        } else if (stateModal === 'VIEW' && !_.isEmpty(dataView)) {
            setName(dataView.name);
            setDescription(dataView.description);
            setDifficulty(options.find(i => i.value === dataView.difficulty));
            setQuizImage(dataView.quizImage);
            if (dataView.image) {
                setPreviewImage(`data:image/jpeg;base64,${dataView.image}`);
            }
        }
    }, [dataView, dataUpdate, stateModal])

    const handleSubmitCreateQuiz = async () => {
        if (!name) {
            toast.error('Invalid Name');
            return;
        }
        if (!description) {
            toast.error('Invalid Description')
            return;
        }
        if (!difficulty?.value) {
            toast.error('Invalid Difficulty')
            return;
        }
        if (!quizImage) {
            toast.error('Invalid Upload Quiz Image')
            return;
        }
        let res = await postCreateQuiz(description, name, difficulty?.value, quizImage);
        if (res && res.EC === 0) {
            toast.success("Create successfully !!!");
            loadDataQuiz();
            handleClose();
        }
        if (res && res.EC !== 0) {
            toast.error(res.EM);
            handleClose();
        }
    }
    const handleSubmitUpdateQuiz = async () => {
        let res = await putUpdateQuiz(dataUpdate.id, description, name, difficulty?.value, quizImage)
        if (res && res.EC === 0) {
            toast.success("Save successfully !!!");
            loadDataQuiz();
            handleClose();
        }
        if (res && res.EC !== 0) {
            toast.error(res.EM);
            handleClose();
        }
    }

    return (
        <>
            <Modal
                size='xl'
                show={show}
                onHide={handleClose}
                backdrop={'static'}
                className='modal-adduser'>
                <Modal.Header closeButton>
                    <Modal.Title className={`fw-bold ${stateModal === 'ADD' ? 'alert alert-primary w-100' : stateModal === 'UPDATE' ? 'alert alert-success w-100' : 'alert alert-secondary w-100'}`}>
                        {
                            stateModal !== '' && stateModal === 'ADD' ? "Add new quiz" : stateModal !== '' && stateModal === 'UPDATE' ? "Update quiz" : stateModal !== '' && stateModal === 'VIEW' ? "View quiz" : ""
                        }
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3">
                        <div className={"col-md-12"}>
                            <label className="form-label">Name</label>
                            <input
                                type="text"
                                className="form-control"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder='Enter Name Quiz' />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Description</label>
                            <input
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                type="text"
                                className="form-control"
                                placeholder='Enter Description' />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Difficulty</label>
                            <Select
                                onChange={handleSelectChange}
                                value={difficulty}
                                options={options}
                                isClearable
                                isSearchable />
                        </div>
                        {
                            stateModal !== '' && stateModal !== 'VIEW' && <div className='col-md-12'>
                                <label className="form-label label-upload" htmlFor='Upload'><FcPlus /> Upload Quiz Image</label>
                                <input
                                    type='file'
                                    id='Upload'
                                    className='form-control'
                                    hidden
                                    {...getInputProps()}
                                    onChange={(e) => handleUploadImage(e)} />
                            </div>
                        }
                        <div className='col-md-12 img-preview'  {...(stateModal !== 'VIEW' ? getRootProps() : {})}>
                            {(previewImage !== '' && !isDragActive) ? (
                                <img src={previewImage} alt='' />
                            ) : isDragActive ? (
                                <p>Drop the files here ...</p>
                            ) : (
                                <span>
                                    <FaCloudUploadAlt size={'3em'} />
                                    <br />
                                    Drag & drop a file here, or click to select files
                                </span>
                            )}

                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    {
                        stateModal !== '' && stateModal !== 'VIEW' && <Button variant="primary" onClick={() => {
                            if (stateModal === 'ADD')
                                handleSubmitCreateQuiz()
                            else
                                handleSubmitUpdateQuiz()
                        }}>
                            {
                                stateModal === 'ADD' ? "Create" : "Save"
                            }
                        </Button>
                    }
                </Modal.Footer>
            </Modal >
        </>
    )
}

export default ModalQuiz