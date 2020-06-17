import React, { useEffect, useRef, useMemo, useReducer } from 'react';
import {msToTimerString, formatLap} from "./utils.js";
import { initialStopwatch, reducerWithLaps } from "./useStopwatch.js"

function Timer() {

    const [{elapsedTime, isRunning, lapTimes}, dispatch] = useReducer(reducerWithLaps, initialStopwatch);
    //const [lapTimes, lapDispatch] = useReducer(lapReducer, initialLaps);
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
    const lapDisplay = useMemo(() => {
        console.log(lapTimes);
        const minLapTime = lapTimes.length < 2 ? null : Math.min(...lapTimes);
        const maxLapTime = lapTimes.length < 2 ? null : Math.max(...lapTimes);

        return [...lapTimes].map((lap, index) => formatLap(lap, index, lapTimes.length, minLapTime, maxLapTime));

    }, [lapTimes]);

    return (
        <body>
        <div className="App">
            <header className="App-header">
                <div>
                    <h1 id="timeDisplay">{msToTimerString(elapsedTime)}</h1>
                    <div className="buttons">
                        <button id="toggle" onClick={() => dispatch({type: "TOGGLE"})}>{isRunning ? "Stop" : "Start"}</button>
                        <button id="lap" onClick={() => isRunning ? dispatch({type: "LAP", payload: elapsedTime}) : dispatch({type: "RESET"})}>{isRunning ? "Lap" : "Reset"}</button>
                    </div>
                        <ul className="laps"> {lapDisplay} </ul>
                </div>
            </header>
        </div>
        </body>
    )
}

export default Timer;