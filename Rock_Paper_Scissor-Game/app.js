//Cash the DOM = store variables for later
//Timesaving, saves times writing
//Performance-factor: variables are available 'faster', keeping ref points ready to be used
let userScore = 0;
let computerScore = 0;
const userScore_span = document.getElementById("user-score");
const computerScore_span = document.getElementById("computer-score");
const scoreBoard_span = document.querySelector(".score-board");
const result_p = document.querySelector(".result > p");
const rock_div = document.getElementById("rock");
const paper_div = document.getElementById("paper");
const scissor_div = document.getElementById("scissor");
const user_choice = document.getElementById("user-choice");
const computer_choice = document.getElementById("computer-choice");
//Game rules, how the game should work
function gameComputer() {
	const choices = [ "rock", "paper", "scissor" ];
	const randomNr = Math.floor(Math.random() * 3);
	return choices[randomNr];
}
function win(userSelected, computerSelected) {
	userScore++;
	userScore_span.innerHTML = userScore;
	const smallWord = "You Won!".fontsize(3).sup();
	result_p.innerHTML = `${userSelected} beats ${computerSelected}! ${smallWord}`;
	//fix (user) and (comp) todo:
}
function lose(userSelected, computerSelected) {
	computerScore++;
	computerScore_span.innerHTML = computerScore;
	const smallWord = "Computer Won!".fontsize(3).sup();
	result_p.innerHTML = `${userSelected} beats ${computerSelected}! ${smallWord}`;
}
function draw(userSelected, computerSelected) {
	const smallWord = "It's a draw!".fontsize(3).sup();
	result_p.innerHTML = `${userSelected} and ${computerSelected}. ${smallWord}`;
}
function gameUser(userChoice) {
	const computerChoice = gameComputer();
	switch (userChoice + computerChoice) {
		case "rockscissor":
		case "paperrock":
		case "scissor-paper":
			win(userChoice, computerChoice);
			break;
		case "rockpaper":
		case "paperscissor":
		case "scissorrock":
			lose(userChoice, computerChoice);
			break;
		case "rockrock":
		case "paperpaper":
		case "scissorscissor":
			draw(userChoice, computerChoice);
			break;
	}
	// if ((userChoice = "rock")) {
	// 	user_choice.innerHTML = '<i class="fa fa-hand-rock-o fa-3x" aria-hidden="true"></>';
	// } else if ((userChoice = "paper")) {
	// 	user_choice.innerHTML = '<i class="fa fa-hand-paper-o fa-3x" aria-hidden="true"></i>';
	// } else {
	// 	('<i class="fa fa-hand-scissors-o fa-3x" aria-hidden="true"></>');
	// }
	switch (userChoice) {
		case "rock":
			user_choice.innerHTML = '<i class="fa fa-hand-rock-o fa-3x" aria-hidden="true"></>';
			break;
		case "paper":
			user_choice.innerHTML = '<i class="fa fa-hand-paper-o fa-3x" aria-hidden="true"></>';
			break;
		case "scissor":
			user_choice.innerHTML = '<i class="fa fa-hand-scissors-o fa-3x" aria-hidden="true"></>';
			break;
	}
	switch (computerChoice) {
		case "rock":
			computer_choice.innerHTML = '<i class="fa fa-hand-rock-o fa-3x" aria-hidden="true"></>';
			break;
		case "paper":
			computer_choice.innerHTML = '<i class="fa fa-hand-paper-o fa-3x" aria-hidden="true"></>';
			break;
		case "scissor":
			computer_choice.innerHTML = '<i class="fa fa-hand-scissors-o fa-3x" aria-hidden="true"></>';
			break;
	}
	// userChoice = "rock"
	// 	? (user_choice.innerHTML = '<i class="fa fa-hand-rock-o fa-3x" aria-hidden="true"></>')
	// 	: (userChoice = "paper"
	// 			? (user_choice.innerHTML = '<i class="fa fa-hand-paper-o fa-3x" aria-hidden="true"></>')
	// 			: (user_choice.innerHTML = '<i class="fa fa-hand-scissors-o fa-3x" aria-hidden="true"></>'));
}

//Game functions, Event Listeners
function main() {
	rock_div.addEventListener("click", () => gameUser("rock"));
	paper_div.addEventListener("click", () => gameUser("paper"));
	scissor_div.addEventListener("click", () => gameUser("scissor"));
}

//Activate the game!
console.log(main());
