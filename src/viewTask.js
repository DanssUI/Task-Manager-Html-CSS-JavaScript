const parentElement = document.querySelector('.task-view');

export function generateTaskView() {
  let html = `
    <button id="closeViewBtn">&times;</button>
    <div class="task-form-view">
      <h2>Task Name</h2>
      <div class='img_cont'>
        <img src="Img/unset.png" />
      </div>
      <div class="desc_container">
        <p>Task Description</p>
        <p class="task_view_desc"></p>
      </div>
      
      <div class="lower-holder-view">
        <div class="category_time_cont">
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
        </div>
       
        <div class="action_button_cont">
          <button id="taskComplete">Complete</button>
          <button id="taskDelete">Delete</button>
        <div>
      </div>
    </div>`

  parentElement.insertAdjacentHTML('beforeend', html);
  document.querySelector('#closeViewBtn').addEventListener('click', closeTask);
}

function closeTask() {
 // console.log(parentElement.innerHTML);
   //parentElement.style.display = 'none'
  parentElement.classList.remove('active');
}

/*function deleteTask(val) {
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
}*/

/*function completeTask(val) {
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

}*/
