import React from 'react'
import { ImSpinner10 } from "react-icons/im";
import ModalDeleteQuiz from './ModalDeleteQuiz';
const TableQuiz = (props) => {
    const { loadDataQuiz, dataQuiz, isLoading, handleClickUpdateQuiz, handleClickViewQuiz, handleClickDeleteQuiz, showDelete, setShowDelete, dataDelete } = props;
    return (
        <>
            <table className="table table-hover table-bordered">
                <thead>
                    <tr>
                        <th scope='col'>ID</th>
                        <th scope='col'>Name</th>
                        <th scope='col'>Description</th>
                        <th scope='col'>Difficulty</th>
                        <th scope='col'>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        dataQuiz && dataQuiz.length > 0 ? dataQuiz.map((item, index) => {
                            return (
                                <tr key={`table-quiz-${index}`}>
                                    <th scope='row'>{item.id}</th>
                                    <td>{item.name}</td>
                                    <td>{item.description}</td>
                                    <td>{item.difficulty}</td>
                                    <td className="d-flex gap-2 justify-content-center">
                                        <button className="btn btn-secondary" onClick={() => handleClickViewQuiz(item)}>View</button>
                                        <button className="btn btn-success mx-3" onClick={() => handleClickUpdateQuiz(item)}>Update</button>
                                        <button className="btn btn-danger" onClick={() => handleClickDeleteQuiz(item)}>Delete</button>
                                    </td>
                                </tr>
                            )
                        }) : isLoading ? <tr><td colSpan={5}><span className='text-secondary fw-bold'>Loading...</span><ImSpinner10 className="loader-icon" /></td></tr> : <tr><td colSpan={5} className='text-danger fw-bold'>Not found data</td></tr>
                    }
                </tbody>
                <ModalDeleteQuiz show={showDelete} loadDataQuiz={loadDataQuiz} setShow={setShowDelete} dataDelete={dataDelete} />
            </table>
        </>
    )
}

export default TableQuiz