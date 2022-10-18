import * as homepage from './homepage.js';
import { generateStats } from './stats.js'
import { monthsArr, weekDaysArr } from './helper.js';
import { openTaskView } from './viewTask.js'

export const now = new Date();

let currMonth = now.getMonth();
let currYear = now.getFullYear();
let getMonthTotalDays;
let currDay;
let tasks;

export const nowid = `${currYear}${(now.getMonth() + 1)}${now.getDate()}`;

export let currid = nowid;

export let taskArray = [{
  date: currid,
  content: [
    {
      uid: "0",
      isCompleted: false,
      title: "Give me a star ✨",
      desc: "This is an example",
      timestart: "12:00",
      timeend: "13:00",
      time: "Infinity",
      category: "entertainment"
    }
  ]
}];

export let statsData = {
  active: 1,
  complete: 0,
  deleted: 0,
  total: 1,
  unset: 0,
  work: 0,
  education: 0,
  sport: 0,
  social: 0,
  entertainment: 1
};

export function messagePopUp(message, className) {
  const messageCont = document.querySelector('.message');
  const pElem = messageCont.querySelector('p');

  messageCont.classList.add(`${className}`);
  pElem.innerText = `${message}`

  setTimeout(() => {
    messageCont.classList.remove(`${className}`);
    pElem.innerText = '';
  }, 1000);
}


export function changeMonth(e) {
  const btn = e.target.closest('button');
  const btnDataset = btn?.dataset.btn;

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
      currYear--;
    }
  }

  initTime();
  createMonthDays();

  homepage.dateContainer.querySelector("button").click();
  homepage.dateContainer.scrollLeft = 0;
}

export function initTime() {
  const dashboardMonth = document.querySelector(".topdate-holder h2");
  const dashboardYear = document.querySelector(".topdate-holder h4");

  let month = monthsArr[currMonth];
  let day = weekDaysArr[now.getDay()];

  currDay = now.getDate();

  getMonthTotalDays = new Date(now.getFullYear(), currMonth + 1, 0).getDate();

  dashboardMonth.innerHTML = month;
  dashboardYear.innerHTML = currYear;
}

export function createMonthDays() {
  const allBtn = document.querySelectorAll(".date button");
  allBtn.forEach(btn => { btn.remove() });

  for (let i = 1; i < getMonthTotalDays + 1; i++) {

    //get current month days
    const currMonthFullDate = new Date(now.getFullYear(), currMonth, i);

    //get current month week days
    const weekDays = weekDaysArr[currMonthFullDate.getDay()].slice(0, 3);

    const id = `${currYear}${(currMonth + 1)}${i}`;

    //create dates button
    const datesBtn = document.createElement("button");
    datesBtn.innerHTML = i;

    //create week days 
    const weekDaysElem = document.createElement("span");

    weekDaysElem.innerHTML = weekDays;
    datesBtn.insertAdjacentElement('beforeend', weekDaysElem);

    datesBtn.id = `${currYear}${(currMonth + 1)}${i}`;

    datesBtn.addEventListener('click', () => {
      //reassign the currid 
      currid = datesBtn.id;
      currDayActive(datesBtn);
      renderTasks();
      addHandlerTasks(openTaskView);
    });

    datesBtn.classList = "dateBtn";
    homepage.dateContainer.appendChild(datesBtn);

    if (i === currDay) {
      homepage.dateContainer.scrollLeft = datesBtn.offsetLeft - homepage.dateContainer.offsetLeft;
      currDayActive(datesBtn);
      renderTasks();
    }
  }
}

export function currDayActive(elem) {
  const allBtn = document.querySelectorAll(".date button")

  allBtn.forEach(btn => btn.classList = "dateBtn");

  elem.classList.add("active");
}

export function scrollToSection(val) {
  if (val === 'home') document.getElementById('schedule').scrollIntoView({ behavior: "smooth" });

  if (val === 'stats') document.getElementById('stats').scrollIntoView({ behavior: "smooth" });
}


export function createNewTask(title, desc, timestart, timeend, category, timeStartEnd) {

  const uniqueid = new Date().getTime().toString();

  category = category.toLowerCase();

  statsData.active += 1;
  statsData.total += 1;
  statsData[category] += 1;

  const existTask = taskArray.find(task => task.date === currid);

  if (existTask) {

    const content = existTask.content;

    content.push(
    {
      uid: uniqueid,
      isCompleted: false,
      title: title,
      desc,
      timestart,
      timeend,
      time: timeStartEnd,
      category
    });
    renderTasks();

  } else {
    taskArray.push({
      date: currid,
      content: [
        {
          uid: uniqueid,
          isCompleted: false,
          title,
          desc,
          timestart,
          timeend,
          time: timeStartEnd,
          category
        }
      ]
    });
    renderTasks();
  }
}

export function renderTasks() {
  const emptyContainer = document.querySelector(".empty-task");

  const completedTaskCont = document.querySelector(".task-container-completed");

  //remove all the pre-added tasks
  const updatedtaskCard = document.querySelectorAll(".task-card");
  updatedtaskCard.forEach(updatedtaskCard => updatedtaskCard.remove());

  const todayDate = taskArray.find(task => task.date === currid);

  //hide the complete task container if there's no task which is completed 
  const isCompleted = todayDate?.content.some(task => task.isCompleted === true);

  if (!isCompleted) completedTaskCont.style.display = 'none';

  if (todayDate) {
    //hide the empty container
    emptyContainer.style.display = 'none';

    const contentArr = todayDate.content;

    contentArr.forEach(content => {
      createTaskCard(content);
    })
  } else emptyContainer.style.display = "block";
  generateStats();
  setLocalStorage('tasks', taskArray);
  setLocalStorage('stats', statsData);
}

//create task card
function createTaskCard(content) {
  const tasksContainer = document.querySelector(".task-container");
  const completedTaskCont = document.querySelector(".task-container-completed");

  const html = `
    <div data-id='${content.uid}' class="task-card">
      <img src="Img/${content.category}.png" />
      <div class="task-content">
        <h2>${content.title}</h2>
        <p>${content.desc} </p>
        <span>${content.time}</span>
      </div>
    </div>`

  if (!content.isCompleted) tasksContainer.insertAdjacentHTML('afterbegin', html);
  else {
    completedTaskCont.style.display = "flex";
    completedTaskCont.insertAdjacentHTML('afterend', html);

    //select the task user interacting with
    const task = document.querySelector(`[data-id='${content.uid}']`);
    task.classList.add('complete');
    addHandlerTasks(openTaskView);
  }
}

export function addHandlerTasks(handler) {
  const tasksContainerParent = document.querySelector(".task-container-parent");

  if (!taskArray) return

  const todayDate = taskArray.find(task => task.date === currid);
  const contentArr = todayDate?.content;

  tasksContainerParent.addEventListener('click', e => {

    const id = e.target.closest('.task-card')?.dataset.id;
    
    contentArr?.forEach(content => {
      if (content.uid === id) {
        handler(content.title, content.desc, content.timestart, content.timeend, content.category, content.uid, content.isCompleted);
      }
    })
  })
}

export function setLocalStorage(key, value) {
  localStorage.setItem(`${key}`, JSON.stringify(value));
}

export function getData() {
  taskArray = JSON.parse(localStorage.getItem('tasks')) ? JSON.parse(localStorage.getItem('tasks')) : taskArray;

  statsData = JSON.parse(localStorage.getItem('stats')) ? JSON.parse(localStorage.getItem('stats')) : statsData;
}