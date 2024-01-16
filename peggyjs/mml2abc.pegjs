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
  function updateSharpFlats(pitch, sharp, flat, sharpFlats) {
    let iPitch = "abcdefg".indexOf(pitch);
    sharpFlats[iPitch] = sharp.length - flat.length;
  }
}}
{
  let track = 1;

  let isNewLineTop;
  let octave;
  let mmlNoteLength;
  let chordOctave;
  let chordAbcNoteLength;
  let isStaccato;
  let sharpFlats;
  initTrackParams();

  function initTrackParams() {
    isNewLineTop = true;
    octave = defaultOctave;
    mmlNoteLength = defaultMmlNoteLength;
    chordOctave = null;
    chordAbcNoteLength = null;
    isStaccato = false;
    sharpFlats = [0,0,0,0,0,0,0]; // 並びはabcdefg
  }
}
MMLs=mmls:MML* { return "V:1\n[Q:120]" + mmls.join(''); }
MML=NOTE /REST
    /OCTAVE /OCTAVE_UP /OCTAVE_DOWN
    /NOTE_LENGTH
    /CHORD
    /PROGRAM_CHANGE
    /TEMPO
    /VOLUME
    /STACCATO
    /TRANSPOSE
    /REPEAT
    /INLINE_ABC
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
  isNewLineTop = true;
  integer ??= defaultMmlVolume;
  if (integer >= 16) {
    return "!ffff!\n";
  } else {
    // 改行を入れないと、abcjsが正常に演奏しないことがある
    switch (integer) {
      case 15: return "!fff!\n";
      case 14: return "!ff!\n";
      case 13: return "!f!\n";
      case 12: return "!f!\n";
      case 11: return "!mf!\n";
      case 10: return "!mf!\n";
      case  9: return "!mp!\n";
      case  8: return "!mp!\n";
      case  7: return "!p!\n";
      case  6: return "!p!\n";
      case  5: return "!pp!\n";
      case  4: return "!pp!\n";
      case  3: return "!ppp!\n";
      case  2: return "!ppp!\n";
      case  1: return "!pppp!\n";
      case  0: return "!pppp!\n";
      default:
          console.assert(false, "FIXME assert(0 <= integer && integer <= 32)");
          return "!ffff!\n";
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
REPEAT=_ "[" head:MML* "|"? tail:MML* "]" r:INTEGER? _ {
  head = head.join('');
  tail = tail.join('');
  r ??= 2;
  let result = "";
  for (let i = 0; i < r; i++) {
    if (i == r - 1) {
      result += head;
    } else {
      result += head + tail;
    }
  }
  return result; }
INLINE_ABC= "/*" abc:[^*/]+ "*/" { return abc.join(""); }
  // ↑ 問題、*と/を含むことができない。適切な書き方があるか把握できていない。対策、ひとまず試して様子見する
  // ↑ コメントを書くには、ABC側のコメントとして /*[r:ここにコメントを書く]*/ のように書く
TRACK_SEPARATOR=_ ";" _ {
                track++;
                let prefix = isNewLineTop ? "" : "\n";
                // MMLのスタンダードな仕様を継承し、新trackは @, v, l 等を初期化する
                initTrackParams();
                // abcjsは、新trackは前trackの @, v を引き継ぐ。
                // それをMMLのスタンダードにあわせるため、明示的に @, v を指定する。
                // これにより、例えば旧trackで @1 pppp が指定されていても、
                // 新trackは @0 ffff でスタートできる。
                // なおffffがデフォルトなのはSiONのデフォルトが音量最大であるため。ここはSiONの仕様をシンプルに踏襲することを優先する。
                // また、abcjsはffffがデフォルトのようである（根拠は、取り急ぎ聴いて確認したイメージ）。
                // !ffff!のあとの改行は、ないと異常な演奏となったのでひとまず対策用。V:のあとも同様。挙動のクセがabcjs側のupdateで変更する可能性もあるため、このようにrawでabcjsを書く場所は、無難に改行を入れておくとする。
                return `${prefix}V:${track}\n[I:MIDI program 0]\n!ffff!\n`; }

PITCH=pitch:[a-g] sharp:SHARP* flat:FLAT* {
      // sharp, flat, natural
      const oldSharpFlat = sharpFlats["abcdefg".indexOf(pitch)];
      updateSharpFlats(pitch, sharp, flat, sharpFlats);
      const isNatural = (!sharp.length) && (!flat.length);
      if (isNatural && oldSharpFlat) {
        pitch = "=" + pitch; // こうしないと前回の臨時記号が適用されるので（五線譜と同じ）
      } else {
        pitch = sharp.join('') + flat.join('') + pitch;
      }

      // octave
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