import * as model from './model.js'
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
  let html = `
    <button data-btn="close" id="close">&times</button>
    <div class="task-form">
      <h3 id="taskHeader">Task Name</h3>
      <input type="text" id="taskname" value="" required />
      
      <h3 id="taskHeader">Task Description</h3>
      <input type="text" id="taskdesc" value="" />

      <div class="lower-input">
        <button data-btn="category">
          <b>Category : </b> <span>Unset</span>
        </button>
        
        <button data-btn="timestart"><b>Start</b><br />
          <span></span><input type="time" id="timestart" value="12:00" />
        </button>
        
        <button data-btn="timeend"><b>End</b><br />
          <span></span><input type="time" id="timeend" value="13:00" />
        </button>
      </div>
    </div>
    <button data-btn="createTask" id="createTask"> Create New Task </button>`


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
  const closeCrossBtn = document.querySelector('#close');
  const createTaskBtn = document.querySelector('#createTask');

  categoryBtn.addEventListener('click', openCategoryMenu);

  createTaskBtn.addEventListener('click', createTask);

  closeCrossBtn.addEventListener('click', closeNewtaskPopup);
}

function openCategoryMenu() {
  generateCategoryMenu();
  categoryMenu.classList.add('active');

  categoryMenu.querySelectorAll("button").forEach(button => button.addEventListener("click", function() {
    category.innerHTML = button.innerHTML;
    closeCategoryMenu();
  }));
}

function closeCategoryMenu() {
  categoryMenu.classList.remove('active');
}

function createTask() {
  const timeStartEnd = `${timeStartInput.value} — ${timeEndInput.value}`;

  model.createNewTask(title.value, desc.value, timeStartInput.value, timeEndInput.value, category.innerText, timeStartEnd);
  closeNewtaskPopup();
  resetAddTaskForm();
}

function closeNewtaskPopup() {
  toggleTaskForm();
  resetAddTaskForm();
}

function resetAddTaskForm() {
  title.value = '';
  desc.value = ''
  category.innerHTML = 'Unset';
  timeStartInput.value = '';
  timeEndInput.value = ''
  timeStartElem.innerText = '';
  timeEndElem.innerText = ''
}

function getInputValue() {
  timeStartInput.addEventListener('input',() => timeStartElem.innerHTML = timeStartInput.value);
  
  timeEndInput.addEventListener('input',() => timeEndElem.innerHTML = timeEndInput.value)
}

function generateCategoryMenu() {
  let html = `
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

export function toggleTaskForm() {
  addTaskParentElem.classList.toggle('active');
  getInputValue();
}
