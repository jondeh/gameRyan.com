import React, {useState, useEffect} from 'react';
import './Timer.scss';
import {TiMediaPause} from 'react-icons/ti'

const Timer = (props) => {
    const [seconds, setSeconds] = useState(0);
    const [minutes, setMinutes] = useState(0);

    useEffect(() => {
        setSeconds(0)
        setMinutes(0)
        const interval = setInterval(() => {
                setSeconds(seconds => {
                    return seconds === 59 ? (setMinutes(minutes => minutes + 1/2), 0) : seconds+1
                })
        }, 1000);
        return () => clearInterval(interval);
    }, [props.play, props.difficulty])

    // console.log(props.play, props.difficulty)

    return (
        <>
        <div className="timer">
            {
                minutes > 0 ? minutes + ":"  + (seconds < 10 ? `0${seconds}` : seconds) : seconds
            }
        </div>
        <div className="pause">
            {/* {} <TiMediaPause size={35} /> */}
        </div>
        </>
    )
}

export default Timer;