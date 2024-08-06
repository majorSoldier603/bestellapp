function DEL() {
	localStorage.clear();
}

async function fetchData() {
	let response = await fetch("https://maximilian-stark.developerakademie.net/data.json");
	let data = await response.json();
	setNewlocalStorage(data);
}

function setNewlocalStorage(data) {
	localStorage.setItem('UserData', JSON.stringify(data.UserData))
	localStorage.setItem('Recommended', JSON.stringify(data.Recommended))
	localStorage.setItem('Posts', JSON.stringify(data.Posts))
}

let lastItem

function clickt(item) {
	console.log(lastItem )
	if (lastItem) {
		document.getElementById(lastItem).classList = ""
	} 
	
	document.getElementById(item).classList = "current"	
	
	lastItem = item
}