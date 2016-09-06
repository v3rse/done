//This is a simple command line todo list app
//Features
//-create todo item
//-list todo item
//-check todo item off list
//-delete todo item

var fs = require('fs');


//constants
var TASK_JSON_PATH = "./.database.json";


function init(){
	//create file if it's present.
	if(!fs.existsSync(TASK_JSON_PATH)){
		console.log("Initialising storage.\n Creating `.database.json` file");
		setData([]);	
	}
	
}

function getData(){
	//read file contents
	var contents = fs.readFileSync(TASK_JSON_PATH);

	//parse contents
	var data = JSON.parse(contents);

	return data;
}


function setData(data){
	//strigify JSON
	var dataString = JSON.stringify(data);

	//write to  file
	
	fs.writeFileSync(TASK_JSON_PATH,dataString);
}

//display usage
function usage() {
	console.log("Usage: done [add|check|delete|help] [task]");
	console.log("`task` is only a string when using `add` and a number\nfor all other commands.");
	console.log("Using the `done` without arguments lists all tasks");
}

//add task
function add(task) {
	//get data
	var data = getData();

	//add item
	data.push({task:task,completed:false});

	//set data
	setData(data);

	//list
	list();
}

//check task
function check(task) {
	//get data
	var data = getData();

	//modify the data (toggle)
	data[task].completed = !data[task].completed;

	//set data
	setData(data);

	//list
	list();
}

//delete task
function del(task){
	//get data
	var data = getData();

	//delete item
	data.splice(task,task+1);

	//set data
	setData(data);

	//list
	list();
}

//list all tasks
function list() {
	
	//data
	var data = getData();
	
	if(data.length > 0){
		//print the list. using ANSI colors and formating
		console.log("\x1b[93m\x1b[4mTask list:\x1b[24m");
		data.forEach(function (task,index){
			console.log(index+1+"."," ["+(task.completed ? "\x1b[92m✓\x1b[93m" : " ")+"] ",task.task);
		});
		
	}else{
		console.log("\x1b[91mNo tasks added!!");
	}

}



var command = process.argv[2];
var argument = process.argv[3];

init();

switch(command){
	case "add":
		add(argument);
		break;
	case "check":
		check(argument-1);
		break;
	case "delete":
		del(argument-1);
		break;
	case "help":
		usage();
		break;
	case undefined:
		list();
		break;
	default:
		console.log("\x1b[91mCommand not found!!\x1b[0m");
		usage();
		break;
}
