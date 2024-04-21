import React, { useEffect, useState } from 'react'
import { GiAlarmClock } from "react-icons/gi";
const TimerCountDown = (props) => {
    const { handleFinishQuiz, setTimeOver, isFinished } = props
    const [minutes, setMinutes] = useState(90);
    const [seconds, setSeconds] = useState(0);

    useEffect(() => {
        if (isFinished) {
            handleFinishQuiz();
            return;
        }
        if (seconds === 0 && minutes === 0) {
            setTimeOver(true);
            handleFinishQuiz();
            return;
        }
        const timer = setInterval(() => {
            if (seconds === 0 && minutes > 0) {
                setSeconds(59);
                setMinutes(minutes - 1)
            } else {
                setSeconds(seconds - 1)
            }
        }, 1000);
        return () => {
            clearInterval(timer)
        }
    }, [seconds, minutes, handleFinishQuiz, setTimeOver, isFinished])
    return (
        <div className={`countdown-container ${(minutes < 5 || (minutes === 5 && seconds === 0)) && 'fw-bold text-danger'}`}>
            <GiAlarmClock size={'1.5em'} />
            <span>{minutes < 10 ? '0' + minutes : minutes}:{seconds < 10 ? '0' + seconds : seconds}</span>
        </div>
    )
}

export default TimerCountDown