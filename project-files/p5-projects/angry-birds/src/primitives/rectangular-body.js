// generic class for any matter.js + p5.js rectangular body
// override properties:
// this.color

class RectangularBody {
    constructor(x, y, w, h, opts){
      this.body = Bodies.rectangle(x, y, w, h, opts);
      World.add(engine.world, this.body);
      this.d = {w: w, h: h};
      this.color = presets['purple'];
    }
  
    show(){
      const {position, angle} = this.body;
      push();
      fill(this.color);
      noStroke();
      translate(position.x, position.y);
      rotate(angle);
      rect(0, 0, this.d.w, this.d.h)
      pop();
    }
  }