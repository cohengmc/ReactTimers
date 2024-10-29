import { useState, useEffect } from 'react';
import { formatTime } from '../../utils/helpers';
import TextBtn from '../generic/TextBtn';
import HomeBtns from '../generic/HomeBtns';

const Countdown = () => {
    const [seconds, setSeconds] = useState(0);
    const [isRunning, setIsRunning] = useState(false);

    const numberBtns = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

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
            <h1 className="clockStyle">{formatTime(seconds)}</h1>
            <div className="btnContainer">
                {numberBtns.map(btn => (
                    <TextBtn key={`numBtn${btn}`} name={btn.toString()} />
                ))}
            </div>
            <HomeBtns timeChange={timeChange} handleReset={handleReset} isRunning={isRunning} />
        </div>
    );
};
export default Countdown;
