//Created by DanssUiDanssUi
import * as homepage from './homepage.js'
import * as model from './model.js'
import * as stats from './stats.js'

homepage.generateHomepageHTML();
homepage.generateAddTaskHTML();
homepage.generateTaskView();
stats.generateStatsHTML();
homepage.init();

const taskView = document.querySelector(".task-view");


//loadData();
model.loadTask();
model.initTime();
model.createMonthDays();

//reset Database
//loadDatarage.setItem("tasks", JSON.stringify(taskArray));
//localStorage.setItem("stats", JSON.stringify(statsData));

function loadData() {
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

/*function saveData() {
  localStorage.setItem("tasks", JSON.stringify(taskArray));
  localStorage.setItem("stats", JSON.stringify(statsData));
  loadStats();
}*/

/*export function loadTask() {
  const updatedtaskCard = document.querySelectorAll(".task-card");
  updatedtaskCard.forEach(updatedtaskCard => updatedtaskCard.remove());

  document.querySelector(".task-container-completed").style.display = "none";

  document.querySelector(".empty-task").style.display = "block";

  if (taskArray.find(tanggal => tanggal.date === homepage.currid)) {
    let existTask = taskArray.find(tanggal => tanggal.date === homepage.currid);

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

      if (currcontent.isCompleted == "false") {
        document.querySelector(".task-container").appendChild(tab);
      } else if (currcontent.isCompleted == "true") {
        tab.style = "background: linear-gradient(120deg, #D6FFA3, #97FF00)";
        document.querySelector(".task-container-completed").style.display = "flex";
        document.querySelector(".task-container-completed").appendChild(tab);
      }

    }
  }
}*/


let title = document.getElementById('taskname');
let desc = document.getElementById('taskdesc');
let category = "unset";
let timeStart = document.getElementById('timestart');
let timeEnd = document.getElementById('timeend');


const tsDisplayer = document.querySelector(".lower-input button:nth-child(2) span");
const teDisplayer = document.querySelector(".lower-input button:nth-child(3) span");




/*function addTaskBtn() {
  let timeStartEnd = timeStart.value + " - " + timeEnd.value;

  addtask(title.value, desc.value, timeStart.value, timeEnd.value, category, timeStartEnd);
}*/

timeStart.oninput = function() { tsDisplayer.innerHTML = timeStart.value };
timeEnd.oninput = function() { teDisplayer.innerHTML = timeEnd.value };

function addtask(t, d, ts, te, c, tse) {
  let uniqueid = Math.random() * 100;

  statsData.aktif++;
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
  }
}

function deleteTask(val) {
  if (taskArray.find(tanggal => tanggal.date === homepage.currid)) {
    let getTask = taskArray.find(tanggal => tanggal.date === homepage.currid);
    let taskContent = getTask.content;
    let getUidTask = getTask.content.find(id => id.uid === val);

    //Stats Update
    if (taskContent.isCompleted == "false") {
      if (statsData.aktif > 0) {
        statsData.hapus++;
        statsData.aktif--;
        saveData();
      }
    } else {
      if (statsData.komplit > 0) {
        statsData.hapus++;
        statsData.komplit--;
        saveData();
      }
    }

    let indPos = taskContent.indexOf(getUidTask);

    if (taskContent.length > 1) {
      taskContent.splice(indPos, 1);
    } else {
      taskArray.pop();
    }

    saveData();
    loadTask();
    closetaskView();
  }
}

function completeTask(val) {
  if (statsData.aktif > 0) {
    statsData.komplit++;
    statsData.aktif--;
    saveData();
  }

  if (taskArray.find(tanggal => tanggal.date === homepage.currid)) {
    let getTask = taskArray.find(tanggal => tanggal.date === homepage.currid);
    let getUidTask = getTask.content.find(id => id.uid === val);
    getUidTask.isCompleted = "true";
  }

  saveData();
  loadTask();
  closetaskView();

}
