import React from 'react';
import { connect } from 'react-redux';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';
import { sessionType, session, breakSession } from '../store/clock/types';
import { AppState } from '../store';
import { incHandler, decHandler } from '../store/clock/actions';

interface ControllerProps {
  type: sessionType;
  mins: number;
  incHandler: (type: sessionType) => void;
  decHandler: (type: sessionType) => void;
  start: boolean;
}

const Controller = (props: ControllerProps) => {
  return (
    <div className='d-flex flex-column justify-content-center'>
      <h5
        id={`${props.type === breakSession ? 'break-label' : 'session-label'}`}
        className='mx-auto'>{`${props.type} Length`}</h5>
      <div className='d-flex align-items-center justify-content-center'>
        <button
          disabled={props.mins >= 60 || props.start}
          id={`${
            props.type === breakSession
              ? 'break-increment'
              : 'session-increment'
          }`}
          onClick={() => props.incHandler(props.type)}
          className='arrow border-0'>
          <FaArrowUp />
        </button>
        <div
          id={`${
            props.type === breakSession ? 'break-length' : 'session-length'
          }`}
          className='w-25 mx-2 text-center'>
          {props.mins}
        </div>
        <button
          disabled={props.mins === 1 || props.start}
          id={`${
            props.type === breakSession
              ? 'break-decrement'
              : 'session-decrement'
          }`}
          onClick={() => props.decHandler(props.type)}
          className='arrow border-0'>
          <FaArrowDown />
        </button>
      </div>
    </div>
  );
};

const mapStateToProps = (state: AppState, props: { type: sessionType }) => ({
  mins:
    props.type === session ? state.clock.SessionMins : state.clock.BreakMins,
  start: state.clock.start
});

const mapDispatchToProps = {
  incHandler,
  decHandler
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Controller);
