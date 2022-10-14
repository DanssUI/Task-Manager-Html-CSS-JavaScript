
import * as model from './model.js'
import { icons } from './helper.js'

const parentContainer = document.querySelector('.schedule-section');
const addTaskParentElem = document.querySelector('.add-task');

let taskContainer;
let changeMonthCont;
export let dateContainer;
let addTaskPopup;
let nav;
let categoryMenu;
let categoryBtn;
let category;

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
        
      <div class="category_Menu">
        <button>unset</button>
        <button>work</button>
        <button>education</button>
        <button>sport</button>
        <button>social</button>
        <button>entertainment</button>
      </div>
    </div>

    <div class="task-container-parent">
      <div  class="task-container">
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
  categoryMenu = document.querySelector(".category_Menu");
  nav = document.querySelector('.navbar');
}

export function generateAddTaskHTML() {
  let html = `
    <button id="close">&times</button>
    <div class="task-form">
      <h3 id="taskHeader">Task Name</h3>
      <input type="text" id="taskname" value="" required />
      <h3 id="taskHeader">Task Description</h3>
      <input type="text" id="taskdesc" value="" />

      <div class="lower-input">
        <button data-category-btn>
          <b>Category : </b> <span></span>
        </button>
        
        <button><b>Start</b><br />
          <span></span><input type="time" id="timestart" value="12:00" />
        </button>
        
        <button><b>End</b><br />
          <span></span><input type="time" id="timeend" value="13:00" />
        </button>
      </div>
    </div>
   <button id="createTask"> Create New Task </button>`



  addTaskParentElem.insertAdjacentHTML('beforeend', html);
  categoryBtn = document.querySelector('[data-category-btn]');
  category = categoryBtn.querySelector('span');
  
}

export function generateTaskView() {
  const parentElement = document.querySelector('.task-view')
  let html = `
    <button id="close" onclick="closetaskView()">&times;</button>

    <div class="task-form-view">
      <img src="Img/unset.png" />
      <h1>Task Name</h1
      <p>Task Description</p>

      <div class="lower-input-view">
        <div class="lower-holder-view">
          <button>
            <b>Category : </b>
            <span></span>
          </button>
          <button>
            <b>Start</b> <br>
            <span></span>
          </button>
          <button>
            <b>End</b><br>
            <span></span>
          </button>
          <button id="taskComplete">Complete</button>
          <button id="taskDelete">Delete</button>
        </div>
      </div>
    </div>`

  parentElement.insertAdjacentHTML('beforeend', html);
}

export function init() {
  const createTaskBtn = document.querySelector('#createTask');
  changeMonthCont.addEventListener('click', model.changeMonth);
  nav.addEventListener('click', navSectionToggle);

  categoryBtn.addEventListener('click', openCategoryMenu);

  createTaskBtn.addEventListener('click', createTask);
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
  addTaskParentElem.classList.add('active');
  const closeBtn = document.querySelector('#close');
  closeBtn.addEventListener('click', closeNewtaskPopup);
}

function createTask() {
  const title = document.getElementById('taskname');
  const desc = document.getElementById('taskdesc');
 // const category = "unset";
  const timeStart = document.getElementById('timestart');
  const timeEnd = document.getElementById('timeend');
  
  let timeStartEnd = `${timeStart.value} - ${timeEnd.value}`;

  model.createNewTask(title.value, desc.value, timestart.value, timeend.value, category.innerText, timeStartEnd);
  closeNewtaskPopup();
}

function closeNewtaskPopup() {
  addTaskParentElem.classList.remove('active');
 /*[title.value, desc.value, category, timeStart.value, timeEnd.value] = ["", "", "unset", "12:00", "13:00"];
  	[cateDisplayer.innerHTML, tsDisplayer.innerHTML, teDisplayer.innerHTML] = [category, timeStart.value, timeEnd.value];*/
}

function openCategoryMenu() {
  categoryMenu.classList.add('active');

  categoryMenu.querySelectorAll("button").forEach(button => {
    button.addEventListener("click", function() {
      category.innerHTML = button.innerHTML;
      closeCategory();
    });
  });
}

function closeCategory() {
  categoryMenu.classList.remove('active');
}
