import { parse } from "../src/mml2abc.commonjs.js";
describe("mml2abc", () => {
    test("note length, pitch", () => {
        expect(parse("c8")).toEqual("C1");
    });
    test("複数note", () => {
        expect(parse("c8d8e8")).toEqual("C1D1E1");
    });
    test("octave", () => {
        expect(parse("c8<c8>c8")).toEqual("C1c1C1");
    });
    test("octave 5", () => {
        expect(parse("o5 c8 o4 c8")).toEqual("c1C1");
    });
    test("octave defualt", () => {
        expect(parse("o c8")).toEqual("C1");
    });
    test("index.htmlではparseを複数回呼ぶので、そのときoctaveがparseごとに初期化されることをテストする", () => {
        parse(">>>>");
        expect(parse("c8<c8>c8")).toEqual("C1c1C1");
    });
    test("rest", () => {
        expect(parse("r8")).toEqual("z1");
    });
    test("note length r", () => {
        expect(parse("l4r")).toEqual("z2");
    });
    test("note length l", () => {
        expect(parse("l4c")).toEqual("C2");
    });
    test("note length default", () => {
        expect(parse("l4clc")).toEqual("C2C1");
    });
    test("whitespace", () => {
        expect(parse("l4c lc")).toEqual("C2C1");
    });
    test("note length dot", () => {
        expect(parse("c4.")).toEqual("C3");
    });
    test("note length dot l", () => {
        expect(parse("l4c.")).toEqual("C3");
    });
    test("rest length dot", () => {
        expect(parse("r4.")).toEqual("z3");
    });
    test("rest length dot l", () => {
        expect(parse("l4r.")).toEqual("z3");
    });

    test("note length 複付点音符 現状用", () => {
        expect(parse("c4..")).toEqual("C3.5");
    });
    // FIXME
    // test("note length l16", () => {
    //     expect(parse("l16c")).toEqual("C/2");
    // });

    // FIXME o-1～o3, o5～o9, ABC notation octave
});