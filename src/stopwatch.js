import React, { useState, useRef } from 'react';

function Stopwatch() {
    const [time, setTime] = useState(0);
    const [isOn, setIsOn] = useState(false);
    const [isLap, setIsLap] = useState(false);
    const [prevTime, setPrevTime] = useState(0);
    const [prevLapTime, setPrevLapTime] = useState(0); 
    const [shortestLap, setShortestLap] = useState(null);
    const [longestLap, setLongestLap] = useState(null);

    const interval = useRef(null);
    const resetLapButtonDisplay = useRef("Reset");
    const startStopButtonDisplay = useRef("Start");
    function flipToggleButton() {
       isOn ? stop() : start();
    }

    function flipLapButton() {
        isOn ? (!isLap ? startLap(): stopLap()) : reset();
    }

    function updateTime() {
        if (prevTime == 0){
            setPrevTime(Date.now());
        }
        let currentTime = Date.now();
        let timePassed = currentTime - prevTime;
        setPrevTime(currentTime);
        setTime(time+timePassed);
    }
    function start() {
        interval.current = setInterval(()=>updateTime(), 10);
        let currentTime = Date.now();
        setIsOn(true);
        setPrevLapTime(currentTime);
        resetLapButtonDisplay.current = "Lap";
        startStopButtonDisplay.current = "Stop";
    }
    
    function stop() {
        setIsOn(false);
        resetLapButtonDisplay.current = "Reset";
        startStopButtonDisplay.current = "Start";
        clearInterval(interval.current);
    }

    function reset() {
        setIsOn(false);
        setShortestLap(null);
        setLongestLap(null);
        setTime(0);
        setPrevTime(0);
    }
    
    function startLap() {

    }

    function stopLap() {

    }

    function formatTime(inputTime) {
        const rawTime = new Date(inputTime);
        const minutes = rawTime.getMinutes().toString().padStart(2, '0');
        const seconds = rawTime.getSeconds().toString().padStart(2, '0');
        const centis = Math.round(rawTime.getMilliseconds() /10).toString().padStart(2, '0');
      
        return `${minutes} : ${seconds} . ${centis}`;
    }
    return (
        <div className = "timer">
            <h1 id="timeDisplay">{formatTime(time)}</h1>
            <div className="buttons">
            <button type="button" id="lap" onClick={flipLapButton}>{resetLapButtonDisplay.current}</button>
            <button type="button" id="toggle" onClick={flipToggleButton}>{startStopButtonDisplay.current}</button>
            </div>
            <div className="laps">
                <h2 className="lap-times-label">Lap times</h2>
                <ul className="lap-list" id="lapTimes">
                <li className="lap-times">{}</li></ul>
            </div>
        </div>
    )
}

export default Stopwatch;