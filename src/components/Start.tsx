import React, { Component, useState } from 'react';
import { connect } from 'react-redux';
import {
  decTotalSecs,
  startTimer,
  switchSession,
  stopTimer,
  setTimer,
  onPause,
  onResume
} from '../store/clock/actions';
import { AppState } from '../store';
import { sessionType } from '../store/clock/types';

interface StartPRops {
  totalSeconds: number;
  decTotalSecs: () => void;
  stopTimer: () => void;
  startTimer: () => void;
  session: sessionType;
  switchSession: (callback: () => void) => void;
  start: boolean;
  setTimer: (timer: number) => void;
  timer: number | null;
  pause: boolean;
  onPause: () => void;
  onResume: (callback: () => void) => void;
}

class Start extends Component<StartPRops> {
  handleStart = () => {
    const {
      decTotalSecs,
      startTimer,
      switchSession,
      start,
      stopTimer,
      setTimer,
      pause,
      onPause,
      onResume,
      timer
    } = this.props;
    if (!start && !pause) {
      console.log('start');
      this.handlePlay();
    } else if (start && !pause) {
      console.log('pause');
      // pause
      onPause();
      if (this.props.timer) {
        clearInterval(this.props.timer);
      }
      stopTimer();
    } else if (!start && pause) {
      console.log('resume');
      // resume
      onResume(this.handlePlay);
    }
  };
  handlePlay = () => {
    const { setTimer, startTimer, decTotalSecs, switchSession } = this.props,
      sound = document.getElementById('beep') as HTMLAudioElement;
    startTimer();
    const timer: any = setInterval(() => {
      if (!this.props.timer) {
        setTimer(timer);
      }
      if (this.props.totalSeconds > 0) {
        decTotalSecs();
      }
      if (this.props.totalSeconds === 0) {
        sound.currentTime = 0;
        sound.play();
        if (this.props.timer) {
          clearInterval(this.props.timer);
        }
        switchSession(this.handlePlay);
      }
    }, 1000);
  };
  render() {
    const { start } = this.props;
    return (
      <button
        id='start_stop'
        onClick={this.handleStart}
        className='btn  btn-primary btn-md'>
        {start ? 'pause' : 'start'}
      </button>
    );
  }
}

const mapStateToProps = ({
  clock: { totalSeconds, session, start, timer, pause }
}: AppState) => ({
  totalSeconds,
  session,
  start,
  timer,
  pause
});

const mapDispatchToProps = {
  decTotalSecs,
  startTimer,
  switchSession,
  stopTimer,
  setTimer,
  onPause,
  onResume
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Start);
