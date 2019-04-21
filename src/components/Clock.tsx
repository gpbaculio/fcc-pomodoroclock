import React from 'react';
import { connect } from 'react-redux';
import { AppState } from '../store';
import { secondsToTime } from '../utils';
import { breakSession, sessionType } from '../store/clock/types';

interface ClockProps {
  totalSeconds: number;
  denom: number;
  session: sessionType;
  start: boolean;
  pause: boolean;
}

const Clock = (props: ClockProps) => {
  const perc = Math.abs((props.totalSeconds / props.denom) * 100 - 100);
  return (
    <div
      id='clock'
      className='d-flex justify-content-center align-items-center'>
      <div className='d-flex flex-column justify-content-center align-items-center'>
        <audio id='beep' preload='auto' src='https://goo.gl/65cBl1' />
        <div id='time-left' className='time'>
          {secondsToTime(props.totalSeconds)}
        </div>
        <div id='timer-label' className='session'>
          {props.session}
        </div>
      </div>
      <div
        className='position-absolute'
        style={{
          height: `${perc}%`,
          backgroundColor: '#4CAF50',
          width: '100%',
          bottom: 0,
          zIndex: 0
        }}
      />
    </div>
  );
};

const mapStateToProps = (state: AppState) => ({
  totalSeconds: state.clock.totalSeconds,
  session: state.clock.session,
  denom:
    (state.clock.session === breakSession
      ? state.clock.BreakMins
      : state.clock.SessionMins) * 60,
  start: state.clock.start,
  pause: state.clock.pause
});

export default connect(mapStateToProps)(Clock);
