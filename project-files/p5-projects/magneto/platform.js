function Platform(_w, _h, _x) {
	this.position = createVector(_x, height - _h);
	this.w = _w;
	this.h = _h;
	this.c;
	this.completed = false;
	this.show = function () {
		this.c = this.completed ? color(0, 255, 0, 100) : color(255, 0, 0, 100);
		fill(this.c);
		rect(this.position.x, this.position.y, this.w, this.h);
	}
	this.touching = function (b) {
		if (!this.completed) {
			let yPos = b.position.y < (this.position.y + b.r) && b.position.y > (this.position.y - b.r * 2);
			let xPos = b.position.x < (this.position.x + this.w) && b.position.x > this.position.x;
			if (yPos && xPos) {
				b.position.y = this.position.y - b.r;
				this.completed = true;
        completes++;
				b.still = true;
				b.velocity.mult(0);
        songs.touch.play();
			}
		}
	}
}
