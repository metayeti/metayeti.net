\* bzkt-bzkt \*

-- incoming transmission from the future --

This is an older article. It uses some older style JavaScript syntax. One might say, with a vintage flavor. This code will work just fine with modern browsers but for your own projects, you should prefer modern paradigms (for example, use `const` and `let` in your code instead of `var`).

This tutorial is intended for beginners who wish to grasp foundational concepts about JavaScript and game development.

With that out of the way, I hope enjoy the article!

-- transmission end --

---

# Introduction

In this tutorial we will write a simple clone of Snake on the HTML5 platform using JavaScript. I feel writing a Snake clone is good programming practice particularly when learning a new language because it makes you learn to handle the syntax, shuffle around data structures, display graphics and deal with user input, all of which have the capacity to stretch and flex your programming muscles.

Our game won’t look very fancy, but through it we will learn the very basics of developing games using JavaScript. We will not be using any libraries, frameworks or advanced engines for this exercise. Instead, we will code everything from scratch using mostly plain JavaScript.

This tutorial is aimed towards beginners but assumes you already know the basics of HTML, CSS, JavaScript, programming and/or computer wizardry in general. If you feel unsure, [brush up](https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web) before reading on.

I want to point out that writing code is not a linear process where you go from point A to point B in a straight line. Rather, it’s a process of gradually improving your code, crafting layer after layer - kind of like building an onion from the inside out. This tutorial will attempt to reflect a natural style of writing a program, which means that the reader needs to be actively involved in the process as we will be jumping around code quite a bit. Pay close attention to highlighted lines in code snippets throughout the tutorial - they indicate changes or additions to the code.

The links to the full source and a live demo are available at the end of the tutorial.

# Starting out
With that out of the way, let’s make some files. Create a new folder somewhere on your drive and then create 3 blank files inside. Name them:
- index.html
- style.css
- code.js

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

The HTML defines the basic structure of a document that the browser can take in. It also links the three files together and gives us a single [canvas](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API) element to work with. The CSS code defines a border around our canvas element and gives it a gray background. When you’re ready to start the game, simply “run” (doubleclick in file explorer) the HTML file and your browser will start up. This part is just a formality and we won’t really have to look at this code again for the duration of this tutorial. Now - let’s get to to the fun stuff!

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

We will expand this code later - just let it sit there for now. At this point you can play around with console outputs if you’re curious about what we just did. Simply add `console.log(e);` to the keyDown function, load up index.html and then press keys on your keyboard and watch the console output (you can bring the console out by pressing F12 in your browser and then locating the Console tab).

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

Don’t worry about these functions being blank and useless at the moment - we’re only making some design choices for now and we will get to fill these functions with awesome code soon enough. The last of these functions is called `initGame` and we will use it - as the name suggests - for initialization. This will be the first function that gets called in our game, making it the entry point of the program. To actually achieve this, we will need to add another line to the end of the file:

```JS
window.addEventListener('load', initGame);
```


What we’ve done here is we let the browser know to call our `initGame` function immediately after the window has stopped loading - which means that the website is fully loaded and our script is ready to run. Let’s now actually try and write the initialization routine:

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

This part is straightforward enough. In the first line, we fetch our `<canvas>` element by its ID as defined in the HTML. Next, we extract the [rendering context](https://developer.mozilla.org/en/docs/Web/API/CanvasRenderingContext2D) which we will use for draw calls. The third call is a call to the `resetGame` function, which we will use to set a blank state for the game before anything actually happens. Running the game with undefined variables would be a very bad idea indeed! And the final call will run the `startGame` function which will actually be redrawing the screen and running the game timer.

Let’s now expand our `startGame` function:

```JS
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

When called, this function will create a timer using `setInterval()`, whose reference we store in the `timer` variable so we can deactivate it later if we so desire. This interval runs every 200 milliseconds (as given by the second argument to `setInterval()`, and what it executes is contained within the inner (anonymous) function which it calls repeatedly. The inner function first updates one frame of game logic, and then draws those updates out on the screen. The call to `drawGame` in the first line of the `startGame` function ensures that the game is painted before the first update cycle has run. Without this line of code, the game would only become visible after the first update cycle has gone through.

# A word or sixteen about game loops

I feel I need to write down a few things about game loops and requestAnimationFrame at this point. If you’re already familiar with these or you would simply like to get on with the tutorial, feel free to skip this section.

There’s a number of ways to do game loops and when you first start developing games, it can be very intimidating to start writing them. A game loop is basically what holds the game together and makes it run. There are several ways to write a game loop. One is a frame based approach, where you update your game logic with a fixed framerate. Another is a time based approach, where you calculate the time between ticks and update your animation through that. This is helpful if you’re writing something that is absolutely required to run at a certain speed. The real problem with game loops might not be immediately obvious - it is that the logic updates and the drawing updates aren’t necessarily running at the same speed, which can make the act of writing an advanced game loop and then fine tuning your solution a really difficult task.

[window.requestAnimationFrame](https://developer.mozilla.org/en-US/docs/Web/API/Window/requestAnimationFrame) is a function in HTML5 which lets the browser know you’re trying to do fast repaints, and since the browser can use more of the operating system than you can with JavaScript, this is usually the most optimal and recommended way to implement repainting. You can run your game logic through the same routine, although that’s not exactly recommended because your game might run at different speeds on different systems.

The loop we are using for this tutorial is a simplified version of the frame based game loop, where we’re actually updating logic and drawing things one after another once every 200 milliseconds (or 5 frames per second). While not exactly a shiny technical achievement, we can do this simply because the game doesn’t require any intermediate animations - in other words, we only need to display what happens after every frame and not what happens between those frames. This is also why we’re not using requestAnimationFrame in this particular tutorial. It’s just something to keep in mind and shouldn’t concern you if you’re just starting out. If you’re starting out a bigger project, consider using one of the many game engines that already solves game loops for you. Or if you want to learn more about them, your best bet is - experimentation.

# Venturing onward

Let’s add some constants to the code to make our lives easier. This way we will be dealing with English words for common operations, which will make mistakes less likely. Add the following code to the very top of the file:

```JS
// directional constants
var UP = 0;
var DOWN = 1;
var LEFT = 2;
var RIGHT = 3;
```
Now we need to write something in our `resetGame` routine. But what do we need to reset? Well, let’s figure out what we need for a game of Snake. We need something to hold the snake itself and something to hold food blocks. And we also need something that will tell us which direction our snake is facing so we can move it accordingly.

So let’s add some variables to our code. Add the following immediately after the three “main variables” on top of our file:

```JS
// game variables
var snake;
var food;
var direction;
```

Let’s now fill our `resetGame` function with some code:

```JS
function resetGame() {
	// setup game variables
	snake = [[1, 1], [2, 1], [3, 1], [4, 1], [5, 1]];	
	food = [];
	direction = RIGHT;
}
```
We initialized `snake` as an array of arrays. Each inner array holds one cell of the snake, with the first item in the list representing a cell’s x coordinate (horizontal dimension), and the second item representing a cell’s y coordinate (vertical dimension). We built our snake this way for several reasons, most important of which is simplicity. We could - for example - have a big array representing the entire game field instead, and then cross out the cells where our snake is. However, this would make movement difficult to code. Perhaps consider it as a programming challenge. Instead we will use the method where we only keep track of actual positions of the individual snake cells.

We will use the same method to keep track of food, except the individual cells will be disjointed in space that time around. We’ll just initialize `food` to be an empty array for now. Finally, we set a starting `direction` for our snake.

Now we need to figure out how we’re going to paint the game. Add the following code immediately below the “directional constants”:

```JS
// game constants
var COLOR_SNAKE = '#aaa';
var COLOR_FOOD = '#c80';
var CELL_SIZE = 15;
var GRID_W = 20;
var GRID_H = 20;
```

Here, we defined some useful constants for our game. First we definde some colors we’re going to use. We will use gray for the snake, orange will signify food. Secondly, we define the cell size and grid dimensions. In the HTML, We defined our canvas’ size to be 300×300 pixels - 300 divided by 15 is 20, which means we have a 20 by 20 area for our game to play out on.

Now let’s add some code to our `drawGame` function:

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

This function does several things. First, it clears the canvas of anything that was there before. This is important, otherwise we would just be drawing on top of whatever the previous frame drew. Next, it draws the snake one cell at the time. [ctx.fillRect](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/fillRect) takes in 4 arguments - x, y, width and height. To get the cell position in pixels, we simply multiply its x and y positions with the size of the cell respectively, and the width and height are the same as size of the cell. Knowing this, the code above should be easy to understand.

If we now run the game, we should see the following:

![snake1](/content/blog/lets-make-snake-with-javascript/images/snake_01.png)

Now that we have something to work with, we can move on to more interesting things. Proceed to the next page to continue.

--PAGE BREAK--

# Making things go

The snake is being drawn, but it’s not yet alive. Let’s fix that!

At this point, we need to start thinking about user input. Let’s add some keycode constants we’ll be using, which represent the arrow keys on the keyboard. Add this code immediately below the “directional constants”:

```JS
// keycode constants
var KEY_UP = 38;
var KEY_DOWN = 40;
var KEY_LEFT = 37;
var KEY_RIGHT = 39;
```

Now we also need to do something about that empty `keyDown` function. Let’s add some code to it:

```JS {4-17}
function keyDown(e) {
	// fetch the keycode
	var key = e.keyCode || e.which;
	switch (key) {
		case KEY_UP:
			direction = UP;
			break;
		case KEY_DOWN:
			direction = DOWN;
			break;
		case KEY_LEFT:
			direction = LEFT;
			break;
		case KEY_RIGHT:
			direction = RIGHT;
			break;
	}
}
```

Here, we are telling the browser to notify us of any keydown events that might happen. When events of this type happen, we check whether any of the arrow keys have been pressed and then adjust the `direction` variable to the corresponding value using our previously named direction constants. If you wish, you can change this function to check for any keycodes you like (for example if your keyboard lacks arrow keys or you just want a different control layout). To find keycodes, simply do `console.log(key)` and then press the key and check the console output.

Finally, let’s expand our `updateGame` function. We want to achieve movement of the snake, so that it follows the pattern the user wants. If the user presses up, right, and then up again, we want the entire snake to zigzag along that path, while moving further in the last direction the user picked. So how do we do this? Does the programmer need to actually keep track of the cells that make up a snake, and then move every one individually on its path or does there exist a more elegant solution? After some brain-squeezing, we realize that what we could do is this: simply treat every cell in our snake as a static cell, except the last one - the tail one. If we take the last (tail) cell of the snake, and attach it in front of our snake (make it the head) in a given direction, and then repeat this for every frame, our snake’s tail would repeatedly get chopped and put in front of the snake, giving the impression that our snake is moving as a whole! Would this work? You bet. So let’s give it a shot.

Add the following to the `updateGame` function:

```JS
function updateGame() {
	// move the snake
	var head = snake[snake.length - 1]; // the last element is the head
	var next = [head[0], head[1]]; // our next head
	switch (direction) {
		case UP:
			// move the snake along the y axis up
			next[1]--;
			break;
		case DOWN:
			// move the snake along the y axis down
			next[1]++;
			break;
		case LEFT:
			// move the snake along the x axis left
			next[0]--;
			break;
		case RIGHT:
			// move the snake along the x axis right
			next[0]++;
			break;
	}
	// push the new head into the snake
	snake.push(next);
	// cut the tail of the snake
	snake.shift();
}
```

This code may look complicated, but we are really doing quite simple and intuitive things here. We grab the head of the snake, which is represented by the last element of our array. Then we create a new element called `next`, and populate it with the coordinates of the current head. Now, we move this `next` element along an axis, either horizontally or vertically, and either into the negative or into the positive, depending on which direction we’re currently heading towards as decided by a simple switch statement. Then, we push the `next` element into our array, making it the new head (and making the previous head the 2nd element). And finally, we remove the tail of the snake by removing the first element from the array using [Array.shift()](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/shift).



When our timer repeatedly calls the update functions, we should see the snake move along its direction, and we can change this direction using the arrow keys on the keyboard. If we give our program a try now, something like this is what we should be seeing:

![snake2](/content/blog/lets-make-snake-with-javascript/images/snake_02.gif)


# It lives ... roughly

But wait! There’s a problem. Well, there’s several. First of all, we can apparently exit the game area and reappear in the same area if we go back. That’s not what we want. We also seem to be able to change directions so that our snake reverses its way! Just look at this:

![snake3](/content/blog/lets-make-snake-with-javascript/images/snake_03.gif)

I hope you will agree that this is definitely not what we want. It looks awkward and doesn’t play like Snake. Finally, we seem to be able to pass right through ourselves, but we’ll leave this problem for later when we’re dealing with collisions. Right now, let’s fix what we can.

First, let’s tackle the issue of the disappearing snake. What’s happening is that the cells to our snake are allowed to wonder free into whatever value they want, including all the values the player will never be able to see because they’re outside of the playing area. So what do we actually want to do? I think ideally our snake would move along a space which is wrapped in on itself, so that when you exit a border on the right you reappear on the left. How do we achieve this? Let’s look at our `updateGame` function again. We are increasing or decreasing the new head’s x and y values, but we’re not giving any consideration to what happens when we reach the game border with our snake, or when we wonder beyond it.

Let’s change the code so that every time the snake’s head goes beyond the border, it instead reappears on the other side! Change the code in the `updateGame` function to include the following:

```JS {9-10,15-16,21-22,27-28}
function updateGame() {
	// move the snake
	var head = snake[snake.length - 1]; // the last element is the head
	var next = [head[0], head[1]]; // our next head
	switch (direction) {
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
	// push the new head into the snake
	snake.push(next);
	// cut the tail of the snake
	snake.shift();
}
```

When we’re **decreasing** a value along an axis, we are checking if the value has gone past 0, and if so, we set the value to the size of the grid minus one (minus one because the values run from 0 to 19, which makes a total of 20 elements). When we’re **increasing** a value along an axis, we are checking if the value has gone past the size of the grid minus one, and if so we set it to 0. The effect of this code is that the snake’s head can’t leave the game borders anymore, it will always simply reappear on the other side, with other cells following right behind and creating an illusion of continuous movement past the border.

While we’re at it, let’s also fix the issue of the snake running into itself backwards. If we press a direction opposite to the current direction, the snake will reverse the direction and run through its own cells before it starts moving into the other direction again. This is unwanted, so let’s just block user input for when this happens. We won’t allow any changing of the direction into the opposite direction. For this, we’ll need to revisit our `keyDown` function once more. Update the code like so:

```JS {6-8,11-13,16-18,21-23}
function keyDown(e) {
	// fetch the keycode
	var key = e.keyCode || e.which;
	switch (key) {
		case KEY_UP:
			if (direction !== DOWN) {
				direction = UP;
			}
			break;
		case KEY_DOWN:
			if (direction !== UP) {
				direction = DOWN;
			}
			break;
		case KEY_LEFT:
			if (direction !== RIGHT) {
				direction = LEFT;
			}
			break;
		case KEY_RIGHT:
			if (direction !== LEFT) {
				direction = RIGHT;
			}
			break;
	}
}
```

This should do it. With this code in place, only three directions are ever allowed and the opposite direction to whatever the current direction is, is being blocked. Now the snake can’t run over itself in the opposite direction!

With these updates in place, this is what the game should now play like:

<img src="/content/blog/lets-make-snake-with-javascript/images/snake_04.gif" alt="snake4">
<p class="caption">Walls? I can’t see any walls!</p>

--PAGE BREAK--

# Two steps forward, one step back

On the surface, things look fine but the devil is - like always - in the details. If you start playing around with the game at this point and you test user input carefully, you may find there’s still something wrong with our game. We can still reverse our snake to go backwards if we trick our input function. Try running the game and very quickly press up and then left or down and then left. The snake runs over itself backwards! You can do this for any direction by simply tapping one allowed direction and one disallowed direction one after another quick succession. The player can use this bug to do what we thought we already fixed:

![snake5](/content/blog/lets-make-snake-with-javascript/images/snake_05.gif)

Don’t frustrate over it, though - this is what programming is all about! Let’s think about what is going on here. Let’s navigate back to our `keyDown` function again and look at what happens when we press - for example - the left arrow key on the keyboard:

```JS
		case KEY_LEFT:
			if (direction !== RIGHT) {
				direction = LEFT;
			}
			break;
```

When the user presses, “left”, we set direction to “left”, unless the direction is currently set to “right”. In the same fashion, when the user presses “up”, we set the direction to “up” unless the direction is currently set to “down”. If we were naive about testing, we might end up thinking that this makes reversing direction impossible for the user. But remember that our game is running at a fixed framerate, and a pretty slow one at that. This means that the user has time (1/5th of a second) between updates to press any key they desire and possibly trick our game logic into doing something that we don’t want to allow.

Consider the following scenario:
```
1. direction is set to RIGHT
2. the user presses UP
3. since the direction is not DOWN, we change the direction to UP
4. the user presses LEFT
5. since the direction is not RIGHT, we change the direction to LEFT
```

Since the user can perform these actions between two frames of logic, the snake can be coerced into any direction, overriding our carefully coded lock-outs. What can we do to fix this? If we observe our code so far, we notice that we have a single “direction” variable which can be altered by the user by pressing one of the direction keys. This same variable also controls the actual movement of the snake between frames. What we really want is to separate the direction our user picks and the direction our snake is actually heading towards. With that in mind, let’s add another variable to our game, we’ll call it `heading`.

Add the following line to the list of “game variables”.

```JS {5}
// game variables
var snake;
var food;
var direction;
var heading;
```

Now let’s alter our `keyDown` function so that it looks for the direction the snake is heading in when deciding whether or not a direction should be applied. Change the code like so:

```JS {6,11,16,21}
function keyDown(e) {
	// fetch the keycode
	var key = e.keyCode || e.which;
	switch (key) {
		case KEY_UP:
			if (heading !== DOWN) {
				direction = UP;
			}
			break;
		case KEY_DOWN:
			if (heading !== UP) {
				direction = DOWN;
			}
			break;
		case KEY_LEFT:
			if (heading !== RIGHT) {
				direction = LEFT;
			}
			break;
		case KEY_RIGHT:
			if (heading !== LEFT) {
				direction = RIGHT;
			}
			break;
	}
}
```

Next, we’ll take these changes into account in our `updateGame` function. We will change the function so that it sets heading to whatever value direction holds, once per frame:

```JS {5}
function updateGame() {
	// move the snake
	var head = snake[snake.length - 1]; // the last element is the head
	var next = [head[0], head[1]]; // our next head
	heading = direction;
	switch (direction) {
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
	// push the new head into the snake
	snake.push(next);
	// cut the tail of the snake
	snake.shift();
}
```

Let’s also not forget about initializing our new variable. Change the code in `resetGame` to initialize both `heading` and `direction` variables at once:

```JS {5}
function resetGame() {
	// setup game variables
	snake = [[1, 1], [2, 1], [3, 1], [4, 1], [5, 1]];
	food = [];
	heading = direction = RIGHT;
}
```

With these changes in place, the user should now not be able to wiggle any strange pattern into the keyboard to make the snake go in some direction we don’t want it to go. If you now try the game, you will find you are unable to reverse the direction of the snake using the trick we described previously.

You should at all times be very rigorous with bug hunting. When testing your game, always try to push the limits and never just assume that things will roll out how you envision them when you first begin. Bugs are a part of life and the sooner you start coping with them, the better.

At this point, I encourage you to play around with the game and try to find any new bugs or other problems before continuing on to the next section.

# Smooth sailing

If we take a moment to examine our game’s behavior closely at this point, we’ll notice that even with our previous fixes in place, the game behaves in a very robust way, sometimes accepting and other times refusing user commands. For example - as the snake initially moves to the right when you run the game - you press down and right in succession, expecting the snake to zig-zag along the directions you pressed in. However - unless you very carefully time your key inputs to align with the frame rate we are using - the snake only moves downwards and ignores any further commands. This happens because we only consider a single direction per frame. The game is playable, but difficult for the user to actually operate. So how can we improve it and make life easier on the player?

The thing to consider is a [queue](https://en.wikipedia.org/wiki/Queue_(abstract_data_type)) of user inputs. Instead of just ever keeping track of a single direction as given by the user (or initialized at the start of the game), let’s consider a sequence of directions instead, and then take them out one by one in a [first-in, first-out](https://en.wikipedia.org/wiki/FIFO_(computing_and_electronics)) manner while the game plays out.

We’ll need to carefully readjust our code to achieve this. First, let’s make some changes to the `resetGame` function:

```JS {5-6}
function resetGame() {
	// setup game variables
	snake = [[1, 1], [2, 1], [3, 1], [4, 1], [5, 1]];
	food = [];
	heading = RIGHT;
	direction = [];
}
```

From now on, we will treat `direction` as a queue. This means we’ll be pushing items into it and then using [Array.shift()](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/shift) on it to pick out items one by one from the beginning of the array before processing them.

Now we need to implement some new code and alter the `keyDown` function once again. We can’t rely on the `heading` variable anymore like we used to because it only holds the current heading of the snake. For example if the snake is heading right, and the user presses up and then left, we want to be blocking first “left”, then “down” and finally “right”. To achieve this, we will need to determine the last direction the user pushed towards, which will be given by the last element of our queue or if our `direction` queue happens to be empty, we will default back to what our current heading is. We will store this value into a variable named `lastHeading` and then use it to determine whether a move into a certain direction is allowed and if so, push that direction to the end of the queue.

Update the `keyDown` function as follows:

```JS {4-8,11-12,16-17,21-22,26-27}
function keyDown(e) {
	// fetch the keycode
	var key = e.keyCode || e.which;
	var lastHeading;
	if (direction.length > 0)
		lastHeading = direction[direction.length - 1];
	else
		lastHeading = heading;
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
```

If you are like me and you posses a distaste for redundancy in your code, note that you can also use the [ternary condition](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Operators/Conditional_Operator) syntax to rewrite lines 4-8 to something like this:

```JS
var lastHeading = (direction.length > 0)
	? direction[direction.length - 1]
	: heading;
```

Finally, we need to change the `updateGame` function to work correctly with these changes. Edit the function and add code as follows:

```JS {5-8}
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
	// push the new head into the snake
	snake.push(next);
	// cut the tail of the snake
	snake.shift();
}
```

In the above code, we make our game change the `heading` variable once per frame whenever `direction` contains elements. We achieve this by taking the first element off our queue. When the queue is empty, `heading` simply stays unchanged and the snake moves along the last direction used.

When we now test the game, we can see that when we input several commands one after another, the snake in our game will happily follow those orders until it runs out of commands, making the flow of our game smoother and allowing the player to better manuever around corners and tight spots. Hooray!

![snake6](/content/blog/lets-make-snake-with-javascript/images/snake_06.gif)

Optionally we can add the following to the `keyDown` function to limit the number of directions that can be kept in the queue:

```JS {5-6}
function keyDown(e) {
	// fetch the keycode
	var key = e.keyCode || e.which;
	var lastHeading;
	if (direction.length >= 2)
		return;
	...
}
```

It turns out that two directions is all we need in our queue to make the game smoother, as that is about as many maximum key presses you would expect during a single frame lasting 200ms (think about how many times you’re able to press a key on a keyboard in one fifth of a second). Feel free to experiment with your own values.

--PAGE BREAK--

# Tasty orange squares

We’ve improved our game to the point where we can add more features. On the whole, our game right now is looking pretty boring, the snake just wonders around in never-ending and seemingly infinite limbo where nothing interesting ever happens. So let’s change that! We want to add food items which randomly appear on the map and - when bumped into by the snake - make the snake longer. Let’s break this problem into parts and work on every part individually.

Let’s start by adding some code to the `drawGame` function:

```JS {12-17}
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
	ctx.fillStyle = COLOR_FOOD; // set drawing color
	food.forEach(function(cell) {
		var cell_x = cell[0] * CELL_SIZE;
		var cell_y = cell[1] * CELL_SIZE;
		ctx.fillRect(cell_x, cell_y, CELL_SIZE, CELL_SIZE);
	});
}
```

We are doing the exact same thing for food as we did for snake cells. As you can see, the code is nearly identical. When you see code like this you should always consider simplifying it by writing functions you can reuse. Let’s do just that and add a brand new function immediately above the `drawGame` function. We’ll call it `drawCells`:

```JS
function drawCells(cells, color) {
	ctx.fillStyle = color; // set drawing color
	cells.forEach(function(cell) {
		// draw out each individual cell
		var cell_x = cell[0] * CELL_SIZE;
		var cell_y = cell[1] * CELL_SIZE;
		ctx.fillRect(cell_x, cell_y, CELL_SIZE, CELL_SIZE);
	});
}
```

Now we will change the `drawGame` function correspondingly:

```JS {4-6}
function drawGame() {
	// first we need to clear everything currently on canvas
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	// now, let's draw everything
	drawCells(snake, COLOR_SNAKE);
	drawCells(food, COLOR_FOOD);
}
```

As a general rule of thumb, try to always avoid redundancy in code. You don’t need to do obsess and lose sleep over it, just keep it in mind as a good general practice. When you spot repeating code, the light-bulbs in your head should start flickering. Cleaning code like this up makes things easier for your future self or someone else who might be working on your code.

The code to draw food is now in place but we still need to figure out a way to create food items to begin with. Our `food` variable is initialized to an empty list, now let’s find a way to fill it up!

Let’s create a new function, we’ll name it `makeFood`. Add this code immediately above the `updateGame` function:

```JS
function makeFood() {
}
```

Since we want to place food items on screen at random, we will also need a random number generator. For ease of use, let’s make it a function. Add this code immediately above the `makeFood` function:

```JS
function getRandomNum(a, b) {
	return Math.floor(Math.random() * b + a);
}
```

[Math.random()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random) generates a random number in range [0, 1). Our function multiplies this number by b and adds a, and then applies [Math.floor](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Math/floor) to the result. This gives us a random number in range [a, b]. Now we can conveniently use this function when generating random coordinates.

Let’s also add a call to `makeFood` at the end of our `updateGame` routine. Add the two lines to the bottom:

```JS {38-39}
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
	// push the new head into the snake
	snake.push(next);
	// cut the tail of the snake
	snake.shift();
	// generate food
	makeFood();
}
```

Now that we’ve got everything set up, let’s play around with the `makeFood` function. The problem goes as follows. While the game plays out, we want to generate food with random x and y coordinates. At the same time, we don’t want the food to pop up on top of the snake, so let’s make our code exclude all the cells that are currently occupied by the snake. To achieve this, we will loop through all the cells contained in the `snake` list and see if any of them matches our random coordinates. If we find a match, we’ll simply abort the food generation and exit the function, and let it have another go on the following update - since this function will be continuously called, this won’t pose much of a problem and we can always give it a try on the next go. We also want to limit the number of food items, let’s go with 5 for now.

With that in mind, let’s add some code to the `makeFood` function:

```JS
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
	for (var i = 0; i < snake.length; i++) {
		var cell = snake[i];
		if (cell[0] === x && cell[1] === y)
			return;
	}
	// if we reached this point, we can add food to the list
	food.push([x, y]);
}
```

But we may be forgetting something. What if food spawns on top of another food? This may mess up our game logic further down the line, so let’s try and fix this. Learning from our previous encounters with redundant code, let’s add another function immediately above the `makeFood` function and call it `checkCells`:

```JS
function checkCells(x, y, cells) {
	for (var i = 0; i < cells.length; i++) {
		var cell = cells[i];
		if (cell[0] === x && cell[1] === y)
			return i;
	}
	return -1;
}
```

Here, we look for matches between x and y coordinates and any elements within some arbitrary list of `cells` that is given to the function. We then return an index of the item it found on hit, or -1 on miss when we find no items. This will come in useful later.

Let’s now edit the `makeFood` function like so:

```JS {11-16}
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
```

Now we need to deal with the act of the snake actually eating food items on screen. If you run the game right now, you will observe that food items do in fact show up one by one, but the snake simply ignores them and goes right through them. We will need to alter the `updateGame` function so it takes food into account. What we will do is simply check, on each update, whether or not the new head of the snake is touching food. If so, we will dispose of this food and extend the snake by ignoring the final operation of cutting its tail. Let’s code these ideas into `updateGame`:

```JS {36-43}
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
	makeFood();
}
```

The way we coded our `checkCells` function now turned out to be very handy. We use a single variable `ate` to give us information on both whether or not we ate a food item or not, and at which index the item is if we did. We then use [Array.splice()](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/splice) to remove the item from the list. To grow the snake, we simply skip the next part where we remove the tail of the snake from the list in case we’ve eaten. Tink of it like this: whenever `ate` is -1, our snake is roaming around in empty space, so we keep removing the tail to make the snake go. But when we encounter food, `ate` goes to some number greater than -1, in which case we can make the snake grow by not cutting the tail on that single update frame.

We can now test the game and marvel at the snake’s newly gained ability to eat! It should look and play something like this:

<img src="/content/blog/lets-make-snake-with-javascript/images/snake_07.gif" alt="snake7">
<p class="caption">Om nom nom nom</p>

As you can observe, our snake grows as the player eats food. However, food seems to reappear immediately after it is eaten. Also we can observe that at the start of the game the food is generated 5 times in a sequence of frames.

Let’s add some code into our `resetGame` function so that we generate some food items the game begins:

```JS {5-6}
function resetGame() {
	// setup game variables
	snake = [[1, 1], [2, 1], [3, 1], [4, 1], [5, 1]];
	food = [];
	for (var i = 0; i < 5; i++)
		makeFood();
	heading = RIGHT;
	direction = [];
}
```

That fixes the problem of food popping up in sequence at the start of the game. When we now run the game, we’re most likely (that is - unless generation fails) to begin the game with 5 food items randomly placed on screen.

To give the game a more slow paced feeling, we will change the code a bit so that food isn’t generated continuously. We need to tell the computer to only create more food items once in a blue moon. Let’s make a small change to the `updateGame` function:

```JS {45-46}
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
	// push the new head into the snake
	snake.push(next);
	// check if we encountered food
	var ate = checkCells(next[0], next[1], food);
	// if we've eaten, remove the food item we just ate
	if (ate >= 0)
		food.splice(ate, 1);
	// cut the tail of the snake
	if (ate === -1) // skip if we DIDN'T eat this turn
		snake.shift();
	// generate food
	if (getRandomNum(0, 12) === 0)
		makeFood();
}
```

We now only generate more food whenever a randomly generated number in range [0, 12] equals zero. Or in human terms, on every update to our game, we roll a dice that has 13 sides (13 because we include the zero) and see if it rolls 0, and only then create more food.

Our game should now feel more natural to play as food takes some small amount of time to reappear after it is eaten:

![snake8](/content/blog/lets-make-snake-with-javascript/images/snake_08.gif)

Now that we have what appears to almost be a fully playable game, we need to deal with one more nuisance - collision detection. We will code this up in the following section.

--PAGE BREAK--

# Bumpy ride

As you might have noticed if you gave our current creation a good playthrough - when the snake is of solid length, we can easily make it pass right through itself:

![snake9](/content/blog/lets-make-snake-with-javascript/images/snake_09.gif)

We want the game to end when the snake runs into itself. At this point the controls should freeze, the snake should flash a few times to indicate game over and then the game should start from the start. With this simple plan in mind, let’s proceed to lay out the necessary code.

Let’s first add a new color constant that will give us the color the snake will flash with to our list of “game constants” on top of the file:

```JS {4}
// game constants
var COLOR_SNAKE = '#aaa';
var COLOR_FOOD = '#c80';
var COLOR_FLASH = '#fff';
var CELL_SIZE = 15;
var GRID_W = 20;
var GRID_H = 20;
```

Now let’s add a new variable named `flashing` to our list of “game variables”:

```JS {6}
// game variables
var snake;
var food;
var direction;
var heading;
var flashing;
```

Let’s also make sure to initialize the variable within our `resetGame` function:

```JS {9}
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
```

As the game ends, we will use this variable to make the snake flash for a few moments.

We will add another function to our code and name it `endGame`. This function will get called whenever an end game condition is met. Add it immediately above the `resetGame` function:

```JS
function endGame() {
	// clear the game timer
	clearInterval(timer);
	// start the flashing animation
	var flashInterval;
	var count = 0;
	flashing = true; // start with flashing on
	flashInterval = setInterval(function() {
		flashing = !flashing; // alternate flashing
		drawGame(); // update screen
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
```

Note that we cleared the game timer in this step. This effectively means that the logic update and the drawing update both stop, so we need a manual call to `drawGame` while the snake is flashing. In the function we alternate between flashing on and off (true and false) every 400 milliseconds and after this has happened 5 times, we restart the game.

We will also need to alter the `drawGame` function for it to take this new variable into effect:

```JS {5-6}
function drawGame() {
	// first we need to clear everything currently on canvas
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	// now, let's draw the snake
	var snakeColor = (flashing) ? COLOR_FLASH : COLOR_SNAKE;
	drawCells(snake, snakeColor);
	drawCells(food, COLOR_FOOD);
}
```

Now all that’s left to do is to add an end condition. We will do so by once again revisiting the `updateGame` function and adding some code to it:

```JS {34-38}
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
	if (ate === -1) // skip if we DIDN'T eat this turn
		snake.shift();
	// generate food
	if (getRandomNum(0, 12) === 0)
		makeFood();
}
```

Before we make any changes to the list of snake cells, we check if our next move will make us collide with ourselves. If so, we start the end game sequence and return from the function to prevent it from executing any further. At this point, the game freezes and the flashing sequence begins. You might be wondering what happens with keyboard input at this stage of the game. If you guessed that it is still operating even after we stop the main game timer, you would be correct. However, since the game is not taking input into account by updating game logic while the end game sequence is running, combined with the fact that we reset our direction queue on game reset - the user perceives this as if the keyboard commands are simply unresponsive. Since we reset our variables properly, the commands don’t carry on into the next game instance. If we were working on a more polished title, I would recommend a proper keyboard lock-out for the sake of code cleanliness, but for teaching purposes our current approach will do just fine.

# Final product

Our game now plays and feels just like a real game!

![snake10](/content/blog/lets-make-snake-with-javascript/images/snake_10.gif)

We’ve gone through some general hurdles of making a simple game from scratch, we fixed some bugs, we did some testing and some back tracking. In the end we managed to produce a polished and fun Snake clone. If you are new to developing games, this exercise should give you a general insight into the problems you will be facing should you choose to go on and develop more games.

I recommend you don’t stop with what we have coded so far, but go on and code in more stuff and have fun with it! Here are some ideas on how to extend and change the game:

- Replace the color values in CSS and the color constants in code with your own and tune the look of the game to your liking.
- Scoring system. Add a score box that keeps track of current score.
- Highscore system. Extend above functionality to include a list of top 5 scores.
- Multiple food types. Add different types of food that vary in color and score given. Add poison that kills the player or a powerup that extends the snake by multiple cells.
- Change the playfield size and cell sizes.
- Add walls or even multiple levels each with its own layouts.
- Play around with graphics. Draw each cell as 4 squares, or as a circle. Maybe draw a graphical sprite and replace food with cherry icons.
- Think of your own upgrades and code them in. The possibilities are virtually endless!

---

<a href="/content/blog/lets-make-snake-with-javascript/files/snake_in_js.zip" class="save">Download source code</a>

<a href="/content/blog/lets-make-snake-with-javascript/demo/index.html" class="external" target="_blank" rel="noopener noreferrer">Test in your browser</a>

I hope you enjoyed this tutorial and that you learned a thing or two on the way. If you have questions or criticisms feel free to post them in the comment section.