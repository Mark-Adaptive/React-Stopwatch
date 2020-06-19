import { useEffect, useRef, useReducer } from 'react';

export const useStopwatch = () => {
    const initialStopwatch = {
        elapsedTime: 0,
        isRunning: false,
    }

    const startTime = useRef(0);

    function stopwatchReducer(state, {type, payload}) {
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

    const [{elapsedTime, isRunning}, dispatch] = useReducer(stopwatchReducer, initialStopwatch);

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

export const useStopwatchWithLaps = () => {
    const initialLaps = {
        lapTimes: []
    }
    const [{elapsedTime, isRunning}, stopwatchDispatch] = useStopwatch();

    function lapReducer(state, {type, payload}) {
        switch(type) {
            case "LAP":
                const timeCountedInLaps = state.lapTimes.reduce((sum, lapTime) => sum + lapTime, 0);
                const newLapTime = payload - timeCountedInLaps; // payload here should be elapsedTime
                return { lapTimes: [newLapTime, ...state.lapTimes] };
            case "RESET":
                return initialLaps;
            default:
                return state;
        }
    }

    const [lapState, lapDispatch] = useReducer(lapReducer, initialLaps); // returns just the new lap state (without elapsedTime, isRunning)

    const dispatch = ({type}) => {
        stopwatchDispatch({type: type});
        lapDispatch({type: type, payload: elapsedTime});
      };

     const newState = {
         elapsedTime: elapsedTime,
         isRunning: isRunning,
         laps: [...lapState.lapTimes]
     }

    return [newState, dispatch]; 
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