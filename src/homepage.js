import * as model from './model.js';
import { icons } from './helper.js';
import { toggleTaskForm, category, generateCategoryMenu } from './createTask.js';
const body = document.body;
const parentContainer = document.querySelector('.schedule-section');
const settingsMenu = document.querySelector('.settings_menu');

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
        <div class="month_year">
          <h1>July</h1>
          <span>2022</span>
        </div>
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
  document.addEventListener('click', toggleSettings);
  settingsMenu.addEventListener('click', toggleTheme);
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

function toggleSettings(e) {
  const isSettingsBtn = e.target.parentElement.classList.contains('icon');

  if (!isSettingsBtn && e.target.closest('.settings_menu') != null) return

  if (isSettingsBtn) settingsMenu.classList.toggle('active');
  else settingsMenu.classList.remove('active');
}

export function toggleTheme(e) {
  const dataset = e.target.dataset.theme;
  
  if(!dataset) return 
  //set classList to empty
  body.className = '';

  switch (dataset.toLowerCase()) {
    case 'default':
      body.classList = '';
      break;
    case 'system-default':
      systemDefaultTheme();
      break;
    case 'dark':
      body.classList.add('dark')
      break;
    case 'gradient-blue':
      body.classList.add('gradient-blue')
      break;
    case 'gradient-cyan':
      body.classList.add('gradient-cyan');
      break;
    default:
      return
  }
  model.theme.mode = dataset;
  model.setLocalStorage('theme', model.theme);
}

function systemDefaultTheme() {
  const hours = new Date().getHours();
  const isDayTime = hours >= 18 || hours === 6
  if (isDayTime) body.classList.add('dark');
  else body.classList.remove('dark');
}

export function setTheme() {
  if (model.theme.mode === 'system-default') systemDefaultTheme();
  body.classList.add(`${model.theme.mode}`);
}
