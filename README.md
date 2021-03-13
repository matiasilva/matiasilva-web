# matiasilva.com

This is my personal website, built with Hugo and my own custom theme on top of Bulma.

## Things I've learnt while making this

* modular Sass is not supported (yet) by Bulma, so I had to add an underscore to every file with `for i in *; do mv "$i" _"$i"; done` to prevent compilation errors

## Other notes

This used to be built with Zola, a great static site generator built with Rust. Unfortunately, they don't build for ARMv8 nor `armhf` and after spending several hours attempting to cross-compile I decided to switch to Hugo.
