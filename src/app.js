//Created by DanssUiDanssUi
import * as homepage from './homepage.js'
import * as model from './model.js'
import * as stats from './stats.js'
import * as viewTask from './viewTask.js'
import { generateAddTaskHTML } from './createTask.js'

function generateMarkup() {
  homepage.generateHomepageHTML();
  generateAddTaskHTML();
  viewTask.generateTaskView();
  stats.generateStatsHTML();
  homepage.init();
}

function init() {
  generateMarkup();
}

init();

model.loadTask();
model.initTime();
model.createMonthDays();
stats.generateStats();
model.loadData();

//reset Database
//loadStorage.setItem("tasks", JSON.stringify(taskArray));
//localStorage.setItem("stats", JSON.stringify(statsData));



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



/*function addTaskBtn() {
  let timeStartEnd = timeStart.value + " - " + timeEnd.value;

  addtask(title.value, desc.value, timeStart.value, timeEnd.value, category, timeStartEnd);
}*/

//timeStart.oninput = function() { tsDisplayer.innerHTML = timeStart.value }
//timeEnd.oninput = function() { teDisplayer.innerHTML = timeEnd.value };

/*function addtask(t, d, ts, te, c, tse) {
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
}*/
