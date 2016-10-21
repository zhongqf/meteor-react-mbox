import React, { Component, PropTypes } from 'react';
import Task from './Task.jsx';
import { Tasks } from '../api/tasks.js';
import { createContainer } from 'meteor/react-meteor-data';



class App extends Component {
  renderTasks() {
    return this.props.tasks.map((task)=> (
      <Task key={task._id} task={task} />
    ));
  }

  render() {
    return (
      <div className="container">
        <header><h2>Todos</h2></header>
        <ul>
          { this.renderTasks() }
        </ul>
      </div>
    );
  }
}


App.propTypes = {
  tasks: PropTypes.array.isRequired
}


export default createContainer( ()=> {
  return {
    tasks: Tasks.find({}).fetch()
  }
}, App);
