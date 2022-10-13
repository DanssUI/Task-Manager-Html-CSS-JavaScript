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
