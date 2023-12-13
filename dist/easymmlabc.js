import { SyntaxError, parse } from "https://cdn.jsdelivr.net/gh/cat2151/mml2abc/dist/mml2abc.mjs";

const easymml = {};
easymml.mmlId = "mml";

easymml.init = function() {
  easymml.mml = document.querySelector("#" + easymml.mmlId);
  easymml.mml.addEventListener("input", easymml.play);

  easyabcjs6.play = easymml.play;
  easyabcjs6.init();
}

easymml.play = function() {
  const mml = easymml.mml.value;
  let abc = "";

  try {
    abc = parse(mml);
  } catch (error) {
    console.error(error);
  }

  easyabcjs6.abcNotation.value = abc;
  easyabcjs6.playSub(abc, ABCJS, easyabcjs6.musicScoreId);
}

easymml.init();
