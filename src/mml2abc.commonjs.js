// Generated by Peggy 3.0.2.
//
// https://peggyjs.org/

"use strict";


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

function peg$subclass(child, parent) {
  function C() { this.constructor = child; }
  C.prototype = parent.prototype;
  child.prototype = new C();
}

function peg$SyntaxError(message, expected, found, location) {
  var self = Error.call(this, message);
  // istanbul ignore next Check is a necessary evil to support older environments
  if (Object.setPrototypeOf) {
    Object.setPrototypeOf(self, peg$SyntaxError.prototype);
  }
  self.expected = expected;
  self.found = found;
  self.location = location;
  self.name = "SyntaxError";
  return self;
}

peg$subclass(peg$SyntaxError, Error);

function peg$padEnd(str, targetLength, padString) {
  padString = padString || " ";
  if (str.length > targetLength) { return str; }
  targetLength -= str.length;
  padString += padString.repeat(targetLength);
  return str + padString.slice(0, targetLength);
}

peg$SyntaxError.prototype.format = function(sources) {
  var str = "Error: " + this.message;
  if (this.location) {
    var src = null;
    var k;
    for (k = 0; k < sources.length; k++) {
      if (sources[k].source === this.location.source) {
        src = sources[k].text.split(/\r\n|\n|\r/g);
        break;
      }
    }
    var s = this.location.start;
    var offset_s = (this.location.source && (typeof this.location.source.offset === "function"))
      ? this.location.source.offset(s)
      : s;
    var loc = this.location.source + ":" + offset_s.line + ":" + offset_s.column;
    if (src) {
      var e = this.location.end;
      var filler = peg$padEnd("", offset_s.line.toString().length, ' ');
      var line = src[s.line - 1];
      var last = s.line === e.line ? e.column : line.length + 1;
      var hatLen = (last - s.column) || 1;
      str += "\n --> " + loc + "\n"
          + filler + " |\n"
          + offset_s.line + " | " + line + "\n"
          + filler + " | " + peg$padEnd("", s.column - 1, ' ')
          + peg$padEnd("", hatLen, "^");
    } else {
      str += "\n at " + loc;
    }
  }
  return str;
};

peg$SyntaxError.buildMessage = function(expected, found) {
  var DESCRIBE_EXPECTATION_FNS = {
    literal: function(expectation) {
      return "\"" + literalEscape(expectation.text) + "\"";
    },

    class: function(expectation) {
      var escapedParts = expectation.parts.map(function(part) {
        return Array.isArray(part)
          ? classEscape(part[0]) + "-" + classEscape(part[1])
          : classEscape(part);
      });

      return "[" + (expectation.inverted ? "^" : "") + escapedParts.join("") + "]";
    },

    any: function() {
      return "any character";
    },

    end: function() {
      return "end of input";
    },

    other: function(expectation) {
      return expectation.description;
    }
  };

  function hex(ch) {
    return ch.charCodeAt(0).toString(16).toUpperCase();
  }

  function literalEscape(s) {
    return s
      .replace(/\\/g, "\\\\")
      .replace(/"/g,  "\\\"")
      .replace(/\0/g, "\\0")
      .replace(/\t/g, "\\t")
      .replace(/\n/g, "\\n")
      .replace(/\r/g, "\\r")
      .replace(/[\x00-\x0F]/g,          function(ch) { return "\\x0" + hex(ch); })
      .replace(/[\x10-\x1F\x7F-\x9F]/g, function(ch) { return "\\x"  + hex(ch); });
  }

  function classEscape(s) {
    return s
      .replace(/\\/g, "\\\\")
      .replace(/\]/g, "\\]")
      .replace(/\^/g, "\\^")
      .replace(/-/g,  "\\-")
      .replace(/\0/g, "\\0")
      .replace(/\t/g, "\\t")
      .replace(/\n/g, "\\n")
      .replace(/\r/g, "\\r")
      .replace(/[\x00-\x0F]/g,          function(ch) { return "\\x0" + hex(ch); })
      .replace(/[\x10-\x1F\x7F-\x9F]/g, function(ch) { return "\\x"  + hex(ch); });
  }

  function describeExpectation(expectation) {
    return DESCRIBE_EXPECTATION_FNS[expectation.type](expectation);
  }

  function describeExpected(expected) {
    var descriptions = expected.map(describeExpectation);
    var i, j;

    descriptions.sort();

    if (descriptions.length > 0) {
      for (i = 1, j = 1; i < descriptions.length; i++) {
        if (descriptions[i - 1] !== descriptions[i]) {
          descriptions[j] = descriptions[i];
          j++;
        }
      }
      descriptions.length = j;
    }

    switch (descriptions.length) {
      case 1:
        return descriptions[0];

      case 2:
        return descriptions[0] + " or " + descriptions[1];

      default:
        return descriptions.slice(0, -1).join(", ")
          + ", or "
          + descriptions[descriptions.length - 1];
    }
  }

  function describeFound(found) {
    return found ? "\"" + literalEscape(found) + "\"" : "end of input";
  }

  return "Expected " + describeExpected(expected) + " but " + describeFound(found) + " found.";
};

function peg$parse(input, options) {
  options = options !== undefined ? options : {};

  var peg$FAILED = {};
  var peg$source = options.grammarSource;

  var peg$startRuleFunctions = { MMLs: peg$parseMMLs };
  var peg$startRuleFunction = peg$parseMMLs;

  var peg$c0 = ".";
  var peg$c1 = "r";
  var peg$c2 = "o";
  var peg$c3 = "<";
  var peg$c4 = ">";
  var peg$c5 = "l";
  var peg$c6 = "'";
  var peg$c7 = ",";
  var peg$c8 = "@";
  var peg$c9 = "t";
  var peg$c10 = "v";
  var peg$c11 = "q";
  var peg$c12 = "kt";
  var peg$c13 = "[";
  var peg$c14 = "|";
  var peg$c15 = "]";
  var peg$c16 = "/*";
  var peg$c17 = "*/";
  var peg$c18 = ";";
  var peg$c19 = "-";

  var peg$r0 = /^[^*\/]/;
  var peg$r1 = /^[a-g]/;
  var peg$r2 = /^[+#]/;
  var peg$r3 = /^[0-9]/;
  var peg$r4 = /^[ \t\n\r]/;

  var peg$e0 = peg$literalExpectation(".", false);
  var peg$e1 = peg$literalExpectation("r", false);
  var peg$e2 = peg$literalExpectation("o", false);
  var peg$e3 = peg$literalExpectation("<", false);
  var peg$e4 = peg$literalExpectation(">", false);
  var peg$e5 = peg$literalExpectation("l", false);
  var peg$e6 = peg$literalExpectation("'", false);
  var peg$e7 = peg$literalExpectation(",", false);
  var peg$e8 = peg$literalExpectation("@", false);
  var peg$e9 = peg$literalExpectation("t", false);
  var peg$e10 = peg$literalExpectation("v", false);
  var peg$e11 = peg$literalExpectation("q", false);
  var peg$e12 = peg$literalExpectation("kt", false);
  var peg$e13 = peg$literalExpectation("[", false);
  var peg$e14 = peg$literalExpectation("|", false);
  var peg$e15 = peg$literalExpectation("]", false);
  var peg$e16 = peg$literalExpectation("/*", false);
  var peg$e17 = peg$classExpectation(["*", "/"], true, false);
  var peg$e18 = peg$literalExpectation("*/", false);
  var peg$e19 = peg$literalExpectation(";", false);
  var peg$e20 = peg$classExpectation([["a", "g"]], false, false);
  var peg$e21 = peg$classExpectation(["+", "#"], false, false);
  var peg$e22 = peg$literalExpectation("-", false);
  var peg$e23 = peg$classExpectation([["0", "9"]], false, false);
  var peg$e24 = peg$otherExpectation("whitespace");
  var peg$e25 = peg$classExpectation([" ", "\t", "\n", "\r"], false, false);

  var peg$f0 = function(mmls) { return "V:1\n[Q:120]" + mmls.join(''); };
  var peg$f1 = function(pitch, length, dot) {
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
      } };
  var peg$f2 = function(length, dot) {
      isNewLineTop = false;
      const abcLength = getNoteLengthAbc(length ?? mmlNoteLength, dot.length);
      return 'z' + abcLength; };
  var peg$f3 = function(integer) {
        isNewLineTop = false;
        octave = integer ?? defaultOctave; };
  var peg$f4 = function() {
          isNewLineTop = false;
          octave++; };
  var peg$f5 = function() {
          isNewLineTop = false;
          octave--; };
  var peg$f6 = function(length) {
            isNewLineTop = false;
            mmlNoteLength = length ?? defaultMmlNoteLength; };
  var peg$f7 = function() {
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
      } };
  var peg$f8 = function(integer) {
              isNewLineTop = false;
              return `[I:MIDI program ${integer}]`; };
  var peg$f9 = function(integer) {
      isNewLineTop = false;
      return `[Q:${integer ?? defaultTempo}]`; };
  var peg$f10 = function(integer) {
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
};
  var peg$f11 = function(integer) {
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
};
  var peg$f12 = function(minus, integer) {
          isNewLineTop = true;
          minus ??= "";
          integer ??= 0;
          return `[K:transpose=${minus}${integer}]\n`; };
  var peg$f13 = function(head, tail, r) {
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
  return result; };
  var peg$f14 = function(abc) { return abc.join(""); };
  var peg$f15 = function() {
                track++;
                let prefix = isNewLineTop ? "" : "\n";
                isNewLineTop = true;
                return `${prefix}V:${track}\n`; };
  var peg$f16 = function(pitch, sharp, flat) {
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
};
  var peg$f17 = function() { return "^"; };
  var peg$f18 = function() { return "_"; };
  var peg$f19 = function() { return parseInt(text(), 10); };
  var peg$currPos = 0;
  var peg$savedPos = 0;
  var peg$posDetailsCache = [{ line: 1, column: 1 }];
  var peg$maxFailPos = 0;
  var peg$maxFailExpected = [];
  var peg$silentFails = 0;

  var peg$result;

  if ("startRule" in options) {
    if (!(options.startRule in peg$startRuleFunctions)) {
      throw new Error("Can't start parsing from rule \"" + options.startRule + "\".");
    }

    peg$startRuleFunction = peg$startRuleFunctions[options.startRule];
  }

  function text() {
    return input.substring(peg$savedPos, peg$currPos);
  }

  function offset() {
    return peg$savedPos;
  }

  function range() {
    return {
      source: peg$source,
      start: peg$savedPos,
      end: peg$currPos
    };
  }

  function location() {
    return peg$computeLocation(peg$savedPos, peg$currPos);
  }

  function expected(description, location) {
    location = location !== undefined
      ? location
      : peg$computeLocation(peg$savedPos, peg$currPos);

    throw peg$buildStructuredError(
      [peg$otherExpectation(description)],
      input.substring(peg$savedPos, peg$currPos),
      location
    );
  }

  function error(message, location) {
    location = location !== undefined
      ? location
      : peg$computeLocation(peg$savedPos, peg$currPos);

    throw peg$buildSimpleError(message, location);
  }

  function peg$literalExpectation(text, ignoreCase) {
    return { type: "literal", text: text, ignoreCase: ignoreCase };
  }

  function peg$classExpectation(parts, inverted, ignoreCase) {
    return { type: "class", parts: parts, inverted: inverted, ignoreCase: ignoreCase };
  }

  function peg$anyExpectation() {
    return { type: "any" };
  }

  function peg$endExpectation() {
    return { type: "end" };
  }

  function peg$otherExpectation(description) {
    return { type: "other", description: description };
  }

  function peg$computePosDetails(pos) {
    var details = peg$posDetailsCache[pos];
    var p;

    if (details) {
      return details;
    } else {
      p = pos - 1;
      while (!peg$posDetailsCache[p]) {
        p--;
      }

      details = peg$posDetailsCache[p];
      details = {
        line: details.line,
        column: details.column
      };

      while (p < pos) {
        if (input.charCodeAt(p) === 10) {
          details.line++;
          details.column = 1;
        } else {
          details.column++;
        }

        p++;
      }

      peg$posDetailsCache[pos] = details;

      return details;
    }
  }

  function peg$computeLocation(startPos, endPos, offset) {
    var startPosDetails = peg$computePosDetails(startPos);
    var endPosDetails = peg$computePosDetails(endPos);

    var res = {
      source: peg$source,
      start: {
        offset: startPos,
        line: startPosDetails.line,
        column: startPosDetails.column
      },
      end: {
        offset: endPos,
        line: endPosDetails.line,
        column: endPosDetails.column
      }
    };
    if (offset && peg$source && (typeof peg$source.offset === "function")) {
      res.start = peg$source.offset(res.start);
      res.end = peg$source.offset(res.end);
    }
    return res;
  }

  function peg$fail(expected) {
    if (peg$currPos < peg$maxFailPos) { return; }

    if (peg$currPos > peg$maxFailPos) {
      peg$maxFailPos = peg$currPos;
      peg$maxFailExpected = [];
    }

    peg$maxFailExpected.push(expected);
  }

  function peg$buildSimpleError(message, location) {
    return new peg$SyntaxError(message, null, null, location);
  }

  function peg$buildStructuredError(expected, found, location) {
    return new peg$SyntaxError(
      peg$SyntaxError.buildMessage(expected, found),
      expected,
      found,
      location
    );
  }

  function peg$parseMMLs() {
    var s0, s1, s2;

    s0 = peg$currPos;
    s1 = [];
    s2 = peg$parseMML();
    while (s2 !== peg$FAILED) {
      s1.push(s2);
      s2 = peg$parseMML();
    }
    peg$savedPos = s0;
    s1 = peg$f0(s1);
    s0 = s1;

    return s0;
  }

  function peg$parseMML() {
    var s0;

    s0 = peg$parseNOTE();
    if (s0 === peg$FAILED) {
      s0 = peg$parseREST();
      if (s0 === peg$FAILED) {
        s0 = peg$parseOCTAVE();
        if (s0 === peg$FAILED) {
          s0 = peg$parseOCTAVE_UP();
          if (s0 === peg$FAILED) {
            s0 = peg$parseOCTAVE_DOWN();
            if (s0 === peg$FAILED) {
              s0 = peg$parseNOTE_LENGTH();
              if (s0 === peg$FAILED) {
                s0 = peg$parseCHORD();
                if (s0 === peg$FAILED) {
                  s0 = peg$parsePROGRAM_CHANGE();
                  if (s0 === peg$FAILED) {
                    s0 = peg$parseTEMPO();
                    if (s0 === peg$FAILED) {
                      s0 = peg$parseVOLUME();
                      if (s0 === peg$FAILED) {
                        s0 = peg$parseSTACCATO();
                        if (s0 === peg$FAILED) {
                          s0 = peg$parseTRANSPOSE();
                          if (s0 === peg$FAILED) {
                            s0 = peg$parseREPEAT();
                            if (s0 === peg$FAILED) {
                              s0 = peg$parseINLINE_ABC();
                              if (s0 === peg$FAILED) {
                                s0 = peg$parseTRACK_SEPARATOR();
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }

    return s0;
  }

  function peg$parseNOTE() {
    var s0, s1, s2, s3, s4, s5;

    s0 = peg$currPos;
    s1 = peg$parse_();
    s2 = peg$parsePITCH();
    if (s2 !== peg$FAILED) {
      s3 = peg$parseINTEGER();
      if (s3 === peg$FAILED) {
        s3 = null;
      }
      s4 = [];
      if (input.charCodeAt(peg$currPos) === 46) {
        s5 = peg$c0;
        peg$currPos++;
      } else {
        s5 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$e0); }
      }
      while (s5 !== peg$FAILED) {
        s4.push(s5);
        if (input.charCodeAt(peg$currPos) === 46) {
          s5 = peg$c0;
          peg$currPos++;
        } else {
          s5 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$e0); }
        }
      }
      s5 = peg$parse_();
      peg$savedPos = s0;
      s0 = peg$f1(s2, s3, s4);
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseREST() {
    var s0, s1, s2, s3, s4, s5;

    s0 = peg$currPos;
    s1 = peg$parse_();
    if (input.charCodeAt(peg$currPos) === 114) {
      s2 = peg$c1;
      peg$currPos++;
    } else {
      s2 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$e1); }
    }
    if (s2 !== peg$FAILED) {
      s3 = peg$parseINTEGER();
      if (s3 === peg$FAILED) {
        s3 = null;
      }
      s4 = [];
      if (input.charCodeAt(peg$currPos) === 46) {
        s5 = peg$c0;
        peg$currPos++;
      } else {
        s5 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$e0); }
      }
      while (s5 !== peg$FAILED) {
        s4.push(s5);
        if (input.charCodeAt(peg$currPos) === 46) {
          s5 = peg$c0;
          peg$currPos++;
        } else {
          s5 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$e0); }
        }
      }
      s5 = peg$parse_();
      peg$savedPos = s0;
      s0 = peg$f2(s3, s4);
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseOCTAVE() {
    var s0, s1, s2, s3, s4;

    s0 = peg$currPos;
    s1 = peg$parse_();
    if (input.charCodeAt(peg$currPos) === 111) {
      s2 = peg$c2;
      peg$currPos++;
    } else {
      s2 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$e2); }
    }
    if (s2 !== peg$FAILED) {
      s3 = peg$parseINTEGER();
      if (s3 === peg$FAILED) {
        s3 = null;
      }
      s4 = peg$parse_();
      peg$savedPos = s0;
      s0 = peg$f3(s3);
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseOCTAVE_UP() {
    var s0, s1, s2, s3;

    s0 = peg$currPos;
    s1 = peg$parse_();
    if (input.charCodeAt(peg$currPos) === 60) {
      s2 = peg$c3;
      peg$currPos++;
    } else {
      s2 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$e3); }
    }
    if (s2 !== peg$FAILED) {
      s3 = peg$parse_();
      peg$savedPos = s0;
      s0 = peg$f4();
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseOCTAVE_DOWN() {
    var s0, s1, s2, s3;

    s0 = peg$currPos;
    s1 = peg$parse_();
    if (input.charCodeAt(peg$currPos) === 62) {
      s2 = peg$c4;
      peg$currPos++;
    } else {
      s2 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$e4); }
    }
    if (s2 !== peg$FAILED) {
      s3 = peg$parse_();
      peg$savedPos = s0;
      s0 = peg$f5();
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseNOTE_LENGTH() {
    var s0, s1, s2, s3, s4;

    s0 = peg$currPos;
    s1 = peg$parse_();
    if (input.charCodeAt(peg$currPos) === 108) {
      s2 = peg$c5;
      peg$currPos++;
    } else {
      s2 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$e5); }
    }
    if (s2 !== peg$FAILED) {
      s3 = peg$parseINTEGER();
      if (s3 === peg$FAILED) {
        s3 = null;
      }
      s4 = peg$parse_();
      peg$savedPos = s0;
      s0 = peg$f6(s3);
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseCHORD() {
    var s0, s1, s2, s3, s4, s5, s6, s7;

    s0 = peg$currPos;
    s1 = peg$parse_();
    if (input.charCodeAt(peg$currPos) === 39) {
      s2 = peg$c6;
      peg$currPos++;
    } else {
      s2 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$e6); }
    }
    if (s2 !== peg$FAILED) {
      if (input.charCodeAt(peg$currPos) === 44) {
        s3 = peg$c7;
        peg$currPos++;
      } else {
        s3 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$e7); }
      }
      if (s3 === peg$FAILED) {
        s3 = null;
      }
      s4 = peg$parseINTEGER();
      if (s4 === peg$FAILED) {
        s4 = null;
      }
      if (input.charCodeAt(peg$currPos) === 44) {
        s5 = peg$c7;
        peg$currPos++;
      } else {
        s5 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$e7); }
      }
      if (s5 === peg$FAILED) {
        s5 = null;
      }
      s6 = peg$parseINTEGER();
      if (s6 === peg$FAILED) {
        s6 = null;
      }
      s7 = peg$parse_();
      peg$savedPos = s0;
      s0 = peg$f7();
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parsePROGRAM_CHANGE() {
    var s0, s1, s2, s3, s4;

    s0 = peg$currPos;
    s1 = peg$parse_();
    if (input.charCodeAt(peg$currPos) === 64) {
      s2 = peg$c8;
      peg$currPos++;
    } else {
      s2 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$e8); }
    }
    if (s2 !== peg$FAILED) {
      s3 = peg$parseINTEGER();
      if (s3 !== peg$FAILED) {
        s4 = peg$parse_();
        peg$savedPos = s0;
        s0 = peg$f8(s3);
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseTEMPO() {
    var s0, s1, s2, s3, s4;

    s0 = peg$currPos;
    s1 = peg$parse_();
    if (input.charCodeAt(peg$currPos) === 116) {
      s2 = peg$c9;
      peg$currPos++;
    } else {
      s2 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$e9); }
    }
    if (s2 !== peg$FAILED) {
      s3 = peg$parseINTEGER();
      if (s3 === peg$FAILED) {
        s3 = null;
      }
      s4 = peg$parse_();
      peg$savedPos = s0;
      s0 = peg$f9(s3);
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseVOLUME() {
    var s0, s1, s2, s3, s4;

    s0 = peg$currPos;
    s1 = peg$parse_();
    if (input.charCodeAt(peg$currPos) === 118) {
      s2 = peg$c10;
      peg$currPos++;
    } else {
      s2 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$e10); }
    }
    if (s2 !== peg$FAILED) {
      s3 = peg$parseINTEGER();
      if (s3 === peg$FAILED) {
        s3 = null;
      }
      s4 = peg$parse_();
      peg$savedPos = s0;
      s0 = peg$f10(s3);
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseSTACCATO() {
    var s0, s1, s2, s3, s4;

    s0 = peg$currPos;
    s1 = peg$parse_();
    if (input.charCodeAt(peg$currPos) === 113) {
      s2 = peg$c11;
      peg$currPos++;
    } else {
      s2 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$e11); }
    }
    if (s2 !== peg$FAILED) {
      s3 = peg$parseINTEGER();
      if (s3 === peg$FAILED) {
        s3 = null;
      }
      s4 = peg$parse_();
      peg$savedPos = s0;
      s0 = peg$f11(s3);
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseTRANSPOSE() {
    var s0, s1, s2, s3, s4, s5;

    s0 = peg$currPos;
    s1 = peg$parse_();
    if (input.substr(peg$currPos, 2) === peg$c12) {
      s2 = peg$c12;
      peg$currPos += 2;
    } else {
      s2 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$e12); }
    }
    if (s2 !== peg$FAILED) {
      s3 = peg$parseMINUS();
      if (s3 === peg$FAILED) {
        s3 = null;
      }
      s4 = peg$parseINTEGER();
      if (s4 === peg$FAILED) {
        s4 = null;
      }
      s5 = peg$parse_();
      peg$savedPos = s0;
      s0 = peg$f12(s3, s4);
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseREPEAT() {
    var s0, s1, s2, s3, s4, s5, s6, s7, s8;

    s0 = peg$currPos;
    s1 = peg$parse_();
    if (input.charCodeAt(peg$currPos) === 91) {
      s2 = peg$c13;
      peg$currPos++;
    } else {
      s2 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$e13); }
    }
    if (s2 !== peg$FAILED) {
      s3 = [];
      s4 = peg$parseMML();
      while (s4 !== peg$FAILED) {
        s3.push(s4);
        s4 = peg$parseMML();
      }
      if (input.charCodeAt(peg$currPos) === 124) {
        s4 = peg$c14;
        peg$currPos++;
      } else {
        s4 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$e14); }
      }
      if (s4 === peg$FAILED) {
        s4 = null;
      }
      s5 = [];
      s6 = peg$parseMML();
      while (s6 !== peg$FAILED) {
        s5.push(s6);
        s6 = peg$parseMML();
      }
      if (input.charCodeAt(peg$currPos) === 93) {
        s6 = peg$c15;
        peg$currPos++;
      } else {
        s6 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$e15); }
      }
      if (s6 !== peg$FAILED) {
        s7 = peg$parseINTEGER();
        if (s7 === peg$FAILED) {
          s7 = null;
        }
        s8 = peg$parse_();
        peg$savedPos = s0;
        s0 = peg$f13(s3, s5, s7);
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseINLINE_ABC() {
    var s0, s1, s2, s3;

    s0 = peg$currPos;
    if (input.substr(peg$currPos, 2) === peg$c16) {
      s1 = peg$c16;
      peg$currPos += 2;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$e16); }
    }
    if (s1 !== peg$FAILED) {
      s2 = [];
      if (peg$r0.test(input.charAt(peg$currPos))) {
        s3 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s3 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$e17); }
      }
      if (s3 !== peg$FAILED) {
        while (s3 !== peg$FAILED) {
          s2.push(s3);
          if (peg$r0.test(input.charAt(peg$currPos))) {
            s3 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s3 = peg$FAILED;
            if (peg$silentFails === 0) { peg$fail(peg$e17); }
          }
        }
      } else {
        s2 = peg$FAILED;
      }
      if (s2 !== peg$FAILED) {
        if (input.substr(peg$currPos, 2) === peg$c17) {
          s3 = peg$c17;
          peg$currPos += 2;
        } else {
          s3 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$e18); }
        }
        if (s3 !== peg$FAILED) {
          peg$savedPos = s0;
          s0 = peg$f14(s2);
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$FAILED;
      }
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseTRACK_SEPARATOR() {
    var s0, s1, s2, s3;

    s0 = peg$currPos;
    s1 = peg$parse_();
    if (input.charCodeAt(peg$currPos) === 59) {
      s2 = peg$c18;
      peg$currPos++;
    } else {
      s2 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$e19); }
    }
    if (s2 !== peg$FAILED) {
      s3 = peg$parse_();
      peg$savedPos = s0;
      s0 = peg$f15();
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parsePITCH() {
    var s0, s1, s2, s3, s4;

    s0 = peg$currPos;
    if (peg$r1.test(input.charAt(peg$currPos))) {
      s1 = input.charAt(peg$currPos);
      peg$currPos++;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$e20); }
    }
    if (s1 !== peg$FAILED) {
      s2 = [];
      s3 = peg$parseSHARP();
      while (s3 !== peg$FAILED) {
        s2.push(s3);
        s3 = peg$parseSHARP();
      }
      s3 = [];
      s4 = peg$parseFLAT();
      while (s4 !== peg$FAILED) {
        s3.push(s4);
        s4 = peg$parseFLAT();
      }
      peg$savedPos = s0;
      s0 = peg$f16(s1, s2, s3);
    } else {
      peg$currPos = s0;
      s0 = peg$FAILED;
    }

    return s0;
  }

  function peg$parseSHARP() {
    var s0, s1;

    s0 = peg$currPos;
    if (peg$r2.test(input.charAt(peg$currPos))) {
      s1 = input.charAt(peg$currPos);
      peg$currPos++;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$e21); }
    }
    if (s1 !== peg$FAILED) {
      peg$savedPos = s0;
      s1 = peg$f17();
    }
    s0 = s1;

    return s0;
  }

  function peg$parseFLAT() {
    var s0, s1;

    s0 = peg$currPos;
    if (input.charCodeAt(peg$currPos) === 45) {
      s1 = peg$c19;
      peg$currPos++;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$e22); }
    }
    if (s1 !== peg$FAILED) {
      peg$savedPos = s0;
      s1 = peg$f18();
    }
    s0 = s1;

    return s0;
  }

  function peg$parseMINUS() {
    var s0;

    if (input.charCodeAt(peg$currPos) === 45) {
      s0 = peg$c19;
      peg$currPos++;
    } else {
      s0 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$e22); }
    }

    return s0;
  }

  function peg$parseINTEGER() {
    var s0, s1, s2;

    s0 = peg$currPos;
    s1 = [];
    if (peg$r3.test(input.charAt(peg$currPos))) {
      s2 = input.charAt(peg$currPos);
      peg$currPos++;
    } else {
      s2 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$e23); }
    }
    if (s2 !== peg$FAILED) {
      while (s2 !== peg$FAILED) {
        s1.push(s2);
        if (peg$r3.test(input.charAt(peg$currPos))) {
          s2 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) { peg$fail(peg$e23); }
        }
      }
    } else {
      s1 = peg$FAILED;
    }
    if (s1 !== peg$FAILED) {
      peg$savedPos = s0;
      s1 = peg$f19();
    }
    s0 = s1;

    return s0;
  }

  function peg$parse_() {
    var s0, s1;

    peg$silentFails++;
    s0 = [];
    if (peg$r4.test(input.charAt(peg$currPos))) {
      s1 = input.charAt(peg$currPos);
      peg$currPos++;
    } else {
      s1 = peg$FAILED;
      if (peg$silentFails === 0) { peg$fail(peg$e25); }
    }
    while (s1 !== peg$FAILED) {
      s0.push(s1);
      if (peg$r4.test(input.charAt(peg$currPos))) {
        s1 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) { peg$fail(peg$e25); }
      }
    }
    peg$silentFails--;
    s1 = peg$FAILED;
    if (peg$silentFails === 0) { peg$fail(peg$e24); }

    return s0;
  }


  let track = 1;
  let isNewLineTop = true;

  let octave = defaultOctave;
  let mmlNoteLength = defaultMmlNoteLength;
  let chordOctave = null;
  let chordAbcNoteLength = null;
  let isStaccato = false;
  let sharpFlats = [0,0,0,0,0,0,0]; // 並びはabcdefg

  peg$result = peg$startRuleFunction();

  if (peg$result !== peg$FAILED && peg$currPos === input.length) {
    return peg$result;
  } else {
    if (peg$result !== peg$FAILED && peg$currPos < input.length) {
      peg$fail(peg$endExpectation());
    }

    throw peg$buildStructuredError(
      peg$maxFailExpected,
      peg$maxFailPos < input.length ? input.charAt(peg$maxFailPos) : null,
      peg$maxFailPos < input.length
        ? peg$computeLocation(peg$maxFailPos, peg$maxFailPos + 1)
        : peg$computeLocation(peg$maxFailPos, peg$maxFailPos)
    );
  }
}

module.exports = {
  SyntaxError: peg$SyntaxError,
  parse: peg$parse
};
