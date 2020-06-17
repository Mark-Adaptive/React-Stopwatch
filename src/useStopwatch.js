export const initialStopwatch = {
    elapsedTime: 0,
    isRunning: false,
    lapTimes: []
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
        /*case "LAP":
            const timeCountedInLaps = state.lapTimes.reduce((sum, lapTime) => sum + lapTime, 0);
            const newLapTime = state.elapsedTime - timeCountedInLaps; 
            return {...state, lapTimes: [newLapTime, ...state.lapTimes]};
            */
        default:
            return state;
    }
}

export function reducerWithLaps(state, {type, payload}) {
    const {elapsedTime, isRunning, lapTimes} = reducer(state, {type, payload});	
    console.log(elapsedTime);
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

