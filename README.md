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
  - abcjs is a library that renders sheet music in the browser while playing sounds using a SoundFont GM software synthesizer.
- Use cases for mml2abc?
  - For playing sounds in the browser
    - For writing MML and playing it with abcjs
  - For writing MML in Obsidian and playing sounds

# Requirement
- When playing in a browser
  - Sounds can be played by writing a simple `index.html`.
- When playing in Obsidian
  - Under development.
- When playing from the command line on Windows
  - Not investigated yet.
    - This is outside the current scope. Priority is given to "writing MML in Obsidian and playing sounds."
      - Since abcjs can play sounds in Obsidian (i.e., Chromium), there might be a way. Not investigated.
      - Are there any command-line software synthesizers that can output audio from ABC music notation, not limited to abcjs? Not investigated.

# Installation
- How to use mml2abc in a webpage?
  - A sample has been prepared. Please refer to [easymmlabc](https://github.com/cat2151/easymmlabc/).
- How to play MML sounds in Obsidian?
  - Under development. mml2abc will be integrated into a fork of the [Obsidian ABC.JS plugin](https://github.com/abcjs-music/obsidian-plugin-abcjs).

# Usage
- Import `mml2abc` and pass arguments to the function.
- For specific examples, please refer to [easymmlabc](https://github.com/cat2151/easymmlabc/).

# Note
## Priorities of this Project
- Proof of concept
  - Prioritizes proof of concept over high functionality, performance, reliability, extensibility, stability, and version compatibility.
- Making sound
  - Prioritizes maintaining a state where at least basic sounds can be played.
- The ability to provide an `MML string` to a function and obtain an `abcjs-playable string`.
  - Prioritizes maintaining simplicity by not adding more complex features.
- Achieving "writing MML in Obsidian and playing sounds."
  - More specifically, it relates to the [Obsidian ABC.JS plugin](https://github.com/abcjs-music/obsidian-plugin-abcjs).
    - In the future, we plan to fork the Obsidian ABC.JS plugin and integrate mml2abc.
- Prioritizes a simple MML format, inheriting a subset of existing standards.
  - It will be a subset of [SiON](https://keim.github.io/SiON/mmlref/sion_mml_reference.html) (chords will be a subset of Z-MUSIC).
  - The name of the dialect has been set to `mmlabc`.

## Division of Labor
- Creating `mml2abc.pegjs`
  - is the responsibility of this repository.
  - `peggyjs/mml2abc.pegjs` is the core file of this project and serves as the SSOT (Single Source of Truth).
    - All conversion logic from MML to ABC music notation is described in this file.
- Creating a mechanism to use mml2abc easily
  - is handled by [easymmlabc](https://github.com/cat2151/easymmlabc/).
- Creating a mechanism to use mml2abc in Obsidian
  - will be handled in a separate repository. This is planned for future creation.

## How to Develop mml2abc itself?
- Developing the MML parser with peggyjs + Jest using TDD is convenient. I hope it serves as some reference, and I'll try to write more details about it later.
- Uses Jest for TDD
  - Uses the Jest extension for VSCode
    - Tests run automatically (showing red/green) just by writing tests or peggyjs, making development easier.
- Uses `chokidar` for connecting peggyjs and Jest
  - Updating peggyjs automatically generates ES modules (for browsers) and CommonJS (for TDD & servers), and Jest's auto-tests run, making it convenient.
- For `printf` debugging in peggyjs, controls Jest's `silent` and `verbose` options (allows checking `console.log` in VSCode's Jest terminal).
  - `printf` debugging is occasionally necessary, so having it available makes things easier.
- Uses `webpack-dev-server` for live reloading (hot reloading) browser pages.
  - Issues that only become apparent when actually playing in the browser (e.g., unexpected behavior of abcjs) exist, so enabling live reloading makes development easier.
- First, set up the environment after cloning.
  - This includes installing Node.js related tools, running `npm install`, installing VSCode and the VSCode Jest extension, etc.
- To start daily development, just do the following:
  ```
  code .
  npm run watch