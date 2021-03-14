function Field(_x, _y) {
	this.position = createVector(_x, _y);
	this.r = 10;
	this.mass = 30;
	this.G = 2;
	this.show = function () {
		fill(51);
		ellipse(this.position.x, this.position.y, this.r * 2, this.r * 2);
		fill(51, 100);
		ellipse(this.position.x, this.position.y, this.r * 2 + this.mass, this.r * 2 + this.mass);
	}
	this.attract = function (m) {
		var l = p5.Vector.sub(this.position, m.position);
		var d = l.mag();
		d = constrain(d, 5, 25);
		l.normalize();
		var strength = (this.G*this.mass*m.mass)/(d*d);
		l.mult(strength);
		return l;
	}
	this.expand = function () {
		let currentMouse = createVector(mouseX, mouseY);
		let previousMouse = createVector(pmouseX, pmouseY);
		let difference = p5.Vector.sub(previousMouse, currentMouse);
		if (difference.x <= 0 && difference.y >= 0 && mouseX > this.position.x && mouseY < this.position.y) {
			this.mass++;
		} else if (difference.x >= 0 && difference.y >= 0 && mouseX < this.position.x && mouseY < this.position.y) {
			this.mass++;
		} else if (difference.x >= 0 && difference.y <= 0 && mouseX < this.position.x && mouseY > this.position.y) {
			this.mass++;
		} else if (difference.x <= 0 && difference.y <= 0 && mouseX > this.position.x && mouseY > this.position.y) {
			this.mass++;
		} else {
			this.mass -= 2;
		}
	}
}
