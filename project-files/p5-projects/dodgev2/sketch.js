var badGuys = [];
var heptagons = [];
var firework;
var player;
var bubble;
var factor = 1;
var gamemode = 4;
var score = 0;
var coins = [];

function setup() {
	createCanvas(windowWidth, windowHeight);
	loadImage("geo.png", function(splash) {
		imageMode(CENTER);
		image(splash, width / 2, height / 2, width, height);
	}, console.log("error"));
	player = new Player(width / 2, 40);
}
function draw() {
	switch (gamemode) {
		case 1:
			noStroke();
			background(236, 240, 241);
			player.show();
			player.update();
			if (firework && score >= 5) {
				firework.show();
				firework.update();
			} else {
				firework = null;
			}
			noStroke();
			if (bubble) {
				bubble.show();
			}
			if (frameCount % 100 === 0) {
				factor += 0.025;
				coins.push(new Coin(random(width), -10, 10, 2.8, 0, 3));
			}
			for (var i = coins.length - 1; i >= 0; i--) {
				coins[i].show();
				coins[i].update();
				player.touching(coins[i]);
				if (coins[i].offscreen) {
					coins.splice(i, 1);
				}
			}
			fill(41, 128, 185);
			for (var i = badGuys.length - 1; i >= 0; i--) {
				badGuys[i].show();
				badGuys[i].update();
				player.touching(badGuys[i]);
				if (firework) {
					firework.touching(badGuys[i])
				}
				if (bubble) {
					bubble.touching(badGuys[i]);
				}
				if (badGuys[i].offscreen) {
					badGuys.splice(i, 1);
				}
			}
			fill(70, 137, 102);
			for (var i = heptagons.length - 1; i >= 0; i--) {
				heptagons[i].show();
				heptagons[i].update();
				if (heptagons[i].delete) {
					heptagons.splice(i, 1);
				}
			}
			if (player.killed) {
				endGame();
			}
			textSize(64);
			textAlign(RIGHT);
			fill(51);
			text(score + "   ", width, height - 50);
			break;
		case 2:
			textSize(128);
			textAlign(CENTER);
			fill(51);
			text("GAME OVER!", width / 2, height / 2);
			break;
	}

}

function startGame() {
	gamemode = 1;
	setTimeout(addEnemy, 300);
	setTimeout(addHeptagon, 100 / factor);
	setTimeout(addDiagonalEnemy, 10000/factor);
}

function keyPressed() {
	if (key === ' ' && gamemode === 2) {
		reset();
	} else if (key === ' ' && gamemode === 1) {
		if (score >= 500 && gamemode === 1) {
			score -= 500;
			bubble = new Bubble();
			setTimeout(function() {
				bubble = undefined;
			}, 2500);
		}
	} else if (gamemode === 4) {
		startGame();
	}
}

function reset() {
	badGuys = [];
	coins = [];
	heptagons = [];
	score = 0;
	factor = 1;
	firework = null;
	player = new Player(width / 2, 40);
	gamemode = 1;
}

function mousePressed() {
	if (gamemode === 1 && score > 6) {
		print("new firework");
		firework = new Firework(new p5.Vector(0, 0.2), player);
		score -= 10;
	}
}

function mouseReleased() {
	if (gamemode === 1) {
		firework = null;
	}
}

function endGame() {
	gamemode = 2;
}

function addEnemy() {
	badGuys.push(new BadGuy(random(width), -10, 30, 30, 0, random((3 * factor - factor), (3 * factor + factor))));
	setTimeout(addEnemy, 350 / factor);
}

function addHeptagon() {
	heptagons.push(new Heptagon(random(width), -10, 0, 3, 17));
	setTimeout(addHeptagon, 1000 / factor);
}

function addDiagonalEnemy(){
	var v1 = createVector(random(width), 0);
	var v2 = createVector(0,0);
	v2.add(player.position);
	var finalV = v2.sub(v1);
	badGuys.push(new BadGuy(v1.x, v1.y, 30, 30, finalV.x/75, finalV.y/75));
	setTimeout(addDiagonalEnemy, 2000/factor);
}
//improvements
//implement pythagoras in touching algorithm
