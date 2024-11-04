import { useState, useEffect } from 'react';
import HomeBtns from '../generic/HomeBtns';
import TimerDisplay from '../generic/TimerDisplay';

const Stopwatch = () => {
    const [seconds, setSeconds] = useState(0);
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
        let interval = null;

        if (isRunning) {
            interval = setInterval(() => {
                setSeconds(prevseconds => prevseconds + 1);
            }, 1000);
        } else if (!isRunning && seconds !== 0 && interval != null) {
            clearInterval(interval);
        }
        if (interval != null) {
            return () => clearInterval(interval);
        }
    }, [isRunning, seconds]);

    const timeChange = () => {
        setIsRunning(!isRunning);
    };
    const handleReset = () => {
        setSeconds(0);
        setIsRunning(false);
    };

    return (
        <div className="clockContainer">
            <TimerDisplay seconds={seconds} />
            <HomeBtns timeChange={timeChange} handleReset={handleReset} isRunning={isRunning} />
        </div>
    );
};
export default Stopwatch;
