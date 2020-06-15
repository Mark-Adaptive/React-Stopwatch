import React, { useState, useRef, useEffect, useReducer, useMemo } from 'react';

function formatTime(inputTime) {
    const rawTime = new Date(inputTime);
    const minutes = rawTime.getMinutes().toString().padStart(2, '0');
    const seconds = rawTime.getSeconds().toString().padStart(2, '0');
    const centis = Math.round(rawTime.getMilliseconds() /10).toString().padStart(2, '0');
  
    return `${minutes} : ${seconds} . ${centis}`;
}

const not = x => !x
function Stopwatch() {
    const [time, setTime] = useState(0);
    const [isOn, setIsOn] = useState(false);
    const [laps, setLaps] = useState([]);

    const interval = useRef(null);
    const startTime = useRef(0);
    //const stopTimeAdjustment = useRef(0);

    //Increment clock on start and don't increment on stop
    useEffect(() => {
        if (isOn) {
            startTime.current += Date.now();
            interval.current = setInterval(() => {
                setTime(Date.now()-startTime.current);
            }, 10);
            return () => {
                clearInterval(interval.current);
                startTime.current -= Date.now();
                //stopTimeAdjustment.current += (time - totalLapTime.current);
            }
        }
    }, [isOn])

    function reset() {
        startTime.current = 0;
        setTime(0);
        setLaps([]);
        //stopTimeAdjustment.current = 0;
    }

    function flipToggle(){
        setIsOn(prevState => !prevState);
    }

    function lap() {
        setLaps(lapsList => [time - lapsList.reduce((a, b) => a + b, 0), ...lapsList]);
    }


    const formattedLaps = useMemo(() => {
        const [max, min] = laps.length < 2
            ? [null, null]
            : [Math.max(...laps), Math.min(...laps)]

        return laps.map((lap, i) => {
            const color = 
            lap === max ? 'red' :
            lap === min ? 'green' : 'white'
            return <li style={{ color }} key={laps.length - i - 1}>{`Lap ${laps.length - i} - ${formatTime(lap)}`}</li>
        })
    }, [laps])

    return (
        <div className = "timer">
            <h1 id="timeDisplay">{formatTime(time)}</h1>
            <div className="buttons">
                <button type="button" id="lap" onClick={isOn ? lap : reset}>{isOn ? "Lap" : "Reset"}</button>
                <button type="button" id="toggle" onClick={flipToggle}>{isOn ? "Stop" : "Start"}</button>
            </div>
            <div className="laps">
                <h1 className="lap-times-label">Lap times</h1>
                <ul>
                {formattedLaps}
                </ul>
            </div>
        </div>
    )
}

export default Stopwatch;