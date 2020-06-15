import React, { useState, useEffect, useRef, useMemo } from 'react';
import {msToTimerString, formatLap} from "./utils.js";

export function Timer() {
    const [isRunning, setRunning] = useState(false);
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [lapTimes, setLapTimes] = useState([]);
    const startTime = useRef(0);

    function toggle() {
        setRunning(x => !x);
    }

    function resetOrLap() {
        const currentTimeElapsed = timeElapsed;
        if (isRunning) {
            // Prepending the lap time in the state array
            const timeCountedInLaps = lapTimes.reduce((sum, lapTime) => sum + lapTime, 0);
            const newLapTime = currentTimeElapsed - timeCountedInLaps;
            setLapTimes(lapTimes => [newLapTime, ...lapTimes]);
        }
        else {
            // Resetting
            startTime.current = 0
            setTimeElapsed(0);
            setLapTimes([]);
            setRunning(false);
        }
    }

    useEffect(() => {
        if (isRunning) {
            startTime.current += Date.now()
        } else if (startTime.current !== 0) { // bug was here
            startTime.current -= Date.now()
        }
    }, [isRunning])

    // On start/stop toggle
    useEffect( () => {
        console.log(startTime.current);
        if (!isRunning) {
            return
        }

        let timerProcess;
        timerProcess = setInterval(() => {
            setTimeElapsed(Date.now() - startTime.current);
        }, 0);

        return () => clearInterval(timerProcess);

    }, [isRunning]);

                     
    // When a new lap gets added
    const lapDisplay = useMemo(() => {
        const minLapTime = lapTimes.length < 2 ? null : Math.min(...lapTimes);
        const maxLapTime = lapTimes.length < 2 ? null : Math.max(...lapTimes);

        return [...lapTimes].map((lap, index) => formatLap(lap, index, lapTimes.length, minLapTime, maxLapTime));

    }, [lapTimes]);
    

    return (
        <div className="App">
            <header className="App-header">
                <div>
                    <h1>{msToTimerString(timeElapsed)}</h1>
                        <button onClick={toggle}>{isRunning ? "Stop" : "Start"}</button>
                        <button onClick={resetOrLap}>{isRunning ? "Lap" : "Reset"}</button>
                        <ul> {lapDisplay} </ul>
                </div>
            </header>
        </div>
    )
}

export default Timer;