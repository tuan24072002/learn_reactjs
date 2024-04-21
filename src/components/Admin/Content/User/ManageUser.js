import { useCallback, useEffect, useState } from "react";
import ModalUser from "./ModalUser"
import '../../../../styles/ManageUser.scss'
import { FcPlus } from "react-icons/fc";
import { getUserPaginate } from "../../../../services/apiServices";
// import TableUser from "./TableUser";
import TableUserPaginate from "./TableUserPaginate";
import { useTranslation } from "react-i18next";
const ManageUser = () => {
    const { t } = useTranslation();
    const [stateModal, setStateModal] = useState('');
    const [show, setShow] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [user, setUser] = useState([]);
    const [dataUpdate, setDataUpdate] = useState({});
    const [dataDelete, setDataDelete] = useState({});
    const [dataView, setDataView] = useState({});
    const [page, setPage] = useState(1);
    const [pageCount, setPageCount] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    let LIMIT_PAGE = 3;
    // const loadUser = async () => {
    //     let res = await getAllUser()
    //     if (res && res.EC === 0 && res.DT) {
    //         setUser(res.DT);
    //     }
    // }
    const loadUserPaginate = useCallback(async () => {
        let res = await getUserPaginate(page, LIMIT_PAGE);
        if (res && res.EC === 0 && res.DT) {
            setUser(res.DT.users);
            setPageCount(res.DT.totalPages);
            setIsLoading(false);
        }
    }, [page, LIMIT_PAGE])
    useEffect(() => {
        setIsLoading(true)
        loadUserPaginate();
    }, [loadUserPaginate])
    const handleClickUpdateUser = (user) => {
        setShow(true);
        setDataUpdate(user);
        setStateModal('UPDATE');
    }
    const handleClickDeleteUser = (user) => {
        setShowDelete(true);
        setDataDelete(user);
    }
    const handleClickViewUser = (user) => {
        setShow(true);
        setDataView(user);
        setStateModal('VIEW');
    }
    const resetDataUpdate = () => {
        setDataUpdate({});
        setDataView({});
        setDataDelete({});
    }
    return (
        <div className='manage-user-container'>
            <div className='title'>
                {t(`sidebar.manage-users`)}
            </div>
            <div className='user-content'>
                <div className="btn-add-new">
                    <button className="btn btn-primary d-flex align-items-center gap-1" onClick={() => { setShow(true); setStateModal('ADD'); }}><FcPlus /> {t(`users.add`)}</button>
                </div>
                <div className="table-users-container text-center">
                    <TableUserPaginate t={t} isLoading={isLoading} pageCount={pageCount} loadUser={loadUserPaginate} setPage={setPage} user={user} handleClickViewUser={handleClickViewUser} handleClickUpdateUser={handleClickUpdateUser} handleClickDeleteUser={handleClickDeleteUser} setShowDelete={setShowDelete} showDelete={showDelete} dataDelete={dataDelete} />
                </div>
                <ModalUser show={show} setShow={setShow} loadUser={loadUserPaginate} stateModal={stateModal} dataUpdate={dataUpdate} resetDataUpdate={resetDataUpdate} dataView={dataView} setPage={setPage} />
            </div>

        </div>
    )
}
export default ManageUser