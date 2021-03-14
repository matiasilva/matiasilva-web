class Platform extends RectangularBody{
  constructor(x, y, w, h){   
    const opts = {
      friction : 1,
      staticFriction: 1,
      label: "platform"
    }
    super(x, y, w, h, opts);
    Body.setStatic(this.body, true);
    this.color = presets['green'];
  }  
}