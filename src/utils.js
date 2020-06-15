import React from "react";

// Function that takes milliseconds and returns a string of its corresponding 'stopwatch' format,
// i.e. mm:ss.cs
export function msToTimerString(ms) {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms - (minutes * 60000)) / 1000);
    const centiseconds = Math.floor((ms % 1000) / 10);

    // Padding "0" to time components that are less  than 10
    // i.e. we want to display 04:12.09 instead of 4:12.9
    const [minutesStr, secondsStr, centisecondsStr] = [
        minutes,
        seconds,
        centiseconds,
    ].map(n => n.toString().padStart(2, '0'));

    return `${minutesStr}:${secondsStr}.${centisecondsStr}`;
}

// Takes in a lap index and an array of laps, returns a string format based on whether it is min/max/regular
export function lapTimeToString(lapTimes, lapIndex) {
    const minLapTime = Math.min(...lapTimes);
    const maxLapTime = Math.max(...lapTimes);
    const lapTime = lapTimes[lapIndex];
    let lapString;

    // If first lap, no color
    if (lapTimes.length === 1) {
        lapString = <li key={lapIndex}>Lap {lapIndex} {msToTimerString(lapTime)}</li>;
    }
    else if (lapTime <= minLapTime) {
    lapString = <li key={lapIndex} style={{ color: "green" }}>Lap {lapIndex} {msToTimerString(lapTime)}</li>;
    }
    else if (lapTime >= maxLapTime) {
        lapString = <li key={lapIndex} style={{ color: "red" }}>Lap {lapIndex} {msToTimerString(lapTime)}</li>;
    }
    else {
        lapString = <li key={lapIndex}>Lap {lapIndex} {msToTimerString(lapTime)}</li>;
    }
    return lapString;
}