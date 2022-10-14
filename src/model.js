import * as homepage from './homepage.js';
import { monthsArr, weekDaysArr } from './helper.js';

export const now = new Date();

let currMonth = now.getMonth();
let currYear = now.getFullYear();
let getMonthTotalDays;
let currDay;
export const nowid = `${currYear} ${(now.getMonth() + 1)} ${now.getDate()}`;

export let currid = nowid;

let taskArray = [{
  //i have change nowid to currid since original dev was reassigned the nowid with currid
  "date": currid,
  "content": [
    {
      "uid": 0,
      "isCompleted": "false",
      "title": "Give me a star ✨",
      "desc": "This is an example",
      "timestart": "12:00",
      "timeend": "13:00",
      "time": "Infinity",
      "category": "entertainment"
    }
  ]
}];

let statsData = { "aktif": 1, "komplit": 0, "hapus": 0, "total": 1, "unset": 0, "work": 0, "education": 0, "sport": 0, "social": 0, "entertainment": 1 };



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
      //     loadTask();
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

  /* statsData.active++;
   statsData.total++;
   statsData[c]++;
   saveData();

   if (taskArray.find(tanggal => tanggal.date === homepage.currid)) {
     let existTask = taskArray.find(tanggal => tanggal.date === homepage.currid);
     let content = existTask.content;
     content.push({ "uid": uniqueid, "isCompleted": "false", "title": t, "desc": d, "timestart": ts, "timeend": te, "time": tse, "category": c });

     loadTask();
     closetaskPopup();
     saveData();
   } else {
     taskArray.push({
       "date": homepage.currid,
       "content": [{ "uid": uniqueid, "isCompleted": "false", "title": t, "desc": d, "timestart": ts, "timeend": te, "time": tse, "category": c }]
     });

     loadTask();
     closetaskPopup();
     saveData();
   }*/
}