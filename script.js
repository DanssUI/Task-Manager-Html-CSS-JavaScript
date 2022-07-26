
//Bad Code Writing
//Created by DanssUi

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
	"content": [{"uid": 0, "isCompleted": "false", "title": "Give me a star ✨", "desc": "This is an example", "timestart": "12:00", "timeend": "13:00", "time": "Infinity", "category": "entertainment"}]
}];

var statsData = {"aktif": 1, "komplit": 0, "hapus": 0, "total": 1, "unset": 0, "work": 0, "education": 0, "sport": 0, "social": 0, "entertainment": 1};

loadData();
loadTask();
initTime();

//reset Database
//loadDatarage.setItem("tasks", JSON.stringify(taskArray));
//localStorage.setItem("stats", JSON.stringify(statsData));

	function loadData(){
		//Task Data
		if (JSON.parse(localStorage.getItem("tasks")) == null){
    		localStorage.setItem("tasks", JSON.stringify(taskArray));
			taskArray = JSON.parse(localStorage.getItem("tasks"));
		}else{
			taskArray = JSON.parse(localStorage.getItem("tasks"));
		}
		
		//Stats Data
		if (JSON.parse(localStorage.getItem("stats")) == null){
    		localStorage.setItem("stats", JSON.stringify(statsData));
			statsData = JSON.parse(localStorage.getItem("stats"));
		}else{
			statsData = JSON.parse(localStorage.getItem("stats"));
		}
	}
	
	function saveData(){
    	localStorage.setItem("tasks", JSON.stringify(taskArray));
    	localStorage.setItem("stats", JSON.stringify(statsData));
    	loadStats();
	}
	
	function loadTask(){
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
					currcontent.timestart,
					currcontent.timeend,
					currcontent.category,
					currcontent.uid,
					currcontent.isCompleted
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
		
		document.querySelector(".topdate-holder h2").innerHTML = month;
		document.querySelector(".topdate-holder h4").innerHTML = cyear;

	}
	
	function deactiveBtn(val){
		let allBtn = document.querySelectorAll(".date button");
		allBtn.forEach(fbtn => {fbtn.classList = "dateBtn"});
		val.classList = "dateBtnActive";
	}
	
	let title = document.getElementById('taskname');
	let desc = document.getElementById('taskdesc');
	let category = "unset";
	let timeStart = document.getElementById('timestart');
	let timeEnd = document.getElementById('timeend');

	const cateDisplayer = document.querySelector(".lower-input button:nth-child(1) span");
	const tsDisplayer = document.querySelector(".lower-input button:nth-child(2) span");
	const teDisplayer = document.querySelector(".lower-input button:nth-child(3) span");

	function opentaskPopup(){
		addTaskPopup.style.display = "flex";
	}
	
	function closetaskPopup(){
		addTaskPopup.style.display = "none";
		
		[title.value, desc.value, category, timeStart.value, timeEnd.value] = ["", "", "unset", "12:00", "13:00"];
		[cateDisplayer.innerHTML, tsDisplayer.innerHTML, teDisplayer.innerHTML] = [category, timeStart.value, timeEnd.value];
	}
	
	function opentaskView(t, d, ts, te, c, u, ic){
		taskView.style.display = "flex";
		
		let title = taskView.querySelector(".task-form-view h1");
		let desc = taskView.querySelector(".task-form-view p");
		let del = taskView.querySelector(".task-view #taskDelete");
		let cmplt = taskView.querySelector(".task-view #taskComplete");

		let cateDisplay = document.querySelector(".lower-input-view button:nth-child(1) span");
		let tsDisplay = document.querySelector(".lower-input-view button:nth-child(2) span");
		let teDisplay = document.querySelector(".lower-input-view button:nth-child(3) span");
		let imgDisplay = document.querySelector(".task-form-view img");

		imgDisplay.src = "Img/" + c + ".png";

		title.innerHTML = t;
		desc.innerHTML = d;
		tsDisplay.innerHTML = ts;
		teDisplay.innerHTML = te;
		cateDisplay.innerHTML = c;
		del.onclick = function() {deleteTask(u)};
		
		if (ic == "false") {
			cmplt.style.display = "block";
			cmplt.onclick = function(){completeTask(u)};
		}else{
			cmplt.style.display = "none";
		}

	}
	
	function closetaskView(){
		taskView.style.display = "none";
	}
	
	function openCategory() {
		catePopup.style.display = "flex"
		document.querySelectorAll(".category button").forEach(button => {
			button.addEventListener("click", function(){category = button.innerHTML; cateDisplayer.innerHTML = button.innerHTML; closeCategory();});
		});
	}
	
	function closeCategory() {
		catePopup.style.display = "none"
	}
	
	function addtaskBtn(){
		let timeStartEnd = timeStart.value + " - " + timeEnd.value;
	
		addtask(title.value, desc.value, timeStart.value, timeEnd.value, category, timeStartEnd);
	}
	
	timeStart.oninput = function(){tsDisplayer.innerHTML = timeStart.value};
	timeEnd.oninput = function(){teDisplayer.innerHTML = timeEnd.value};

	
	function addtask(t, d, ts, te, c, tse){
		let uniqueid = Math.random() * 100;
		
		statsData.aktif ++;
		statsData.total ++;
		statsData[c] ++;
		saveData();

		if (taskArray.find(tanggal => tanggal.date === currid)){
			let existTask = taskArray.find(tanggal => tanggal.date === currid);
			let content = existTask.content;
			content.push({"uid": uniqueid, "isCompleted": "false", "title": t, "desc": d, "timestart": ts, "timeend": te, "time": tse, "category": c});
			
			loadTask();
			closetaskPopup();
			saveData();
		}else{
			taskArray.push({
				"date": currid,
				"content": [{"uid": uniqueid, "isCompleted": "false", "title": t, "desc": d, "timestart": ts, "timeend": te, "time": tse, "category": c}]
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
			
			//Stats Update
			if (taskContent.isCompleted == "false") {
				if (statsData.aktif > 0) {
					statsData.hapus ++;
					statsData.aktif --;
					saveData();
				}
			}else{
				if (statsData.komplit > 0) {
					statsData.hapus ++;
					statsData.komplit --;
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
	
	function completeTask(val){
		if (statsData.aktif > 0) {
			statsData.komplit ++;
			statsData.aktif --;
			saveData();
		}
		
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
	
	//Stats getter
	const aktifD = document.querySelector(".box-holder span:nth-child(1) h1");
	const komplitD = document.querySelector(".box-holder span:nth-child(2) h1");
	const hapusD = document.querySelector(".box-holder span:nth-child(4) h1");
	const totalD = document.querySelector(".box-holder span:nth-child(3) h1");

	const unsetD = document.querySelector(".catbox-holder span:nth-child(1)");
	const workD = document.querySelector(".catbox-holder span:nth-child(2)");
	const eduD = document.querySelector(".catbox-holder span:nth-child(3)");
	const sportD = document.querySelector(".catbox-holder span:nth-child(4)");
	const socialD = document.querySelector(".catbox-holder span:nth-child(5)");
	const entD = document.querySelector(".catbox-holder span:nth-child(6)");
	
	loadStats();
	function loadStats(){
		aktifD.innerHTML = statsData.aktif;
		komplitD.innerHTML = statsData.komplit;
		hapusD.innerHTML = statsData.hapus;
		totalD.innerHTML = statsData.total;
		
		unsetD.innerHTML = statsData.unset;
		workD.innerHTML = statsData.work;
		eduD.innerHTML = statsData.education;
		sportD.innerHTML = statsData.sport;
		socialD.innerHTML = statsData.social;
		entD.innerHTML = statsData.entertainment;
	}