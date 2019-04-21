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
  onResume
} from '../store/clock/actions';
import { AppState } from '../store';
import { sessionType } from '../store/clock/types';

interface StartPRops {
  switchTime: (callback: () => void) => void;
  totalSeconds: number;
  decTotalSecs: () => void;
  stopTimer: () => void;
  startTimer: () => void;
  session: sessionType;
  switchSession: () => void;
  start: boolean;
  setTimer: (timer: number) => void;
  timer: number | null;
  pause: boolean;
  onPause: () => void;
  onResume: (callback: () => void) => void;
}

class Start extends Component<StartPRops> {
  componentDidUpdate(prevProps: StartPRops) {
    if (this.props.pause && this.props.timer) {
      console.log('paused cdu');
    }
  }
  handleStart = () => {
    if (!this.props.start && !this.props.pause) {
      console.log('start');
      this.handlePlay();
    } else if (this.props.start && !this.props.pause) {
      console.log('pause');
      // pause
      this.props.onPause();
      if (this.props.timer) {
        console.log('CLEAR INTERVAL');
        clearInterval(this.props.timer);
      }
      this.props.stopTimer();
    } else if (!this.props.start && this.props.pause) {
      console.log('resume');
      // resume
      this.props.onResume(this.handlePlay);
    }
  };
  handlePlay = () => {
    const sound = document.getElementById('beep') as HTMLAudioElement;
    this.props.startTimer();
    const timer: any = setInterval(() => {
      if (!this.props.timer) {
        this.props.setTimer(timer);
      }
      if (this.props.totalSeconds > 0) {
        this.props.decTotalSecs();
      }
      if (this.props.totalSeconds === 0) {
        sound.currentTime = 0;
        sound.play();
        clearInterval(timer);
        if (this.props.timer) {
          clearInterval(this.props.timer);
        }
        this.props.switchSession();
        setTimeout(() => {
          this.props.switchTime(this.handlePlay);
        }, 1000);
      }
    }, 1000);
  };
  render() {
    return (
      <button
        id='start_stop'
        onClick={this.handleStart}
        className='btn  btn-primary btn-md'>
        {this.props.start ? 'pause' : 'start'}
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
  onResume,
  switchTime
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Start);
