import { SyntaxError, parse } from "./mml2abc.mjs";

const easymml = {};
easymml.mmlId = "mml";

easymml.init = function() {
  easymml.mml = document.querySelector("#" + easymml.mmlId);
  easymml.mml.addEventListener("input", easymml.play);
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
