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

const Controller = ({
  type,
  mins,
  incHandler,
  decHandler,
  start
}: ControllerProps) => {
  return (
    <div className='d-flex flex-column justify-content-center'>
      <h5
        id={`${type === breakSession ? 'break-label' : 'session-label'}`}
        className='mx-auto'>{`${type} Length`}</h5>
      <div className='d-flex align-items-center justify-content-center'>
        <button
          disabled={mins >= 60 || mins === 1 || start}
          id={`${
            type === breakSession ? 'break-increment' : 'session-increment'
          }`}
          onClick={() => incHandler(type)}
          className='arrow border-0'>
          <FaArrowUp />
        </button>
        <div
          id={`${type === breakSession ? 'break-length' : 'session-length'}`}
          className='w-25 mx-2 text-center'>
          {mins}
        </div>
        <button
          disabled={mins === 1 || start}
          id={`${
            type === breakSession ? 'break-decrement' : 'session-decrement'
          }`}
          onClick={() => decHandler(type)}
          className='arrow border-0'>
          <FaArrowDown />
        </button>
      </div>
    </div>
  );
};

const mapStateToProps = (
  { clock: { SessionMins, BreakMins, start } }: AppState,
  { type }: { type: sessionType }
) => ({ mins: type === session ? SessionMins : BreakMins, start });

const mapDispatchToProps = {
  incHandler,
  decHandler
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Controller);
