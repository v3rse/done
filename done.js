var fs = require('fs');
var chroma = require('@v3rse/chroma');
var moment = require('moment');
//Path to task json file
var TASK_JSON_PATH = "./.database.json";



//Creates a file for keeping track of tasks
function init() {
	//create file if it's present.
	if (!fs.existsSync(TASK_JSON_PATH)) {
		console.log("Initialising storage.\n Creating `.database.json` file");
		setData({
			uncompleted: [],
			completed: []
		});
	}

}



//Used to read some data from the JSON file
function getData() {
	//read file contents
	var contents = fs.readFileSync(TASK_JSON_PATH);

	//parse contents
	var data = JSON.parse(contents);

	return data;
}



//Used to write data to the JSON file
function setData(data) {
	// makes the object a JSON string
	var dataString = JSON.stringify(data);

	//write to  file
	fs.writeFileSync(TASK_JSON_PATH, dataString);
}



//Displays usage
function usage() {
	console.log("Usage: done [add|check|delete|help] [task]");
	console.log("`task` is only a string when using `add` and a number\nfor all other commands.");
	console.log("Using the `done` without arguments lists all tasks");
}



//Adds a task
function add(task) {
	//get data
	var data = getData();

	//add item to uncompleted
	data.uncompleted.push({
		task: task,
		dateCreated: Date.now()
	});

	//set data
	setData(data);

	//list
	list();
}



//Moves task from uncompleted task list to completed task list
function check(task) {
	//get data
	var data = getData();

	//modify the data
	data.uncompleted[task].dateCompleted = Date.now();

	//move to completed tasks
	data.completed.push(
		data.uncompleted[task]
	);

	//remove from uncompleted
	data.uncompleted.splice(task, task + 1);

	//set data
	setData(data);

	//list
	list();
}



//Remove uncompleted task from the list.
function del(task) {
	//get data
	var data = getData();

	//delete item
	data.uncompleted.splice(task, task + 1);

	//set data
	setData(data);

	//list
	list();
}




//Lists all tasks
function list() {

	//data
	var data = getData();

	if (data.uncompleted.length || data.completed.length) {

		if (data.uncompleted.length) {
			//print the uncompleted list. using ANSI colors and formating
			console.log(chroma.underline.lyellow("Uncompleted Task list:"));
			data.uncompleted.forEach(function (task, index) {
				console.log(chroma.lyellow(index + 1 + "."), task.task + "\t" + chroma.italics.bgblue("Added " + moment(task.dateCreated).fromNow()));
			});
		}
		if (data.completed.length) {
			//print the uncompleted list. using ANSI colors and formating
			console.log("\n");
			console.log(chroma.underline.lyellow("Completed Task list:"));
			data.completed.forEach(function (task, index) {
				console.log(chroma.strikethrough.lgreen(index + 1 + ". " + task.task),chroma.italics.bgblue("\tCompleted " + moment(task.dateCompleted).fromNow()));
			});
		}
	} else {
		console.log(chroma.bgred(chroma.black("No tasks added!!")));
	}

}



var command = process.argv[2];
var argument = process.argv[3];

init();

switch (command) {
	case "add":
		add(argument);
		break;
	case "check":
		check(argument - 1);
		break;
	case "delete":
		del(argument - 1);
		break;
	case "help":
		usage();
		break;
	case undefined:
		list();
		break;
	default:
		console.log(chroma.bgred(chroma.black("Command not found!!")));
		usage();
		break;
}
