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

//Game rules, how the game should work
function gameComputer() {
	const choices = [ "rock", "paper", "scissor" ];
	const randomNr = Math.floor(Math.random() * 3);
	return choices[randomNr];
}
function win(userSelected, computerSelected) {
	userScore++;
	userScore_span.innerHTML = userScore;
	computerScore_span.innerHTML = computerScore;
	const smallWord = "You Win".fontsize(5).sup();
	result_p.innerHTML = `${userSelected}(user) beats ${computerSelected}(comp). ${smallWord}`;
	//fix (user) and (comp) todo:
}
function lose() {
	console.log("lose");
	// computerScore_span
}
function draw() {
	console.log("draww");
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
}
// function game(userChoice) {
// 	console.log("who0000", +userChoice);
// } //returns NaN -> todo: fix later

//Game functions, Event Listeners
function main() {
	rock_div.addEventListener("click", () => gameUser("rock"));
	paper_div.addEventListener("click", () => gameUser("paper"));
	scissor_div.addEventListener("click", () => gameUser("scissor"));
}

//UI change

//Activate the game!
console.log(main());
