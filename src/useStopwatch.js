import React, { useEffect, useRef, useMemo, useReducer } from 'react';

/*export const reducerWithLaps = (state, {type, payload}) => {
    switch(type) {	
        case "LAP":	
            const timeCountedInLaps = state.lapTimes.reduce((sum, lapTime) => sum + lapTime, 0);
            const newLapTime = payload - timeCountedInLaps; 
            return {...state, lapTimes: [newLapTime, ...state.lapTimes]};
        default:
            const {elapsedTime, isRunning, lapTimes} = reducer(state, {type, payload});
            return {elapsedTime, isRunning, lapTimes};
    }	
}
*/

export const useStopwatch = () => {
    const initialStopwatch = {
        elapsedTime: 0,
        isRunning: false,
    }

    const startTime = useRef(0);

    function reducer (state, {type, payload}) {
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

    const [{elapsedTime, isRunning}, dispatch] = useReducer(reducer, initialStopwatch);

    let timerProcess;
    useEffect (() => {
        if (isRunning) {
            startTime.current += Date.now();
            // eslint-disable-next-line react-hooks/exhaustive-deps
            timerProcess = setInterval(() => {
                dispatch({type: "TICK", payload: Date.now() - startTime.current});
            }, 1)
        }

        else if (startTime.current !== 0) {
            startTime.current -= Date.now();
        }

        return () => clearInterval(timerProcess);

    }, [isRunning]);

    // At reset
    useEffect(() => {
        if (elapsedTime === 0) {
            startTime.current = 0;
        }
    }, [elapsedTime]);

    return [{elapsedTime, isRunning}, dispatch];
}


/* const useStopwatch = () => {
    // TODO: implement this

    return [{]}]
}


const useStopwatchWithLaps = () => {
    const [{ellapsedTime, isRunning}, stopwatchDispatch] = useStopwatch()
    //
    //
    
}
*/

/*
type UseStopwatch: (): [{ellapsedTime: number, isRunning: boolean}, dispatch('TOGGLE' | 'RESET')]
type UseStopwatch: (): [{ellapsedTime: number, isRunning: boolean, laps: number[]}, dispatch('TOGGLE' | 'RESET' | 'LAP')]
*/