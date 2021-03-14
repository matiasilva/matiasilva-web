class Game {
	constructor() {
		strokeWeight(8);
		this.blocks = [];
		this.difficulty = 1;
		this.currentLevel;
		this.score = 0;
		this.state = 0;
		this.userexists = false;
		this.currentBlock;
		this.previousBlock;
		this.username = "";
		this.prevscore = 0;
		this.selectDuration = 1000;
		this.waitDuration = 500;
		this.blockspaceX = width * 0.75;
		this.emptyspaceX = width - this.blockspaceX;
		this.blockspaceY = height * 0.75;
		this.emptyspaceY = height - this.blockspaceY;
		this.blocksize = this.blockspaceY > this.blockspaceX ? this.blockspaceX * 0.5 : this.blockspaceY * 0.5;
		this.colors = [
			[ //blue
				[112, 128, 152],
				[152, 176, 192],
				[89, 103, 124]
			],
			[ //orange
				[248, 168, 104],
				[250, 187, 136],
				[246, 149, 72]
			],
			[ //red
				[240, 88, 104],
				[243, 119, 132],
				[237, 57, 76]
			],
			[ // green
				[64, 128, 96],
				[75, 151, 113],
				[47, 94, 71]
			]
		]
	}
	startAnimation() {
		this.state = 0;
		let minimumnumber = floor(random(3, 5));
		let maximumnumber = floor(random(6, 9));
		let spacebetweenblocks = 50;
		let spacebetweenblocksX;
		let spacebetweenblocksY;
		let vertorhoriz = width > height;
		let blocksperrow = vertorhoriz ? minimumnumber : maximumnumber;
		let blockspercolumn = vertorhoriz ? maximumnumber : minimumnumber;
		let blocksize = vertorhoriz ? (height - ((blocksperrow + 1) * spacebetweenblocks)) / blocksperrow : (width - ((blockspercolumn + 1) * spacebetweenblocks)) / blockspercolumn;
		spacebetweenblocksX = vertorhoriz ? (width - (blocksize * blockspercolumn)) / (blockspercolumn + 1) : spacebetweenblocks;
		spacebetweenblocksY = vertorhoriz ? spacebetweenblocks : (height - (blocksize * blocksperrow)) / (blocksperrow + 1);
		for (let row = 1; row <= blocksperrow; row++) {
			for (let column = 1; column <= blockspercolumn; column++) {
				let col = random(this.colors);
				this.blocks.push(new Simon(col[0], col[1], col[2], blocksize, {
					x: column * spacebetweenblocksX + ((column - 1) * blocksize),
					y: row * spacebetweenblocksY + ((row - 1) * blocksize)
				}));
			}
		}
		this.currentBlock = random(this.blocks);
	}
	startFirst(name) {
		this.username = name;
		this.state = 1;
		this.createBlocks();
		this.start();
	}
	createBlocks() {
		this.blocks = [];
		this.blocks.push(new Simon(this.colors[0][0], this.colors[0][1], this.colors[0][2], this.blocksize, this.findPosition(0)))
		this.blocks.push(new Simon(this.colors[1][0], this.colors[1][1], this.colors[1][2], this.blocksize, this.findPosition(1)))
		this.blocks.push(new Simon(this.colors[2][0], this.colors[2][1], this.colors[2][2], this.blocksize, this.findPosition(2)))
		this.blocks.push(new Simon(this.colors[3][0], this.colors[3][1], this.colors[3][2], this.blocksize, this.findPosition(3)))
	}
	start() {
		for (let b of this.blocks) {
			b.deselect();
		}
		this.currentLevel = this.generateLevel(4 * this.difficulty);
		this.currentLevel.next();
	}
	next() {
		switch (this.state) {
			case 0:
				background(245);
				if (frameCount % 25 === 0) {
					if (this.previousBlock) this.previousBlock.deselect();
					this.currentBlock = random(this.blocks);
					this.previousBlock = this.currentBlock;
				}
				this.currentBlock.select();
				for (let b of this.blocks) {
					b.show();
					b.anim();
				}
				break;
			case 1:
				background(245);
				for (let b of this.blocks) {
					b.show();
					b.over();
				}
				this.currentLevel.check();
				break;
			case 2:
				break;
		}
	}
	generateLevel(num) {
		let level = [];
		for (let i = 0; i < num; i++) {
			level.push(floor(random(0, num)));
		}
		return new Level(level);
	}
	startAfterLoss() {
		this.state = 1;
		this.score = 0;
		this.start();
	}
	findPosition(order) {
		this.emptyspaceX = width - (this.blocksize * 2) //compensate chosen block size
		this.emptyspaceY = height - (this.blocksize * 2)
		let sideBound = (this.emptyspaceX * 0.75) / 2;
		let innerHBound = this.emptyspaceX * 0.25;
		let topBound = (this.emptyspaceY * 0.75) / 2;
		let innerVBound = this.emptyspaceY * 0.25;
		switch (order) {
			case 0:
				return {
					x: sideBound,
					y: topBound
				}
				break;
			case 1:
				return {
					x: sideBound + this.blocksize + innerHBound,
					y: topBound
				}
				break;
			case 2:
				return {
					x: sideBound,
					y: topBound + this.blocksize + innerVBound
				}
				break;
			case 3:
				return {
					x: sideBound + this.blocksize + innerHBound,
					y: topBound + this.blocksize + innerVBound
				}
				break;
		}
	}
}
class Level {
	constructor(l) {
		this.level = l;
		this.steps = this.level.length;
		this.index = 0;
		this.timer;
		this.selectedBlock;
		this.justfinished = false;
		this.stage = 0;
		this.guesses = [];
	}
	next() {
		if (this.justfinished) {
			this.index++;
			game.blocks[this.level[this.index - 1]].deselect();
			this.timer = new Timer(millis(), game.waitDuration);
			if (this.index === this.steps) {
				this.stage = 1;
				this.timer = undefined;
			}
		} else {
			this.timer = new Timer(millis(), game.selectDuration);
			game.blocks[this.level[this.index]].select();
		}
	}
	check() {
		switch (this.stage) {
			case 0:
				if (this.timer.check()) {
					this.justfinished = !this.justfinished;
					this.next();
				}
				break;
			case 1:
				if (this.timer) {
					if (this.timer.check()) {
						this.selectedBlock.shrink();
						if (this.guesses.length >= this.steps) {
							let level = this.level;
							let correct = this.guesses.every(function (element, index) {
								return element === level[index];
							});
							if (correct) {
								game.score += this.steps;
								game.start();
							} else { // end of game
								game.state = 2;
								canvas.hide();
								scorelist.show();
								let restartbutton = createButton("Let me try again!");
								restartbutton.mousePressed(function () {
									scorelist.hide();
									canvas.show();
									game.startAfterLoss();
									this.remove();
								});
								let db = firebase.database()
									.ref();
								if (game.username) {
									if (game.userexists) {
										if (game.score > game.prevscore) db.child(game.username)
											.set(game.score);
									} else {
										db.child(game.username)
											.set(game.score);
									}
								}
							}
						}
						this.timer = undefined;
					}
				}
				break;
		}
	}
	recordMove(block, order) {
		this.guesses.push(order);
		this.selectedBlock = block;
		this.selectedBlock.grow();
		this.timer = new Timer(millis(), 250);
	}
}
