class Food {
  constructor(grid, id) {
    this.size = random(18, 23);
    this.id = id;
    this.color = color(random(255), random(255), random(255));
    this.position = createVector(
      random(grid.originX, grid.originX + grid.width),
      random(grid.originY, grid.originY + grid.height)
    );
  }

  display() {
    noStroke();
    fill(this.color);
    ellipse(this.position.x, this.position.y, this.size);
  }

  collide(collider) {
    return collideCircleCircle(
      collider.position.x + width / 2,
      collider.position.y + height / 2,
      collider.size,
      this.position.x,
      this.position.y,
      this.size
    );
  }
}

class FoodMap {
  constructor(numFoodies, grid) {
    this.foodies = [];
    this.foodGenerator = setInterval(
      this.generate,
      1500,
      random(5, numFoodies * 0.25),
      grid,
      this.foodies
    );
    this.generate(numFoodies, grid, this.foodies);
  }

  generate(children, grid, array) {
    for (let i = 0; i < children; i++) {
      array.push(new Food(grid, i));
    }
  }

  update(collider) {
    for (let i = this.foodies.length - 1; i >= 0; i--) {
      const food = this.foodies[i];
      // draw all food objects
      food.display();
      // check if eaten
      if (food.collide(collider)) {
        collider.collide(food);
        this.foodies.splice(i, 1);
      }
    }
  }
}
