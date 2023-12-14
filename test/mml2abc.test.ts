import { parse } from "../src/mml2abc.commonjs.js";
describe("mml2abc", () => {
    const prefix = "V:TRACK1\n";
    test("note , pitch", () => {
        expect(parse("c")).toEqual(prefix + "C2");
    });
    test("note length", () => {
        expect(parse("c8")).toEqual(prefix + "C");
    });
    test("note length", () => {
        expect(parse("c4")).toEqual(prefix + "C2");
    });
    test("note length", () => {
        expect(parse("c1")).toEqual(prefix + "C8");
    });
    test("複数note", () => {
        expect(parse("l8 cde")).toEqual(prefix + "CDE");
    });
    test("octave", () => {
        expect(parse("l8 c<c>c")).toEqual(prefix + "CcC");
    });
    test("octave 5", () => {
        expect(parse("l8 o6 c o5 c")).toEqual(prefix + "cC");
    });
    test("octave defualt", () => {
        expect(parse("l8 o c")).toEqual(prefix + "C");
    });
    test("index.htmlではparseを複数回呼ぶので、そのときoctaveがparseごとに初期化されることをテストする", () => {
        parse(">>>>");
        expect(parse("l8 c<c>c")).toEqual(prefix + "CcC");
    });
    test("rest", () => {
        expect(parse("r")).toEqual(prefix + "z2");
    });
    test("rest", () => {
        expect(parse("r4")).toEqual(prefix + "z2");
    });
    test("note length r", () => {
        expect(parse("l4r")).toEqual(prefix + "z2");
    });
    test("note length l", () => {
        expect(parse("l4c")).toEqual(prefix + "C2");
    });
    test("note length default", () => {
        expect(parse("l4 c l c")).toEqual(prefix + "C2C2");
    });
    test("note length default", () => {
        expect(parse("l4 r l r")).toEqual(prefix + "z2z2");
    });
    test("whitespace", () => {
        expect(parse("l4 c l c")).toEqual(prefix + "C2C2");
    });
    test("note length dot", () => {
        expect(parse("c4.")).toEqual(prefix + "C3");
    });
    test("note length dot l", () => {
        expect(parse("l4c.")).toEqual(prefix + "C3");
    });
    test("rest length dot", () => {
        expect(parse("r4.")).toEqual(prefix + "z3");
    });
    test("rest length dot l", () => {
        expect(parse("l4r.")).toEqual(prefix + "z3");
    });
    test("note length l16", () => {
        expect(parse("l16c")).toEqual(prefix + "C/2");
    });
    test("note length l16", () => {
        expect(parse("c16")).toEqual(prefix + "C/2");
    });
    test("note length l32", () => {
        expect(parse("c32")).toEqual(prefix + "C/4");
    });
    test("note length l64", () => {
        expect(parse("c64")).toEqual(prefix + "C/8");
    });
    test("note length l12", () => {
        expect(parse("l12c")).toEqual(prefix + "C2/3");
    });
    test("note length l6", () => {
        expect(parse("l6c")).toEqual(prefix + "C4/3");
    });
    test("note length l24", () => {
        expect(parse("l24c")).toEqual(prefix + "C/3");
    });
    test("rest l16", () => {
        expect(parse("l16r")).toEqual(prefix + "z/2");
    });
    test("rest l16", () => {
        expect(parse("r16")).toEqual(prefix + "z/2");
    });
    test("rest l32", () => {
        expect(parse("r32")).toEqual(prefix + "z/4");
    });
    test("rest l64", () => {
        expect(parse("r64")).toEqual(prefix + "z/8");
    });
    test("複付点音符", () => {
        expect(parse("c4..")).toEqual(prefix + "C7/2");
    });
    test("複付点音符 rest", () => {
        expect(parse("r4..")).toEqual(prefix + "z7/2");
    });
    test("複付点音符", () => {
        expect(parse("l4c..")).toEqual(prefix + "C7/2");
    });
    test("複付点音符 rest", () => {
        expect(parse("l4r..")).toEqual(prefix + "z7/2");
    });
    test("octave", () => {
        expect(parse("l8 o4c")).toEqual(prefix + "C,");
    });
    test("octave", () => {
        expect(parse("l8 c o5 c>c>c>c>c>c")).toEqual(prefix + "CCC,C,,C,,,C,,,,C,,,,,");
    });
    test("octave", () => {
        expect(parse("l8 o6c")).toEqual(prefix + "c");
    });
    test("octave", () => {
        expect(parse("l8 o7c")).toEqual(prefix + "c'");
    });
    test("octave", () => {
        expect(parse("l8 c o5 c<c<c<c<c<c")).toEqual(prefix + "CCcc'c''c'''c''''");
    });
    test("chord ZMUSIC style", () => {
        expect(parse("l8 'cegb'")).toEqual(prefix + "[CEGB]");
    });
    test("chord ZMUSIC style", () => {
        expect(parse("l8 'c4egb'")).toEqual(prefix + "[C2EGB]");
    });
    test("chord ZMUSIC style octave reset", () => {
        expect(parse("l8 'e4gb<d' 'f4a<ce'")).toEqual(prefix + "[E2GBd][F2Ace]");
    });
    test("chord ZMUSIC style", () => {
        expect(parse("l4 'cegb'")).toEqual(prefix + "[C2EGB]");
    });
    test("chord ZMUSIC style", () => {
        expect(parse("l4 'c8egb'")).toEqual(prefix + "[CEGB]");
    });
    test("chord ZMUSIC style", () => {
        expect(parse("'c4.egb'")).toEqual(prefix + "[C3EGB]");
    });
    test("sharp", () => {
        expect(parse("l8 c+")).toEqual(prefix + "^C");
    });
    test("flat", () => {
        expect(parse("l8 c-")).toEqual(prefix + "_C");
    });
    test("double sharp", () => {
        expect(parse("l8 c++")).toEqual(prefix + "^^C");
    });
    test("double flat", () => {
        expect(parse("l8 c--")).toEqual(prefix + "__C");
    });
    test("MIDI Program Change", () => {
        expect(parse("@0 c")).toEqual(prefix + "%%MIDI program 0\nC2");
    });
    test("MIDI Program Change", () => {
        expect(parse("@0 c @4 e")).toEqual(prefix + "%%MIDI program 0\nC2\n%%MIDI program 4\nE2");
    });
    test("TRACK_SEPARATOR", () => {
        expect(parse("g1; @38 o3c1")).toEqual(prefix + "G8\nV:TRACK2\n%%MIDI program 38\nC,,8");
    });
    test("TRACK_SEPARATOR", () => {
        expect(parse("c;e;g")).toEqual(prefix + "C2\nV:TRACK2\nE2\nV:TRACK3\nG2");
    });
    // FIXME o3c 等が五線譜で見づらい。ABC notationではどう表示するのがセオリーか？を調査する
});