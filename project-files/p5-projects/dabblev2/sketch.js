let letters = [];
let common = "etaoinsrhldcu";
let semicommon = "mfpgwyb";
let rare = "vkxjqz";
let interval;
let player1;
let player2;
let missile = null;
let words;
let currentWord;


function preload() {
	words = loadJSON( "words.json" );
}

function setup() {
	createCanvas( windowWidth, windowHeight );
	player1 = new Player( createVector( width / 4, height / 2 ), createVector( 8, 8 ), 20, false );
	player2 = new Player( createVector( 0.75 * width, height / 2 ), createVector( 8, 8 ), 20, true );
	noStroke();
	interval = setInterval( chooseLetter, 150 );
	chooseWord();
}

function draw() {
	textSize( 36 );
	textAlign( CENTER );
	background( 239, 231, 190 );
	fill( 217, 121, 37 );
	for ( var i = letters.length - 1; i >= 0; i-- ) {
		letters[ i ].show();
		letters[ i ].update();
		player1.touching( letters[ i ] );
		player2.touching( letters[ i ] );
		if ( letters[ i ].delete ) {
			letters.splice( i, 1 );
		}
	}
	if ( missile ) {
		missile.update();
		missile.show();
		switch ( missile.sender.name ) {
			case 1:
				player2.touching( missile );
				break;
			case 2:
				player1.touching( missile );
				break;
		}
		if(missile.delete){
			missile = null;
		}
	}
	player1.update();
	player2.update();
	fill( 0, 38, 53 );
	player1.show();
	fill( 171, 26, 37 )
	player2.show();
	drawScore();
}

function chooseWord(){
	let keys = Object.keys(words);
	let index = floor(random(keys.length));
	currentWord = keys[index];
}

function drawScore() {
	fill( 51, 100 );
	if ( player1.streak > 0 ) {
		text( "streak: " + player1.streak, width / 4, height * 0.75 );
	}
	if ( player2.streak > 0 ) {
		text( "streak: " + player2.streak + "       ", width * 0.75, height * 0.75 );
	}
	textSize( 64 );
		text(currentWord, width/2, height/2);
	text( "       " + player1.score, 0, height - 50 );
	text( player2.score + "       ", width, height - 50 );
}

function keyReleased() {
	if ( key === 'C' ) {
		player1.resetLetters();
	} else if ( key === 'Q' ) {
		let w = player1.checkLetters();
		if ( w === false && player1.score > 0 ) {
			player1.score--;
			player1.streak = 0;
		} else if ( w ) {
			player1.streak++;
		}
	} else if ( key === 'F' && player1.collectedLetters.length > 0) {
		missile = new Missile( player1, player2 );
	} else if ( key === 'P' && player2.collectedLetters.length > 0) {
		missile = new Missile( player2, player1 );
	} else if ( key === 'O') {
		let w = player2.checkLetters();
		if ( w === false && player2.score > 0 ) {
			player2.score--;
			player2.streak = 0;
		} else if ( w ) {
			player2.streak++;
		}
	} else if ( key === 'L' ) {
		player2.resetLetters();
	}
}

function chooseLetter() {
	var d = random();
	if ( d <= 0.5 ) {
		var index = floor( ( random( common.length ) ) );
		letters.push( new Letter( createVector( random( width ), 0 ), createVector( 0, 3 ), common[ index ] ) );
	} else if ( d <= 0.9){
		var index = floor( ( random( semicommon.length ) ) );
		letters.push( new Letter( createVector( random( width ), 0 ), createVector( 0, 3 ), semicommon[ index ] ) );
	}
	else {
		var index = floor( ( random( rare.length ) ) );
		letters.push( new Letter( createVector( random( width ), 0 ), createVector( 0, 3 ), rare[ index ] ) );
	}
}
