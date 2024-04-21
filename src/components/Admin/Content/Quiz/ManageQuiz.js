import React, { useCallback, useEffect, useState } from 'react'
import { FcPlus } from "react-icons/fc";
import '../../../../styles/ManageQuiz.scss'
import { getAllQuiz } from '../../../../services/apiServices'
import ModalQuiz from './ModalQuiz';
import TableQuiz from './TableQuiz';
import { toast } from 'react-toastify';
import Accordion from 'react-bootstrap/Accordion';
import Questions from '../Question/Questions';
import AssignQuiz from './AssignQuiz';
import { useTranslation } from 'react-i18next';
const ManageQuiz = (props) => {
    const { t } = useTranslation();
    const [show, setShow] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [stateModal, setStateModal] = useState('');
    const [dataQuiz, setDataQuiz] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [dataUpdate, setDataUpdate] = useState([]);
    const [dataView, setDataView] = useState([]);
    const [dataDelete, setDataDelete] = useState([]);
    const [component, setComponent] = useState(false);
    const [listQuizFromQuizzes, setListQuizFromQuizzes] = useState([]);
    const loadDataQuiz = useCallback(async () => {
        let res = await getAllQuiz();
        if (res && res.EC === 0) {
            setDataQuiz(res.DT);
            setIsLoading(false);
            setComponent(true);
            let newQuiz = res.DT.map((item) => {
                return {
                    value: item.id,
                    label: `${item.id} - ${item.name}`
                }
            })
            setListQuizFromQuizzes(newQuiz);
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

            <Accordion defaultActiveKey="0" className='d-flex flex-column gap-2 p-2'>
                <Accordion.Item eventKey="0" className='border border-dark'>
                    <Accordion.Header className='fw-bold'>{t(`sidebar.manage-quizzes`)}</Accordion.Header>
                    <Accordion.Body>
                        <button className="btn btn-primary d-flex align-items-center gap-1 mb-2"
                            onClick={() => { setShow(true); setStateModal('ADD'); }}><FcPlus /> {t(`quizzes.add`)}</button>
                        <TableQuiz
                            t={t}
                            dataQuiz={dataQuiz}
                            isLoading={isLoading}
                            handleClickUpdateQuiz={handleClickUpdateQuiz}
                            handleClickViewQuiz={handleClickViewQuiz}
                            setShowDelete={setShowDelete}
                            showDelete={showDelete}
                            dataDelete={dataDelete}
                            handleClickDeleteQuiz={handleClickDeleteQuiz}
                            loadDataQuiz={loadDataQuiz} />
                    </Accordion.Body>
                    <ModalQuiz resetDataUpdate={resetDataUpdate} dataView={dataView} show={show} setShow={setShow} stateModal={stateModal} loadDataQuiz={loadDataQuiz} dataUpdate={dataUpdate} />
                </Accordion.Item>
                <Accordion.Item eventKey="1" className='border border-dark'>
                    <Accordion.Header>{t(`quizzes.updateqaquizzes`)}</Accordion.Header>
                    <Accordion.Body>
                        <Questions listQuizFromQuizzes={listQuizFromQuizzes} component={component} loadAllDataQuizFromQuizzes={loadDataQuiz} />
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2" className='border border-dark'>
                    <Accordion.Header>{t(`quizzes.assign`)}</Accordion.Header>
                    <Accordion.Body>
                        <AssignQuiz listQuizFromQuizzes={listQuizFromQuizzes} />
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </div>
    )
}

export default ManageQuiz