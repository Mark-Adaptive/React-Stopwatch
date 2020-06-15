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
export function formatLap(lap, index, length, min, max) {
    let colour;

    // If first lap, no color
    if (lap === max) {
        colour = "red";
    }
    else if (lap === min) {
        colour = "green";
    }
    else {
        colour = "white";
    }
    
    return <li key={length - index - 1} style={{ color: colour }} >Lap {length-index} {msToTimerString(lap)}</li>

 }