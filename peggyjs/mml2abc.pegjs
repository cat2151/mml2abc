{{
  const defaultOctave = 5;
  const defaultTempo = 120;
  const defaultMmlVolume = 16;
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
  let track = 1;
  let isNewLineTop = true;

  let octave = defaultOctave;
  let mmlNoteLength = defaultMmlNoteLength;
  let chordOctave = null;
  let chordAbcNoteLength = null;
  let isStaccato = false;
}
MMLs=mmls:MML* { return "V:1\n" + mmls.join(''); }
MML=NOTE /REST
    /OCTAVE /OCTAVE_UP /OCTAVE_DOWN
    /NOTE_LENGTH
    /CHORD
    /PROGRAM_CHANGE
    /TEMPO
    /VOLUME
    /STACCATO
    /TRANSPOSE
    /TRACK_SEPARATOR
NOTE=_ pitch:PITCH length:INTEGER? dot:"."* _ {
      isNewLineTop = false;
      if (isStaccato) pitch = "." + pitch;
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
REST=_ "r" length:INTEGER? dot:"."*_ {
      isNewLineTop = false;
      const abcLength = getNoteLengthAbc(length ?? mmlNoteLength, dot.length);
      return 'z' + abcLength; }
OCTAVE=_ "o" integer:INTEGER? _ {
        isNewLineTop = false;
        octave = integer ?? defaultOctave; }
OCTAVE_UP=_ "<" _ {
          isNewLineTop = false;
          octave++; }
OCTAVE_DOWN=_ ">" _ {
          isNewLineTop = false;
          octave--; }
NOTE_LENGTH=_ "l" length:INTEGER? _ {
            isNewLineTop = false;
            mmlNoteLength = length ?? defaultMmlNoteLength; }
CHORD=_ "'" ","? INTEGER? ","? INTEGER? _ {
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
PROGRAM_CHANGE=_ "@" integer:INTEGER _ {
              isNewLineTop = false;
              return `[I:MIDI program ${integer}]`; }
TEMPO=_ "t" integer:INTEGER? _ {
      isNewLineTop = false;
      return `[Q:${integer ?? defaultTempo}]`; }
VOLUME=_ "v" integer:INTEGER? _ {
  isNewLineTop = false;
  integer ??= defaultMmlVolume;
  if (integer >= 16) {
    return "!ffff!";
  } else {
    switch (integer) {
      case 15: return "!fff!";
      case 14: return "!ff!";
      case 13: return "!f!";
      case 12: return "!f!";
      case 11: return "!mf!";
      case 10: return "!mf!";
      case  9: return "!mp!";
      case  8: return "!mp!";
      case  7: return "!p!";
      case  6: return "!p!";
      case  5: return "!pp!";
      case  4: return "!pp!";
      case  3: return "!ppp!";
      case  2: return "!ppp!";
      case  1: return "!pppp!";
      case  0: return "!pppp!";
      default:
          console.assert(false, "FIXME assert(0 <= integer && integer <= 32)");
          return "!ffff!";
    }
  }
}
STACCATO=_ "q" integer:INTEGER? _ {
  isNewLineTop = false;
  switch (integer) {
    case 8: isStaccato = false; return "";
    case 7: isStaccato = false; return "";
    case 6: isStaccato = false; return "";
    case 5: isStaccato = false; return "";
    case 4: isStaccato = true;  return "";
    case 3: isStaccato = true;  return "";
    case 2: isStaccato = true;  return "";
    case 1: isStaccato = true;  return "";
    case 0: isStaccato = true;  return "";
    default:
        console.assert(false, "FIXME assert(0 <= integer && integer <= 8)");
        isStaccato = false; return "";
  }
}
TRANSPOSE=_ "kt" minus:MINUS? integer:INTEGER? _ {
          isNewLineTop = true;
          minus ??= "";
          integer ??= 0;
          return `[K:transpose=${minus}${integer}]\n`; }
TRACK_SEPARATOR=_ ";" _ {
                track++;
                let prefix = isNewLineTop ? "" : "\n";
                isNewLineTop = true;
                return `${prefix}V:${track}\n`; }

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
FLAT= "-" { return "_"; }
MINUS= "-"
INTEGER= [0-9]+ { return parseInt(text(), 10); }
_ "whitespace"= [ \t\n\r]*