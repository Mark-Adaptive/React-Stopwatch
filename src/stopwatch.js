import React, { useState, useRef, useEffect } from 'react';

function formatTime(inputTime) {
    const rawTime = new Date(inputTime);
    const minutes = rawTime.getMinutes().toString().padStart(2, '0');
    const seconds = rawTime.getSeconds().toString().padStart(2, '0');
    const centis = Math.round(rawTime.getMilliseconds() /10).toString().padStart(2, '0');
  
    return `${minutes} : ${seconds} . ${centis}`;
}

function Stopwatch() {
    const [time, setTime] = useState(0);
    const [isOn, setIsOn] = useState(false);
    const [laps, setLaps] = useState([]);

    const interval = useRef(null);
    const startTime = useRef(0);
    const startLapTime = useRef(0);
    const shortestLap = useRef(null);
    const longestLap = useRef(null);
    const lapDisplay = useRef([]);
    const totalLapTime = useRef(0); 

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
            }
        }
    }, [isOn])

    function reset() {
        setTime(0);
        setLaps(lapsList => []);
        startTime.current = 0;
        startLapTime.current = 0;
        shortestLap.current = null; //In milliseconds
        longestLap.current = null; //In milliseconds
        totalLapTime.current = 0;
    }

    function flipToggle(){
        setIsOn(prevState => !prevState);
    }

    function lap() {
        //Calculate time of new lap and set timer for next lap
        let lapTime;
        laps.length !== 0 ? lapTime = time - totalLapTime.current : lapTime = time; //Subtract current total lap time from time display time for new lap time
        //Push new lap to lap array
        setLaps(lapsList => [...lapsList, lapTime]);
    }

    //Update shortest and longest laps on addition of new lap to array 
    useEffect(() => {
        if (laps.length === 1){
            shortestLap.current = laps[0];
            longestLap.current = laps[0];
        } else if (laps.length > 1) {
            for (let i=0; i < laps.length; i++){
                if (shortestLap.current >= laps[i]) {
                    shortestLap.current = laps[i];
                }
                else if (longestLap.current <= laps[i]) {
                    longestLap.current = laps[i];
                }
            }
        }

        //Update display laps to have shortest lap in green and longest lap in red
        lapDisplay.current = [];
        for (let i=0; i < laps.length; i++) {
            if (longestLap.current === laps[i] && laps.length > 1) {
                lapDisplay.current.push(<li style={{ color: 'red' }} key={i}>{formatTime(laps[i])}</li>);
            } else if (shortestLap.current === laps[i] && laps.length > 1) {
                lapDisplay.current.push(<li style={{ color: 'green' }} key={i}>{formatTime(laps[i])}</li>);
            } else {
                lapDisplay.current.push(<li style={{ color: 'black' }} key={i}>{formatTime(laps[i])}</li>);
            }
        }
        //Update total lap time
        totalLapTime.current = laps.reduce((a,b) => a + b, 0);
    }, [laps])

    return (
        <div className = "timer">
            <h1 id="timeDisplay">{formatTime(time)}</h1>
            <div className="buttons">
            <button type="button" id="lap" onClick={isOn ? lap : reset}>{isOn ? "Lap" : "Reset"}</button>
            <button type="button" id="toggle" onClick={flipToggle}>{isOn ? "Stop" : "Start"}</button>
            </div>
            <div className="laps">
                <h2 className="lap-times-label">Lap times</h2>
                {lapDisplay.current}
            </div>
        </div>
    )
}

export default Stopwatch;