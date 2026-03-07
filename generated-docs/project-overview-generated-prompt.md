Last updated: 2026-03-08


# プロジェクト概要生成プロンプト（来訪者向け）

## 生成するもの：
- projectを3行で要約する
- プロジェクトで使用されている技術スタックをカテゴリ別に整理して説明する
- プロジェクト全体のファイル階層ツリー（ディレクトリ構造を図解）
- プロジェクト全体のファイルそれぞれの説明
- プロジェクト全体の関数それぞれの説明
- プロジェクト全体の関数の呼び出し階層ツリー

## 生成しないもの：
- Issues情報（開発者向け情報のため）
- 次の一手候補（開発者向け情報のため）
- ハルシネーションしそうなもの（例、存在しない機能や計画を勝手に妄想する等）

## 出力フォーマット：
以下のMarkdown形式で出力してください：

```markdown
# Project Overview

## プロジェクト概要
[以下の形式で3行でプロジェクトを要約]
- [1行目の説明]
- [2行目の説明]
- [3行目の説明]

## 技術スタック
[使用している技術をカテゴリ別に整理して説明]
- フロントエンド: [フロントエンド技術とその説明]
- 音楽・オーディオ: [音楽・オーディオ関連技術とその説明]
- 開発ツール: [開発支援ツールとその説明]
- テスト: [テスト関連技術とその説明]
- ビルドツール: [ビルド・パース関連技術とその説明]
- 言語機能: [言語仕様・機能とその説明]
- 自動化・CI/CD: [自動化・継続的統合関連技術とその説明]
- 開発標準: [コード品質・統一ルール関連技術とその説明]

## ファイル階層ツリー
```
[プロジェクトのディレクトリ構造をツリー形式で表現]
```

## ファイル詳細説明
[各ファイルの役割と機能を詳細に説明]

## 関数詳細説明
[各関数の役割、引数、戻り値、機能を詳細に説明]

## 関数呼び出し階層ツリー
```
[関数間の呼び出し関係をツリー形式で表現]
```
```


以下のプロジェクト情報を参考にして要約を生成してください：

## プロジェクト情報
名前: 20231210a_mml2abc_and_easyabcjs6
説明: # mml2abc

<p align="left">
  <a href="README.ja.md"><img src="https://img.shields.io/badge/🇯🇵-Japanese-red.svg" alt="Japanese"></a>
  <a href="README.md"><img src="https://img.shields.io/badge/🇺🇸-English-blue.svg" alt="English"></a>
  <a href="https://deepwiki.com/cat2151/mml2abc"><img src="https://deepwiki.com/badge.svg" alt="Ask DeepWiki"></a>
  <a href="https://cat2151.github.io/mml2abc/dist/"><img src="https://img.shields.io/badge/🌐-Live%20Demo-green.svg" alt="Live Demo"></a>
</p>

A library transpiles Music Macro Language into ABC music notation.

# Demo
https://cat2151.github.io/mml2abc/dist/

# Features
- text to textのシンプルなJavaScriptライブラリ
- MML から [abcjs](https://github.com/paulrosen/abcjs) 用の ABC music notation を生成
  - abcjsは、ブラウザで五線譜を描画しつつSoundFont GM音源ソフトシンセを鳴らすライブラリです
- mml2abcの用途は？
  - ブラウザで音を鳴らす用
    - MMLを書いてabcjsを鳴らす用
  - ObsidianでMMLを書いて音を鳴らす用

# Requirement
- ブラウザで鳴らす場合
  - index.htmlをちょっと書けば音が鳴ります
- Obsidianで鳴らす場合
  - 開発中です
- Windows上のコマンドラインで鳴らす場合
  - 未調査です。
    - スコープ外とします。「ObsidianでMMLを書いて音を鳴らす」を優先します。
      - abcjsがObsidianつまりChromiumで音を鳴らせるため、なんらかの方法はありそうです。未調査です。
      - abcjsに限らず、ABC music notationを入力としてaudioを出力できる、コマンドラインのソフトシンセがあるか？未調査です。

# Installation
- mml2abcをwebpageで使う手順は？
  - サンプルを用意しました。[easymmlabc](https://github.com/cat2151/easymmlabc/)を参照ください
- ObsidianでMMLで音を鳴らす手順は？
  - 開発中です。mml2abcを [Obsidian ABC.JS plugin](https://github.com/abcjs-music/obsidian-plugin-abcjs)のforkに組み込む予定です

# Usage
- mml2abcをimportして、関数に引数を渡します
- 具体例は[easymmlabc](https://github.com/cat2151/easymmlabc/)を参照ください

# Note
## このprojectが優先すること
- 概念実証
  - 高機能、高性能、高信頼性、拡張性、安定性、バージョン互換性よりも、概念実証を優先します
- 鳴ること
  - 最低限の音が鳴る状態の維持をできるだけ優先します
- 関数に`MML文字列`を与えて、`abcjsが演奏可能な文字列`を取得できること
  - それ以上複雑な機能にせず、シンプルさの維持を優先します
- 「ObsidianでMMLを書いて音を鳴らす」のを実現すること
  - より具体的には、[Obsidian ABC.JS plugin](https://github.com/abcjs-music/obsidian-plugin-abcjs) に関連します
    - 今後 Obsidian ABC.JS plugin をforkし、mml2abcを組み込む予定です
- MMLフォーマットはシンプル、既存スタンダードのサブセット継承、を優先します
  - [SiON](https://keim.github.io/SiON/mmlref/sion_mml_reference.html)のサブセット（和音はZ-MUSICのサブセット）とします
  - 方言の名前は `mmlabc` としました

## 分担
- `mml2abc.pegjs を作ること`
  - が、このリポジトリの担当です。
  - [mml2abc.pegjs](peggyjs/mml2abc.pegjs) は、このプロジェクトの中核を担うファイルであり、SSOT（Single Source of Truth：信頼できる唯一の情報源）です。
    - MMLからABC music notationへの変換の文法の全てがこのファイルに記述されています。
- `easyにmml2abcを使える仕組み を作ること`
  - は、[easymmlabc](https://github.com/cat2151/easymmlabc/)で担当します。
- `Obsidianでmml2abcを使える仕組み を作ること`
  - は、別リポジトリで担当します。今後作成予定です。

## mml2abcそのものの開発手順は？
- MMLパーサを peggyjs + Jest でTDDすると楽です。なにかの参考にでもなれば幸いなので、できればそのうちもう少し詳しく書いていきます
- TDDにはJestを使用
  - VSCodeのJest拡張を使用
    - テストやpeggyjsを書くだけで自動testが走ってredやgreenができて楽
- peggyjsとJestの接続には、chokidar を使用
  - peggyjsを更新すれば、自動でES modules（ブラウザ用）とCommonJS（TDD用 & サーバ用）を生成し、Jestの自動テストが動くので楽
- peggyjsのprintfデバッグには、Jestのsilentとverboseを制御（VSCodeのJestターミナルでconsole.logを確認できるようになる）
  - printfデバッグは稀に必要になるので、使えるようにしておくと楽
- ブラウザpageのライブリロード（ホットリロード）には、webpack-dev-serverを使用
  - ブラウザで実際に鳴らすことで発覚する問題がある（abcjsの想定外の挙動など）ので、ライブリロードできるようにしておくと楽
- cloneしたら最初に環境構築。
  - Node.js関連のinstallや、`npm install`や、VSCodeとVSCodeのJest拡張を入れる等
- 日々の開発をスタートする手順は、以下だけでOK：
  ```
  code .
  npm run watch
  ```


依存関係:
{
  "dependencies": {},
  "devDependencies": {
    "@types/jest": "^29.5.11",
    "chokidar-cli": "^3.0.0",
    "jest": "^29.7.0",
    "npm-run-all": "^4.1.5",
    "peggy": "^3.0.2",
    "ts-jest": "^29.1.1",
    "ts-loader": "^9.5.1",
    "typescript": "^5.3.3",
    "webpack": "^5.89.0",
    "webpack-cli": "^5.1.4",
    "webpack-dev-server": "^4.15.1"
  }
}

## ファイル階層ツリー
📄 .gitignore
📄 LICENSE
📖 README.ja.md
📖 README.md
📄 _config.yml
📁 dist/
  🌐 index.html
  📜 main.js
  📄 mml2abc.mjs
📁 generated-docs/
🌐 googled947dc864c270e07.html
📁 issue-notes/
  📖 6.md
📜 jest.config.js
📊 package-lock.json
📊 package.json
📁 peggyjs/
  📝 mml2abc.pegjs
📁 src/
  📘 main.ts
  📜 mml2abc.commonjs.js
📁 test/
  📘 mml2abc.test.ts
📊 tsconfig.json
📜 webpack.config.js

## ファイル詳細分析
**dist/index.html** (28行, 1134バイト)
  - 関数: なし
  - インポート: なし

**dist/main.js** (32行, 1225バイト)
  - 関数: なし
  - インポート: なし

**googled947dc864c270e07.html** (1行, 53バイト)
  - 関数: なし
  - インポート: なし

**jest.config.js** (5行, 123バイト)
  - 関数: なし
  - インポート: なし

**peggyjs/mml2abc.pegjs** (296行, 9915バイト)
  - 関数: MMLs, MML, NOTE, REST, OCTAVE, OCTAVE_UP, OCTAVE_DOWN, NOTE_LENGTH, CHORD, PROGRAM_CHANGE, TEMPO, VOLUME, STACCATO, TRANSPOSE, REPEAT, INLINE_ABC, TIME_SHIFT, TRACK_SEPARATOR, PITCH, SHARP, FLAT, MINUS, INTEGER
  - インポート: なし

**src/main.ts** (1行, 0バイト)
  - 関数: なし
  - インポート: なし

**src/mml2abc.commonjs.js** (1489行, 38548バイト)
  - 関数: getNoteLengthAbc, decimalToFraction, updateSharpFlats, hex, unicodeEscape, literalEscape, classEscape, describeExpectation, describeExpected, describeFound, peg$parse, peg$f0, peg$f1, peg$f2, peg$f3, peg$f4, peg$f5, peg$f6, peg$f7, peg$f8, peg$f9, peg$f10, peg$f11, peg$f12, peg$f13, peg$f14, peg$f15, peg$f16, peg$f17, peg$f18, peg$f19, peg$f20, text, offset, range, location, expected, error, peg$getUnicode, peg$literalExpectation, peg$classExpectation, peg$anyExpectation, peg$endExpectation, peg$otherExpectation, peg$computePosDetails, peg$computeLocation, peg$fail, peg$buildSimpleError, peg$buildStructuredError, peg$parseMMLs, peg$parseMML, peg$parseNOTE, peg$parseREST, peg$parseOCTAVE, peg$parseOCTAVE_UP, peg$parseOCTAVE_DOWN, peg$parseNOTE_LENGTH, peg$parseCHORD, peg$parsePROGRAM_CHANGE, peg$parseTEMPO, peg$parseVOLUME, peg$parseSTACCATO, peg$parseTRANSPOSE, peg$parseREPEAT, peg$parseINLINE_ABC, peg$parseTIME_SHIFT, peg$parseTRACK_SEPARATOR, peg$parsePITCH, peg$parseSHARP, peg$parseFLAT, peg$parseMINUS, peg$parseINTEGER, peg$parse_, initTrackParams, insertVolumeBeforeNoteOrRest, volume2abc, createAbc, postProcess, peg$throw, if, constructor, format, buildMessage, literal, class, any, end, other, for, switch, while
  - インポート: なし

**test/mml2abc.test.ts** (269行, 10171バイト)
  - 関数: なし
  - インポート: ../src/mml2abc.commonjs.js

**webpack.config.js** (23行, 353バイト)
  - 関数: なし
  - インポート: path

## 関数呼び出し階層
関数呼び出し階層を分析できませんでした

## プロジェクト構造（ファイル一覧）
README.ja.md
README.md
dist/index.html
dist/main.js
googled947dc864c270e07.html
issue-notes/6.md
jest.config.js
package-lock.json
package.json
peggyjs/mml2abc.pegjs
src/main.ts
src/mml2abc.commonjs.js
test/mml2abc.test.ts
tsconfig.json
webpack.config.js

上記の情報を基に、プロンプトで指定された形式でプロジェクト概要を生成してください。
特に以下の点を重視してください：
- 技術スタックは各カテゴリごとに整理して説明
- ファイル階層ツリーは提供された構造をそのまま使用
- ファイルの説明は各ファイルの実際の内容と機能に基づく
- 関数の説明は実際に検出された関数の役割に基づく
- 関数呼び出し階層は実際の呼び出し関係に基づく


---
Generated at: 2026-03-08 07:02:25 JST
