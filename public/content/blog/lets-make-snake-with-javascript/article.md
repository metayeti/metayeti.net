This is an older article and uses some older style JavaScript syntax. One might say, with a vintage flavor. The code will work just fine with modern browsers, but don't reference it for your projects - prefer modern paradigms (for example, you should use `let` in your code instead of `var`). This article is for study and learning only.

This tutorial is geared towards beginners who wish to grasp foundational concepts about JavaScript and game development.

With that out of the way, enjoy the article!

---

# Introduction

In this tutorial we will write a simple clone of Snake on the HTML5 platform using JavaScript. I feel writing a Snake clone is good programming practice particularly when learning a new language because it makes you learn to handle the syntax, shuffle around data structures, display graphics and deal with user input, all of which have the capacity to stretch and flex your programming muscles.

Our game won’t look very fancy, but through it we will learn the very basics of developing games using JavaScript. We will not be using any libraries, frameworks or advanced engines for this exercise. Instead, we will code everything from scratch using mostly plain JavaScript.

This tutorial is aimed towards beginners but assumes you already know the basics of HTML, CSS, JavaScript, programming and/or computer wizardry in general. If you feel unsure, [brush up](https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web) before reading on.

I want to point out that writing code is not a linear process where you go from point A to point B in a straight line. Rather, it’s a process of gradually improving your code, crafting layer after layer – kind of like building an onion from the inside out. This tutorial will attempt to reflect a natural style of writing a program, which means that the reader needs to be actively involved in the process as we will be jumping around code quite a bit. Pay close attention to highlighted lines in code snippets throughout the tutorial – they indicate changes or additions to the code.

The links to the full source and a live demo are available at the end of the tutorial.

# Starting out
With that out of the way, let’s make some files. Create a new folder somewhere on your drive and then create 3 blank files inside. Name them:
– index.html
– style.css
– code.js

Now load up your favorite text editor and put this code into index.html:

```HTML
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<title>Snake</title>
	<link rel="stylesheet" href="style.css">
</head>
<body>
	<canvas id="snake" width="300" height="300"></canvas>
	<script src="code.js"></script>
</body>
</html>
```

And this code into style.css:
```CSS
#snake {
	border: 15px solid #888;
	background-color: #444;
}
```

The HTML defines the basic structure of a document that the browser can take in. It also links the three files together and gives us a single canvas element to work with. The CSS code defines a border around our canvas element and gives it a gray background. When you’re ready to start the game, simply “run” (doubleclick in file explorer) the HTML file and your browser will start up. This part is just a formality and we won’t really have to look at this code again for the duration of this tutorial. Now – let’s get to to the fun stuff!

# Enter JavaScript
As you have probably correctly guessed by now, we will use code.js to store our code.

Let’s start by adding some variables to our file:

```JS
// main variables
var canvas; // canvas element
var ctx; // render context
var timer; // main game timer
```

We will need these for the innermost part of our code, which is going to be dealing with initialization and the game’s main loop. In the meanwhile, let’s register a keydown event. Add this code to the end of the file:

```JS
// keydown event
function keyDown(e) {
	// fetch the keycode
	var key = e.keyCode || e.which;
}
 
window.addEventListener('keydown', keyDown);
```

We will expand this code later – just let it sit there for now. At this point you can play around with console outputs if you’re curious about what we just did. Simply add console.log(e); to the keyDown function, load up index.html and then press keys on your keyboard and watch the console output (you can bring the console out by pressing F12 in your browser and then locating the Console tab).

Now let’s add some functions. Add this code to the end of the file:

```JS
// game logic and initialization
function drawGame() {
}
 
function updateGame() {
}
 
function resetGame() {
}
 
function startGame() {
}
 
function initGame() {
}
```

Don’t worry about these functions being blank and useless at the moment – we’re only making some design choices for now and we will get to fill these functions with awesome code soon enough. The last of these functions is called initGame and we will use it – as the name suggests – for initialization. This will be the first function that gets called in our game, making it the entry point of the program. To actually achieve this, we will need to add another line to the end of the file:

```JS
window.addEventListener('load', initGame);
```


What we’ve done here is we let the browser know to call our initGame function immediately after the window has stopped loading – which means that the website is fully loaded and our script is ready to run. Let’s now actually try and write the initialization routine:

```JS
function initGame() {
	// initialize main variables
	canvas = document.getElementById('snake');	
	ctx = canvas.getContext('2d');
	// initialize game variables
	resetGame();
	// we can now start the game
	startGame();
}
```

This part is straightforward enough. In the first line, we fetch our `<canvas>` element by its ID as defined in the HTML. Next, we extract the rendering context which we will use for draw calls. The third call is a call to the resetGame function, which we will use to set a blank state for the game before anything actually happens. Running the game with undefined variables would be a very bad idea indeed! And the final call will run the startGame function which will actually be redrawing the screen and running the game timer.

Let’s now expand our startGame function:

```JS {1,4-6,11}
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
```

When called, this function will create a timer using setInterval(), whose reference we store in the timer variable so we can deactivate it later if we so desire. This interval runs every 200 milliseconds (as given by the second argument to setInterval(), and what it executes is contained within the inner (anonymous) function which it calls repeatedly. The inner function first updates one frame of game logic, and then draws those updates out on the screen. The call to drawGame in the first line of the startGame function ensures that the game is painted before the first update cycle has run. Without this line of code, the game would only become visible after the first update cycle has gone through.

# A word or sixteen about game loops

I feel I need to write down a few things about game loops and requestAnimationFrame at this point. If you’re already familiar with these or you would simply like to get on with the tutorial, feel free to skip this section.

There’s a number of ways to do game loops and when you first start developing games, it can be very intimidating to start writing them. A game loop is basically what holds the game together and makes it run. There are several ways to write a game loop. One is a frame based approach, where you update your game logic with a fixed framerate. Another is a time based approach, where you calculate the time between ticks and update your animation through that. This is helpful if you’re writing something that is absolutely required to run at a certain speed. The real problem with game loops might not be immediately obvious – it is that the logic updates and the drawing updates aren’t necessarily running at the same speed, which can make the act of writing an advanced game loop and then fine tuning your solution a really difficult task.

[window.requestAnimationFrame](https://developer.mozilla.org/en-US/docs/Web/API/Window/requestAnimationFrame) is a function in HTML5 which lets the browser know you’re trying to do fast repaints, and since the browser can use more of the operating system than you can with JavaScript, this is usually the most optimal and recommended way to implement repainting. You can run your game logic through the same routine, although that’s not exactly recommended because your game might run at different speeds on different systems.

The loop we are using for this tutorial is a simplified version of the frame based game loop, where we’re actually updating logic and drawing things one after another once every 200 milliseconds (or 5 frames per second). While not exactly a shiny technical achievement, we can do this simply because the game doesn’t require any intermediate animations – in other words, we only need to display what happens after every frame and not what happens between those frames. This is also why we’re not using requestAnimationFrame in this particular tutorial. It’s just something to keep in mind and shouldn’t concern you if you’re just starting out. If you’re starting out a bigger project, consider using one of the many game engines that already solves game loops for you. Or if you want to learn more about them, your best bet is – experimentation.

# Venturing onward

Let’s add some constants to the code to make our lives easier. This way we will be dealing with English words for common operations, which will make mistakes less likely. Add the following code to the very top of the file:

```JS
// directional constants
var UP = 0;
var DOWN = 1;
var LEFT = 2;
var RIGHT = 3;
```
Now we need to write something in our resetGame routine. But what do we need to reset? Well, let’s figure out what we need for a game of Snake. We need something to hold the snake itself and something to hold food blocks. And we also need something that will tell us which direction our snake is facing so we can move it accordingly.

So let’s add some variables to our code. Add the following immediately after the three “main variables” on top of our file:

```JS
// game variables
var snake;
var food;
var direction;
```

Let’s now fill our resetGame function with some code:

```JS
function resetGame() {
	// setup game variables
	snake = [[1, 1], [2, 1], [3, 1], [4, 1], [5, 1]];	
	food = [];
	direction = RIGHT;
}
```
We initialized snake as an array of arrays. Each inner array holds one cell of the snake, with the first item in the list representing a cell’s x coordinate (horizontal dimension), and the second item representing a cell’s y coordinate (vertical dimension). We built our snake this way for several reasons, most important of which is simplicity. We could – for example – have a big array representing the entire game field instead, and then cross out the cells where our snake is. However, this would make movement difficult to code. Perhaps consider it as a programming challenge. Instead we will use the method where we only keep track of actual positions of the individual snake cells.

We will use the same method to keep track of food, except the individual cells will be disjointed in space that time around. We’ll just initialize food to be an empty array for now. Finally, we set a starting direction for our snake.

Now we need to figure out how we’re going to paint the game. Add the following code immediately below the “directional constants”:

```JS
// game constants
var COLOR_SNAKE = '#aaa';
var COLOR_FOOD = '#c80';
var CELL_SIZE = 15;
var GRID_W = 20;
var GRID_H = 20;
```

Here, we defined some useful constants for our game. First we definde some colors we’re going to use. We will use gray for the snake, orange will signify food. Secondly, we define the cell size and grid dimensions. In the HTML, We defined our canvas’ size to be 300×300 pixels – 300 divided by 15 is 20, which means we have a 20 by 20 area for our game to play out on.

Now let’s add some code to our drawGame function:

```JS
function drawGame() {
	// first we need to clear everything currently on canvas
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	// now, let's draw the snake
	ctx.fillStyle = COLOR_SNAKE; // set drawing color
	snake.forEach(function(cell) {
		// draw out each individual cell
		var cell_x = cell[0] * CELL_SIZE;
		var cell_y = cell[1] * CELL_SIZE;
		ctx.fillRect(cell_x, cell_y, CELL_SIZE, CELL_SIZE);
	});
}
```

This function does several things. First, it clears the canvas of anything that was there before. This is important, otherwise we would just be drawing on top of whatever the previous frame drew. Next, it draws the snake one cell at the time. ctx.fillRect takes in 4 arguments – x, y, width and height. To get the cell position in pixels, we simply multiply its x and y positions with the size of the cell respectively, and the width and height are the same as size of the cell. Knowing this, the code above should be easy to understand.

If we now run the game, we should see the following:



Now that we have something to work with, we can move on to more interesting things. Proceed to the next page to continue.

--PAGE BREAK--

