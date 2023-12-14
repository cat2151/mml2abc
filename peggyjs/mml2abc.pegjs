{{
  const defaultOctave = 5;
  const defaultMmlNoteLength = 4;
  const abcBaseNoteLength = 8;
  function getNoteLengthAbc(length, dotLength) {
    let mul = 1;
    if (dotLength) {
      mul = (1 - Math.pow(0.5, dotLength + 1)) / (1 - 0.5);
    }
    let fraction = decimalToFraction(abcBaseNoteLength / length * mul);
    if (fraction.denominator != "") {
      return `${fraction.numerator}/${fraction.denominator}`;
    } else {
      return `${fraction.numerator}`;
    }
  }
  function decimalToFraction(originalDecimal) {
    let decimal = originalDecimal;
    let denominator = 1;
    while (decimal % 1 !== 0) {
      denominator++;
      decimal = originalDecimal * denominator;
    }
    let numerator = decimal;
    if (numerator == 1) numerator = ""; // memo : for ABC music notation
    if (denominator == 1) denominator = "";
    return {numerator, denominator};
  }
}}
{
  let octave = defaultOctave;
  let mmlNoteLength = defaultMmlNoteLength;
  let chordOctave = null;
  let chordAbcNoteLength = null;
  let isNewLineTop = true;
  let track = 1;
}
MMLs=mmls:MML* { return "V:TRACK1\n" + mmls.join(''); }
MML=NOTE /REST
    /OCTAVE /OCTAVE_UP /OCTAVE_DOWN
    /NOTE_LENGTH
    /CHORD
    /PROGRAM_CHANGE
    /TRACK_SEPARATOR
NOTE=_ pitch:PITCH length:INTEGER? dot:[\.]* _ {
      isNewLineTop = false;
      const abcLength = getNoteLengthAbc(length ?? mmlNoteLength, dot.length);
      if (chordOctave !== null) {
        if (chordAbcNoteLength === null) {
          chordAbcNoteLength = abcLength;
          return pitch + abcLength;
        } else {
          return pitch;
        }
      } else {
        return pitch + abcLength;
      } }
REST=_ [r] length:INTEGER? dot:[\.]*_ {
      isNewLineTop = false;
      const abcLength = getNoteLengthAbc(length ?? mmlNoteLength, dot.length);
      return 'z' + abcLength; }
OCTAVE=_ [o] integer:INTEGER? _ {
        isNewLineTop = false;
        octave = integer ?? defaultOctave; }
OCTAVE_UP=_ [<] _ {
          isNewLineTop = false;
          octave++; }
OCTAVE_DOWN=_ [>] _ {
          isNewLineTop = false;
          octave--; }
CHORD=_ ['] _ {
      isNewLineTop = false;
      if (chordOctave === null) {
        chordOctave = octave;
        chordAbcNoteLength = null;
        return "[";
      } else {
        octave = chordOctave;
        chordOctave = null;
        chordAbcNoteLength = null;
        return "]";
      } }
PROGRAM_CHANGE=_ [@] integer:INTEGER _ {
    let prefix = isNewLineTop ? "" : "\n";
    isNewLineTop = true;
    return `${prefix}%%MIDI program ${integer}\n`; }
NOTE_LENGTH=_ [l] length:INTEGER? _ {
              isNewLineTop = false;
              mmlNoteLength = length ?? defaultMmlNoteLength; }
TRACK_SEPARATOR=_ [;] _ {
                track++;
                return `\nV:TRACK${track}`; }

PITCH=pitch:[a-g] sharp:SHARP* flat:FLAT* {
      pitch = sharp.join('') + flat.join('') + pitch;
      switch (octave) {
        case  0: return pitch.toUpperCase() + ',,,,,';
        case  1: return pitch.toUpperCase() + ',,,,';
        case  2: return pitch.toUpperCase() + ',,,';
        case  3: return pitch.toUpperCase() + ',,';
        case  4: return pitch.toUpperCase() + ',';
        case  5: return pitch.toUpperCase();
        case  6: return pitch.toLowerCase();
        case  7: return pitch.toLowerCase() + "'";
        case  8: return pitch.toLowerCase() + "''";
        case  9: return pitch.toLowerCase() + "'''";
        case 10: return pitch.toLowerCase() + "''''";
        default:
            console.assert(false, "FIXME assert(0 <= noteNumber && noteNumber <= 127)");
            return pitch.toUpperCase();
      }
}
SHARP= [+#] { return "^"; }
FLAT= [-] { return "_"; }
INTEGER= [0-9]+ { return parseInt(text(), 10); }
_ "whitespace"= [ \t\n\r]*