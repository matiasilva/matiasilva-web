var player;
var state = 0;
var maze;
var drawColor;
var canvas;
var interval;
var lastBlinked = false;
var currentMaze;
var timerInterval;
var time = 0;

function setElements() {
	timerInterval = setInterval(function () {
		time++;
	}, 100);
}

function setup() {
	canvas = createCanvas(600, 600);
	canvas.parent('container');
	canvas.mousePressed(pickColor);
	setElements();
	strokeWeight(1);
	player = new Player(createVector());
	drawColor = {
		"background": color(255),
		"stroke": color(0),
		"border": color(255, 0, 0),
		"player": color(255)
	};
	currentMaze = {
		"width": 100
	}
	maze = MazeFactory.generateMaze(currentMaze.width);
	pickColor();
	print("maze generated");
	interval = setInterval(blink, 500);
}

function draw() {
	switch (state) {
		case 0:
			background(drawColor.background);
			if (!lastBlinked) {
				fill(0);
				noStroke();
				rect(maze[maze.length - 1].c * currentMaze.width, maze[maze.length - 1].r * currentMaze.width, currentMaze.width, currentMaze.width);
			}
			noStroke();
			fill(drawColor.player);
			player.show();
			player.check();
			stroke(drawColor.stroke);
			for (var i = 0; i < maze.length; i++) {
				maze[i].show();
			}
			break;
		case 1:
			background(0, 255, 0);
			textAlign(CENTER);
			textSize(32);
			fill(0);
			noStroke();
			text("CONGRATULATIONS!", width / 2, height / 2);
			setTimeout(nextLevel, 2000);
			state = 2;
			break;
	}
}

function blink() {
	lastBlinked = !lastBlinked;
}

function drawBorder() {
	stroke(drawColor.border);
	line(0, 0, width, 0);
	line(0, 0, 0, height);
	line(width, 0, width, height);
	line(width, height, 0, height);
}

function keyPressed() {
	move();
}

function nextLevel(){
	currentMaze.width /=2;
	maze = MazeFactory.generateMaze(currentMaze.width);
	player = new Player(createVector());
	time = 0;
	state = 0;
}

function move() {
	var c = maze[MazeFactory.index(player.position.y, player.position.x)];
	if (keyCode == UP_ARROW && player.position.y > 0 && !c.walls[0]) {
		player.history.push(player.position.copy());
		player.position.y -= 1;
	} else if (keyCode == LEFT_ARROW && player.position.x > 0 && !c.walls[3]) {
		player.history.push(player.position.copy());
		player.position.x -= 1;
	} else if (keyCode == DOWN_ARROW && player.position.y < height && !c.walls[2]) {
		player.history.push(player.position.copy());
		player.position.y += 1;
	} else if (keyCode == RIGHT_ARROW && player.position.x < width && !c.walls[1]) {
		player.history.push(player.position.copy());
		player.position.x += 1;
	}
}

function pickColor() {
	drawColor.background = color(floor(random(256)), floor(random(256)), floor(random(256)));
	drawColor.stroke = color(floor(random(256)), floor(random(256)), floor(random(256)));
}
