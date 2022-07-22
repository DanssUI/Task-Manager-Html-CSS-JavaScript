
const taskContainer = document.querySelector(".task-container");
const addTaskPopup = document.querySelector(".add-task");
const taskCard = document.querySelectorAll(".task-card");
const taskView = document.querySelector(".task-view");
const catePopup = document.querySelector(".category");

const now = new Date();

let cmonth = now.getMonth();
let cyear = now.getFullYear();

const nowid = now.getFullYear() + "" + (now.getMonth() + 1) + "" + now.getDate();

let currid = nowid;
var taskArray = [{
	"date": nowid,
	"content": [{"uid": "0", "isCompleted": "false", "title": "Kulo Anime 😅", "desc": "anjay 😜😳😎😅", "dateChild": "2022-7-12", "timestart": "12:00", "timeend": "13:00", "time": "1PM - 3PM", "category": "Nyatir"}]
}];

loadData();
loadTask();
initTime();

//reset Database
//loadDatarage.setItem("tasks", JSON.stringify(taskArray));

	function loadData(){
		//Task Data
		if (JSON.parse(localStorage.getItem("tasks")) == null){
    		localStorage.setItem("tasks", JSON.stringify(taskArray));
			taskArray = JSON.parse(localStorage.getItem("tasks"));
		}else{
			taskArray = JSON.parse(localStorage.getItem("tasks"));
		}
		
	}
	
	function saveData(){
    	localStorage.setItem("tasks", JSON.stringify(taskArray));
	}

	function loadTask(){
		console.table(taskArray);
		const updatedtaskCard = document.querySelectorAll(".task-card");
		updatedtaskCard.forEach(updatedtaskCard => {updatedtaskCard.remove();});
		document.querySelector(".task-container-completed").style.display = "none";
		document.querySelector(".empty-task").style.display = "block";
	
		if (taskArray.find(tanggal => tanggal.date === currid)){
			let existTask = taskArray.find(tanggal => tanggal.date === currid);
			let contentArray = existTask.content;
			
			for (var i = 0; i < contentArray.length; i++) {
				let currcontent = contentArray[i];
		
				const tab = document.createElement("div");
				tab.classList = "task-card";
				tab.onclick = function(){
					opentaskView(
					currcontent.title, 
					currcontent.desc,
					currcontent.dateChild,
					currcontent.timestart,
					currcontent.timeend,
					currcontent.category,
					currcontent.uid
					)};
					
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
	}
	
	function changeMonth(val) {
		if (val == 0) {
			if (cmonth < 11) {
				cmonth++;
			} else {
				cmonth = 0;
				cyear += 1;
			}
		} else {
			if (cmonth > 0) {
				cmonth--;
			}else {
				cmonth = 11;
				cyear -= 1;
			}
		}
		
		initTime();
		document.querySelector(".date button").click();
		document.querySelector(".date").scrollLeft = 0;
	}

	function initTime(){
		const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
		const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
		const daysmin = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
		
		let month = months[cmonth];
		let day = days[now.getDay()];
		let numday = now.getDate();
		
		const getMonthTotalDays = new Date(now.getFullYear(), cmonth + 1, 0).getDate();
		
		let allBtn = document.querySelectorAll(".date button");
		allBtn.forEach(btn => {btn.remove()});
		
		for (var i = 1; i < getMonthTotalDays + 1; i++) {
			var relativenow = new Date(now.getFullYear(), cmonth, i);
			var relaviveday = daysmin[relativenow.getDay()];
			
			const tbox = document.createElement("button");
			tbox.innerHTML = i;
			
			const tday = document.createElement("span");
			tday.innerHTML = relaviveday;
			tbox.appendChild(tday);
			
			tbox.id = now.getFullYear() + "" + (cmonth + 1) + "" + i;
			tbox.onclick = function(){currid = tbox.id; deactiveBtn(tbox); loadTask();};
			tbox.classList = "dateBtn";
			document.querySelector(".date").appendChild(tbox);
			
			if (i == numday) {
				const parent = document.querySelector('.date');
				parent.scrollLeft = tbox.offsetLeft - parent.offsetLeft;
				currid = tbox.id;
				deactiveBtn(tbox);
			}
		}
		
		document.querySelector(".topdate-holder h2").innerHTML = month + ", " + cyear;
  
	}
	
	function deactiveBtn(val){
		let allBtn = document.querySelectorAll(".date button");
		allBtn.forEach(fbtn => {fbtn.classList = "dateBtn"});
		val.classList = "dateBtnActive";
	}
	
	let title = document.getElementById('taskname');
	let desc = document.getElementById('taskdesc');
	let date = document.getElementById('datetime');
	let category = "unset";
	let timeStart = document.getElementById('timestart');
	let timeEnd = document.getElementById('timeend');

	const dateDisplayer = document.querySelector(".lower-input button:nth-child(1) span");
	const cateDisplayer = document.querySelector(".lower-input button:nth-child(2) span");
	const tsDisplayer = document.querySelector(".lower-input button:nth-child(3) span");
	const teDisplayer = document.querySelector(".lower-input button:nth-child(4) span");

	function opentaskPopup(){
		addTaskPopup.style.display = "flex";
	}
	
	function closetaskPopup(){
		addTaskPopup.style.display = "none";
		
		[title.value, desc.value, date.value, category, timeStart.value, timeEnd.value] = ["", "", "2022-07-10", "unset", "12:00", "13:00"];
		[dateDisplayer.innerHTML, cateDisplayer.innerHTML, tsDisplayer.innerHTML, teDisplayer.innerHTML] = [date.value, category, timeStart.value, timeEnd.value];
	}
	
	function opentaskView(t, d, dt, ts, te, c, u){
		taskView.style.display = "flex";
		
		let title = taskView.querySelector(".task-form h1");
		let desc = taskView.querySelector(".task-form p");
		let del = taskView.querySelector(".task-form #taskDelete");
		let cmplt = taskView.querySelector(".task-form #taskComplete");

		let dateDisplay = document.querySelector(".lower-input-view button:nth-child(1) span");
		let cateDisplay = document.querySelector(".lower-input-view button:nth-child(2) span");
		let tsDisplay = document.querySelector(".lower-input-view button:nth-child(3) span");
		let teDisplay = document.querySelector(".lower-input-view button:nth-child(4) span");

		title.innerHTML = t;
		desc.innerHTML = d;
		dateDisplay.innerHTML = dt;
		tsDisplay.innerHTML = ts;
		teDisplay.innerHTML = te;
		cateDisplay.innerHTML = c;
		del.onclick = function() {deleteTask(u)};
		cmplt.onclick = function(){completeTask(u)};

	}
	
	function closetaskView(){
		taskView.style.display = "none";
	}
	
	function openCategory() {
		catePopup.style.display = "block"
		document.querySelectorAll(".category button").forEach(button => {
			button.addEventListener("click", function(){category = button.innerHTML; cateDisplayer.innerHTML = button.innerHTML; closeCategory();});
		});
	}
	
	function closeCategory() {
		catePopup.style.display = "none"
	}
	
	function addtaskBtn(){
		let timeStartEnd = timeStart.value + " - " + timeEnd.value;
	
		addtask(title.value, desc.value, date.value, timeStart.value, timeEnd.value, category, timeStartEnd);
	}
	
	date.oninput = function(){dateDisplayer.innerHTML = date.value; console.log(date.value.split("-"));};
	timeStart.oninput = function(){tsDisplayer.innerHTML = timeStart.value};
	timeEnd.oninput = function(){teDisplayer.innerHTML = timeEnd.value};

	
	function addtask(t, d, dt, ts, te, c, tse){
		let uniqueid = Math.random() * 100;

		if (taskArray.find(tanggal => tanggal.date === currid)){
			let existTask = taskArray.find(tanggal => tanggal.date === currid);
			let content = existTask.content;
			content.push({"uid": uniqueid, "isCompleted": "false", "title": t, "desc": d, "dateChild": dt, "timestart": ts, "timeend": te, "time": tse, "category": c});
			
			loadTask();
			closetaskPopup();
			saveData();
		}else{
			taskArray.push({
				"date": currid,
				"content": [{"uid": uniqueid, "isCompleted": "false", "title": t, "desc": d, "dateChild": dt, "timestart": ts, "timeend": te, "time": tse, "category": c}]
			});
			
			loadTask();
			closetaskPopup();
			saveData();
		}
	}
	
	function deleteTask(val){
		if (taskArray.find(tanggal => tanggal.date === currid)){
			let getTask = taskArray.find(tanggal => tanggal.date === currid);
			let taskContent = getTask.content;
			let getUidTask = getTask.content.find(id => id.uid === val);
			
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
	
	function completeTask(val){
		if (taskArray.find(tanggal => tanggal.date === currid)){
			let getTask = taskArray.find(tanggal => tanggal.date === currid);
			let getUidTask = getTask.content.find(id => id.uid === val);
			getUidTask.isCompleted = "true";
		}
		
		saveData();
		loadTask();
		closetaskView();
		
	}
	
	section(0);
	function section(val){
		if (val == 0) {
			//window.location.href = "#schedule";
			document.getElementById('schedule').scrollIntoView({behavior:"smooth"});
			document.querySelector(".navbar button:first-child img").src = "Img/category.png";
			document.querySelector(".navbar button:last-child img").src = "Img/chart-glyph.png";
		}else{
			//window.location.href = "#stats";
			document.getElementById('stats').scrollIntoView({behavior:"smooth"});
			document.querySelector(".navbar button:last-child img").src = "Img/chart.png";
			document.querySelector(".navbar button:first-child img").src = "Img/category-glyph.png";
		}
	}