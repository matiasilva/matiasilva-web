function Missile( sender, target ) {
	this.s = sender.position.copy();
	this.t = target.position.copy();
	this.width = 20;
	this.delete;
	this.sender = sender;

	this.velocity = this.t.sub( this.s );
	this.velocity.div( 40 );

	this.position = this.s.copy();

	this.show = function () {
		if ( this.sender.collectedLetters.length > 0 ) {
			text( this.sender.collectedLetters[ this.sender.collectedLetters.length - 1 ].letter, this.position.x, this.position.y );
		}
	}

	this.update = function () {
		this.position.add( this.velocity );
	}

}
