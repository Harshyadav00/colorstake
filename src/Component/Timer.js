import React, { useEffect, useState } from 'react';
// import Countdown from 'react-countdown';

const Timer = ({ timeLeft = 0 }) => {
    return (
        <div>
            <h1><Countdown initialTime={timeLeft} /></h1>
        </div>
    );
};

const Countdown = ({ initialTime }) => {
    const [timeLeft, setTimeLeft] = useState(initialTime);

    useEffect(() => {
        setTimeLeft(initialTime);
    }, [initialTime]);

    useEffect(() => {
        if (timeLeft <= 0) return;

        const timer = setInterval(() => {
            setTimeLeft((prev) => Math.max(prev - 1000, 0)); // Prevents negative values
        }, 1000);

        return () => clearInterval(timer); // Cleanup on unmount
    }, [timeLeft]);


    function convertMillisecondsToTime(milliseconds) {
        let totalSeconds = Math.floor(milliseconds / 1000);
        let hours = Math.floor(totalSeconds / 3600);
        let minutes = Math.floor((totalSeconds % 3600) / 60);
        let seconds = totalSeconds % 60;

        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }


    return (
        <div className="p-4 border rounded-lg text-center">
            {convertMillisecondsToTime(timeLeft)}
        </div>
    );
};


export default Timer;