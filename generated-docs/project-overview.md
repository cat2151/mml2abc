Last updated: 2025-11-11

# Project Overview

## プロジェクト概要
- Music Macro Language (MML) をABC music notationに変換するJavaScriptライブラリです。
- 主にブラウザ環境やObsidianでMMLから手軽に五線譜表示と音楽再生を実現することを目的としています。
- シンプルさと概念実証を重視し、`mmlabc`と呼ばれるMML方言（SiONサブセット）をサポートします。

## 技術スタック
- フロントエンド:
    - **abcjs**: (参照プロジェクト説明より) 本ライブラリが生成するABC music notationを利用し、ブラウザ上で五線譜を描画し、SoundFont GM音源ソフトシンセを鳴らすためのライブラリです。
    - **HTML/JavaScript**: デモページの構築に利用され、ブラウザでの動作環境を提供します。
- 音楽・オーディオ:
    - **MML (Music Macro Language)**: 本ライブラリの入力となる音楽記述言語です。
    - **ABC music notation**: 本ライブラリの出力となる音楽記述言語であり、abcjsなどで解釈・演奏されます。
    - **mmlabc**: 本プロジェクトが定義するMMLの方言で、SiONのサブセットをベースにしています。
- 開発ツール:
    - **TypeScript**: 型安全なJavaScript開発を可能にするための言語およびコンパイラです。
    - **Peggy.js**: MMLパーサを自動生成するためのパーサジェネレータ（PEG文法定義からパーサを生成）です。
    - **Node.js**: 開発環境の基盤として利用されます。
    - **VSCode**: (参照プロジェクト説明より) 開発用IDEとして推奨されています。
- テスト:
    - **Jest**: JavaScriptコードのテストフレームワークです。
    - **ts-jest**: JestでTypeScriptのテストを記述するためのプリセットです。
- ビルドツール:
    - **Webpack**: JavaScriptモジュールをバンドルし、ブラウザで動作する形式にまとめるためのツールです。
    - **webpack-dev-server**: 開発中にコードの変更を監視し、ブラウザの自動リロードを提供するローカル開発サーバーです。
- 言語機能:
    - **JavaScript (ES modules/CommonJS)**: ライブラリの主要な実装言語であり、異なるモジュール形式で出力されます。
- 自動化・CI/CD:
    - **chokidar-cli**: ファイルシステムの変更を監視し、自動ビルドやテスト実行などのタスクをトリガーするために使用されます。
    - **npm-run-all**: 複数のnpmスクリプトを並列または直列に実行するためのユーティリティです。
- 開発標準:
    - **TDD (テスト駆動開発)**: (参照プロジェクト説明より) Jestを活用したテスト駆動開発を重視し、品質の高いコード開発を目指しています。

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
- **`.gitignore`**: Gitがバージョン管理の対象外とするファイルやディレクトリを指定するファイルです。
- **`LICENSE`**: プロジェクトのライセンス情報が記述されています。
- **`README.ja.md`**: プロジェクトの概要、機能、使い方などを日本語で説明するファイルです。
- **`README.md`**: プロジェクトの概要、機能、使い方などを英語で説明するファイルです。
- **`_config.yml`**: GitHub Pagesの設定ファイルです。
- **`dist/`**: ビルドされた成果物（デプロイ可能なファイル）が格納されるディレクトリです。
    - **`dist/index.html`**: ブラウザでMML2ABCのデモを体験するためのHTMLファイルです。
    - **`dist/main.js`**: `webpack`によってバンドルされた、ブラウザ向けJavaScriptコードです。
    - **`dist/mml2abc.mjs`**: ES Modules形式で出力されたMML2ABCライブラリ本体のファイルです。
- **`generated-docs/`**: (現状は空ですが) 自動生成されたドキュメントを格納するためのディレクトリです。
- **`jest.config.js`**: JavaScriptテストフレームワークJestの設定ファイルです。
- **`package-lock.json`**: `npm`が管理する依存パッケージの厳密なバージョンを記録するファイルです。
- **`package.json`**: プロジェクトのメタデータ（名前、バージョン、スクリプト、依存関係など）を定義するファイルです。
- **`peggyjs/`**: Peggy.jsの文法定義ファイルが格納されるディレクトリです。
    - **`peggyjs/mml2abc.pegjs`**: MMLをABC music notationに変換するためのパーサの文法ルールを定義するファイルです。Peggy.jsがこのファイルからパーサコードを生成します。
- **`src/`**: プロジェクトのソースコードが格納されるディレクトリです。
    - **`src/main.ts`**: TypeScriptのメインエントリポイントですが、現在のプロジェクト情報では内容が空です。
    - **`src/mml2abc.commonjs.js`**: `peggyjs/mml2abc.pegjs`から生成されたMMLパーサと、CommonJS形式のJavaScriptコードが含まれています。主にNode.js環境でのテストや利用を想定しています。
- **`test/`**: プロジェクトのテストコードが格納されるディレクトリです。
    - **`test/mml2abc.test.ts`**: MMLパーサの変換ロジックが正しく機能するかを検証するためのTypeScript製のテストファイルです。
- **`tsconfig.json`**: TypeScriptコンパイラの設定ファイルです。
- **`webpack.config.js`**: Webpackのバンドル設定を定義するファイルです。ソースコードの入力から出力までの処理を制御します。

## 関数詳細説明
このプロジェクトでは、主にMMLパーサのルールと、パーサが生成する中間表現からABC記譜法に変換するためのユーティリティ関数が中心です。

-   **MMLs (peggyjs/mml2abc.pegjs)**: MML文字列全体の最上位の解析ルールです。複数のMMLコマンドやトラックをまとめて処理します。
-   **MML (peggyjs/mml2abc.pegjs)**: 個々のMMLコマンド（音符、休符、テンポ変更など）を解析するためのルールです。
-   **NOTE (peggyjs/mml2abc.pegjs)**: MMLの音符表現（例: `c`, `d#`, `e-`）を解析し、対応するABC記譜法の音符要素に変換します。
-   **REST (peggyjs/mml2abc.pegjs)**: MMLの休符表現（例: `r`）を解析し、ABC記譜法の休符要素に変換します。
-   **OCTAVE (peggyjs/mml2abc.pegjs)**: MMLのオクターブ指定（例: `o4`）を解析し、現在のオクターブ設定を更新します。
-   **OCTAVE_UP (peggyjs/mml2abc.pegjs)**: MMLのオクターブアップコマンド（例: `<`）を解析し、オクターブを一つ上げます。
-   **OCTAVE_DOWN (peggyjs/mml2abc.pegjs)**: MMLのオクターブダウンコマンド（例: `>`）を解析し、オクターブを一つ下げます。
-   **NOTE_LENGTH (peggyjs/mml2abc.pegjs)**: MMLの音符長指定（例: `l4`, `16`）を解析します。
-   **CHORD (peggyjs/mml2abc.pegjs)**: MMLの和音表現（例: `[ceg]`）を解析し、ABC記譜法の和音形式に変換します。
-   **PROGRAM_CHANGE (peggyjs/mml2abc.pegjs)**: MMLのプログラムチェンジコマンド（例: `@p10`）を解析し、楽器の変更を処理します。
-   **TEMPO (peggyjs/mml2abc.pegjs)**: MMLのテンポ指定（例: `t120`）を解析し、テンポ設定を更新します。
-   **VOLUME (peggyjs/mml2abc.pegjs)**: MMLのボリューム指定（例: `v100`）を解析し、音量設定を更新します。
-   **STACCATO (peggyjs/mml2abc.pegjs)**: MMLのスタッカート指定を解析します。
-   **TRANSPOSE (peggyjs/mml2abc.pegjs)**: MMLの移調コマンドを解析します。
-   **REPEAT (peggyjs/mml2abc.pegjs)**: MMLのリピートブロック（繰り返し）を解析します。
-   **INLINE_ABC (peggyjs/mml2abc.pegjs)**: MML中に直接ABC記譜法を埋め込む機能を解析します。
-   **TIME_SHIFT (peggyjs/mml2abc.pegjs)**: MMLのタイムシフト（時間調整）コマンドを解析します。
-   **TRACK_SEPARATOR (peggyjs/mml2abc.pegjs)**: 複数のMMLトラックを区切るコマンドを解析します。
-   **PITCH (peggyjs/mml2abc.pegjs)**: 音の高さ（C, D, Eなど）を解析します。
-   **SHARP (peggyjs/mml2abc.pegjs)**: シャープ記号（`+`または`#`）を解析します。
-   **FLAT (peggyjs/mml2abc.pegjs)**: フラット記号（`-`）を解析します。
-   **MINUS (peggyjs/mml2abc.pegjs)**: 負の数またはフラット記号を解析します。
-   **INTEGER (peggyjs/mml2abc.pegjs)**: 整数値を解析します。
-   **getNoteLengthAbc() (src/mml2abc.commonjs.js)**: MMLで指定された音符の長さを、ABC記譜法で表現可能な形式に変換するユーティリティ関数です。
-   **decimalToFraction() (src/mml2abc.commonjs.js)**: 小数を分数形式に変換するヘルパー関数です。
-   **updateSharpFlats() (src/mml2abc.commonjs.js)**: シャープやフラットなどの臨時記号を処理し、音符の正しいピッチを計算する関数です。
-   **peg$parseMMLs() / peg$parseMML() など (src/mml2abc.commonjs.js)**: Peggy.jsによって生成されるパーサの内部関数群で、`mml2abc.pegjs`で定義された各ルールに対応し、入力MML文字列を解析する役割を担います。
-   **initTrackParams() (src/mml2abc.commonjs.js)**: 新しいMMLトラックの解析を開始する際に、そのトラック固有のパラメータ（オクターブ、ボリュームなど）を初期状態にリセットする関数です。
-   **insertVolumeBeforeNoteOrRest() (src/mml2abc.commonjs.js)**: 音符や休符の前にボリューム設定を挿入し、ABC記譜法での音量制御を可能にする関数です。
-   **volume2abc() (src/mml2abc.commonjs.js)**: MMLのボリューム値をABC記譜法に対応する形式に変換する関数です。
-   **createAbc() (src/mml2abc.commonjs.js)**: 解析されたMML要素から最終的なABC記譜法文字列を組み立てる主要な関数です。
-   **postProcess() (src/mml2abc.commonjs.js)**: ABC記譜法文字列が生成された後、追加の整形や調整を行うための関数です。
-   **C() (src/mml2abc.commonjs.js)**: Peggy.jsパーサの内部で利用されるユーティリティ関数の一つです。
-   **peg$SyntaxError() (src/mml2abc.commonjs.js)**: パーシングエラーが発生した際に利用されるエラーオブジェクトのコンストラクタです。
-   **peg$parse() (src/mml2abc.commonjs.js)**: 生成されたパーサのメインエントリポイントであり、MML文字列を解析し始めます。

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
Generated at: 2025-11-11 09:26:29 JST
