# matiasilva.com

This is my personal website, built with Hugo and my own custom theme on top of Bulma.

## Motivation & my philosophy

I want editing this website to be as easy as possible. It's so easy to create a static website using a random theme, push it to GitHub, and just forget about it. Heck, I've even done it a few times myself. The number one culprit, for me at least, is the excessive "friction" that exists in going from an idea to a post on the website. This is why having a solid development environment pays off massively in the long run, and why pouring hours into making the website as extensible as possible is worth it! Eventually, adding a new page Just Works.

Maintenance should also be easy. This is why I try to rely on as few dependencies as possible (but the ones I use, I get from a CDN so users are more likely to have it cached) and avoid esoteric functions, variables or practices. I don't want to come back to this 5 months down the line and go "huh?".

In line with this theme, the website is hosted on GitHub Pages and built on push.

## My workflow

1. Start the "website" VS Code workspace on my laptop

    This automatically starts the VS Code remote SSH tunnel to a Raspberry Pi 3B+ on my local subnet and puts me into the Git repository for this website. Simple and super convenient! Also, I get the command line on the side if I don't want to click around the GUI.

2. `hugo new journal/rainbows.md` or `hugo new --kind journal journal/hello` for a bundle
3. Update frontmatter
4. Add assets as necessary
5. Commit and push

With my philosophy in mind, you can see just how easy it is to go from "idea" to something concrete.

## Technical quirks

### Summaries

To add a post summary, either set the `summary` in the post front matter or let Hugo truncate to 50 words automatically. I've found that using `<!--more-->` leads to inconsistent behaviors with `<p>` if the text has HTML styling.

## Requirements

Just the Hugo binary :)

## Notes

* This used to be built with Zola, a great static site generator built with Rust. Unfortunately, they don't build for ARMv8 nor `armhf` and after spending several hours attempting to cross-compile I decided to switch to Hugo.
* Bulma is seriously cool. Having used Bootstrap for so many projects, it's honestly a sigh of relief to use something else. It comes with no JS, which is great and offers just the right number of components, elements and layout tools to highly customize the website but without leaving me to fret about positioning and stuff. Also, it doesn't force `!important` on elements unlike Bootstrap, which is super useful for me as I haven't implemented `sass` yet.

## License

Text is [CC BY NC SA 4.0](http://creativecommons.org/licenses/by-nc-sa/4.0/). I'm contactable at my GH email if needed.
