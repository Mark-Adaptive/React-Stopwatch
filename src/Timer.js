import React, { useState, useEffect } from 'react';
import {msToTimerString, lapTimeToString} from "./utils.js";

export function Timer() {
    const [isRunning, setRunning] = useState(false);
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [lapTimes, setLapTimes] = useState([]);
    const [lapDisplay, setLapDisplay] = useState("");

    function toggle() {
        setRunning(!isRunning);
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
            setTimeElapsed(0);
            setLapTimes([]);
            setRunning(false);
            setLapDisplay("");
        }
    }

    // On start/stop toggle
    useEffect( () => {
        let timerProcess;
        const startTime = Date.now() - timeElapsed;

        // If running, keep updating timer
        if (isRunning) {
            timerProcess = setInterval(() => {
                setTimeElapsed(Date.now() - startTime);
            }, 0);
        }

        return () => clearInterval(timerProcess);

    }, [isRunning]); // why does react tell me to add timeElapsed here? I don't want to create a new interval at every time change (i.e. every ms).
                     // quick search tells me to wrap useEffect in a useCallback to avoid

                     
    // When lap time gets added to array
    useEffect( () => {
        const newLapDisplay = [...lapTimes].map((time, index) => lapTimeToString([...lapTimes], index));
        setLapDisplay(newLapDisplay);
    }, [lapTimes]);

    return (
        <div className="App">
            <header className="App-header">
                <div>
                    <h1>Elapsed time: {msToTimerString(timeElapsed)}</h1>
                        <button onClick={toggle}>{isRunning ? "Stop" : "Start"}</button>
                        <button onClick={resetOrLap}>{isRunning ? "Lap" : "Reset"}</button>
                        <ul>{lapDisplay}</ul>
                </div>
            </header>
        </div>
    )
}

export default Timer;