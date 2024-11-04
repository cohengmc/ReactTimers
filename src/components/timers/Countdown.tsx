import { useState, useEffect } from 'react';
import { userInputCleanup } from '../../utils/helpers';
import HomeBtnsWithBack from '../generic/HomeBtnsWithBack';
import TimerDisplay from '../generic/TimerDisplay';
import NumberpadInput from '../generic/NumberpadInput';

const Countdown = () => {
    const [seconds, setSeconds] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [isDone, setIsDone] = useState(false);
    const [timerInput, setTimerInput] = useState('000000');
    const [isInputSet, setIsInputSet] = useState(false);

    useEffect(() => {
        let interval = null;

        if (isRunning) {
            if (seconds === 0) {
                setIsDone(true);
                setIsRunning(false);
            }
            interval = setInterval(() => {
                setSeconds(prevseconds => prevseconds - 1);
            }, 1000)
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
        setSeconds(userInputCleanup(timerInput));
        setIsRunning(false);
        setIsDone(false);
    };

    const handleInputBtnClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        const target = event.target as HTMLElement;
        if (target.innerText === 'Set') {
            setSeconds(userInputCleanup(timerInput));
            if (userInputCleanup(timerInput) > 0) {
                setIsInputSet(true);
            }
        } else if (target.innerText === 'Clear') {
            setTimerInput('000000');
        } else {
            setTimerInput(timerInput.slice(1) + target.innerText);
        }
    };
    const handleBackBtn = () => {
        setTimerInput('000000');
        setIsInputSet(false);
        setIsRunning(false);
        setIsDone(false);
    };
    const handleFF = () => {
        setIsDone(true);
    };

    return (
        <div className="clockContainer">
            {isDone ? (
                <h1 className="clockStyle">DO:NE</h1>
            ) : isInputSet ? (
                <TimerDisplay seconds={seconds} />
            ) : (
                <h1 className="clockStyle">{`${timerInput.slice(0, 2)}:${timerInput.slice(2, 4)}:${timerInput.slice(4, 6)}`}</h1>
            )}
            {isInputSet ? (
                <HomeBtnsWithBack timeChange={timeChange} handleReset={handleReset} handleBackBtn={handleBackBtn} handleFF={handleFF} isRunning={isRunning} />
            ) : (
                <NumberpadInput handleInputBtnClick={handleInputBtnClick} />
            )}
        </div>
    );
};
export default Countdown;