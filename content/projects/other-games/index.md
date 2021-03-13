+++
title = "Assorted games"
description = "A range of games I made from 2015-2017 using p5.js and occasionally, physics libraries and/or Firebase for score tracking"
date = 2017-01-01
+++

## List of games

A curated list of the games that made the cut (looking back at my 14-year-old self was tough!) is shown here:

* [Catch!](/project-files/p5-projects/catch) -- Can you catch the shapes in time?
* Grinch Invaders -- A shooter game inspired by space invaders
* [Dabble](/project-files/p5-projects/dabblev2) -- Like scrabble but now you have to dodge!
* [Simon](/project-files/p5-projects/simon) -- Simon says...
* [Dodge](/project-files/p5-projects/dodgev2) -- The classic!
* [Magneto](/project-files/p5-projects/magneto) -- Combining magnets, orbits and fun!
* [Flappy bird](/project-files/p5-projects/pipes) -- A crude remake

A few notes:

* Grinch Invaders was built originally in Processing (Java) but ported to JS in early 2016. My first ever (complete-ish) game!
* Dodge is the most famous of my games. It was developed in a night and released to a few friends, word of mouth resulted in a huge spike in usage over the days following!
* Catch is fully developed has native Firebase (Database as a Service) integration with a scoreboard. It is one of the more advanced games I made, using matter.js as a physics engine for body collisions.
* Dabble was meant to be a fully featured education tool to learn new words. It was the first time I imported external JSON data sources.
* Magneto is based on real laws of electrostatic attraction!
* Simon has a complex (sort of) animation engine behind it…

### Simon says -- a memory game

{{ figure(src="simon.png") }}

This game consists of a series of four squares arranged in a grid. After the user inputs their name and views an initial animation, a sequence is generated and displayed on all squares. That is, each square changes its color to represent a pattern and the user must then click each square in the order that they changed color to move on. The interface provides feedback to the user by highlighting the square he/she is currently over and increases in size if he/she clicks it. Each successful level adds more difficulty with shorter display times and more squares to click. If the user loses, he/she is shown a scoreboard and given an option to try again.

This program was made with p5.js which is an adaptation of Processing for the web. It is an intuitive and fun library that provides a layer of abstraction on top of the vanilla JavaScript canvas. I chose to break the game up into three files using an object-oriented model.

## Other cool things I made