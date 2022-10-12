import { monthsArr, weekDaysArr } from './helper.js'
import {loadTask, section} from './app.js'

const parentContainer = document.querySelector('.schedule-section');
const addTaskParentElem = document.querySelector('.add-task');

let taskContainer;
let changeMonthCont;
let dateContainer;
let addTaskPopup;
let nav;

export const now = new Date();

let currMonth = now.getMonth();
let currYear = now.getFullYear();
let getMonthTotalDays;
let currDay;

export const nowid = `${now.getFullYear()} ${(now.getMonth() + 1)} ${now.getDate()}`;

export let currid = nowid;

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

        <div class="category">
          <button>unset</button>
          <button>work</button>
          <button>education</button>
          <button>sport</button>
          <button>social</button>
          <button>entertainment</button>
        </div>
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
        <button data-nav-btn="home" onclick="${section(0)}">
        <img class="home-btn" src="Img/category-glyph.png" />
        </button>
        <button data-nav-btn="addTask" ><img src="Img/add.png" />
        </button>
        <button data-nav-btn="stats" onclick="${section(1)}">
          <img class="stats-btn" src="Img/chart-glyph.png" />
        </button>
      </div>`;

  parentContainer.insertAdjacentHTML('beforeend', html);

  dateContainer = document.querySelector(".date");
  taskContainer = document.querySelector(".task-container");
  changeMonthCont = document.querySelector('.btns-container');
  nav = document.querySelector('.navbar');
  init();
}

export function generateAddTaskHTML() {
  let html = `
    <button id="close" onclick="closetaskPopup()">&times</button>
    <div class="task-form">
      <h3 id="taskHeader">Task Name</h3>
      <input type="text" id="taskname" value="" required />
      <h3 id="taskHeader">Task Description</h3>
      <input type="text" id="taskdesc" value="" />

      <div class="lower-input">
        <div class="loweri-holder">
          <button onclick="openCategory()">
            <b>Category :</b> <span></span>
          </button>
          <button>
            <b>Start</b><br /><span></span><input type="time" id="timestart" value="12:00" />
          </button>
          <button><b>End</b><br />
            <span></span><input type="time" id="timeend" value="13:00" />
          </button>
        </div>
      </div>
    </div>
    <button onclick="addTaskBtn()" id="add"> Create New Task </button>` 
    
    addTaskParentElem.insertAdjacentHTML('beforeend', html);
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
        <div class="loweri-holder-view">
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

 

function init(){
  changeMonthCont.addEventListener('click', changeMonth);
  nav.addEventListener('click', navSectionToggle);
}

export function changeMonth(e) {
  const btn = e.target.closest('button');
  const btnDataset = btn.dataset.btn

  if (btnDataset === 'next') {
    if (currMonth < 11) currMonth++;
    else {
      currMonth = 0;
      currYear++;
    }
  }

  if (btnDataset === 'prev') {
    if (currMonth > 0) currMonth--;
    else {
      currMonth = 11;
      currYear -= 1;
    }
  }

  initTime();
  createMonthDays();
  dateContainer.querySelector("button").click();
  dateContainer.scrollLeft = 0;
}

export function initTime() {
  const dashboardMonth = document.querySelector(".topdate-holder h2");
  const dashboardYear = document.querySelector(".topdate-holder h4");

  let month = monthsArr[currMonth];
  let day = weekDaysArr[now.getDay()];

 // const nowid = `${now.getFullYear()} ${(now.getMonth() + 1)} ${now.getDate()}`;

  currDay = now.getDate();

  getMonthTotalDays = new Date(now.getFullYear(), currMonth + 1, 0).getDate();

  dashboardMonth.innerHTML = month;
  dashboardYear.innerHTML = currYear;
}

export function createMonthDays() {
  const allBtn = document.querySelectorAll(".date button");
  allBtn.forEach(btn => { btn.remove() });

  for (var i = 1; i < getMonthTotalDays + 1; i++) {

    //get current month days
    const currMonthFullDate = new Date(now.getFullYear(), currMonth, i);

    //get current month week days
    const weekDays = weekDaysArr[currMonthFullDate.getDay()].slice(0, 3);

    //create dates button
    const datesBtn = document.createElement("button");
    datesBtn.innerHTML = i;

    //create week days 
    const weekDaysElem = document.createElement("span");

    weekDaysElem.innerHTML = weekDays;
    datesBtn.insertAdjacentElement('beforeend', weekDaysElem);

    datesBtn.id = `${now.getFullYear()}${(currMonth + 1)}${i}`;

    datesBtn.addEventListener('click', () => {
      currid = datesBtn.id;
      currDayActive(datesBtn);
      loadTask();
    });

    datesBtn.classList = "dateBtn";
    dateContainer.appendChild(datesBtn);

    if (i === currDay) {
      dateContainer.scrollLeft = datesBtn.offsetLeft - dateContainer.offsetLeft;
      currDayActive(datesBtn);
    }
  }
}

export function currDayActive(elem) {
  const allBtn = document.querySelectorAll(".date button");

  allBtn.forEach(fbtn => fbtn.classList = "dateBtn");
  elem.classList.add("active");
}

function navSectionToggle(e) {
  const dataSet = e.target.closest('button').dataset.navBtn;
  console.log(dataSet);
  
  if (dataSet === 'home') {
    
  }
  
  if (dataSet === 'addTask') {
    addTaskParentElem.classList.add('active');
  }
  
  if (dataSet === 'state') {
    
  }
  
}

 function closetaskPopup() {
  addTaskParentElem.classList.remove('active');

		[title.value, desc.value, category, timeStart.value, timeEnd.value] = ["", "", "unset", "12:00", "13:00"];
		[cateDisplayer.innerHTML, tsDisplayer.innerHTML, teDisplayer.innerHTML] = [category, timeStart.value, timeEnd.value];
}
