function Letter(vPos, vVel, l){
  this.position = vPos;
  this.velocity = vVel;
  this.letter = l;
  this.delete = false;

  this.show = function(){
    text(this.letter, this.position.x, this.position.y);
  }

  this.update = function(){
    this.position.add(this.velocity);
    this.clear();
  }

  this.clear = function(){
    if(this.position.y > height){
      this.delete = true;
    }
  }
}
