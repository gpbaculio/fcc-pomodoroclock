import React, { Component } from 'react';
import './App.css';
import { Controller, Clock, Start, Reset } from './components';

class App extends Component {
  render() {
    return (
      <div className='App d-flex justify-content-center align-items-center flex-column'>
        <h2>Pomodoro Clock</h2>
        <div className='d-flex w-50 my-2 justify-content-around'>
          <Controller type={'Break'} />
          <Controller type={'Session'} />
        </div>
        <Clock />
        <div className='d-flex mt-3 justify-content-around w-25'>
          <Start />
          <Reset />
        </div>
      </div>
    );
  }
}

export default App;
