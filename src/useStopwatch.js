//import React, { useState, useEffect, useRef, useMemo } from 'react';

export const initialStopwatch = {
    elapsedTime: 0,
    isRunning: false
}

export const initialLaps = {
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
        default:
            return state;
    }
}

export function lapReducer(state, {type, payload}) {
    switch(type) {
        case "LAP":
            // const newLapTime = 
            // return {...state, }
        default:
            return state;
    }
}
