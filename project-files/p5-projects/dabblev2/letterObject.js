function LetterObject(l){
  this.letter = l;
  this.delete = false;

  this.show = function(xVal, yVal){
  //  rect(this.position.x -this.size.x, this.position.y-this.size.y, this.size.x, this.size.y);
    text(this.letter, xVal, yVal);
    //check if invalid
  }


  this.clear = function(){
    if(4){
      this.delete = true;
    }
  }
}
