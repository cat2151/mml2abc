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
  - abcjs is a library that renders sheet music in the browser and plays SoundFont GM software synthesizer.
- What are the use cases for mml2abc?
  - For playing sounds in the browser
    - For writing MML and playing it with abcjs
  - For writing MML and playing sounds in Obsidian

# Requirement
- When playing in a browser
  - You can play sounds by writing a simple index.html.
- When playing in Obsidian
  - Under development.
- When playing from the command line on Windows
  - Not yet investigated.
    - This is considered out of scope. Priority is given to "writing MML and playing sounds in Obsidian".
      - Since abcjs can play sounds in Obsidian (i.e., Chromium), there's likely a way, but it's not yet investigated.
      - Beyond abcjs, are there any command-line software synthesizers that can output audio from ABC music notation? Not yet investigated.

# Installation
- How to use mml2abc on a webpage?
  - A sample has been prepared. Please refer to [easymmlabc](https://github.com/cat2151/easymmlabc/).
- How to play MML sounds in Obsidian?
  - Under development. mml2abc is planned to be integrated into a fork of the [Obsidian ABC.JS plugin](https://github.com/abcjs-music/obsidian-plugin-abcjs).

# Usage
- Import mml2abc and pass arguments to its functions.
- For specific examples, please refer to [easymmlabc](https://github.com/cat2151/easymmlabc/).

# Note
## Project Priorities
- Proof of Concept
  - Prioritizing proof of concept over high functionality, performance, reliability, scalability, stability, or version compatibility.
- Playability
  - Prioritizing the maintenance of a minimum playable state as much as possible.
- The ability to provide an `MML string` to a function and obtain an `abcjs-playable string`.
  - Prioritizing simplicity and avoiding overly complex features.
- Achieving "writing MML and playing sounds in Obsidian".
  - More specifically, this relates to the [Obsidian ABC.JS plugin](https://github.com/abcjs-music/obsidian-plugin-abcjs).
    - In the future, we plan to fork the Obsidian ABC.JS plugin and integrate mml2abc.
- Prioritizing a simple MML format, inheriting a subset of existing standards.
  - It will be a subset of [SiON](https://keim.github.io/SiON/mmlref/sion_mml_reference.html) (chords will be a subset of Z-MUSIC).
  - The dialect name is `mmlabc`.

## Division of Labor
- The responsibility of this repository is to create `mml2abc.pegjs`.
- The responsibility of creating an `easy-to-use mechanism for mml2abc` is handled by [easymmlabc](https://github.com/cat2151/easymmlabc/).
- The responsibility of creating a `mechanism to use mml2abc in Obsidian` will be handled in a separate repository, which is planned for future creation.

## How to develop mml2abc itself?
- Developing the MML parser using TDD with peggyjs + Jest is easier. I hope this serves as some reference, and I'll try to write more details about it later.
- Using Jest for TDD
  - Using the Jest extension for VSCode
    - It's easy to run automated tests (red/green) by just writing tests or peggyjs.
- Using chokidar to connect peggyjs and Jest
  - Updating peggyjs automatically generates ES modules (for browsers) and CommonJS (for TDD & servers), and Jest's automated tests run, making it easier.
- For printf debugging of peggyjs, control Jest's `silent` and `verbose` options (allowing `console.log` to be seen in the VSCode Jest terminal).
  - Printf debugging is occasionally necessary, so having it enabled makes things easier.
- Using webpack-dev-server for live reload (hot reload) of browser pages.
  - There are issues that only become apparent when actually playing in the browser (e.g., unexpected behavior of abcjs), so enabling live reload makes things easier.
- After cloning, set up the environment first.
  - This includes installing Node.js related components, `npm install`, VSCode, and the VSCode Jest extension, etc.
- To start daily development, just do the following:
  ```
  code .
  npm run watch