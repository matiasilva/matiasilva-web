class Simon {
	constructor(c, s, h, size, position) {
		this.normal = c;
		this.color = this.normal;
		this.stroke = s;
		this.hover = h;
		this.realsize = size;
		this.size = this.realsize;
		this.highlighted = false;
		this.normalp = position;
		this.position = {
			x: position.x,
			y: position.y
		};
		this.selected = false;
		this.width = this.position.x + this.size;
		this.height = this.position.y + this.size;
	}
	show() {
		fill(this.color[0], this.color[1], this.color[2]);
		stroke(this.stroke[0], this.stroke[1], this.stroke[2]);
		rect(this.position.x, this.position.y, this.size, this.size);
		if (this.selected) {
			noStroke();
			fill(0);
			ellipse(this.position.x + this.size / 2, this.position.y + this.size / 2, this.size * 0.25, this.size * 0.25);
		}
	}
	over() {
		if (game.currentLevel.stage === 1) {
			this.color = this.normal;
			this.highlighted = false;
			if (mouseX > this.position.x && mouseX < this.width) {
				if (mouseY > this.position.y && mouseY < this.height) {
					this.color = this.hover;
					this.highlighted = true;
				}
			}
		}
	}
	anim() {
		this.color = this.normal;
		if (mouseX > this.position.x && mouseX < this.width) {
			if (mouseY > this.position.y && mouseY < this.height) {
				this.color = this.hover;
			}
		}
	}
	shrink() {
		this.size = this.realsize;
		this.position = {
			x: this.normalp.x,
			y: this.normalp.y
		};
	}
	grow() {
		let dx = width > height ? height * 0.05 : width * 0.05;
		this.size += dx;
		this.position.x -= dx / 2;
		this.position.y -= dx / 2;
	}
	select() {
		this.color = this.hover;
		if (game.state === 1) this.selected = true;
	}
	deselect() {
		this.color = this.normal;
		this.selected = false;
	}
}
