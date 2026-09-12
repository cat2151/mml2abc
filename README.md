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
  - abcjs is a library that draws sheet music in the browser and plays it using a SoundFont GM software synthesizer.
- What is mml2abc used for?
  - For playing sounds in a browser
    - To write MML and play it with abcjs
  - For writing MML and playing sounds in Obsidian

# Requirement
- When playing in a browser:
  - Sound can be played by writing a small `index.html` file.
- When playing in Obsidian:
  - Please use https://github.com/cat2151/obsidian-plugin-mmlabc
- When playing from the command line on Windows:
  - Not investigated.
    - This is out of scope. Priority is given to "writing MML and playing sounds in Obsidian."
      - Since abcjs can play sounds in Obsidian (i.e., Chromium), there's likely a way, but it hasn't been investigated.
      - Are there any command-line software synthesizers that can output audio from ABC music notation (not limited to abcjs)? Not investigated.

# Installation
- How to use mml2abc in a webpage?
  - A sample has been prepared. Please refer to [easymmlabc](https://github.com/cat2151/easymmlabc/).
- How to play MML sounds in Obsidian?
  - Please use https://github.com/cat2151/obsidian-plugin-mmlabc.

# Usage
- Import `mml2abc` and pass arguments to its functions.
- For specific examples, please refer to [easymmlabc](https://github.com/cat2151/easymmlabc/).

# Note
## Project Priorities
- Proof of Concept
  - Proof of concept is prioritized over high functionality, high performance, high reliability, extensibility, stability, and version compatibility.
- Playing Sound
  - Maintaining the ability to play at least basic sounds is prioritized as much as possible.
- The ability to provide an `MML string` to a function and obtain an `abcjs-playable string`.
  - Maintaining simplicity by not adding more complex features is prioritized.
- Realizing "writing MML and playing sounds in Obsidian."
  - Please use https://github.com/cat2151/obsidian-plugin-mmlabc.
- Prioritize a simple MML format that inherits a subset of existing standards.
  - It will be a subset of [SiON](https://keim.github.io/SiON/mmlref/sion_mml_reference.html) (chords will be a subset of Z-MUSIC).
  - The dialect name is `mmlabc`.

## Responsibilities
- Creating `mml2abc.pegjs`
  - is the responsibility of this repository.
  - [mml2abc.pegjs](peggyjs/mml2abc.pegjs) is the core file of this project and serves as the SSOT (Single Source of Truth).
    - All grammar for MML to ABC music notation conversion is described in this file.
- Creating a mechanism to easily use `mml2abc`
  - is handled by [easymmlabc](https://github.com/cat2151/easymmlabc/).
- Creating a mechanism to use `mml2abc` in Obsidian
  - Please use https://github.com/cat2151/obsidian-plugin-mmlabc.

## Development Workflow for mml2abc
- Developing the MML parser using TDD with peggyjs + Jest is easy. I hope this can be of some reference, and I'll try to write more about it in the future.
- Jest is used for TDD.
  - Using the VSCode Jest extension
    - It's easy to have tests run automatically (red/green) just by writing tests and peggyjs.
- chokidar is used to connect peggyjs and Jest.
  - Updating peggyjs automatically generates ES modules (for browsers) and CommonJS (for TDD & servers), and Jest's automatic tests run, making it easy.
- For printf debugging in peggyjs, control Jest's `silent` and `verbose` options (allows `console.log` output to be seen in the VSCode Jest terminal).
  - printf debugging is occasionally necessary, so having it enabled makes things easier.
- webpack-dev-server is used for live reload (hot reload) of browser pages.
  - Problems sometimes emerge when actually playing in the browser (e.g., unexpected behavior of abcjs), so having live reload enabled makes things easier.
- After cloning, set up the environment first.
  - This includes installing Node.js related tools, running `npm install`, and installing VSCode and its Jest extension.
- To start daily development, just run the following:
  ```
  code .
  npm run watch