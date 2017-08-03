var fs = require("fs");
var BasicCard = require("./BasicCard")

BasicCard.CreateClozeCard;
console.log("In Other File");


var Test = function() {
	this.getData = function() {
		fs.readFile("cardTxt.txt", "utf8", function(error,data){
			console.log(data);
		});
	};
};

 module.exports = Test;