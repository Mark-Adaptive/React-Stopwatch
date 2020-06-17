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
        case "LAP":
            const timeCountedInLaps = state.lapTimes.reduce((sum, lapTime) => sum + lapTime, 0);
            const newLapTime = state.elapsedTime - timeCountedInLaps; 
            return {...state, lapTimes: [newLapTime, ...state.lapTimes]};
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

