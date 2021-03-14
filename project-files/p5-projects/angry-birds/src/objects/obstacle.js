class Obstacle extends RectangularBody {
  constructor(x, y, w, h){
    const opts = {
      friction: 0.9,
      frictionStatic: 1,
      label: "obstacle",
    };
    super(x, y, w, h, opts);
    Body.setDensity(this.body, 0.03);
    this.color = presets['purple'];
  }
}