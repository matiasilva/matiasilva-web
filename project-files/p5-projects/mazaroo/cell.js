function Cell(_r, _c, _w) {
	this.r = _r;
	this.c = _c;
	this.w = _w;
	this.visited = false;
	this.walls = [true, true, true, true];
	this.show = function () {
		let x = this.c * this.w;
		let y = this.r * this.w
		if (this.walls[0]) {
			line(x, y, x + this.w, y);
		}
		if (this.walls[1]) {
			line(x + this.w, y, x + this.w, y + this.w);
		}
		if (this.walls[2]) {
			line(x + this.w, y + this.w, x, y + this.w);
		}
		if (this.walls[3]) {
			line(x, y + this.w, x, y);
		}
	}
	this.getNext = function (g) {
		let friends = [];
		var top = g[MazeFactory.index(this.r, this.c - 1)];
		var right = g[MazeFactory.index(this.r + 1, this.c)];
		var bottom = g[MazeFactory.index(this.r, this.c + 1)];
		var left = g[MazeFactory.index(this.r - 1, this.c)];

		if (top && !top.visited) {
			friends.push(top);
		}
		if (right && !right.visited) {
			friends.push(right);
		}
		if (bottom && !bottom.visited) {
			friends.push(bottom);
		}
		if (left && !left.visited) {
			friends.push(left);
		}
		if (friends.length > 0) {
			var r = floor(random(friends.length));
			return friends[r];
		} else {
			return undefined;
		}
	}
}
