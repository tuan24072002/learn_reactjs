import React, { useEffect, useState } from 'react'
import '../../../styles/DashBoard.scss'
import { Bar, BarChart, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { getDashBoardOverview } from '../../../services/apiServices';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
const DashBoard = () => {
    const [dataChart, setDataChart] = useState({});
    const { t } = useTranslation();
    const fetchDataChart = async () => {
        let res = await getDashBoardOverview();
        if (res && res.EC === 0) {
            setDataChart(res.DT);
        } else {
            toast.error(res.EM);
        }
    }
    useEffect(() => {
        fetchDataChart();
    }, [])
    const data = [
        {
            "name": t('admin.quizzes'),
            "QZ": dataChart?.others?.countQuiz ?? 0,
        },
        {
            "name": t('admin.questions'),
            "QS": dataChart?.others?.countQuestions ?? 0
        },
        {
            "name": t('admin.answers'),
            "AS": dataChart?.others?.countAnswers ?? 0,
        },
        {
            "name": t('admin.users'),
            "US": dataChart?.users?.total ?? 0,
        }
    ]
    return (
        <div className='dashboard-container'>
            <div className='title'>
                {t('admin.dashboard-title')}
            </div>
            <div className='content'>
                <div className='content-left'>
                    <div className='child'>
                        <span className='text-1'>{t('admin.total-users')}</span>
                        <span className='text-2'>{dataChart?.users?.total ?? 0}</span>
                    </div>
                    <div className='child'>
                        <span className='text-1'>{t('admin.total-quizzes')}</span>
                        <span className='text-2'>{dataChart?.others?.countQuiz ?? 0}</span>
                    </div>
                    <div className='child'>
                        <span className='text-1'>{t('admin.total-questions')}</span>
                        <span className='text-2'>{dataChart?.others?.countQuestions ?? 0}</span>
                    </div>
                    <div className='child'>
                        <span className='text-1'>{t('admin.total-answers')}</span>
                        <span className='text-2'>{dataChart?.others?.countAnswers ?? 0}</span>
                    </div>
                </div>
                <div className='content-right'>
                    <ResponsiveContainer width='95%' height='100%'>
                        <BarChart data={data}>
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="QZ" fill="#8884d8" />
                            <Bar dataKey="QS" fill="#82ca9d" />
                            <Bar dataKey="AS" fill="#FF6A6A" />
                            <Bar dataKey="US" fill="#1E90FF" />
                        </BarChart>
                    </ResponsiveContainer>

                </div>
            </div>
        </div >
    )
}

export default DashBoard