var drop;
var splash;
var Engine = Matter.Engine,
	Render = Matter.Render,
	World = Matter.World,
	Common = Matter.Common,
	Bodies = Matter.Bodies;
// create an engine
var engine = Engine.create();

function setup() {
	createCanvas(windowWidth, windowHeight);
	rectMode(CENTER);
	drop = new Drop();
	splash = new Splash(drop);
	let config = {
		apiKey: "AIzaSyCUVoArp2Wj49SXw_x5YdZKuVQM28eI_lQ",
		authDomain: "drop-beedd.firebaseapp.com",
		databaseURL: "https://drop-beedd.firebaseio.com",
		storageBucket: "drop-beedd.appspot.com",
		messagingSenderId: "552895881917"
	};
	firebase.initializeApp(config);
	firebase.database()
		.ref()
		.on('value', function (data) {
			drop.score.allScores = [];
			var s = data.val().scores;
			for (let n in s) {
				drop.score.allScores.push([n, s[n].score]);
			}
		});
}

function keyReleased() {
	if (keyCode == LEFT_ARROW || keyCode == RIGHT_ARROW) {
		drop.bucket.vel = {
			x: 0,
			y: 0
		}
	} else if (key === ' ' && drop.gamestate === 0) {
		drop.reset();
	}
}

function keyPressed() {
	switch (drop.gamestate) {
		case 0:
			break;
		case 1:
			if (keyCode == LEFT_ARROW) {
				drop.bucket.vel = {
					x: -8,
					y: 0
				}
			} else if (keyCode == RIGHT_ARROW) {
				drop.bucket.vel = {
					x: 8,
					y: 0
				}
			} else if (key === ' ' && drop.inBox.length > 0) {
				var s = drop.inBox.pop();
				var forceMagnitude = 0.03 * s.shape.mass;
				Matter.Body.applyForce(s.shape, s.shape.position, {
					x: (forceMagnitude + Common.random() * forceMagnitude) * Common.choose([1, -1]),
					y: -forceMagnitude + Common.random() * -forceMagnitude
				});
			}
			break;
		case 2:
			drop.startGame();
			break;
	}
}

function draw() {
	background(51);
	switch (drop.gamestate) {
		case 1:
			drop.render();
			break;
		case 0:
			background(255, 0, 100);
			fill(51);
			textSize(32);
			for (let [i, s] of drop.score.topScores.entries()) {
				text(s, width / 2, (height * 0.05) + (i * 42));
			}
			text("Press space to play again!", width / 2, height * 0.75);
			textSize(256);
			text(drop.score.finalScore, width / 2, height * 0.5);
			break;
		case 2:
			background(51);
			splash.show();
			splash.update();
			break;
	}
}
