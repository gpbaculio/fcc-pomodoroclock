export const breakSession = 'Break';
export const session = 'Session';
export const DEC_TOTALSECS = 'DEC_TOTALSECS';
export const INC_SESSIONMINS = 'INC_SESSIONMINS';
export const INC_BREAKMINS = 'INC_BREAKMINS';
export const DEC_SESSIONMINS = 'DEC_SESSIONMINS';
export const DEC_BREAKMINS = 'DEC_BREAKMINS';
export const START_TIMER = 'START_TIMER';
export const STOP_TIMER = 'STOP_TIMER';
export const SET_TOTALSECS = 'SET_TOTALSECS';
export const SWITCH_SESSION = 'SWITCH_SESSION';
export const SWITCH_TIME = 'SWITCH_TIME';
export const SET_TIMER = 'SET_TIMER';
export const ON_RESET = 'ON_RESET';
export const ON_PAUSE = 'ON_PAUSE';
export const ON_RESUME = 'ON_RESUME';
export type sessionType = typeof breakSession | typeof session;

export interface ClockState {
  start: boolean;
  session: sessionType;
  totalSeconds: number;
  SessionMins: number;
  BreakMins: number;
  pause: boolean;
  timer: number | null;
}

interface decTotalSecs {
  type: typeof DEC_TOTALSECS;
}

interface timeControls {
  type:
    | typeof SWITCH_TIME
    | typeof INC_SESSIONMINS
    | typeof DEC_SESSIONMINS
    | typeof INC_BREAKMINS
    | typeof DEC_BREAKMINS
    | typeof START_TIMER
    | typeof SWITCH_SESSION
    | typeof STOP_TIMER
    | typeof ON_RESET
    | typeof ON_PAUSE
    | typeof ON_RESUME;
}

interface setTotalSecs {
  type: typeof SET_TOTALSECS;
  payload: {
    seconds: number;
  };
}

interface setTimer {
  type: typeof SET_TIMER;
  payload: {
    timer: number;
  };
}

export type ClockActionTypes =
  | decTotalSecs
  | timeControls
  | setTotalSecs
  | setTimer;
