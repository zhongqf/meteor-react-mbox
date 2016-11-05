import { observable, computed } from 'mobx';
import { Tasks } from '../api/tasks.js';
import { meteorData } from '../core/meteor_data.js'


class AppState {

  @observable timer = 0;
  @observable limit = 0;


  constructor() {
    setInterval(() => {
      this.timer += 1;
    }, 1000);
  }

  resetTimer() {
    this.timer = 0;
  }

  upLimit() {
    this.limit += 1;
  }

  downLimit() {
    if (this.limit > 0) {
      this.limit -= 1;
    }
  }

  addTask() {
    Tasks.insert({text: Math.random().toString(36).substring(2)})
  }

  removeOneTask() {
    Tasks.remove(Tasks.findOne()._id);
  }

  @meteorData get tasks() {
    return Tasks.find( {}, {limit: this.limit} )
  }
}

export default AppState;
