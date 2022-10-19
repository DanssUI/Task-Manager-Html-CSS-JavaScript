//Created by DanssUiDanssUi
import * as homepage from './homepage.js'
import * as model from './model.js'
import * as stats from './stats.js'
import * as viewTask from './viewTask.js'
import { generateAddTaskHTML } from './createTask.js'

//load the data from localStorage as soon as page loads
model.getData();

function generateMarkup() {
  homepage.generateHomepageHTML();
  generateAddTaskHTML();
  viewTask.generateTaskView();
  stats.generateStatsHTML();
  homepage.init();
  model.initTime();
  model.createMonthDays();
  stats.generateStats();
  //initialize the listener when the page loads
  model.addHandlerTasks(viewTask.openTaskView);
}

function init() {
  generateMarkup();
}

init();