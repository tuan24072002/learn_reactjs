import React, { useCallback, useEffect, useState } from 'react'
import { FcPlus } from "react-icons/fc";
import '../../../../styles/ManageQuiz.scss'
import { getAllQuiz } from '../../../../services/apiServices'
import ModalQuiz from './ModalQuiz';
import TableQuiz from './TableQuiz';
import { toast } from 'react-toastify';
import TestScroll from './TestScroll';
const ManageQuiz = (props) => {
    const [show, setShow] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [stateModal, setStateModal] = useState('');
    const [dataQuiz, setDataQuiz] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [dataUpdate, setDataUpdate] = useState([]);
    const [dataView, setDataView] = useState([]);
    const [dataDelete, setDataDelete] = useState([]);
    const loadDataQuiz = useCallback(async () => {
        let res = await getAllQuiz();
        if (res && res.EC === 0) {
            setDataQuiz(res.DT);
            setIsLoading(false);
        }
        if (res && res.EC !== 0) {
            toast.error('Something wrong...');
        }
    }, [])
    useEffect(() => {
        setIsLoading(true);
        loadDataQuiz();
    }, [loadDataQuiz])
    const handleClickUpdateQuiz = (data) => {
        setShow(true);
        setStateModal('UPDATE');
        setDataUpdate(data);
    }
    const handleClickViewQuiz = (data) => {
        setShow(true);
        setDataView(data);
        setStateModal('VIEW');
    }
    const handleClickDeleteQuiz = (data) => {
        setShowDelete(true);
        setDataDelete(data);
    }
    const resetDataUpdate = () => {
        setDataUpdate([]);
        setDataView([]);
    }
    return (
        <div className='manage-quiz-container'>
            <div className='title'>
                Manage Quizzes
            </div>
            <div className='quiz-content'>
                <div className="btn-add-new">
                    <button className="btn btn-primary d-flex align-items-center gap-1"
                        onClick={() => { setShow(true); setStateModal('ADD'); }}><FcPlus /> Add new quiz</button>
                </div>
                <div className="table-quiz-container text-center">
                    <TableQuiz dataQuiz={dataQuiz}
                        isLoading={isLoading}
                        handleClickUpdateQuiz={handleClickUpdateQuiz}
                        handleClickViewQuiz={handleClickViewQuiz}
                        setShowDelete={setShowDelete}
                        showDelete={showDelete}
                        dataDelete={dataDelete}
                        handleClickDeleteQuiz={handleClickDeleteQuiz}
                        loadDataQuiz={loadDataQuiz} />
                    <TestScroll />
                </div>
                <ModalQuiz resetDataUpdate={resetDataUpdate} dataView={dataView} show={show} setShow={setShow} stateModal={stateModal} loadDataQuiz={loadDataQuiz} dataUpdate={dataUpdate} />
            </div>

        </div>
    )
}

export default ManageQuiz