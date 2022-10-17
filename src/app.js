//Created by DanssUiDanssUi
import * as homepage from './homepage.js'
import * as model from './model.js'
import * as stats from './stats.js'
import * as viewTask from './viewTask.js'
import { generateAddTaskHTML } from './createTask.js'

function generateMarkup() {
  homepage.generateHomepageHTML();
  generateAddTaskHTML();
  viewTask.generateTaskView();
  stats.generateStatsHTML();
  homepage.init();
  model.initTime();
  model.createMonthDays();
  stats.generateStats();
  model.addHandlerTab(viewTask.opentaskView);
}

function init() {
  generateMarkup();
}

init();

//model.renderTasks();
//model.renderTasks();

//reset Database
//loadStorage.setItem("tasks", JSON.stringify(taskArray));
//localStorage.setItem("stats", JSON.stringify(statsData));
