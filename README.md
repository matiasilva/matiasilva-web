# matiasilva.com

This is my personal website, built with Zola and my own custom theme on top of Bulma.

## Things I've learnt while making this

* modular Sass is not supported (yet) by Bulma, so I had to add an underscore to every file with `for i in *; do mv "$i" _"$i"; done` to prevent compilation errors