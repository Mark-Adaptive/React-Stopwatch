import React, { useState, useEffect, useRef, useMemo, useReducer } from 'react';
import {msToTimerString, formatLap} from "./utils.js";
import { reducer, initialStopwatch, initialLaps } from "./useStopwatch.js"

function Timer() {

    const [{elapsedTime, isRunning, lapTimes}, dispatch] = useReducer(reducer, initialStopwatch);
    const startTime = useRef(0);
    
    let timerProcess;
    useEffect (() => {
        if (isRunning) {
            startTime.current += Date.now();
            timerProcess = setInterval(() => {
                dispatch({type: "TICK", payload: Date.now() - startTime.current});
            }, 1)
        }

        else if (startTime.current !== 0) {
            startTime.current -= Date.now();
        }

        return () => clearInterval(timerProcess);

    }, [isRunning]);

    // At reset
    useEffect(() => {
        if (elapsedTime === 0) {
            startTime.current = 0;
        }
    }, [elapsedTime]);

    
    // When a new lap gets added
    /*/const lapDisplay = useMemo(() => {
        const minLapTime = lapTimes.length < 2 ? null : Math.min(...lapTimes);
        const maxLapTime = lapTimes.length < 2 ? null : Math.max(...lapTimes);

        return [...lapTimes].map((lap, index) => formatLap(lap, index, lapTimes.length, minLapTime, maxLapTime));

    }, [lapTimes]);
    */

    return (
        <div className="App">
            <header className="App-header">
                <div>
                    <h1>{msToTimerString(elapsedTime)}</h1>
                        <button onClick={() => dispatch({type: "TOGGLE"})}>{isRunning ? "Stop" : "Start"}</button>
                        <button onClick={() => dispatch({type: "RESET"})}>{isRunning ? "Lap" : "Reset"}</button>
                </div>
            </header>
        </div>
    )
}

export default Timer;