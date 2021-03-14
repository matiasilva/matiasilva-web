function Player( vPos, vVel, r, playerType ) {
	this.radius = r;
	this.streak = 0;
	this.position = vPos;
	this.velocity = vVel;
	this.killed = false;
	this.playerT = playerType;
	this.collectedLetters = [];
	this.score = 0;
	this.name = playerType ? 2 : 1;
	this.xDraw = playerType ? width - 40 : 40;

	this.show = function () {
		ellipse( this.position.x, this.position.y, this.radius * 2, this.radius * 2 );
		for ( var i = this.collectedLetters.length - 1; i >= 0; i-- ) {
			this.collectedLetters[ i ].show( this.xDraw, i * 40 + 40 );
		}
	}

	this.update = function () {
		if ( playerType ) {
			if ( keyIsDown( LEFT_ARROW ) ) {
				this.position.x -= this.velocity.x;
			} else if ( keyIsDown( RIGHT_ARROW ) ) {
				this.position.x += this.velocity.x;
			} else if ( keyIsDown( UP_ARROW ) ) {
				this.position.y -= this.velocity.y;
			} else if ( keyIsDown( DOWN_ARROW ) ) {
				this.position.y += this.velocity.y;
			}
		} else {
			if ( keyIsDown( 65 ) ) {
				this.position.x -= this.velocity.x;
			} else if ( keyIsDown( 68 ) ) {
				this.position.x += this.velocity.x;
			} else if ( keyIsDown( 87 ) ) {
				this.position.y -= this.velocity.y;
			} else if ( keyIsDown( 83 ) ) {
				this.position.y += this.velocity.y;
			}
		}
		if ( this.position.x < 0 ) {
			this.position.x = 0;
		} else if ( this.position.x > width ) {
			this.position.x = width;
		} else if ( this.position.y > height ) {
			this.position.y = height;
		} else if ( this.position.y < 0 ) {
			this.position.y = 0;
		}
	}

	this.touching = function ( obj ) {
		if ( obj instanceof Letter ) {
			var d = dist( this.position.x, this.position.y, obj.position.x, obj.position.y );
			if ( d < ( this.radius + 10 ) && this.collectedLetters.length <= 14 ) {
				this.addLetter( obj.letter );
				obj.delete = true;
			}
		} else if ( obj instanceof Missile ) {
			var d = dist( this.position.x, this.position.y, obj.position.x, obj.position.y );
			if ( d < this.radius + obj.width / 4 ) {
				this.position.add( obj.velocity.mult( 15 ) );
				obj.delete = true;
				if ( obj.sender.collectedLetters.length > 0 ) {
					obj.sender.collectedLetters.pop();
				}
			}
		}
	}

	this.getWord = function () {
		var str = "";
		for ( var i = 0; i < this.collectedLetters.length; i++ ) {
			str += this.collectedLetters[ i ].letter;
		}
		return str;
	}

	this.resetLetters = function () {
		this.collectedLetters = [];
	}

	this.checkLetters = function () {
		let d = this.getWord();
		if ( d.toUpperCase() === currentWord) {
			this.resetLetters();
			this.score += d.length*2;
			chooseWord();
			return true;
		}
		else if(d.toUpperCase() in words){
			this.resetLetters();
			this.score += d.length;
			return true;
		}
		return false;
	}

	this.addLetter = function ( text ) {
		this.collectedLetters.push( new LetterObject( text ) );
	}
}
