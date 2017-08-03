var inquirer = require("inquirer");
var fs = require("fs");
var Other = require("./ClozeCard");

//  starting with a function that allows user to enter their first choice//
function menuOptions() {
	inquirer.prompt([
	{
		type: "list",
		message:"\nSelect a menu option from below",
		choices: ["Make a new card", "Show existing cards", "Exit"],
		name: "menuChoices"
	}
		]).then(function(useranswer){

			switch (useranswer.menuChoices){
				case 'Make a new card':
				console.log("Make a new flashcard");
				BasicCard();
				break;

				case 'Show existing cards':
				console.log("This feature is not yet active");
				break;

				case 'Exit':
				console.log("Exit");
				return;
				break;

				default:
				return;
				console.log("");
				console.log("Try Again");
				console.log("");
			} // close question selection
		});
	}  // close function menuOptions

menuOptions();  //// call back to menuOptions function

//first part over - user selects either make card, show cards, or exit //

// if user selects make card - then ask user of it is a basic card or cloze//

 var BasicCard = function() {
 	inquirer.prompt([
 	{
 		type: "list",
 		message: "What type of card do you want to create?",
 		choices: ["Basic Card", "Cloze Card"],
 		name: "cardType"
 	}
 	]).then(function(cardBasicCloze){
 		var cardType = cardBasicCloze.cardType;

 		if (cardType === "Basic Card") {  // if basic card create front,back
	
		function CreateBasicCard(front,back){
		console.log("Here");
		this.front = front;
		this.back = back;
		this.entireCard = "[frontCard] , [backCard]";
	}

		var front = [];  // user enters values to put into an empty array
		var back =[];
		var loop = 0;

		var getInfo = function(loop) {
			if(loop < 1){
				inquirer.prompt({
				name: "frontCard",
				message: "Enter A Question That Will Show On The Front Of The Card: "
				}).then(function(answers){
				front.push(answers.frontCard);
				loop++;
				getInfo(loop);
				})
		} // close loop to get front card information

			if(loop >= 1){  // loop for back info and call createcard
				inquirer.prompt({
					name: "backCard",
					message: "Enter The Related Answer That Will Show On The Back Of The Card:"
				}).then(function(answers){
				back.push(answers.backCard);
				var createBasicCard = new CreateBasicCard(front,back);
				constructCard(createBasicCard);
				})
		}  // close loop for back info
	} // close get info loop for basic card info

// take information and construct the card and write to cardTxt.txt file //

		var constructCard = function(completeObject){
			for(var i=0; i<1; i++){
			completeObject.entireCard = completeObject.entireCard.replace("[frontCard]", completeObject.front[i]);
			}
			for(var i=0; i<1; i++){
			completeObject.entireCard = completeObject.entireCard.replace("[backCard]", completeObject.back[i]);
			}
			var cardTxt = completeObject.entireCard;
			console.log("Your Card Is: " + cardTxt);
			fs.writeFile("cardTxt.txt", JSON.stringify(completeObject));
			cardMakeContinue();
			}
	getInfo(loop); // call back to getInfo function
	} // close basic card type if statment

		if (cardType === "Cloze Card")   // start if card is Cloze
		{  	
		function CreateClozeCard(text,cloze){
		this.text = text;         // full text
		this.cloze = cloze;			// portion to be removed
		this.entireCard = "[textCard], [clozeCard]"; // full text with answer
		this.partial = "[clozeCard]";  //partial clue display
		}

		var text = [];  // user enters entire card
		var cloze =[];	// user enters portion to remove
		var loop = 0;

		var getInfo = function(loop) {
			if(loop < 1){
				inquirer.prompt({
				name: "textCard",
				message: "Enter All Information (Q+A) In A Sentence: "
				}).then(function(answers){
				text.push(answers.textCard);
				loop++;
				getInfo(loop);
				})
			} // close loop to get front card information

			if(loop >= 1){  // loop for back info and call createcard
				inquirer.prompt({
					name: "clozeCard",
					message: "Enter The Portion You Want Removed:"
				}).then(function(answers){
				cloze.push(answers.clozeCard);
				var createClozeCard = new CreateClozeCard(text,cloze);
				constructCard(createClozeCard);
				})
			}  // close loop for back info
		} // close get info loop for cloze card info
// take information and construct the card and write to cardTxt.txt file //
		var constructCard = function(completeObject){
			for(var i=0; i<1; i++){
			completeObject.entireCard = completeObject.entireCard.replace("[textCard]", completeObject.text[i]);
			}
			for(var i=0; i<1; i++){
			completeObject.entireCard = completeObject.entireCard.replace("[clozeCard]", completeObject.cloze[i]);
			}
			//entireCard.push(cardClozeObj);
			//fs.writeFile("cardTxtcloze.txt", JSON.stringify(entireCard, null, 2));
			var cardTxt = completeObject.entireCard;
			console.log("Your Entire Cloze Card Is: " + cardTxt);
			console.log("Your Cloze Part Is: " + cloze);
			console.log(JSON.stringify(completeObject));
			fs.writeFile("cardTxt.txt", JSON.stringify(completeObject));
			cardMakeContinue();
			}

	getInfo(loop); // call back to getInfo function
	} // close cloze card type if statment

/////////////// close out of card make /////////////////////
	function cardMakeContinue() {   // function that asks to continue making cards//
	inquirer.prompt({
			type: "list",
			message:"\nContinue? Yes or No ",
			choices: ["Yes", "No"],
			name: "ynChoices"
			}).then(function(continuebasicYN){
			var ynChoices = continuebasicYN.ynChoices;
 	
			if (ynChoices === "Yes") 
				{
				getInfo(loop);  // calls function to enter another card
				}
				else 
				{ console.log("Good Job, you are finished!");
				}
			})  // close cardMakecontinue prompts

		} // close cardMakecontinue
	///////// close out of card make//////	
 	}); // close function basiccardcloz
 }  // close card Info

 module.exports = BasicCard;
 



 	