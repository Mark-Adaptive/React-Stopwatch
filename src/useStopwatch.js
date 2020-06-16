//import React, { useState, useEffect, useRef, useMemo } from 'react';

export const initialStopwatch = {
    elapsedTime: 0,
    isRunning: false
}

const Actions = {type: 'TICK', payload: 0} | {type: 'TOGGLE', payload: undefined} | {type: 'RESET', payload: undefined};

export function reducer(state: initialStopwatch, {type, payload}: Actions): inititalStopwatch {
    switch(type) {
        case "TOGGLE":
            console.log("here");
            return {...state, isRunning: !state.isRunning};
        case "TICK":
            return {...state, elapsedTime: payload};
        case "RESET":
            console.log("resetting");
            return initialStopwatch;
        default:
            return state;
    }
}
