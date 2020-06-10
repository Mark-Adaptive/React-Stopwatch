import React from 'react';
import {msToTimerString} from "./utils.js";

// Simple class component
class Timer extends React.Component {
    constructor(props) {
      super(props);
      this.state = {isRunning: false, 
        startTime: 0, 
        elapsedTime: 0};
    }
  
    render() {
      const elapsedTime = this.state.elapsedTime;
      return (
        <div>
        <h1>Elapsed time: {msToTimerString(elapsedTime)}</h1>
        <button onClick={this.state.isRunning ? this.stopStopwatch : this.startStopwatch}>Start</button>
        <button onClick={this.resetStopwatch}>Reset</button>
        </div>
      );
    }
  
    componentDidMount() {
        // Anything here?
    }

    startStopwatch = () => {
        this.setState({isRunning:true, 
            elapsedTime: this.state.elapsedTime,
            startTime: Date.now() - this.state.elapsedTime
        });

        this.timerProcess = setInterval(() => {this.setState
            ({ 
            elapsedTime: Date.now() - this.state.startTime
        });
    }, 1); 
    };

    stopStopwatch = () => {
        clearInterval(this.timerProcess);
        this.setState({isRunning: false});
    }

    resetStopwatch = () => {
        // todo
    }
}

export default Timer;