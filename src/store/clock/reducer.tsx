import {
  ClockState,
  ClockActionTypes,
  DEC_TOTALSECS,
  INC_BREAKMINS,
  DEC_BREAKMINS,
  INC_SESSIONMINS,
  DEC_SESSIONMINS,
  START_TIMER,
  SET_TOTALSECS,
  SWITCH_SESSION,
  session,
  breakSession,
  STOP_TIMER,
  SET_TIMER,
  ON_RESET,
  ON_PAUSE,
  ON_RESUME
} from './types';
import { getTotalSeconds } from '../../utils';

export const initialState: ClockState = {
  start: false,
  session: 'Session',
  totalSeconds: getTotalSeconds(25),
  SessionMins: 25,
  BreakMins: 5,
  pause: false,
  timer: null
};

export default (state = initialState, action: ClockActionTypes) => {
  switch (action.type) {
    case ON_RESET: {
      return { ...initialState };
    }
    case SET_TOTALSECS: {
      return {
        ...state,
        totalSeconds: action.payload.seconds
      };
    }
    case START_TIMER: {
      return {
        ...state,
        start: true,
        pause: false
      };
    }
    case ON_RESUME: {
      return {
        ...state,
        pause: false,
        start: false
      };
    }
    case SET_TIMER: {
      return { ...state, timer: action.payload.timer };
    }
    case STOP_TIMER: {
      return {
        ...state,
        timer: null,
        start: false,
        pause: true
      };
    }
    case ON_PAUSE: {
      return {
        ...state,
        pause: true
      };
    }
    case DEC_TOTALSECS: {
      return {
        ...state,
        totalSeconds: state.totalSeconds - 1
      };
    }
    case INC_SESSIONMINS: {
      return { ...state, SessionMins: state.SessionMins + 1 };
    }
    case DEC_SESSIONMINS: {
      return { ...state, SessionMins: state.SessionMins - 1 };
    }
    case INC_BREAKMINS: {
      return {
        ...state,
        BreakMins: state.BreakMins + 1
      };
    }
    case DEC_BREAKMINS: {
      return {
        ...state,
        BreakMins: state.BreakMins - 1
      };
    }
    case SWITCH_SESSION: {
      return {
        ...state,
        timer: null,
        totalSeconds: getTotalSeconds(
          state.session === session ? state.BreakMins : state.SessionMins
        ),
        session:
          state.session === session
            ? (breakSession as typeof breakSession)
            : (session as typeof session)
      };
    }
    default:
      return state;
  }
};
