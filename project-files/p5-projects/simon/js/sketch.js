// colors = http://www.colourlovers.com/palette/275052/One_Life_Left
let game;
let canvas;
let scorelist;

function setup() {
	canvas = createCanvas(windowWidth, windowHeight);
	scorelist = select('#scorelist');
	scorelist.hide();
	// Initialize Firebase
	var config = {
		apiKey: "AIzaSyAlNws3aUzgGJE9I4C6trLL1I7zvou022g",
		authDomain: "simon-d2798.firebaseapp.com",
		databaseURL: "https://simon-d2798.firebaseio.com",
		projectId: "simon-d2798",
		storageBucket: "simon-d2798.appspot.com",
		messagingSenderId: "227650908781"
	};
	firebase.initializeApp(config);
	game = new Game();
	game.startAnimation();
	let namediv = select('#wrap');
	let nameinput = select('#nameinput');
	nameinput.changed(function () {
		let possiblename = nameinput.value();
		game.startFirst(possiblename.trim());
		let db = firebase.database()
			.ref();
		db.on('child_added', function (snap) {
			let li = document.createElement('li');
			li.innerHTML = snap.key + ': ' + snap.val();
			li.id = snap.key;
			scorelist.elt.appendChild(li);
			if (snap.key === game.username) {
				game.userexists = true;
				game.prevscore = snap.val();
			}
		});
		db.on('child_changed', function (snap) {
			let li = select('#' + snap.key);
			li.html(snap.key + ': ' + snap.val());
		});
		namediv.remove();
	});
}

function draw() {
	game.next();
}

function mouseClicked() {
	if (game.state === 1) {
		if (game.currentLevel.stage === 1) {
			for (let i = 0; i < game.blocks.length; i++) {
				if (game.blocks[i].highlighted) {
					game.currentLevel.recordMove(game.blocks[i], i);
				}
			}
		}
	}
}
class Timer {
	constructor(init, desired) {
		this.then = init;
		this.limit = desired;
	}
	check() {
		return millis() > this.then + this.limit;
	}
}
