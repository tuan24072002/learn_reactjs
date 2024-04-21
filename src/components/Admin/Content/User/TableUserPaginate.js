import React from 'react'
import ModalDeleteUser from './ModalDeleteUser';
import ReactPaginate from 'react-paginate'
import { ImSpinner10 } from "react-icons/im";
const TableUserPaginate = (props) => {
    const { t, isLoading, pageCount, loadUser, setPage, user, handleClickUpdateUser, handleClickDeleteUser, handleClickViewUser, showDelete, setShowDelete, dataDelete } = props

    const handlePageClick = async (event) => {
        setPage(+event.selected + 1);
    };
    return (
        <>
            <table className="table table-hover table-bordered">
                <thead>
                    <tr>
                        <th scope='col'>ID</th>
                        <th scope='col'>Email</th>
                        <th scope='col'>{t(`users.username`)}</th>
                        <th scope='col'>{t(`users.role`)}</th>
                        <th scope='col'>{t(`users.action`)}</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        user && user.length > 0 ? user.map((data, index) => {
                            return (
                                <tr key={`table-user-${index}`}>
                                    <th scope='row'>{data.id}</th>
                                    <td>{data.email}</td>
                                    <td>{data.username}</td>
                                    <td>{data.role}</td>
                                    <td className="d-flex gap-2 justify-content-center">
                                        <button className="btn btn-secondary" onClick={() => handleClickViewUser(data)}>{t(`users.view`)}</button>
                                        <button className="btn btn-success mx-3" onClick={() => handleClickUpdateUser(data)}>{t(`users.update`)}</button>
                                        <button className="btn btn-danger" onClick={() => handleClickDeleteUser(data)}>{t(`users.delete`)}</button>
                                    </td>
                                </tr>

                            )
                        }) : isLoading ? <tr><td colSpan={5}><span className='text-secondary fw-bold'>Loading...</span><ImSpinner10 className="loader-icon" /></td></tr> : <tr><td colSpan={5} className='text-danger fw-bold'>Not found data</td></tr>
                    }
                </tbody>
                <ModalDeleteUser show={showDelete} loadUser={loadUser} setShow={setShowDelete} dataDelete={dataDelete} setPage={setPage} />
            </table>
            <div className='user-pagination'>
                <ReactPaginate
                    nextLabel=">"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={3}
                    marginPagesDisplayed={2}
                    pageCount={pageCount}
                    previousLabel="<"
                    pageClassName="page-item"
                    pageLinkClassName="page-link"
                    previousClassName="page-item"
                    previousLinkClassName="page-link"
                    nextClassName="page-item"
                    nextLinkClassName="page-link"
                    breakLabel="..."
                    breakClassName="page-item"
                    breakLinkClassName="page-link"
                    containerClassName="pagination"
                    activeClassName="active"
                    renderOnZeroPageCount={null}
                />
            </div>
        </>
    )
}

export default TableUserPaginate