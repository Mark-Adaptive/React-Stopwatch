export const initialStopwatch = {
    elapsedTime: 0,
    isRunning: false,
    lapTimes: []
}

export const initialLaps = {
    lapTimes: []
}

export const reducer = (state, {type, payload}) => {
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

export const reducerWithLaps = (state, {type, payload}) => {
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

