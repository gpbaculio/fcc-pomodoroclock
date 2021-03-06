import { AnyAction } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { AppState } from '../index';
import {
  DEC_TOTALSECS,
  sessionType,
  session,
  INC_SESSIONMINS,
  breakSession,
  INC_BREAKMINS,
  DEC_SESSIONMINS,
  DEC_BREAKMINS,
  START_TIMER,
  SET_TOTALSECS,
  SWITCH_SESSION,
  STOP_TIMER,
  SET_TIMER,
  ON_RESET,
  ON_PAUSE,
  ON_RESUME,
  SWITCH_TIME,
  REMOVE_TIMER
} from './types';
import { getTotalSeconds } from '../../utils';
export const removeTimer = (): ThunkAction<
  void,
  AppState,
  void,
  AnyAction
> => dispatch => {
  dispatch({ type: REMOVE_TIMER });
};
export const startTimer = (): ThunkAction<
  void,
  AppState,
  void,
  AnyAction
> => dispatch => {
  dispatch({ type: START_TIMER });
};
export const switchTime = (): ThunkAction<
  void,
  AppState,
  void,
  AnyAction
> => dispatch => {
  dispatch({ type: SWITCH_TIME });
};
export const onReset = (): ThunkAction<
  void,
  AppState,
  void,
  AnyAction
> => dispatch => {
  dispatch({ type: ON_RESET });
};

export const setTimer = (
  timer: any
): ThunkAction<void, AppState, void, AnyAction> => dispatch => {
  dispatch({ type: SET_TIMER, payload: { timer } });
};

export const stopTimer = (): ThunkAction<
  void,
  AppState,
  void,
  AnyAction
> => dispatch => {
  dispatch({ type: STOP_TIMER });
};

export const decTotalSecs = (): ThunkAction<
  void,
  AppState,
  void,
  AnyAction
> => dispatch => {
  dispatch({ type: DEC_TOTALSECS });
};

export const incHandler = (
  type: sessionType
): ThunkAction<void, AppState, void, AnyAction> => (dispatch, getState) => {
  if (type === session) {
    dispatch({ type: INC_SESSIONMINS });
    const { SessionMins, session: stateSession } = getState().clock;
    if (type === stateSession) {
      dispatch({
        type: SET_TOTALSECS,
        payload: { seconds: getTotalSeconds(SessionMins) }
      });
    }
  } else if (type === breakSession) {
    dispatch({ type: INC_BREAKMINS });
    const { BreakMins, session: stateSession } = getState().clock;
    if (type === stateSession) {
      dispatch({
        type: SET_TOTALSECS,
        payload: { seconds: getTotalSeconds(BreakMins) }
      });
    }
  }
};

export const decHandler = (
  type: sessionType
): ThunkAction<void, AppState, void, AnyAction> => (dispatch, getState) => {
  if (type === session) {
    dispatch({ type: DEC_SESSIONMINS });
    const { SessionMins, session: stateSession } = getState().clock;
    if (type === stateSession) {
      dispatch({
        type: SET_TOTALSECS,
        payload: { seconds: getTotalSeconds(SessionMins) }
      });
    }
  } else if (type === breakSession) {
    dispatch({ type: DEC_BREAKMINS });
    const { BreakMins, session: stateSession } = getState().clock;
    if (type === stateSession) {
      dispatch({
        type: SET_TOTALSECS,
        payload: { seconds: getTotalSeconds(BreakMins) }
      });
    }
  }
};

export const setTotalSeconds = (
  seconds: number
): ThunkAction<void, AppState, void, AnyAction> => dispatch => {
  dispatch({ type: SET_TOTALSECS, payload: { seconds } });
};

export const switchSession = (): ThunkAction<
  void,
  AppState,
  void,
  AnyAction
> => dispatch => {
  dispatch({ type: SWITCH_SESSION });
};

export const onPause = (): ThunkAction<
  void,
  AppState,
  void,
  AnyAction
> => dispatch => {
  dispatch({ type: ON_PAUSE });
};

export const onResume = (
  callback: () => void
): ThunkAction<void, AppState, void, AnyAction> => dispatch => {
  dispatch({ type: ON_RESUME });
  callback();
};
