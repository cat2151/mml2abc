{{
  const defaultOctave = 4;
  const defaultMmlNoteLength = 8;
  function getNoteLengthAbc(length, dotLength) {
    // memo : ABC base note length is fix 8 for now.
    let mul = 1;
    if (dotLength) {
      mul = (1 - Math.pow(0.5, dotLength + 1)) / (1 - 0.5);
    }
    // console.log(`mul ${mul}`);
    return defaultMmlNoteLength / length * mul;
  }
}}
{
  let octave = defaultOctave;
  let mmlNoteLength = defaultMmlNoteLength;
}
MMLs=mmls:MML* { return mmls.join(''); }
MML=NOTE /REST
    /OCTAVE /OCTAVE_UP /OCTAVE_DOWN
    /NOTE_LENGTH
NOTE=_ pitch:PITCH length:INTEGER? dot:[\.]* _ {
      const abcLength = getNoteLengthAbc(length ?? mmlNoteLength, dot.length);
      return pitch + abcLength; }
REST=_ [r] length:INTEGER? dot:[\.]*_ {
      const abcLength = getNoteLengthAbc(length ?? mmlNoteLength, dot.length);
      return 'z' + abcLength; }
OCTAVE=_ [o] integer:INTEGER? _ {
        octave = integer ?? defaultOctave; }
OCTAVE_UP=_ [<] _ { octave++; }
OCTAVE_DOWN=_ [>] _ { octave--; }
NOTE_LENGTH=_ [l] length:INTEGER? _ {
              mmlNoteLength = length ?? defaultMmlNoteLength;
            }
PITCH=pitch:[a-g] {
      if (octave <= 4) { return pitch.toUpperCase(); }
      else { return pitch.toLowerCase(); } }
INTEGER= [0-9]+ { return parseInt(text(), 10); }
_ "whitespace"= [ \t\n\r]*