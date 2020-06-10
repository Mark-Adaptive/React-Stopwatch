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