import React, { Component, PropTypes } from 'react';
import DevTools from 'mobx-react-devtools';
import { observer } from 'mobx-react';

import Task from './Task.jsx';


@observer
export default class App extends Component {
  renderTasks() {
    return this.props.appState.tasks.map((task)=> (
      <Task key={task._id} task={task} />
    ));
  }

  render() {
    return (
      <div className="container">
        <header><h2>Todos</h2></header>
        <ol>
          { this.renderTasks() }
        </ol>
        <div>
          <span>Max tasks (0 for all): {this.props.appState.limit} </span>
          <button onClick={this.upLimit}>+</button>
          <button onClick={this.downLimit}>-</button>
        </div>
        <div>
          <button onClick={this.addTask}>Add Random Task</button>
          <button onClick={this.removeOneTask}>Remove a Tasks</button>
        </div>
        <div>
          <span>Seconds passed: {this.props.appState.timer} </span>
          <button onClick={this.onReset}>Reset</button>
        </div>
        <DevTools />
      </div>
    );
  }

  onReset= ()=>{
      this.props.appState.resetTimer();
  }

  upLimit= ()=>{
    this.props.appState.upLimit();
  }

  downLimit= ()=>{
    this.props.appState.downLimit();
  }

  addTask= ()=> {
    this.props.appState.addTask();

  }
  removeOneTask= ()=> {
    this.props.appState.removeOneTask();
  }
}


App.propTypes = {
  appState: PropTypes.any.isRequired
}
