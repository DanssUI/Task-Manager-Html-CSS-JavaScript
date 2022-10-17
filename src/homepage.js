import * as model from './model.js';
import { icons } from './helper.js';
import { toggleTaskForm, category, generateCategoryMenu } from './createTask.js';

const parentContainer = document.querySelector('.schedule-section');

let taskContainer;
let changeMonthCont;
export let dateContainer;
let addTaskPopup;
let nav;
export let categoryMenu;


export function generateHomepageHTML() {
  let html = `
    <div class="date-holder">
      <div class="topdate-holder">
        <h4>2022<h2>July</h2></h4>
        <div class="btns-container">
          <button data-btn="prev">
            <i class="fas fa-chevron-left"></i>
          </button>
          <button data-btn="next">
            <i class="fas fa-chevron-right"></i>
          </button>
        </div>
      </div>
        
      <div class="date"></div>
    </div>

    <div class="task-container-parent">
      <div class="task-container">
        <span class="empty-task">There is no task.!</span>
      </div>
      <div class="task-container-completed">
        <span class="completed-tag">Completed Tasks</span>
      </div>
    </div>

    <div class="navbar">
      <button class='active' data-nav-btn="home">
        ${icons.home}
      <button data-nav-btn="addTask" >
        ${icons.add}
      </button>
      <button data-nav-btn="stats">
      ${icons.pie}
      </button>
    </div>`;

  parentContainer.insertAdjacentHTML('beforeend', html);

  dateContainer = document.querySelector(".date");
  taskContainer = document.querySelector(".task-container");
  changeMonthCont = document.querySelector('.btns-container');
  nav = document.querySelector('.navbar');
}

export function init() {
  changeMonthCont.addEventListener('click', model.changeMonth);
  nav.addEventListener('click', navSectionToggle);
}

function navSectionToggle(e) {
  const buttons = nav.querySelectorAll('button');
  const btn = e.target.closest('button');
  if (!btn) return
  const dataset = btn.dataset.navBtn;

  //remove class from button
  buttons.forEach(btn => btn.classList.remove('active'));

  switch (dataset) {
    case 'home':
      model.scrollToSection(dataset);
      btn.classList.add('active');
      break;
    case 'addTask':
      addNewTaskPopUp();
      break;
    case 'stats':
      model.scrollToSection(dataset);
      btn.classList.add('active');
      break;
    default:
      return
  }
}

function addNewTaskPopUp() {
  toggleTaskForm();
  generateCategoryMenu();
}
