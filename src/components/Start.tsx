import React, { Component, useState } from 'react';
import { connect } from 'react-redux';
import {
  decTotalSecs,
  startTimer,
  switchSession,
  stopTimer,
  setTimer,
  onPause,
  switchTime,
  onResume,
  removeTimer
} from '../store/clock/actions';
import { AppState } from '../store';
import { sessionType } from '../store/clock/types';

interface StartPRops {
  switchTime: () => void;
  totalSeconds: number;
  decTotalSecs: () => void;
  stopTimer: () => void;
  startTimer: () => void;
  session: sessionType;
  switchSession: () => void;
  start: boolean;
  setTimer: (timer: any) => void;
  timer: any;
  pause: boolean;
  onPause: () => void;

  removeTimer: () => void;
  onResume: (callback: () => void) => void;
}
declare global {
  interface Window {
    accurateInterval: any;
  }
}
class Start extends Component<StartPRops, { timerId: any }> {
  state = {
    timerId: { cancel: () => null }
  };
  handleStart = () => {
    if (!this.props.start) {
      this.props.startTimer();
      this.setState(
        {
          timerId: window.accurateInterval(1000, () => {
            this.handlePlay();
          })
        },
        () => this.props.setTimer(this.state.timerId)
      );
    } else {
      this.props.timer.cancel();
      this.props.onPause();
    }
  };
  handlePlay = () => {
    const sound = document.getElementById('beep') as HTMLAudioElement;
    this.props.decTotalSecs();
    if (this.props.totalSeconds < 0) {
      this.props.timer.cancel();
      sound.currentTime = 0;
      sound.play();
      this.props.switchSession();
      this.props.switchTime();
      this.handleStart();
    }
  };
  render() {
    return (
      <button
        id='start_stop'
        onClick={this.handleStart}
        className='btn btn-primary btn-md'>
        play
      </button>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  totalSeconds: state.clock.totalSeconds,
  session: state.clock.session,
  start: state.clock.start,
  timer: state.clock.timer,
  pause: state.clock.pause
});

const mapDispatchToProps = {
  decTotalSecs,
  startTimer,
  switchSession,
  stopTimer,
  setTimer,
  onPause,
  onResume,
  switchTime,
  removeTimer
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Start);
