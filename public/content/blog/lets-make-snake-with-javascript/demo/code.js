/*
 *  Let's make Snake in JavaScript
 *  http://metayeti.net/blog/lets-make-snake-with-javascript
 *
 *  ---
 *
 *  MIT license
 *
 *  Copyright (c) 2017 Danijel Durakovic
 *
 *  Permission is hereby granted, free of charge, to any person obtaining a copy
 *  of this software and associated documentation files (the "Software"), to
 *  deal in the Software without restriction, including without limitation the
 *  rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
 *  sell copies of the Software, and to permit persons to whom the Software is
 *  furnished to do so, subject to the following conditions:
 *
 *  The above copyright notice and this permission notice shall be included in
 *  all copies or substantial portions of the Software.
 *
 *  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 *  FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 *  DEALINGS IN THE SOFTWARE.
 *
 */

// directional constants
var UP = 0;
var DOWN = 1;
var LEFT = 2;
var RIGHT = 3;

// keycode constants
var KEY_UP = 38;
var KEY_DOWN = 40;
var KEY_LEFT = 37;
var KEY_RIGHT = 39;

// game constants
var COLOR_SNAKE = '#aaa';
var COLOR_FOOD = '#c80';
var COLOR_FLASH = '#fff';
var CELL_SIZE = 15;
var GRID_W = 20;
var GRID_H = 20;

// main variables
var canvas; // canvas element
var ctx; // render context
var timer; // main game timer

// game variables
var snake;
var food;
var direction;
var heading;
var flashing;

// keydown event
function keyDown(e) {
	// fetch the keycode
	var key = e.keyCode || e.which;
	var lastHeading = (direction.length > 0)
		? direction[direction.length - 1]
		: heading;
	if (direction.length >= 2)
		return;
	switch (key) {
		case KEY_UP:
			if (lastHeading !== DOWN) {
				direction.push(UP);
			}
			break;
		case KEY_DOWN:
			if (lastHeading !== UP) {
				direction.push(DOWN);
			}
			break;
		case KEY_LEFT:
			if (lastHeading !== RIGHT) {
				direction.push(LEFT);
			}
			break;
		case KEY_RIGHT:
			if (lastHeading !== LEFT) {
				direction.push(RIGHT);
			}
			break;
	}
}
 
window.addEventListener('keydown', keyDown);


// game logic and initialization
function drawCells(cells, color) {
	ctx.fillStyle = color; // set drawing color
	cells.forEach(function(cell) {
		// draw out each individual cell
		var cell_x = cell[0] * CELL_SIZE;
		var cell_y = cell[1] * CELL_SIZE;
		ctx.fillRect(cell_x, cell_y, CELL_SIZE, CELL_SIZE);
	});
}

function drawGame() {
	// first we need to clear everything currently on canvas
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	// now, let's draw everything
	var snakeColor = (flashing) ? COLOR_FLASH : COLOR_SNAKE;
	drawCells(snake, snakeColor);
	drawCells(food, COLOR_FOOD);
}

function getRandomNum(a, b) {
	return Math.floor(Math.random() * b + a);
}

function checkCells(x, y, cells) {
	for (var i = 0; i < cells.length; i++) {
		var cell = cells[i];
		if (cell[0] === x && cell[1] === y)
			return i;
	}
	return -1;
}

function makeFood() {
	// attempt to add food to the play field
	// if the generated coordinates contain the snake, abort	
	if (food.length >= 5)
		return; // disallow more than 5 food items
	// first create some random coordinates
	var x = getRandomNum(0, GRID_W - 1);
	var y = getRandomNum(0, GRID_H - 1);
	// check every cell of the snake for these coordinates
	// and abort if necessary
	if (checkCells(x, y, snake) >= 0)
		return;
	// now check every food cell for these coordinates
	// and abort if necessary - we don't want doubled food
	if (checkCells(x, y, food) >= 0)
		return;
	// if we reached this point, we can add food to the list
	food.push([x, y]);
}

function updateGame() {
	// move the snake
	var head = snake[snake.length - 1]; // the last element is the head
	var next = [head[0], head[1]]; // our next head
	if (direction.length > 0) {
		heading = direction.shift();
	}
	switch (heading) {
		case UP:
			// move the snake along the y axis up
			next[1]--;
			if (next[1] < 0)
				next[1] = GRID_H - 1;
			break;
		case DOWN:
			// move the snake along the y axis down
			next[1]++;
			if (next[1] > GRID_H - 1)
				next[1] = 0;
			break;
		case LEFT:
			// move the snake along the x axis left
			next[0]--;
			if (next[0] < 0)
				next[0] = GRID_W - 1;
			break;
		case RIGHT:
			// move the snake along the x axis right
			next[0]++;
			if (next[0] > GRID_W - 1)
				next[0] = 0;
			break;
	}
	// check for collision with self
	if (checkCells(next[0], next[1], snake) >= 0) {
		endGame();
		return;
	}
	// push the new head into the snake
	snake.push(next);
	// check if we encountered food
	var ate = checkCells(next[0], next[1], food);
	// if we've eaten, remove the food item we just ate
	if (ate >= 0)
		food.splice(ate, 1);
	// cut the tail of the snake
	if (ate === -1) // skip if we ate this turn
		snake.shift();
	// generate food
	if (getRandomNum(0, 12) === 0)
		makeFood();
}
 
function endGame() {
	// clear the game timer
	clearInterval(timer);
	// start the flashing animation
	var flashInterval;
	var count = 0;
	flashing = true; // start with flashing on
	flashInterval = setInterval(function() {
		flashing = !flashing; // alternate flashing
		drawGame(); // update game
		count++;
		if (count > 5) {
			// clear the interval
			clearInterval(flashInterval);
			// reset and restart the game
			resetGame();
			startGame();
		}
	}, 400);
}
 
function resetGame() {
	// setup game variables
	snake = [[1, 1], [2, 1], [3, 1], [4, 1], [5, 1]];	
	food = [];
	for (var i = 0; i < 5; i++)
		makeFood();
	heading = RIGHT;
	direction = [];
	flashing = false;
}
 
function startGame() {
	// draw game state immediately
	drawGame();
	// activate the game timer
	timer = setInterval(function() {
		// run game logic
		updateGame();
		// draw everything
		drawGame();
	}, 200);
}
 
function initGame() {
	// initialize main variables
	canvas = document.getElementById('snake');	
	ctx = canvas.getContext('2d');
	// initialize game variables
	resetGame();
	// we can now start the game
	startGame();
}

window.addEventListener('load', initGame);
