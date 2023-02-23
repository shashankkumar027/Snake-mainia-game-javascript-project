console.log("Started the Game!");



const foodSound = new Audio('musics/food.mp3');
const gameOverSound = new Audio('musics/gameOver.mp3');
const moveSound = new Audio('musics/move.mp3');
const musicSound = new Audio('musics/music.mp3');

//Game speed
let speed = prompt("Enter the Game Speed from 1 to 10.",4);



//let speed_rase = speed;

let score = 0;
let lastPaintTime = 0;
let food = { x: 6, y: 7 };
let inputDir = { x: 0, y: 0 };
let snakeArr = [{ x: 13, y: 15 }];
let hiscoreBox = document.getElementById('hiscoreBox');




//  Game Functions
function main(ctime) {
	window.requestAnimationFrame(main);
	if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
		return;
	}
	lastPaintTime = ctime;
	// console.log(ctime);
	gameEngine();
}

// When Snake Crashed in Wall or by Body
function isCollide(snake) {
	// If you bump into your self
	for (let i = 1; i < snakeArr.length; i++) {
		if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
			return true;
		}
	}
	// If you bump into the wall
	if (snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0){return true;} 
	return false;
}


function gameEngine() {
	// part 1 : updating the snake array..
	if (isCollide(snakeArr)) {
		gameOverSound.play();
		musicSound.pause();
		inputDir = { x: 0, y: 0 };
		alert("Game Over! press any key to play again");
		snakeArr = [{ x: 13, y: 15 }];
		score = 0;
		musicSound.play();
	}





    // If you have Eaten the food 
    // increase the score and regenerate the food.
    if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
        foodSound.play();
        score+=1;
		if(score>hiscoreval){
            hiscoreval = score;
            localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
            hiscoreBox.innerHTML = "HiScore: " + hiscoreval;
        }
        scoreBox.innerHTML= "Score: " + score;
        snakeArr.unshift({ x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y })
        let a = 2; let b = 16;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) }
    }
    //Moving the Snake
    for (let i = snakeArr.length - 2; i >= 0; i--) {
        //const element = snakeArr[i];
        snakeArr[i + 1] = { ...snakeArr[i] };
    }
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;
    



	//part 2 : Display the snake and food..
	//Dislay the Snake

	board.innerHTML = "";
	snakeArr.forEach((e, index) => {
		let snakeElement = document.createElement('div');
		snakeElement.style.gridRowStart = e.y;
		snakeElement.style.gridColumnStart = e.x;

		if (index === 0) {
			snakeElement.classList.add('head');
		} else {
			snakeElement.classList.add('snake');
		}
		board.appendChild(snakeElement);
	})
	//Display the Food
	foodElement = document.createElement('div');
	foodElement.style.gridRowStart = food.y;
	foodElement.style.gridColumnStart = food.x;
	foodElement.classList.add('food');
	board.appendChild(foodElement);
}


// Maon logic start here
musicSound.play();
let hiscore = localStorage.getItem("hiscore");
if(hiscore === null){
    hiscoreval = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
}
else{
    hiscoreval = JSON.parse(hiscore);
    hiscoreBox.innerHTML = "HiScore: " + hiscore;
}
window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
	inputDir = { x: 0, y: 1 };
	moveSound.play();
	switch (e.key) {
		case"ArrowUp":
			console.log("ArrowUp");
			inputDir.x = 0;
			inputDir.y = -1;
			break;
		case"ArrowDown":
			console.log("ArrowDown");
			inputDir.x = 0;
			inputDir.y = 1;
			break;
		case"ArrowLeft":
			console.log("ArrowLeft");
			inputDir.x = -1;
			inputDir.y = 0;
			break;
		case"ArrowRight":
			console.log("ArrowRight");
			inputDir.x = 1;
			inputDir.y = 0;
			break;
		default:
            break;
	}
})

