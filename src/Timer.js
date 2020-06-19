import React, { useMemo } from 'react';
import {msToTimerString, formatLap} from "./utils.js";
import { useStopwatchWithLaps } from "./useStopwatch.js"

function Timer() {
    const [{elapsedTime, isRunning, laps}, dispatch] = useStopwatchWithLaps();
    
    // When a new lap gets added
    const lapDisplay = useMemo(() => {
        const minLapTime = laps.length < 2 ? null : Math.min(...laps);
        const maxLapTime = laps.length < 2 ? null : Math.max(...laps);
        return [...laps].map((lap, index) => formatLap(lap, index, laps.length, minLapTime, maxLapTime));
    }, [laps]);

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
                        <ul id="lapDisplay"> {lapDisplay} </ul>
                    </div>
                </div>
            </header>
        </div>
    )
}

export default Timer;