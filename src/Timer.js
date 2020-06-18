import React, { useEffect, useRef, useMemo, useReducer } from 'react';
import {msToTimerString, formatLap} from "./utils.js";
import { useStopwatchWithLaps } from "./useStopwatch.js"

function Timer() {

    const [{elapsedTime, isRunning, lapTimes}, dispatch] = useStopwatchWithLaps();
    //const [lapTimes, lapDispatch] = useReducer(lapReducer, initialLaps);
    
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
                    <h1 id="timeDisplay">{msToTimerString(elapsedTime)}</h1>
                    <div className="buttons">
                        <button id="toggle" onClick={() => dispatch({type: "TOGGLE"})}>{isRunning ? "Stop" : "Start"}</button>
                        <button id="lap" onClick={() => isRunning ? dispatch({type: "LAP"}) : dispatch({type: "RESET"})}>{isRunning ? "Lap" : "Reset"}</button>
                    </div>
                    <div className="laps">
                        <ul id="lap-display"> {lapDisplay} </ul>
                    </div>
                </div>
            </header>
        </div>
    )
}

export default Timer;