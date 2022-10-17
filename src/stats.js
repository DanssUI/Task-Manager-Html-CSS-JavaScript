import { statsData } from './model.js'
const parentElement = document.querySelector('#stats');
let statsHolder;

export function generateStatsHTML() {
  let html = `
    <h4 class="headertop">All
      <span class="headerbottom">Statistics</span>
    </h4>
    <div class="stats-holder">
    </div>`

  parentElement.insertAdjacentHTML('beforeend', html);
  statsHolder = document.querySelector('.stats-holder');
  generateStats();
}

export function generateStats() {
  const html = `
  <div class="box-holder">
    <div>
      <h1>${statsData.active}</h1>
      <p>Active Task</p>
    </div>
    <div>
      <h1>${statsData.complete}</h1>
      <p>Completed Task</p>
    </div>
    <div>
      <h1>${statsData.total}</h1>
      <p>Total Task</p>
    </div>
    <div>
      <h1>${statsData.deleted}</h1>
      <p>Deleted Task</p>
    </div>
  </div>
  <div class="lower-box">
    <h2 class="lb-head">Category</h2>

    <div class="catbox-holder">
      <span>${statsData.unset}</span>
      <span>${statsData.work}</span>
      <span>${statsData.education}</span>
      <span>${statsData.sport}</span>
      <span>${statsData.social}</span>
      <span>${statsData.entertainment}</span>
    </div>
  </div>`


education: 0
entertainment: 1
social: 0
sport: 0
unset: 0
work: 

  statsHolder.innerHTML = '';
  statsHolder.insertAdjacentHTML('beforeend', html);
}
