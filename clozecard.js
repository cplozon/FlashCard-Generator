var fs = require("fs");
var BasicCard = require("./BasicCard");


BasicCard.CreateClozeCard;


var ClozeCard = function() {
var constructCCard = function(completeCObject){
			for(var i=0; i<1; i++){
			completeCObject.entireCard = completeCObject.entireCard.replace("[textCard]", completeCObject.text[i]);
			}
			for(var i=0; i<1; i++){
			completeCObject.entireCard = completeCObject.entireCard.replace("[clozeCard]", completeCObject.cloze[i]);
			}
			
			var cardTxt = completeCObject.entireCard;
			console.log("Your Entire Cloze Card Is: " + cardTxt);
			console.log("Your Cloze Part Is: " + cloze);
			console.log(JSON.stringify(completeCObject));
			fs.writeFile("cardTxt.txt", JSON.stringify(completeCObject));
			cardMakeContinue();
			}
		}



 module.exports = ClozeCard;