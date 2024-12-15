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
  function updateSharpFlats(octave, pitch, sharp, flat, sharpFlats) {
    let iPitch = "abcdefg".indexOf(pitch);
    sharpFlats[octave * 7 + iPitch] = sharp.length - flat.length;
  }
}}
{
  let track = 1;
  let isTimeShift = false;
  let tempo = defaultTempo;
  let timeShiftTempo = defaultTempo;

  let isNewLineTop;
  let isVolumeBeforeNote;
  let volume;
  let octave;
  let mmlNoteLength;
  let chordOctave;
  let chordAbcNoteLength;
  let isStaccato;
  let sharpFlats;
  initTrackParams();

  function initTrackParams() {
    isNewLineTop = true;
    isVolumeBeforeNote = true;
    volume = defaultMmlVolume;
    octave = defaultOctave;
    mmlNoteLength = defaultMmlNoteLength;
    chordOctave = null;
    chordAbcNoteLength = null;
    isStaccato = false;
    sharpFlats = new Array(/*abcdefg*/7 * /*octave 0～11*/12).fill(0);
  }

  function insertVolumeBeforeNoteOrRest(abc) {
    // 音符と休符とchordで共通処理にするため関数化した
    if (isVolumeBeforeNote) {
      // abcjsの音量指定の挙動に対応する用。音符と休符とchordの直前に音量指定を持ってくる必要がある。そうしないと音量指定が反映されない。
      abc = volume2abc(volume) + abc;
      isVolumeBeforeNote = false;
    }
    return abc;
  }

  function volume2abc(integer) {
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

  function createAbc(mml) {
    let abcTempo = `[Q:${defaultTempo}]`
    if (isTimeShift) {
      abcTempo = "!begin time shift!"
    }
    let abc = `V:1\n${abcTempo}` + mml;
    abc = postProcess(abc);
    return abc;
  }

  function postProcess(abc) {
    if (isTimeShift) {
      abc = abc.replace(/\[Q:\d+\]/g, "");
      abc = abc.replace(/!begin time shift!/g, `[Q:99999]`);
      abc = abc.replace(/!end time shift!/g, `[Q:${timeShiftTempo}]`);
    }
    return abc;
  }
}
MMLs=mmls:MML* { return createAbc(mmls.join('')); }
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
    /TIME_SHIFT
    /TRACK_SEPARATOR
NOTE=_ pitch:PITCH length:INTEGER? dot:"."* _ {
      isNewLineTop = false;
      pitch = insertVolumeBeforeNoteOrRest(pitch);
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
      let rest = 'z';
      rest = insertVolumeBeforeNoteOrRest(rest);
      const abcLength = getNoteLengthAbc(length ?? mmlNoteLength, dot.length);
      return rest + abcLength; }
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
        let abc = "[";
        abc = insertVolumeBeforeNoteOrRest(abc);
        return abc;
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
      tempo = integer ?? defaultTempo;
      return `[Q:${tempo}]`; }
VOLUME=_ "v" integer:INTEGER? _ {
  isNewLineTop = false;
  isVolumeBeforeNote = true;
  integer ??= defaultMmlVolume;
  volume = integer;
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
TIME_SHIFT=_ "!!" _ {
    isTimeShift = true;
    timeShiftTempo = tempo;
    return "!end time shift!"; }
TRACK_SEPARATOR=_ ";" _ {
                track++;
                let prefix = isNewLineTop ? "" : "\n";
                // MMLのスタンダードな仕様を継承し、新trackは @, v, l 等を初期化する
                initTrackParams();
                // abcjsは、
                //    新trackは前trackの @, v を引き継ぐ。
                //    !ffff!等の音量指定のあとに音符以外の改行やMIDI program changeを入れると音量指定が無効となってしまう。音量指定のあとに音符を入れてから改行等をすると音量が継続される。
                // mmlabc仕様は、
                //    新trackは、@, v 等はリセットとする。
                //    例えば旧trackで @1 v0 が指定されていても、
                //      新trackはmml2abcデフォルトの @0 v16 でスタートとする。
                //    これを実現するため、@ はtrack先頭に挿入する。
                //      v は最初の音符までステートとしてvを保持し、最初の音符直前にvを挿入して対処とする。複雑だが、やむなし。
                // 課題、こういったabcjsの想定外の挙動は、想定よりコストがかかる。なぜならTDDのスコープ外で、手動でabcで実際に鳴らしてのコストのかかるテストが必要となるため。ひとまず開発を進めて様子見する。
                return `${prefix}V:${track}\n[I:MIDI program 0]\n`; }

PITCH=pitch:[a-g] sharp:SHARP* flat:FLAT* {
      // sharp, flat, natural
      const oldSharpFlat = sharpFlats[octave * 7 + "abcdefg".indexOf(pitch)];
      updateSharpFlats(octave, pitch, sharp, flat, sharpFlats);
      const isNatural = (!sharp.length) && (!flat.length);
      if (isNatural && oldSharpFlat) {
        pitch = "=" + pitch; // こうしないと、ABCは前回の臨時記号が適用されるので（五線譜と同じ）
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