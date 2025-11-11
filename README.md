# mml2abc
A library that transpiles Music Macro Language into ABC music notation.

# Demo
https://cat2151.github.io/mml2abc/dist/

# Features
- A simple text-to-text JavaScript library
- Generates ABC music notation for [abcjs](https://github.com/paulrosen/abcjs) from MML
  - abcjs is a library that renders musical scores in the browser and plays them using a SoundFont GM software synthesizer.
- What is mml2abc used for?
  - For playing sound in the browser
    - For writing MML and playing it with abcjs
  - For writing MML and playing sound in Obsidian

# Requirement
- When playing in a browser
  - Sound can be played by writing a simple index.html.
- When playing in Obsidian
  - Under development.
- When playing from the command line on Windows
  - Not investigated.
    - Considered out of scope. Priority is given to "playing MML sound in Obsidian".
      - Since abcjs can play sound in Obsidian (which uses Chromium), there might be a way. Not investigated.
      - Are there any command-line software synthesizers that can output audio from ABC music notation, not just abcjs? Not investigated.

# Installation
- How to use mml2abc on a webpage?
  - A sample has been prepared. Please refer to [easymmlabc](https://github.com/cat2151/easymmlabc/).
- How to play MML sound in Obsidian?
  - Under development. mml2abc is planned to be integrated into a fork of the [Obsidian ABC.JS plugin](https://github.com/abcjs-music/obsidian-plugin-abcjs).

# Usage
- Import mml2abc and pass arguments to the function.
- For specific examples, please refer to [easymmlabc](https://github.com/cat2151/easymmlabc/).

# Note
## Priorities of this project
- Proof of concept
  - Prioritizes proof of concept over advanced features, high performance, high reliability, extensibility, stability, and version compatibility.
- Playability
  - Prioritizes maintaining the ability to produce at least basic sound.
- The ability to provide a `MML string` to a function and obtain an `abcjs-playable string`.
  - Prioritizes maintaining simplicity by not adding more complex features.
- Achieving "playing MML sound in Obsidian".
  - More specifically, this relates to the [Obsidian ABC.JS plugin](https://github.com/abcjs-music/obsidian-plugin-abcjs).
    - We plan to fork the Obsidian ABC.JS plugin and integrate mml2abc in the future.
- Prioritizes a simple MML format that inherits a subset of existing standards.
  - It will be a subset of [SiON](https://keim.github.io/SiON/mmlref/sion_mml_reference.html) (chords will be a subset of Z-MUSIC).
  - The dialect name is `mmlabc`.

## Responsibilities
- Creating `mml2abc.pegjs`
  - is the responsibility of this repository.
- Creating a mechanism to easily use mml2abc
  - will be handled by [easymmlabc](https://github.com/cat2151/easymmlabc/).
- Creating a mechanism to use mml2abc in Obsidian
  - will be handled in a separate repository, to be created in the future.

## mml2abc Development Procedures
- Developing the MML parser with TDD using peggyjs + Jest is easy. I hope it can be of some reference, and I plan to write more detailed instructions in the future.
- Jest is used for TDD.
  - Using the VSCode Jest extension
    - Automatic tests run (red/green) just by writing tests and peggyjs, making it easy.
- chokidar is used to connect peggyjs and Jest.
  - Updating peggyjs automatically generates ES modules (for browsers) and CommonJS (for TDD & servers), and Jest's automated tests run, making it easy.
- For printf debugging of peggyjs, control Jest's silent and verbose modes (allows viewing console.log in VSCode's Jest terminal).
  - Printf debugging is occasionally necessary, so having it available makes things easier.
- webpack-dev-server is used for live reloading (hot reloading) of browser pages.
  - Issues can be discovered by actually playing in the browser (e.g., unexpected abcjs behavior), so having live reloading makes things easier.
- First, set up the environment after cloning.
  - This includes installing Node.js related components, running `npm install`, and installing VSCode and its Jest extension.
- To start daily development, just follow these steps:
  ```
  code .
  npm run watch