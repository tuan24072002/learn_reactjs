import React, { useCallback, useEffect, useState } from 'react'
import Select from 'react-select'
import { toast } from 'react-toastify';
import { getAllUser, postAssignQuizToUser } from '../../../../services/apiServices';
import _ from 'lodash';
import { useTranslation } from 'react-i18next';

const AssignQuiz = (props) => {
    const { listQuizFromQuizzes } = props
    const [selectedQuiz, setSelectedQuiz] = useState({});
    const [isSubmit, setIsSubmit] = useState(false)
    const [listUser, setListUser] = useState([]);
    const [selectedUser, setSelectedUser] = useState({});
    const { t } = useTranslation();
    const loadDataUser = useCallback(async () => {
        let res = await getAllUser();
        if (res && res.EC === 0) {
            let newUser = res.DT.map((item) => {
                return {
                    value: item.id,
                    label: `${item.id} - ${item.email}`
                }
            })
            setListUser(newUser)
        }
    }, [])
    useEffect(() => {
        loadDataUser();
    }, [loadDataUser])
    const handleAssignQuizToUser = async () => {
        setIsSubmit(true);
        if (_.isEmpty(selectedQuiz) || _.isEmpty(selectedUser)) {
            return;
        }
        let res = await postAssignQuizToUser(selectedQuiz.value, selectedUser.value);
        if (res && res.EC === 0) {
            toast.success(res.EM);
        }
        if (res && res.EC !== 0) {
            toast.warning(res.EM);
        }
    }
    return (
        <div className='assign-quiz-container row'>
            <div className='col-6 form-group'>
                <label>{t('quizzes.select')}:</label>
                <Select
                    onChange={(e) => setSelectedQuiz(e)}
                    defaultValue={selectedQuiz}
                    options={listQuizFromQuizzes}
                    isClearable
                    isSearchable
                    className={`form-control ${_.isEmpty(selectedQuiz) && isSubmit && 'is-invalid'}`} />
            </div>
            <div className='col-6 form-group'>
                <label>{t('quizzes.select-user')}:</label>
                <Select
                    onChange={(e) => setSelectedUser(e)}
                    defaultValue={selectedUser}
                    options={listUser}
                    isClearable
                    isSearchable
                    className={`form-control ${_.isEmpty(selectedUser) && isSubmit && 'is-invalid'}`} />
            </div>
            <div>
                <button className='btn btn-warning mt-3' onClick={() => handleAssignQuizToUser()}>{t(`quizzes.assign-button`)}</button>
            </div>
        </div>
    )
}

export default AssignQuiz