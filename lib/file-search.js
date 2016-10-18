var fs = require('fs');

function tagSearchSync(filePath,tagRegex){
	var data = fs.readFileSync(filePath,'utf8');
	var strippedStrings = [];

	data.split("\n").forEach(function(s){
		if(s.match(tagRegex)){
			var stripped = s.split(tagRegex)[1].trim();
			strippedStrings.push(stripped);
		}
	});

	return strippedStrings;
}

function tagSearch(filePath,tagRegex,callback){
	fs.readFile(filePath,'utf8',function(err, data){
		if(err) throw err;

		var strippedStrings = [];

		data.split("\n").forEach(function(s,i){
			if(s.match(tagRegex)){
				var stripped = s.split(tagRegex)[1].trim();
				strippedStrings.push(stripped);
			}
		});
				
		callback(strippedStrings);
	});
}

exports.tagSearchSync = tagSearchSync;
exports.tagSearch = tagSearch;
