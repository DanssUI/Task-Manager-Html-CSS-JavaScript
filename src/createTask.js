import * as model from './model.js';
import { openTaskView } from './viewTask.js';

const addTaskParentElem = document.querySelector('.add-task');

let categoryBtn;
export let category;
let categoryMenu;
let title;
let desc;
let timeStartInput;
let timeEndInput;
let timeStartElem;
let timeEndElem;

export function generateAddTaskHTML() {
  const html = `
    <button id="closeTaskBtn">&times</button>
    <div class="task-form">
      <h3 id="taskHeader">Task Name</h3>
      <input type="text" id="taskname" value="" required />
      
      <h3 id="taskHeader">Task Description</h3>
      <input type="text" id="taskdesc" value="" />

      <div class="lower-input">
        <button data-btn="category">
          <b>Category : </b> <span>Unset</span>
        </button>
        
        <button><b>Start</b><br />
          <span>12:00</span><input type="time" id="timestart" value="12:00" />
        </button>
        
        <button><b>End</b><br />
          <span>13:00</span><input type="time" id="timeend" value="13:00" />
        </button>
      </div>
    </div>
    <button id="createTask"> Create New Task </button>`


  addTaskParentElem.insertAdjacentHTML('beforeend', html);
  categoryBtn = document.querySelector(`[data-btn="category"]`);
  category = categoryBtn.querySelector('span');
  title = document.getElementById('taskname');
  desc = document.getElementById('taskdesc');
  timeStartInput = document.getElementById('timestart');
  timeEndInput = document.getElementById('timeend');
  timeStartElem = document.querySelector(".lower-input button:nth-child(2) span");
  timeEndElem = document.querySelector(".lower-input button:nth-child(3) span");
  init();
}

function init() {
  const closeCrossBtn = document.querySelector('#closeTaskBtn');
  const createTaskBtn = document.querySelector('#createTask');

  createTaskBtn.addEventListener('click', createTask);

  closeCrossBtn.addEventListener('click', closeNewtaskPopup);

  document.addEventListener('click', openSelectCategory);
}

function createTask() {
  const dateBtns = document.querySelectorAll(".date button");
  const timeStartEnd = `${timeStartInput.value} — ${timeEndInput.value}`;

  if (title.value === '' || timeStartInput.value >= timeEndInput.value) {
    model.messagePopUp(`Important!
    1. Title Cannot Empty.
    
    2. Task start time cannot be greater or equal to task end time.
    
    3.Task end time cannot be lower than task start time.`, 'danger', 2000);
    //reset and close the form
    closeNewtaskPopup();
    return
  }

  model.createNewTask(title.value, desc.value, timeStartInput.value, timeEndInput.value, category.innerText, timeStartEnd);

  model.messagePopUp('Task Created', 'success');

  //reset and close the form
  closeNewtaskPopup();

  // for the newly created tasks;
  model.addHandlerTasks(openTaskView);
}

function closeNewtaskPopup() {
  toggleTaskForm();
  resetAddTaskForm();
}

function resetAddTaskForm() {
  title.value = '';
  desc.value = ''
  category.innerHTML = 'Unset';
  //default values for elements 
  timeStartInput.value = '12:00';
  timeEndInput.value = '13:00'
  timeStartElem.innerText = '12:00';
  timeEndElem.innerText = '13:00';
}

function getInputValue() {
  timeStartInput.addEventListener('input', () => timeStartElem.innerHTML = timeStartInput.value);

  timeEndInput.addEventListener('input', () => timeEndElem.innerHTML = timeEndInput.value);
}

export function generateCategoryMenu() {
  const html = `
    <div class="category_Menu">
      <button>unset</button>
      <button>work</button>
      <button>education</button>
      <button>sport</button>
      <button>social</button>
      <button>entertainment</button>
    </div>`

  document.body.insertAdjacentHTML('beforeend', html);
  categoryMenu = document.querySelector(".category_Menu");
}

function openSelectCategory(e) {
  const btn = e.target.matches('[data-btn="category"]');

  if (!btn && e.target.closest('.category_Menu') != null) {
    if (e.target.matches('button')) category.innerHTML = e.target.innerText;
  }

  if (btn) categoryMenu?.classList.add('active');
  else closeCategoryMenu();
}

function closeCategoryMenu() {
  categoryMenu?.classList.remove('active');
}

export function toggleTaskForm() {
  addTaskParentElem.classList.toggle('active');
  getInputValue();
}