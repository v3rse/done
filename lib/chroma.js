const pre = "\x1b[";
const reset = pre+"0m";

//basic foreground colors
function normal(string){
	return pre+"39m"+string+reset;
}

function black(string){
	return pre+"30m"+string+reset;
}

function red(string){
	return pre+"31m"+string+reset;
}

function green(string){
	return pre+"32m"+string+reset;
}

function yellow(string){
	return pre+"33m"+string+reset;
}

function blue(string){
	return pre+"34m"+string+reset;
}

function magenta(string){
	return pre+"35m"+string+reset;
}

function cyan(string){
	return pre+"36m"+string+reset;
}

function lgray(string){
	return pre+"37m"+string+reset;
}

function dgray(string){
	return pre+"90m"+string+reset;
}

function lred(string){
	return pre+"91m"+string+reset;
}

function lgreen(string){
	return pre+"92m"+string+reset;
}

function lyellow(string){
	return pre+"93m"+string+reset;
}

function lblue(string){
	return pre+"94m"+string+reset;
}

function lmagenta(string){
	return pre+"95m"+string+reset;
}
function lcyan(string){
	return pre+"96m"+string+reset;
}

function white(string){
	return pre+"97m"+string+reset;
}





//text formats
function underline(string){
	return pre+"4m"+string+pre+"24m";
}

function bold(string){
	return pre+"1m"+string+pre+"21m";
}

function dim(string){
	return pre+"2m"+string+pre+"22m";
}

function italics(string){
	return pre+"3m"+string+pre+"23m";
}

function strikethrough(string){
	return pre+"9m"+string+pre+"29m";
}



exports.normal = normal;
exports.black = black;
exports.red = red;
exports.green = green;
exports.yellow = yellow;
exports.blue = blue;
exports.magenta = magenta;
exports.cyan = cyan;
exports.lgray = lgray;
exports.dgray = dgray;
exports.lred = lred;
exports.lgreen = lgreen;
exports.lyellow = lyellow;
exports.lblue = lblue;
exports.lmagenta = lmagenta;
exports.lcyan = lcyan;
exports.white = white;


exports.underline = underline;
exports.bold = bold;
exports.dim = dim;
exports.italics = italics;
exports.strikethrough = strikethrough;
