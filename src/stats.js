import {statsData} from './model.js'
const parentElement = document.querySelector('#stats')

export function generateStatsHTML() {
  let html = `
    <h4 class="headertop">All
      <span class="headerbottom">Statistics</span>
    </h4>
    <div class="stats-holder">
      <div class="box-holder">
        <span>
          <h1>35</h1>
          <h4>Active Task</h4>
        </span>
        <span>
          <h1>15</h1>
          <h4>Completed Task</h4>
        </span>
        <span>
          <h1>55</h1>
          <h4>Total Task</h4>
        </span>
        <span>
          <h1>5</h1>
          <h4>Deleted Task</h4>
        </span>
      </div>

      <div class="lower-box">
        <h2 class="lb-head">Category</h2>

        <div class="catbox-holder">
          <span>5</span>
          <span>10</span>
          <span>15</span>
          <span>5</span>
          <span>2</span>
          <span>18</span>
        </div>
      </div>
    </div>`
    
    parentElement.insertAdjacentHTML('beforeend', html);
}

export function loadStats() {
  const activeTask = document.querySelector(".box-holder span:nth-child(1) h1");
  const completedTask = document.querySelector(".box-holder span:nth-child(2) h1");
  const deletedTask = document.querySelector(".box-holder span:nth-child(4) h1");
  const total = document.querySelector(".box-holder span:nth-child(3) h1");

  const unset = document.querySelector(".catbox-holder span:nth-child(1)");
  const work = document.querySelector(".catbox-holder span:nth-child(2)");
  const edu = document.querySelector(".catbox-holder span:nth-child(3)");
  const sport = document.querySelector(".catbox-holder span:nth-child(4)");
  const social = document.querySelector(".catbox-holder span:nth-child(5)");
  const entertainment = document.querySelector(".catbox-holder span:nth-child(6)");

  activeTask.innerHTML = statsData.activeTask;
  //completeTask.innerHTML = statsData.completeTask;
  deletedTask.innerHTML = statsData.deletedTask;
  total.innerHTML = statsData.total;

  unset.innerHTML = statsData.unset;
  work.innerHTML = statsData.work;
  edu.innerHTML = statsData.education;
  sport.innerHTML = statsData.sport;
  social.innerHTML = statsData.social;
  entertainment.innerHTML = statsData.entertainment;
}
