# mml2abc

<p align="left">
  <a href="README.ja.md"><img src="https://img.shields.io/badge/🇯🇵-Japanese-red.svg" alt="Japanese"></a>
  <a href="README.md"><img src="https://img.shields.io/badge/🇺🇸-English-blue.svg" alt="English"></a>
  <a href="https://deepwiki.com/cat2151/mml2abc"><img src="https://deepwiki.com/badge.svg" alt="Ask DeepWiki"></a>
  <a href="https://cat2151.github.io/mml2abc/dist/"><img src="https://img.shields.io/badge/🌐-Live%20Demo-green.svg" alt="Live Demo"></a>
</p>

A library transpiles Music Macro Language into ABC music notation.

# Demo
https://cat2151.github.io/mml2abc/dist/

# Features
- A simple text-to-text JavaScript library
- Generates ABC music notation for [abcjs](https://github.com/paulrosen/abcjs) from MML
  - abcjs is a library that renders sheet music in the browser while playing a SoundFont GM software sound engine.
- Use Cases for mml2abc:
  - For playing sounds in the browser
    - For writing MML and playing it with abcjs
  - For writing MML in Obsidian and playing sounds

# Requirements
- When playing in the browser
  - A small `index.html` setup is sufficient to play sound.
- When playing in Obsidian
  - Under development.
- When playing from the command line on Windows
  - Not investigated.
    - This is considered out of scope. Priority is given to "writing MML in Obsidian and playing sounds."
      - Since abcjs can play sounds in Obsidian (i.e., Chromium), some method might exist. Not investigated.
      - Are there any command-line software synthesizers that can output audio with ABC music notation as input, not limited to abcjs? Not investigated.

# Installation
- How to use mml2abc on a webpage?
  - A sample has been prepared. Please refer to [easymmlabc](https://github.com/cat2151/easymmlabc/).
- How to play MML sounds in Obsidian?
  - Under development. mml2abc is planned to be integrated into a fork of the [Obsidian ABC.JS plugin](https://github.com/abcjs-music/obsidian-plugin-abcjs).

# Usage
- Import mml2abc and pass arguments to the function.
- For a specific example, please refer to [easymmlabc](https://github.com/cat2151/easymmlabc/).

# Note
## Project Priorities
- Proof of Concept
  - Proof of concept is prioritized over high functionality, high performance, high reliability, extensibility, stability, and version compatibility.
- Sound Playback
  - Maintaining the ability to play at least basic sounds is prioritized as much as possible.
- The ability to provide an `MML string` to a function and obtain an `abcjs playable string`.
  - Maintaining simplicity is prioritized, without adding more complex features.
- Achieving "writing MML in Obsidian and playing sounds."
  - More specifically, this relates to the [Obsidian ABC.JS plugin](https://github.com/abcjs-music/obsidian-plugin-abcjs).
    - In the future, we plan to fork the Obsidian ABC.JS plugin and integrate mml2abc.
- The MML format prioritizes simplicity and inheriting a subset of existing standards.
  - It will be a subset of [SiON](https://keim.github.io/SiON/mmlref/sion_mml_reference.html) (chords will be a subset of Z-MUSIC).
  - The name of the dialect has been set to `mmlabc`.

## Division of Responsibilities
- To create `mml2abc.pegjs`.
  - This is the responsibility of this repository.
  - [mml2abc.pegjs](peggyjs/mml2abc.pegjs) is the core file of this project and serves as the SSOT (Single Source of Truth).
    - All of the grammar for converting MML to ABC music notation is described in this file.
- To create a mechanism to use mml2abc easily.
  - This is handled by [easymmlabc](https://github.com/cat2151/easymmlabc/).
- To create a mechanism to use mml2abc in Obsidian.
  - This will be handled in a separate repository, to be created in the future.

## mml2abc Development Process
- Developing the MML parser with TDD using peggyjs + Jest is easy. I hope this information is helpful, and I plan to write more detailed instructions in the future.
- Jest is used for TDD.
  - Using the VSCode Jest extension.
    - It's easy to run automated tests (red/green) just by writing tests and peggyjs.
- chokidar is used to connect peggyjs and Jest.
  - Updating peggyjs automatically generates ES modules (for browsers) and CommonJS (for TDD & servers), and Jest's automated tests run, making development easier.
- For printf debugging in peggyjs, control Jest's silent and verbose modes (this allows `console.log` output to be seen in the VSCode Jest terminal).
  - printf debugging is occasionally necessary, so having it enabled makes things easier.
- webpack-dev-server is used for live reloading (hot reloading) of browser pages.
  - Problems sometimes emerge when actually playing in the browser (e.g., unexpected abcjs behavior), so having live reload enabled makes things easier.
- After cloning, first set up the environment.
  - This includes installing Node.js related dependencies, running `npm install`, and installing VSCode and the VSCode Jest extension.
- To start daily development, just run the following:
  ```
  code .
  npm run watch