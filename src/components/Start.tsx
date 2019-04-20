import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  decTotalSecs,
  startTimer,
  switchSession,
  stopTimer,
  setTimer
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
}

class Start extends Component<StartPRops> {
  handleStart = () => {
    const {
      decTotalSecs,
      startTimer,
      switchSession,
      start,
      stopTimer,
      setTimer
    } = this.props;
    const sound = document.getElementById('beep') as HTMLAudioElement;
    if (!start) {
      startTimer();
      const timer: any = setInterval(() => {
        if (this.props.totalSeconds > 0) {
          decTotalSecs();
        }
        if (this.props.totalSeconds === 0) {
          sound.currentTime = 0;
          sound.play();
          clearInterval(timer);
          switchSession(this.handleStart);
        }
      }, 1000);
      setTimer(timer);
    } else {
      if (this.props.timer) {
        clearInterval(this.props.timer);
      }
      stopTimer();
    }
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
  clock: { totalSeconds, session, start, timer }
}: AppState) => ({
  totalSeconds,
  session,
  start,
  timer
});

const mapDispatchToProps = {
  decTotalSecs,
  startTimer,
  switchSession,
  stopTimer,
  setTimer
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Start);
