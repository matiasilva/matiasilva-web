var score = 0;
let level = 0;
let state = 2;
let fields = [];
let currentIndex;
let plats = [];
var completes = 0;
let ball;
var gravity;
let enemies = [];
let songs = {
	fail: null,
	touch: null,
	background: null
}
var scores;
var database;
var name;

function preload() {
	songs.fail = loadSound("fail.mp3");
//	songs.background = loadSound("song.mp3");
	songs.touch = loadSound("touch.mp3");
}

function setup() {
	createCanvas(windowWidth, windowHeight);
	var config = {
		apiKey: "AIzaSyD11GI686RXRWeW2SP_Sp0jHo5vwVDeYHo",
		authDomain: "magneto-711ff.firebaseapp.com",
		databaseURL: "https://magneto-711ff.firebaseio.com",
		storageBucket: "magneto-711ff.appspot.com",
		messagingSenderId: "958684402576"
	};
	firebase.initializeApp(config);
	database = firebase.database()
		.ref();
	database.on('value', function (data) {
		scores = data.val()
			.scores;
	}, console.log('error'));
	ball = new Ball(20, 20);
	gravity = createVector(0, 0.08);
	//songs.background.loop();
	//songs.background.amp(0.1);
	noStroke();
	startGame();
}

function optimizeData(obj) {
	if (scores) {
		let keys = Object.keys(scores);
		for (var i = 0; i < keys.length; i++) {
			if (obj.name === keys[i]) {
				if (obj.score > scores[keys[i]]) {
					firebase.database()
						.ref("scores/" + keys[i])
						.set(obj.score);
					return true;
				} else {
					return false;
				}
			}
		}
	}
	firebase.database()
		.ref("scores/" + obj.name)
		.set(obj.score);
	return false;
}

function draw() {
	switch (state) {
		case 1:
			background(225);
			if (frameCount % 100 === 0) {
				add("enemy");
			}
			for (var i = 0; i < fields.length; i++) {
				ball.still = false;
				fields[i].show();
				let stg = fields[i].attract(ball);
				ball.applyForce(stg);
			}
			ball.show();
			ball.update();
			for (var i = 0; i < enemies.length; i++) {
				enemies[i].show();
				enemies[i].update();
				enemies[i].touching(ball);
				if (enemies[i].toDelete) {
					enemies.splice(i, 1);
				}
			}
			for (var i = 0; i < plats.length; i++) {
				plats[i].show();
				plats[i].touching(ball);
			}
			if (completes === plats.length) {
				score += completes;
				completes = 0;
				setTimeout(nextLevel, 250);
			}
			displayText();
			break;
		case 2:
			background(220);
			fill(51);
			break;
	}
}

function displayText() {
	fill(35, 126, 100);
	textAlign(RIGHT);
	textSize(128);
	text(score + ' ', width, 128);
}

function restartLevel() {
	completes = 0;
	ball = new Ball(20, 20);
	for (var i = 0; i < plats.length; i++) {
		plats[i].completed = false;
	}
}

function keyPressed() {
	if (state === 2) {
		startGame();
	}
}

function nextLevel() {
	level++;
	ball = new Ball(20, 20);
	createPlatforms();
	if (!name) {
		name = prompt('Insert your name (please keep this appropriate for scores)')
			.toLowerCase();
	}
	if (name || name != "") {
		optimizeData({
			"name": name,
			"score": score
		});
	}
}

function startGame() {
	nextLevel();
	state = 1;
}

function createPlatforms() {
	plats = [];
	let n = level + 1;
	let X = 0;
	let gaps = [];
	let step = width / n;
	for (var i = 0; i < width; i += step) {
		gaps.push([i, i + step]);
	}
	for (var i = 0; i < gaps.length; i++) {
		gaps[i][1] -= random(step * (random(0.5, 0.95)));
	}
	for (var i = 0; i < gaps.length; i++) {
		let platH = random(height * 0.1, height * 0.95);
		X = gaps[i][0];
		let platW = gaps[i][1] - gaps[i][0];
		plats.push(new Platform(platW, platH, X));
	}
}

function mousePressed() {
	fields.push(new Field(mouseX, mouseY));
	currentIndex = fields.length - 1;
}

function mouseDragged() {
	fields[currentIndex].expand();
}

function mouseReleased() {
	if (fields.length > 0) {
		fields.splice(0, 1);
	}
}

function add(type) {
	if (type === "enemy") {
		let xTemp;
		let yTemp;
		xTemp = random() < 0.5 ? 0 : width;
		yTemp = random(height);
		var enemy = new Enemy(xTemp, yTemp);
		enemy.findAngle();
		enemies.push(enemy);
	}
}
