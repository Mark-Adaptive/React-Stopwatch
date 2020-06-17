//import React, { useState, useEffect, useRef, useMemo } from 'react';

export const initialStopwatch = {
    elapsedTime: 0,
    isRunning: false,
    lapTimes: []
}

export function reducer(state, {type, payload}) {
    switch(type) {
        case "TOGGLE":
            return {...state, isRunning: !state.isRunning};
        case "TICK":
            return {...state, elapsedTime: payload};
        case "RESET":
            return {...initialStopwatch, elapsedTime: 0};
        // case "LAPS":
            // const newLapTime = .. 
            // return {...initialStopwatch, lapTimes: {newLapTime, ...(state.lapTimes)}}
        default:
            return state;
    }
}

