//import React, { useState, useEffect, useRef, useMemo } from 'react';

export const initialStopwatch = {
    elapsedTime: 0,
    isRunning: false
}

const Actions = {type: 'TICK', payload: undefined} | {type: 'TOGGLE', payload: undefined} | {type: 'RESET', payload: undefined};

export function reducer(state: initialStopwatch, {type, payload}: Actions): initialStopwatch {
    switch(type) {
        case "TOGGLE":
            console.log("TOGGLE");
            console.log(state.elapsedTime);
            return {...state, isRunning: !state.isRunning};
        case "TICK":
            console.log("TICK");
            console.log(state.elapsedTime);
            return {...state, elapsedTime: payload};
        case "RESET":
            console.log("RESET");
            console.log(state.elapsedTime);
            return {...initialStopwatch, elapsedTime: 0};
        default:
            return state;
    }
}
