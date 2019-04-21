import React from 'react';
import { connect } from 'react-redux';
import { onReset } from '../store/clock/actions';
import { AppState } from '../store';

interface ResetProps {
  onReset: () => void;
  timer: any;
}

const Reset = (props: ResetProps) => {
  const sound = document.getElementById('beep') as HTMLAudioElement;
  return (
    <button
      id='reset'
      onClick={() => {
        if (sound !== null) {
          sound.pause();
          sound.currentTime = 0;
        }
        if (props.timer) {
          props.timer.cancel();
        }
        props.onReset();
      }}
      className='btn btn-danger btn-md'>
      reset
    </button>
  );
};

const mapDispatchToProps = {
  onReset
};
const mapStateToProps = ({ clock: { timer } }: AppState) => ({
  timer
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Reset);
