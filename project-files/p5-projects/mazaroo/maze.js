var MazeFactory = {
	w: null,
	rows: null,
	columns: null,
	generateMaze: function (_w) {
		let grid = [];
		let stack = [];
		w = _w;
		columns = floor(width / w);
		rows = floor(height / w);
		for (var r = 0; r < rows; r++) {
			for (var c = 0; c < columns; c++) {
				grid.push(new Cell(r, c, w));
			}
		}
		let current = grid[0];
		do {
			current.visited = true;
			let next = current.getNext(grid);
			if (next) {
				next.visited = true;
				stack.push(current);
				this.removeWalls(current, next);
				current = next;
			} else if (stack.length > 0) {
				current = stack.pop();
			}
		} while (stack.length > 0);
		return grid;
	},
	index: function (i, j) {
		if (i < 0 || j < 0 || i > columns - 1 || j > rows - 1) {
			return -1;
		}
		return j + i * rows;
	},
	removeWalls: function (a, b) {
		let x = a.c - b.c;
		if (x == 1) {
			a.walls[3] = false;
			b.walls[1] = false;
		} else if (x == -1) {
			a.walls[1] = false;
			b.walls[3] = false;
		}
		let y = a.r - b.r;
		if (y == 1) {
			a.walls[0] = false;
			b.walls[2] = false;
		} else if (y == -1) {
			a.walls[2] = false;
			b.walls[0] = false;
		}
	}
}
