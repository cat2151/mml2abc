Last updated: 2026-01-18

# Project Overview

## プロジェクト概要
- Music Macro Language（MML）をABC音楽記譜法へ変換するシンプルなJavaScriptライブラリです。
- 生成されたABC記譜法は、ブラウザ上で五線譜表示とSoundFont GM音源による音源再生が可能です。
- 本プロジェクトは、MMLでの音楽作成と再生を可能にする概念実証として、特にObsidianとの連携を目指しています。

## 技術スタック
- フロントエンド:
  - **abcjs**: ブラウザでABC音楽記譜法から五線譜を描画し、SoundFont GM音源ソフトシンセを鳴らすためのライブラリです。
  - **webpack-dev-server**: 開発中にブラウザページをライブリロードし、実際の動作を確認するためのローカル開発サーバーです。
- 音楽・オーディオ:
  - **abcjs**: 音楽記譜法の描画と音源再生機能を提供します。
  - **MML (Music Macro Language)**: プロジェクトの入力となる音楽記述言語です。SiONのサブセット（和音はZ-MUSICのサブセット）を方言「mmlabc」として採用しています。
  - **ABC music notation**: プロジェクトの出力となる音楽記述言語です。
- 開発ツール:
  - **TypeScript**: JavaScriptに型安全性をもたらすためのプログラミング言語で、開発効率とコード品質の向上に貢献します。
  - **Node.js**: JavaScriptの実行環境であり、開発時のスクリプト実行や依存関係の管理に使用されます。
  - **VSCode**: 統合開発環境（IDE）として、開発の効率化を支援します。
- テスト:
  - **Jest**: JavaScriptコードの単体テストを行うためのフレームワークです。テスト駆動開発（TDD）に利用されます。
  - **@types/jest**, **ts-jest**: JestをTypeScript環境で利用するための型定義とプリセットです。
- ビルドツール:
  - **Peggy.js**: MMLからABC記譜法への変換ロジックを定義するパーサジェネレータです。このプロジェクトの中核であり、MMLパースの文法の全てを記述しています。
  - **webpack**: JavaScriptモジュールをバンドルし、ブラウザ向けに最適化された成果物を生成するためのモジュールバンドラです。
  - **webpack-cli**: webpackをコマンドラインから操作するためのインターフェースを提供します。
  - **ts-loader**: webpackがTypeScriptファイルを処理するためのローダーです。
- 言語機能:
  - **JavaScript**: プロジェクトの主要な実装言語です。
- 自動化・CI/CD:
  - **chokidar-cli**: ファイルの変更を監視し、自動ビルドやテスト実行などのタスクをトリガーするためのツールです。
  - **npm-run-all**: 複数のnpmスクリプトを並行または直列に実行するためのユーティリティです。
- 開発標準: (TDDの採用を推奨している)

## ファイル階層ツリー
```
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
  📖 2.md
  📖 4.md
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
```

## ファイル詳細説明
- **`.gitignore`**: Gitによるバージョン管理から除外するファイルやディレクトリを指定し、リポジトリを整理します。
- **`LICENSE`**: プロジェクトのソフトウェアライセンス情報が記載されています。
- **`README.ja.md`**: プロジェクトの日本語での概要、機能、使用方法、開発方針などを説明するメインドキュメントです。
- **`README.md`**: プロジェクトの英語での概要、機能、使用方法、開発方針などを説明するメインドキュメントです。
- **`_config.yml`**: GitHub Pagesのサイト設定を定義するファイルです。
- **`dist/`**: ビルドされた成果物が格納されるディレクトリです。
  - **`dist/index.html`**: デモページのエントリーポイントとなるHTMLファイルです。MMLから生成されたABC記譜法をブラウザ上で`abcjs`を使って表示・再生します。
  - **`dist/main.js`**: webpackによってバンドルされた、ブラウザで実行されるJavaScriptコードです。`mml2abc`ライブラリを含んでいます。
  - **`dist/mml2abc.mjs`**: ES modules形式で出力された`mml2abc`ライブラリ本体のファイルです。
- **`generated-docs/`**: 自動生成されたドキュメントが格納されるディレクトリです。
- **`googled947dc864c270e07.html`**: Googleサイト認証用のファイルです。
- **`issue-notes/`**: 開発中の課題や検討事項に関するメモが格納されるディレクトリです。
  - **`issue-notes/2.md`**, **`issue-notes/4.md`**: 特定の課題や機能に関する開発メモです。
- **`jest.config.js`**: Jestテストフレームワークの設定ファイルです。テストの実行方法や環境などを定義します。
- **`package-lock.json`**: `package.json`で定義された依存関係の具体的なバージョンを記録し、ビルドの再現性を保証します。
- **`package.json`**: プロジェクトのメタデータ、開発スクリプト、およびプロジェクトが依存するライブラリ（依存関係）を定義するファイルです。
- **`peggyjs/`**: Peggy.jsのパーサ定義ファイルが格納されるディレクトリです。
  - **`peggyjs/mml2abc.pegjs`**: MMLをABC音楽記譜法に変換するための文法ルールが記述されたPeggy.jsパーサジェネレータの入力ファイルです。このファイルがプロジェクトの中核であり、MMLからABCへの変換ロジックの全てのSSOT（信頼できる唯一の情報源）です。
- **`src/`**: ソースコードが格納されるディレクトリです。
  - **`src/main.ts`**: TypeScriptのメインエントリポイントとして用意されていますが、現状は空です。
  - **`src/mml2abc.commonjs.js`**: `peggyjs/mml2abc.pegjs`から生成され、CommonJS形式で提供されるMMLパーサのJavaScriptコードです。主にJestを用いたテスト環境やNode.js環境で使用されます。
- **`test/`**: テストファイルが格納されるディレクトリです。
  - **`test/mml2abc.test.ts`**: `mml2abc.pegjs`で定義されたMMLパーサの変換ロジックが正しく機能するかを検証するためのTypeScriptテストファイルです。テスト駆動開発（TDD）を実践するために使用されます。
- **`tsconfig.json`**: TypeScriptコンパイラの設定ファイルです。コンパイルオプションや出力先などを定義します。
- **`webpack.config.js`**: webpackバンドラの構成ファイルです。どのようにファイルをバンドルし、どのような出力を行うかを定義します。

## 関数詳細説明
このプロジェクトの主要な関数は、`peggyjs/mml2abc.pegjs`で定義されたMMLのパースルールと、それを支援するJavaScript関数群です。
- **`MMLs (peggyjs/mml2abc.pegjs)`**: 複数のMMLシーケンス（トラックやフレーズ）全体を解析するための最上位の文法ルールです。
- **`MML (peggyjs/mml2abc.pegjs)`**: 単一のMMLシーケンス（例: `cde`、`o4c`など）を解析する文法ルールです。
- **`NOTE (peggyjs/mml2abc.pegjs)`**: 音符（例: `c`, `d#`, `e-`）をMMLから抽出し、ABC記譜法に変換する文法ルールです。
- **`REST (peggyjs/mml2abc.pegjs)`**: 休符（例: `r`）をMMLから抽出し、ABC記譜法に変換する文法ルールです。
- **`OCTAVE (peggyjs/mml2abc.pegjs)`**: オクターブを直接指定するコマンド（例: `o4`）を解析する文法ルールです。
- **`OCTAVE_UP (peggyjs/mml2abc.pegjs)`**: オクターブを上げるコマンド（例: `<`）を解析する文法ルールです。
- **`OCTAVE_DOWN (peggyjs/mml2abc.pegjs)`**: オクターブを下げるコマンド（例: `>`）を解析する文法ルールです。
- **`NOTE_LENGTH (peggyjs/mml2abc.pegjs)`**: 音符や休符の長さ（例: `c4`の`4`）を解析する文法ルールです。
- **`CHORD (peggyjs/mml2abc.pegjs)`**: 和音（例: `[ceg]`）をMMLから抽出し、ABC記譜法に変換する文法ルールです。Z-MUSICのサブセットを継承しています。
- **`PROGRAM_CHANGE (peggyjs/mml2abc.pegjs)`**: 音色変更コマンド（例: `@1`）を解析する文法ルールです。
- **`TEMPO (peggyjs/mml2abc.pegjs)`**: テンポ変更コマンド（例: `t120`）を解析する文法ルールです。
- **`VOLUME (peggyjs/mml2abc.pegjs)`**: 音量変更コマンド（例: `v100`）を解析する文法ルールです。
- **`STACCATO (peggyjs/mml2abc.pegjs)`**: スタッカート記号（例: `s`）を解析する文法ルールです。
- **`TRANSPOSE (peggyjs/mml2abc.pegjs)`**: 移調コマンド（例: `+1`, `-2`）を解析する文法ルールです。
- **`REPEAT (peggyjs/mml2abc.pegjs)`**: 繰り返し記号（例: `{c d}|`）を解析する文法ルールです。
- **`INLINE_ABC (peggyjs/mml2abc.pegjs)`**: MML記述中に直接ABC記譜法を埋め込む機能のための文法ルールです。
- **`TIME_SHIFT (peggyjs/mml2abc.pegjs)`**: 時間シフトコマンド（例: `&`）を解析する文法ルールです。
- **`TRACK_SEPARATOR (peggyjs/mml2abc.pegjs)`**: 複数トラックを区切るためのセパレータ（例: `|`）を解析する文法ルールです。
- **`PITCH (peggyjs/mml2abc.pegjs)`**: 音の高さ（例: `c`, `d`）を解析する基本的な文法ルールです。
- **`SHARP (peggyjs/mml2abc.pegjs)`**: シャープ記号（例: `#`）を解析する文法ルールです。
- **`FLAT (peggyjs/mml2abc.pegjs)`**: フラット記号（例: `-`）を解析する文法ルールです。
- **`MINUS (src/mml2abc.commonjs.js)`**: 数値の負号を処理するユーティリティ関数です。また、パーサの文法ルールとしても利用されます。
- **`INTEGER (src/mml2abc.commonjs.js)`**: 整数値を解析するユーティリティ関数です。また、パーサの文法ルールとしても利用されます。
- **`getNoteLengthAbc (src/mml2abc.commonjs.js)`**: 音符の長さをMMLから抽出し、ABC記譜法で表現される形式に変換するヘルパー関数です。
- **`decimalToFraction (src/mml2abc.commonjs.js)`**: 小数値を分数表記に変換するヘルパー関数です。音符の長さの内部計算に使用されます。
- **`updateSharpFlats (src/mml2abc.commonjs.js)`**: 譜面上のシャープやフラットの情報を更新する内部関数です。
- **`peg$subclass (src/mml2abc.commonjs.js)`**: Peggy.jsによって生成されるパーサの内部で使用されるユーティリティ関数です。
- **`C (src/mml2abc.commonjs.js)`**: Peggy.jsによって生成されるパーサの内部で使用されるユーティリティ関数です。
- **`peg$SyntaxError (src/mml2abc.commonjs.js)`**: Peggy.jsパーサが構文エラーを報告するために使用するエラーオブジェクトです。
- **`peg$parse (src/mml2abc.commonjs.js)`**: Peggy.jsパーサのメインエントリポイントとなる関数です。入力文字列を解析します。
- **`initTrackParams (src/mml2abc.commonjs.js)`**: 各音楽トラックのパラメータ（オクターブ、音量など）を初期化する関数です。
- **`insertVolumeBeforeNoteOrRest (src/mml2abc.commonjs.js)`**: 音符や休符の前に音量設定を挿入するロジックを処理する関数です。
- **`volume2abc (src/mml2abc.commonjs.js)`**: MMLの音量指定をABC記譜法の形式に変換する関数です。
- **`createAbc (src/mml2abc.commonjs.js)`**: MMLパーサの出力（AST: 抽象構文木）から最終的なABC記譜法文字列を組み立てる主要な関数です。
- **`postProcess (src/mml2abc.commonjs.js)`**: 生成されたABC記譜法文字列に対して、さらに後処理（例: 整形、特殊記号の調整）を行う関数です。
- **`if`, `while`, `function`, `for`, `map`, `replace`, `switch` (src/mml2abc.commonjs.js)**: これらはJavaScriptの標準的な制御構文や組み込み関数であり、特定の機能を持つ関数というよりは、`src/mml2abc.commonjs.js`内でプログラムのフロー制御やデータ変換、文字列操作などの汎用的な処理に利用されています。

## 関数呼び出し階層ツリー
```
- if (src/mml2abc.commonjs.js)
  - MMLs (peggyjs/mml2abc.pegjs)
    - getNoteLengthAbc ()
      - MML (peggyjs/mml2abc.pegjs)
      - NOTE (peggyjs/mml2abc.pegjs)
      - REST (peggyjs/mml2abc.pegjs)
      - OCTAVE (peggyjs/mml2abc.pegjs)
      - OCTAVE_UP (peggyjs/mml2abc.pegjs)
      - OCTAVE_DOWN (peggyjs/mml2abc.pegjs)
      - NOTE_LENGTH (peggyjs/mml2abc.pegjs)
      - CHORD (peggyjs/mml2abc.pegjs)
      - PROGRAM_CHANGE (peggyjs/mml2abc.pegjs)
      - TEMPO (peggyjs/mml2abc.pegjs)
      - VOLUME (peggyjs/mml2abc.pegjs)
      - STACCATO (peggyjs/mml2abc.pegjs)
      - TRANSPOSE (peggyjs/mml2abc.pegjs)
      - REPEAT (peggyjs/mml2abc.pegjs)
      - INLINE_ABC (peggyjs/mml2abc.pegjs)
      - TIME_SHIFT (peggyjs/mml2abc.pegjs)
      - TRACK_SEPARATOR (peggyjs/mml2abc.pegjs)
      - PITCH (peggyjs/mml2abc.pegjs)
      - SHARP (peggyjs/mml2abc.pegjs)
      - FLAT (peggyjs/mml2abc.pegjs)
      - MINUS (peggyjs/mml2abc.pegjs)
      - INTEGER (peggyjs/mml2abc.pegjs)
      - decimalToFraction ()
      - updateSharpFlats ()
      - peg$subclass ()
      - C ()
      - peg$SyntaxError ()
      - peg$padEnd ()
      - hex ()
      - literalEscape ()
      - classEscape ()
      - describeExpectation ()
      - describeExpected ()
      - describeFound ()
      - peg$parse ()
      - text ()
      - offset ()
      - range ()
      - location ()
      - expected ()
      - error ()
      - peg$literalExpectation ()
      - peg$classExpectation ()
      - peg$anyExpectation ()
      - peg$endExpectation ()
      - peg$otherExpectation ()
      - peg$computePosDetails ()
      - peg$computeLocation ()
      - peg$fail ()
      - peg$buildSimpleError ()
      - peg$buildStructuredError ()
      - peg$parseMMLs ()
      - peg$parseMML ()
      - peg$parseNOTE ()
      - peg$parseREST ()
      - peg$parseOCTAVE ()
      - peg$parseOCTAVE_UP ()
      - peg$parseOCTAVE_DOWN ()
      - peg$parseNOTE_LENGTH ()
      - peg$parseCHORD ()
      - peg$parsePROGRAM_CHANGE ()
      - peg$parseTEMPO ()
      - peg$parseVOLUME ()
      - peg$parseSTACCATO ()
      - peg$parseTRANSPOSE ()
      - peg$parseREPEAT ()
      - peg$parseINLINE_ABC ()
      - peg$parseTIME_SHIFT ()
      - peg$parseTRACK_SEPARATOR ()
      - peg$parsePITCH ()
      - peg$parseSHARP ()
      - peg$parseFLAT ()
      - peg$parseMINUS ()
      - peg$parseINTEGER ()
      - peg$parse_ ()
      - initTrackParams ()
      - insertVolumeBeforeNoteOrRest ()
      - volume2abc ()
      - createAbc ()
      - postProcess ()
      - function ()
      - map ()
      - replace ()
- while (src/mml2abc.commonjs.js)
- for (src/mml2abc.commonjs.js)
- switch (src/mml2abc.commonjs.js)

---
Generated at: 2026-01-18 07:03:04 JST
