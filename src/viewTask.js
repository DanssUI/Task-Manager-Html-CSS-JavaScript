import { statsData, taskArray, currid, renderTasks, setLocalStorage, messagePopUp } from './model.js'
const parentElement = document.querySelector('.task-view');

let actionBtnsCont;

export function generateTaskView() {
  const html = `
    <button id="closeViewBtn">&times;</button>
    <div class="task-form-view">
    </div>`

  parentElement.insertAdjacentHTML('beforeend', html);
  document.querySelector('#closeViewBtn').addEventListener('click', closeTask);
}

export function openTaskView(title, desc, timeStart, timeEnd, category, uniqueid, isCompleted) {
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
            <b>Category :</b>
            <span>${category}</span>
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
       
        <div data-task-id="${uniqueid}" class="action_button_cont">
          <button id="taskComplete">Complete</button>
          <button id="taskDelete">Delete</button>
        <div>
      </div>`;

  const taskViewForm = document.querySelector('.task-form-view');

  //clear the form
  taskViewForm.innerHTML = '';

  taskViewForm.insertAdjacentHTML('beforeend', html);

  parentElement.classList.add('active');

  const completeBtn = parentElement.querySelector(".action_button_cont #taskComplete");

  if (isCompleted === false) completeBtn.style.display = "block";
  else completeBtn.style.display = "none";

  addHandlerCompleteTask(getBtnAction);
}

function addHandlerCompleteTask(handler) {
  const actionBtnsCont = document.querySelector('.action_button_cont');
  actionBtnsCont.addEventListener('click', handler);
}

function getBtnAction(e) {
  const uniqueid = e.target.closest('.action_button_cont').dataset.taskId;

  const btnType = e.target.id;
  CompleteDeleteTask(uniqueid, btnType);
}

export function closeTask() {
  parentElement.classList.remove('active');
}

function CompleteDeleteTask(uniqueid, btnType) {
  const currDate = taskArray.find(task => task.date === currid);

  if (currDate) {

    const getUidTask = currDate.content.find(id => id.uid === uniqueid);

    switch (btnType) {
      case 'taskComplete':
        getUidTask.isCompleted = true;
        statsData.complete++;
        statsData.active--;
        messagePopUp('Task marked as completed', 'success');
        break;
      case 'taskDelete':
        getUidTask.isCompleted ? statsData.complete-- : statsData.active--;
        statsData.deleted++;
        messagePopUp('Task deleted', 'danger');
        currDate.content.filter((task, i) => {
          task.uid === getUidTask.uid && currDate.content.splice(i, 1);
        });
        statsData.total--
        break;
      default:
        return
    }
  }
  renderTasks();
  closeTask();
  setLocalStorage('tasks', taskArray);
  setLocalStorage('stats', statsData);
}
