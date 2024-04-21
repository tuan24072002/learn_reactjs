import { useEffect, useState } from 'react'
import { getHistory } from '../../../services/apiServices'
import { toast } from 'react-toastify';
import '../../../styles/History.scss';
const History = () => {
    const [dataHistory, setDataHistory] = useState([]);
    const fetchDataHistory = async () => {
        let res = await getHistory();
        if (res && res.EC === 0) {
            setDataHistory(res.DT.data);
        } else {
            toast.error(res.EM);
        }
    }
    useEffect(() => {
        fetchDataHistory();
    }, [])
    console.log(dataHistory);
    return (
        <table className='table table-hover table-bordered table-history'>
            <thead>
                <tr>
                    <th>Qiz name</th>
                    <th>Total questions</th>
                    <th>Total corrects</th>
                    <th>Result</th>
                </tr>
            </thead>
            <tbody>
                {
                    dataHistory && dataHistory.length > 0 && dataHistory.map((value, index) => {
                        return (
                            <tr key={`history-${index}`}>
                                <td>{value.quizHistory.description}</td>
                                <td>{value.total_questions}</td>
                                <td>{value.total_correct}</td>
                                <td>{+value.total_correct >= +value.total_questions / 2 ? 'Passed' : 'Failed'}</td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>

    )
}

export default History