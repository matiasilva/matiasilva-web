+++
title = "Modelling of diseases"
description = "Using a simple Sick/Infected/Recovered model to track how diseases can spread in a community"
date = 2020-04-14

[extra]
external_link = "/project-files/p5-projects/sir_modelling"
read_more = true
+++

I was bored and in a world where doom and gloom were around me, so I decided to model that. A lot of the inspiration for this came from a video I watched by 3Blue1Brown about modelling infectious diseases, like COVID-19.

This experiment was a fun trial of CSS grid, which at the time was completely new to me.

I also combined two JS libraries here: `p5.js` for graphics and `chart.js` for plotting numbers.

The results were impressive. Tweaking small variables, such as the radius of infection, made a massive difference in the transmission of the virus. How the "people" moved was fun to model: it consisted of an imaginary orb of gravity that moved randomly and pulled the person in a given direction, based on Newton's laws of gravitation thus giving a more natural motion.
