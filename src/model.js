import * as homepage from './homepage.js';
import { generateStats } from './stats.js'
import { monthsArr, weekDaysArr } from './helper.js';


export const now = new Date();

let currMonth = now.getMonth();
let currYear = now.getFullYear();
let getMonthTotalDays;
let currDay;

export const nowid = `${currYear} ${(now.getMonth() + 1)} ${now.getDate()}`;

export let currid = nowid;

let taskArray = [{
  date: currid,
  content: [
    {
      uid: 0,
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

    datesBtn.id = `${currYear}${(currMonth + 1)}${i}`;

    datesBtn.addEventListener('click', () => {
      currid = datesBtn.id;
      currDayActive(datesBtn);
      loadTask();
    });

    datesBtn.classList = "dateBtn";
    homepage.dateContainer.appendChild(datesBtn);

    if (i === currDay) {
      homepage.dateContainer.scrollLeft = datesBtn.offsetLeft - homepage.dateContainer.offsetLeft;
      currDayActive(datesBtn);
    }
  }
}

export function currDayActive(elem) {
  const allBtn = document.querySelectorAll(".date button");

  allBtn.forEach(btn => btn.classList = "dateBtn");
  elem.classList.add("active");
}

export function scrollToSection(val) {
  if (val === 'home') document.getElementById('schedule').scrollIntoView({ behavior: "smooth" });
  //window.location.href = "#schedule";

  if (val === 'stats') document.getElementById('stats').scrollIntoView({ behavior: "smooth" });
  //window.location.href = "#stats";
}

export function createNewTask(title, desc, timestart, timeend, category, timeStartEnd) {
  
  let uniqueid = Math.random() * 100;

  statsData.active++;
  statsData.total++;
  statsData[category]++;
  saveData()

  let existTask = taskArray.find(task => task.date === currid);

  if (existTask) {
    let content = existTask.content;

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

    loadTask();
    saveData();
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
          time: 'timeStartEnd',
          category
        }
      ]
    });
    loadTask();
    saveData();
  }
}

function saveData() {
  localStorage.setItem("tasks", JSON.stringify(taskArray));
  localStorage.setItem("stats", JSON.stringify(statsData));
  generateStats();
}

export function loadTask() {
  const updatedtaskCard = document.querySelectorAll(".task-card");

  updatedtaskCard.forEach(updatedtaskCard => updatedtaskCard.remove());

  document.querySelector(".task-container-completed").style.display = "none";

  document.querySelector(".empty-task").style.display = "block";

  const existTask = taskArray.find(task => task.date === currid);
 
  if (existTask) {
    let contentArray = existTask.content;

    for (var i = 0; i < contentArray.length; i++) {
      let currcontent = contentArray[i];

      const tab = document.createElement("div");
      tab.classList = "task-card";
      tab.onclick = function() {
        opentaskView(
          currcontent.title,
          currcontent.desc,
          currcontent.timestart,
          currcontent.timeend,
          currcontent.category,
          currcontent.uid,
          currcontent.isCompleted
        )
      };

      const tabContent = document.createElement("span");
      tabContent.classList = "task-content";

      const image = document.createElement("img");
      image.src = "Img/" + currcontent.category + ".png";

      const title = document.createElement("h2");
      title.innerHTML = currcontent.title;

      const des = document.createElement("p");
      des.innerHTML = currcontent.desc;

      const time = document.createElement("h3");
      time.innerHTML = currcontent.time;

      tab.appendChild(image);
      tabContent.appendChild(title);
      tabContent.appendChild(des);
      tabContent.appendChild(time);
      tab.appendChild(tabContent);

      document.querySelector(".empty-task").style.display = "none";

      if (currcontent.isCompleted === false) {
        document.querySelector(".task-container").appendChild(tab);

      } else if (currcontent.isCompleted === true) {
        tab.style = "background: linear-gradient(120deg, #D6FFA3, #97FF00)";
        document.querySelector(".task-container-completed").style.display = "flex";
        document.querySelector(".task-container-completed").appendChild(tab);
      }

    }
  }
}


function opentaskView(t, d, ts, te, c, u, ic) {
  const taskView = document.querySelector(".task-view");

  taskView.classList.add('active');
  let title = taskView.querySelector(".task-form-view h1");
  let desc = taskView.querySelector(".task-form-view p");
  let del = taskView.querySelector(".task-view #taskDelete");
  let cmplt = taskView.querySelector(".task-view #taskComplete");

  let cateDisplay = document.querySelector(".lower-input-view button:nth-child(1) span");
  let tsDisplay = document.querySelector(".lower-input-view button:nth-child(2) span");
  let teDisplay = document.querySelector(".lower-input-view button:nth-child(3) span");
  let imgDisplay = document.querySelector(".task-form-view img");

  imgDisplay.src = "Img/" + c + ".png";

  title.innerHTML = t;
  desc.innerHTML = d;
  tsDisplay.innerHTML = ts;
  teDisplay.innerHTML = te;
  cateDisplay.innerHTML = c;
  del.onclick = function() { deleteTask(u) };

  if (ic == "false") {
    cmplt.style.display = "block";
    cmplt.onclick = function() { completeTask(u) };
  } else {
    cmplt.style.display = "none";
  }

}

function closetaskView() {
  taskView.classList.remove('active')
}

export function loadData() {
  //Task Data
  if (JSON.parse(localStorage.getItem("tasks")) == null) {
    localStorage.setItem("tasks", JSON.stringify(taskArray));
    taskArray = JSON.parse(localStorage.getItem("tasks"));
  } else {
    taskArray = JSON.parse(localStorage.getItem("tasks"));
  }

  //Stats Data
  if (JSON.parse(localStorage.getItem("stats")) == null) {
    localStorage.setItem("stats", JSON.stringify(statsData));
    statsData = JSON.parse(localStorage.getItem("stats"));
  } else {
    statsData = JSON.parse(localStorage.getItem("stats"));
  }
}
