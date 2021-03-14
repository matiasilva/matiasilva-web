function Drop() {
	this.bucket;
	this.shapes = [];
	this.currentCombo;
	this.inBox = [];
	this.matched;
	this.gamestate = 2;
	this.gameTimer = new GameTimer(this, 800);
	this.score = new ScoreKeeper(this);
	this.progressBar = new ProgressBar(this);
	Drop.prototype.init = function () {
		background(51);
		textSize(64);
		textAlign(LEFT, CENTER);
		World.clear(engine.world);
		this.shapes = [];
		this.bucket = new Bucket();
		this.currentCombo = new Combo(3);
		this.gameTimer.recordedFrame = frameCount;
		this.score.level = 0;
		this.score.finalScore = 0;
		this.gamestate = 1;
		//set prototype functions
	}
	Drop.prototype.reset = function () {
		this.init();
	}
	Drop.prototype.render = function () {
		if (frameCount % 30 === 0) {
			this.newShape(random(width), random(height * 0.4), this.shapes);
		}
		this.bucket.show();
		this.bucket.move(this.bucket.vel);
		for (var i = this.shapes.length - 1; i >= 0; i--) {
			this.shapes[i].show();
			this.shapes[i].update();
			if (this.shapes[i].toDelete) {
				World.remove(engine.world, this.shapes[i].shape);
				this.shapes.splice(i, 1);
			}
		}
		this.currentCombo.show(100);
		matched = this.checkContents();
		if (matched) {
			//increment score
			this.score.finalScore += this.score.multiplier;
			this.score.level++;
			//reset the timer
			this.gameTimer.reset();
			//remove correct shapes
			for (let i of matched) {
				World.remove(engine.world, this.shapes[i].shape);
				this.shapes[i].animate = true;
			}
			this.nextLevel();
		}
		this.gameTimer.check();
		this.progressBar.show();
		this.score.show();
		Engine.update(engine);
	}
	Drop.prototype.gameover = function () {
		this.score.checkData();
		this.score.sortData();
		this.gamestate = 0;
		textAlign(CENTER, CENTER);
	}
	Drop.prototype.lastLevel = function () {
		if (this.score.level > 0) {
			this.score.level--;
			this.nextLevel();
		} else {
			this.gameover();
		}
	}
	Drop.prototype.startGame = function () {
		this.init();
	}
	Drop.prototype.newShape = function (x, y, arr) {
		var guess = Math.random();
		if (guess < 0.35) {
			arr.push(new Shape("tri", {
				x: x,
				y: y
			}));
		} else if (guess > 0.65) {
			arr.push(new Shape("rect", {
				x: x,
				y: y
			}));
		} else {
			arr.push(new Shape("circle", {
				x: x,
				y: y
			}));
		}
	}
	Drop.prototype.nextLevel = function () {
		this.gameTimer.reset();
		this.currentCombo = new Combo(3);
	}
	Drop.prototype.checkContents = function () {
		let count = 0;
		this.inBox = [];
		let valid = [];
		for (let s of this.shapes) {
			let pos = s.shape.position;
			let inXBounds = pos.x > this.bucket.edges[0].vertices[1].x && pos.x < this.bucket.edges[2].vertices[0].x;
			let inYBounds = pos.y > this.bucket.edges[0].vertices[1].y && pos.y < this.bucket.edges[1].vertices[0].y;
			if (inXBounds && inYBounds && !s.animate) {
				this.inBox.push(s);
			}
		}
		var g = this.currentCombo.combo.slice();
		for (var i = this.inBox.length - 1; i >= 0; i--) {
			var index = g.indexOf(this.inBox[i].shape.label);
			if (index >= 0) {
				valid.push(i);
				g.splice(index, 1);
			}
		}
		return valid.length === this.currentCombo.combo.length ? valid : false;
	}
}

function Shape(type, position) {
	this.radius = 5;
	this.toDelete = false;
	this.animate = false;
	this.alpha = 255;
	this.shape;
	if (type === "circle") {
		this.shape = Bodies.circle(position.x, position.y, this.radius * 2, {
			label: "circle"
		});
	} else if (type === "rect") {
		this.shape = Bodies.rectangle(position.x, position.y, this.radius * 4, this.radius * 4, {
			label: "rect"
		});
	} else if (type === "tri") {
		this.shape = Bodies.polygon(position.x, position.y, 3, this.radius * 3, {
			label: "tri"
		});
	}
	World.add(engine.world, this.shape);
	Shape.prototype.show = function () {
		push();
		fill(255, this.alpha);
		noStroke();
		var vertices = this.shape.vertices;
		beginShape();
		for (let s of vertices) {
			vertex(s.x, s.y);
		}
		endShape(CLOSE);
		translate(this.shape.position.x, this.shape.position.y);
		rotate(this.shape.angle);
		pop();
	}
	Shape.prototype.update = function () {
		if (this.shape.position.y > height) {
			this.toDelete = true;
		}
		if (this.animate) {
			this.alpha -= 10;
			if (this.alpha <= 0) {
				this.toDelete = true;
			}
		}
	}
}

function Combo(count) {
	this.combo = [];
	this.vertices = [];
	for (var i = 0; i < count; i++) {
		var guess = Math.random();
		if (guess < 0.35) {
			this.combo.push("tri");
		} else if (guess > 0.65) {
			this.combo.push("circle");
		} else {
			this.combo.push("rect");
		}
	}
	for (var i = 0; i < this.combo.length; i++) {
		if (this.combo[i] == "tri") {
			this.vertices[i] = Bodies.polygon(0, 0, 3, 35)
				.vertices;
		} else if (this.combo[i] == "rect") {
			this.vertices[i] = Bodies.rectangle(0, 0, 60, 60)
				.vertices;
		} else if (this.combo[i] == "circle") {
			this.vertices[i] = Bodies.circle(0, 0, 30)
				.vertices;
		}
	}
	Combo.prototype.show = function (step) {
		push();
		fill(255, 100);
		translate((width - this.vertices.length * step) / 2, height / 2);
		for (let v of this.vertices) {
			translate(step, 0);
			beginShape();
			for (let vert of v) {
				vertex(vert.x, vert.y);
			}
			endShape(CLOSE);
		}
		pop();
	}
}

function Bucket() {
	this.barH = 80;
	this.len = 60;
	this.thick = 10;
	this.middleX = width / 2;
	this.offsetX = (this.thick + this.len) / 2;
	this.edges = [Bodies.rectangle(this.middleX - this.offsetX, height - this.barH / 2, this.thick, this.barH, {
			isStatic: true
		}),
		Bodies.rectangle(this.middleX, height - this.thick / 2, this.len, this.thick, {
			isStatic: true
		}),
		Bodies.rectangle(this.middleX + this.offsetX, height - this.barH / 2, this.thick, this.barH, {
			isStatic: true
		})
	];
	this.vel = {
		x: 0,
		y: 0
	};
	World.add(engine.world, this.edges);
	Bucket.prototype.show = function () {
		fill(255, 0, 100);
		noStroke();
		for (var i = 0; i < this.edges.length; i++) {
			var obj = this.edges[i].vertices;
			beginShape();
			for (var j = 0; j < obj.length; j++) {
				vertex(obj[j].x, obj[j].y);
			}
			endShape(CLOSE);
		}
	}
	Bucket.prototype.move = function (vel) {
		if ((this.edges[2].position.x > width - this.thick) || (this.edges[0].position.x < this.thick)) {
			vel.x *= -1;
		}
		for (var i = 0; i < this.edges.length; i++) {
			Matter.Body.translate(this.edges[i], vel)
		}
	}
}

function GameTimer(dropInstance, timeout) {
	this.nextTime = 800,
		this.recordedFrame = null,
		this.difference = null,
		GameTimer.prototype.check = function () {
			this.difference = (this.recordedFrame + this.nextTime) - frameCount;
			if (this.difference <= 0) {
				//ref.lastLevel();
				dropInstance.gameover();
			}
		};
	GameTimer.prototype.reset = function () {
		this.recordedFrame = frameCount;
	}
}

function ProgressBar(ref) {
	this.height = 24,
		this.show = function () {
			push();
			fill(255, 0, 100);
			rectMode(CORNER);
			rect(0, 0, map(ref.gameTimer.difference, ref.gameTimer.nextTime, 0, width, 0), this.height);
			pop();
		}
}

function ScoreKeeper(dropInstance) {
	this.level = 0;
	this.finalScore = 0;
	this.allScores = null;
	this.topScores = null;
	this.multiplier = 3;
	this.offset = 5;
	this.userName = prompt("Enter your name") || "Anonymous";
	ScoreKeeper.prototype.checkData = function () {
		for (let [name, score] of this.allScores) {
			if (name === this.userName) {
				if (score > this.finalScore) {
					this.pushData(1);
					return null;
				}
			}
		}
		this.pushData(2);
	}
	ScoreKeeper.prototype.pushData = function (state) {
		if (state === 1) {
			firebase.database()
				.ref('scores/' + this.userName + '/' + "lastAccessed")
				.set(day() + '/' + month() + '/' + year() + ' ' + hour() + ':' + minute());
		} else if (state === 2) {
			firebase.database()
				.ref('scores/' + this.userName)
				.set({
					lastAccessed: day() + '/' + month() + '/' + year() + ' ' + hour() + ':' + minute(),
					score: this.finalScore
				});
		}
	}
	ScoreKeeper.prototype.sortData = function () {
		this.topScores = [];
		var limit = 5;
		var index = 0;
		var scoresCopy = this.allScores.slice();
		while (limit > 0) {
			var record = 0;
			var index = 0;
			for (var j = 0; j < scoresCopy.length; j++) {
				var pair = scoresCopy[j];
				if (pair[1] > record) {
					index = j;
					record = pair[1];
				}
			}
			this.topScores.push(scoresCopy[index][0] + ': ' + record);
			scoresCopy[index][1] = -1;
			limit--;
		}
	}
	ScoreKeeper.prototype.show = function () {
		text("  " + this.level, 0, this.offset + dropInstance.progressBar.height + textSize());
	}
}

function Splash(dropInstance) {
	this.b = new Bucket();
	this.shapes = [];
	this.currentIndex = 0;
	this.combo = new Combo(3);
	this.rules = [{
		text: "Use the left & right arrow keys to move the bucket!",
		alpha: 0
	}, {
		text: "Collect the right shapes to solve the combination on screen!",
		alpha: 0
	}, {
		text: "Be quick! Don't let the timer run out before you finish.",
		alpha: 0
	}, {
		text: "The order of shapes does not matter!",
		alpha: 0
	}, {
		text: "Press the space bar to eject shapes from your bucket.",
		alpha: 0
	}, {
		text: "Score multipliers increase as you go on but so does the speed!",
		alpha: 0
	}];
	this.welcome = "Welcome to Gyro!";
	Splash.prototype.show = function () {
		this.b.show();
		textSize(64);
		textAlign(CENTER, CENTER);
		text(this.welcome, width / 2, height * 0.05);
		fill(255, 100);
		text("Press any key to play!", width / 2, height * 0.75);
		for (var i = this.shapes.length - 1; i >= 0; i--) {
			var s = this.shapes[i];
			s.show();
			s.update();
			if (s.toDelete) {
				World.remove(engine.world, s.shape);
				this.shapes.splice(i, 1);
			}
		}
		this.combo.show(100);
		textSize(24);
		textAlign(LEFT);
		for (var i = 0; i < this.rules.length; i++) {
			fill(255, 153, 51, this.rules[i].alpha);
			var h = (height * 0.15) + i * textSize() + i * 20;
			text(this.rules[i].text, width * 0.02, h);
		}
		if (this.currentIndex < this.rules.length) {
			this.rules[this.currentIndex].alpha += 5;
			if (this.rules[this.currentIndex].alpha >= 255) {
				this.currentIndex++;
			}
		}
		Engine.update(engine);
	}
	Splash.prototype.update = function () {
		if (frameCount % 100 === 0) {
			this.combo = new Combo(3);
			dropInstance.newShape(width / 2, height * 0.1, this.shapes);
		}
	}
}
//todo add arguments to functions
//optimize topscores
