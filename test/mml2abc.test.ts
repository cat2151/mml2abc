import { parse } from "../src/mml2abc.commonjs.js";
describe("mml2abc", () => {
    const prefix = "V:1\n";
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
    test("chord ZMUSIC style ignore options", () => {
        expect(parse("'cegb',48,6")).toEqual(prefix + "[C2EGB]");
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
        expect(parse("@0 c")).toEqual(prefix + "[I:MIDI program 0]C2");
    });
    test("MIDI Program Change", () => {
        expect(parse("@0 c @4 e")).toEqual(prefix + "[I:MIDI program 0]C2[I:MIDI program 4]E2");
    });
    test("TRACK_SEPARATOR", () => {
        // abcjs issues候補:
        //  abcjsは [V:2] 形式のとき、
        //  program changeに失敗して V:1のprogram changeが使われてしまう。
        //  例： [V:1][I:MIDI program 18]C4[V:2][I:MIDI program 0]z4E4
        //  このため、改行を使う形式で対処した。
        expect(parse("g1; @38 o3c1")).toEqual(prefix + "G8\nV:2\n[I:MIDI program 38]C,,8");
    });
    test("TRACK_SEPARATOR", () => {
        expect(parse("c;e;g")).toEqual(prefix + "C2\nV:2\nE2\nV:3\nG2");
    });
    test("tempo BPM", () => {
        expect(parse("l8t60cdeft150gfed")).toEqual(prefix + "[Q:60]CDEF[Q:150]GFED");
    });
    test("tempo BPM default", () => {
        expect(parse("l8t150cdeftgfed")).toEqual(prefix + "[Q:150]CDEF[Q:120]GFED");
    });
    test("MML volume to ABC MIDI velocity", () => { // abcjs not recognized "%%MIDI control 7 50"
        expect(parse("l8 v8 c")).toEqual(prefix + "!mp!C");
    });
    test("MML volume to ABC MIDI velocity", () => {
        expect(parse("l8 vc v16c v0c")).toEqual(prefix + "!ffff!C!ffff!C!pppp!C");
    });
    test("MML q4 to ABC staccato", () => { // abc は staccato はあるが、それよりも細かいnote offタイミング制御はない
        expect(parse("l8 c q4 c")).toEqual(prefix + "C.C");
    });
    test("key transpose", () => {
        expect(parse("l8 kt2 c")).toEqual(prefix + '[K:transpose=2]\nC');
        // transposeは五線譜に影響しない。イメージは移調楽器。
        // abcjs issues候補:
        //  abcjsは 前後いずれかに改行がないとtransposeが有効にならない。
        //      例： C[K:transpose=2]C
        //      このため、改行を入れて対処した。
        //  abcjsは transpose 0 が無効である。2にしてから0に戻せない。
        //      例： "C[K:transpose=2]\nC[K:transpose=0]\nC"
        //      対処方法不明。
        //  abcjsは 複数trackに複数transposeがあるとき、
        //      V:2の先頭のtranposeが無視され、V:1の最後のtransposeが使われる。
        //      例： "V:1\nK:transpose=0\nC\nV:2\nK:transpose=3\nC"
        //      対処方法不明。
    });
    test("key transpose", () => {
        expect(parse("l8 kt-2 c")).toEqual(prefix + '[K:transpose=-2]\nC');
    });
    test("key transpose", () => {
        expect(parse("l8 c kt7; c")).toEqual(prefix + 'C[K:transpose=7]\nV:2\nC');
    });
    test("repeat", () => {
        expect(parse("l8[c]")).toEqual(prefix + 'CC');
    });
    test("repeat", () => {
        expect(parse("l8[c|[d|e]]3")).toEqual(prefix + 'CDEDCDEDC');
    });
    test("repeat", () => {
        expect(parse("l8[cc]")).toEqual(prefix + 'CCCC');
    });
    test("repeat", () => {
        expect(parse("l8[c<c]")).toEqual(prefix + 'CcCc');
    });
    test("bar", () => {
        expect(parse("/*|*/")).toEqual(prefix + '|');
    });
});