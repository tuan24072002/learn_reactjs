import React from 'react'
import ModalDeleteUser from './ModalDeleteUser';

const TableUser = (props) => {
    const { loadUser, user, handleClickUpdateUser, handleClickDeleteUser, handleClickViewUser, showDelete, setShowDelete, dataDelete } = props

    return (
        <table className="table table-hover table-bordered">
            <thead>
                <tr>
                    <th scope='col'>ID</th>
                    <th scope='col'>Email</th>
                    <th scope='col'>Username</th>
                    <th scope='col'>Role</th>
                    <th scope='col'>Action</th>
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
                                    <button className="btn btn-secondary" onClick={() => handleClickViewUser(data)}>View</button>
                                    <button className="btn btn-success mx-3" onClick={() => handleClickUpdateUser(data)}>Update</button>
                                    <button className="btn btn-danger" onClick={() => handleClickDeleteUser(data)}>Delete</button>
                                </td>
                            </tr>

                        )
                    }) : <tr><td colSpan={5} className='text-danger fw-bold'>Not found data</td></tr>
                }
            </tbody>
            <ModalDeleteUser show={showDelete} loadUser={loadUser} setShow={setShowDelete} dataDelete={dataDelete} />
        </table>
    )
}

export default TableUser