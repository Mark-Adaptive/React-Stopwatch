//import React, { useState, useEffect, useRef, useMemo } from 'react';
import { formatLap } from "./utils.js"

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
        /* case "LAP":
            const minLapTime = state.lapTimes.length < 2 ? null : Math.min(...state.lapTimes);
            const maxLapTime = state.lapTimes.length < 2 ? null : Math.max(...state.lapTimes);
            const newLapTimes = [...state.lapTimes].map((lap, index) => formatLap(lap, index, state.lapTimes.length, minLapTime, maxLapTime)); 
            return {...state, lapTimes: newLapTimes};
            */
        default:
            return state;
    }
}

/* export function lapReducer(state, {type, payload}) {	
    switch(type) {	
        case "LAP":	
            const newLapTime = ...	
            return {[newLapTime, ...state]}	
        default:	
            return state;	
    }	
}
*/

