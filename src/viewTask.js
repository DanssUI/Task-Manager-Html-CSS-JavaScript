import { statsData, taskArray, currid, renderTasks } from './model.js'
const parentElement = document.querySelector('.task-view');

export function generateTaskView() {
  let html = `
    <button id="closeViewBtn">&times;</button>
    <div class="task-form-view">

    </div>`

  parentElement.insertAdjacentHTML('beforeend', html);
  document.querySelector('#closeViewBtn').addEventListener('click', closeTask);
}

export function opentaskView(title, desc, timeStart, timeEnd, category, uniqueid, isCompleted) {
  const html = `
    <h2>${title}</h2>
      <div class='img_cont'>
        <img src="Img/${category}.png" />
      </div>
      <div class="desc_container">
        <p>Task Description</p>
        <p class="task_view_desc">${desc}</p>
      </div>
      
      <div class="lower-holder-view">
        <div class="category_time_cont">
          <button>
            <b>Category : ${category}</b>
            <span></span>
          </button>
          <button>
            <b>Start</b> <br>
            <span>${timeStart}</span>
          </button>
          <button>
            <b>End</b><br>
            <span>${timeEnd}</span>
          </button>
        </div>
       
        <div class="action_button_cont">
          <button id="taskComplete">Complete</button>
          <button id="taskDelete">Delete</button>
        <div>
      </div>`;

  const taskViewForm = document.querySelector('.task-form-view');

  //clear the form
  taskViewForm.innerHTML = '';

  taskViewForm.insertAdjacentHTML('beforeend', html);

  parentElement.classList.add('active');

  let deleteBtn = parentElement.querySelector(".action_button_cont #taskDelete");
  let completeBtn = parentElement.querySelector(".action_button_cont #taskComplete");

  //  delElem.onclick = function() { deleteTask(uniqueid) };

  if (isCompleted === false) {
    completeBtn.style.display = "block";
    completeBtn.onclick = function() { completeTask(uniqueid) };
  } else {
    completeBtn.style.display = "none";
  }

}

function closeTask() {
  parentElement.classList.remove('active');
}

function completeTask(val) {
  if (statsData.active > 0) {
    statsData.complete++;
    statsData.acitve--;
    //  saveData();
  }

  if (taskArray.find(task => task.date === currid)) {
    let getTask = taskArray.find(tanggal => tanggal.date === currid);
    let getUidTask = getTask.content.find(id => id.uid === val);
    getUidTask.isCompleted = true;
    console.log(getUidTask);
  }

  renderTasks();
  closeTask();
}
