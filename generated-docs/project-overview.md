Last updated: 2026-03-08

# Project Overview

## プロジェクト概要
- Music Macro Language (MML) をABC記譜法に変換するJavaScriptライブラリです。
- ブラウザでのMML音楽再生や、将来的なObsidianプラグインでの利用を目的としています。
- 概念実証を重視し、シンプルなMMLパーサーとABC記譜法への変換機能を提供します。

## 技術スタック
- フロントエンド:
    - **abcjs**: MMLから変換されたABC記譜法をブラウザで五線譜として描画し、SoundFont GM音源で再生するために利用されるライブラリです。
    - **webpack-dev-server**: 開発中にブラウザでの動作確認のため、ライブリロード機能を提供する開発用サーバーです。
- 音楽・オーディオ:
    - **abcjs**: ブラウザ上で楽譜表示と音源再生を実現するための核となるライブラリです。
    - **SiON**, **Z-MUSIC**: MMLの構文を定義する際に参考にされた、既存のMML方言です。
- 開発ツール:
    - **peggy**: MMLの文法定義ファイル (`mml2abc.pegjs`) からパーサーコードを生成するためのツールです。
    - **chokidar-cli**: ファイルの変更を監視し、自動ビルドやテスト実行をトリガーするために使用されます。
    - **npm-run-all**: 複数のnpmスクリプトを並行または逐次で効率的に実行・管理するためのユーティリティです。
- テスト:
    - **jest**: JavaScriptおよびTypeScriptコードの単体テストを行うためのテスティングフレームワークです。
    - **@types/jest**: Jestの型定義を提供し、TypeScript環境での開発をサポートします。
    - **ts-jest**: JestがTypeScriptファイルをテストできるようにするためのプリセットです。
- ビルドツール:
    - **webpack**: JavaScriptモジュールをバンドルし、ブラウザで実行可能な形式にまとめるためのツールです。
    - **webpack-cli**: Webpackをコマンドラインから操作するためのインターフェースを提供します。
    - **ts-loader**: WebpackがTypeScriptファイルをJavaScriptにトランスパイルできるようにするためのローダーです。
- 言語機能:
    - **typescript**: 型安全なJavaScript開発を可能にするスーパーセット言語で、大規模なアプリケーション開発に適しています。
- 自動化・CI/CD:
    - **chokidar-cli**, **npm-run-all**: 開発時の自動ビルドやテスト実行に使用され、開発ワークフローの自動化に貢献します。
- 開発標準:
    - **typescript**: 型付けを導入することで、コードの品質と保守性を向上させ、開発チーム内での認識統一を促進します。

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
```

## ファイル詳細説明
- **`.gitignore`**: Gitが追跡しないファイルやディレクトリを指定する設定ファイルです。
- **`LICENSE`**: プロジェクトのライセンス情報が記述されたファイルです。
- **`README.ja.md`**: プロジェクトの日本語版の概要、使い方、機能などが記述されたマークダウンファイルです。
- **`README.md`**: プロジェクトの英語版の概要、使い方、機能などが記述されたマークダウンファイルです。
- **`_config.yml`**: GitHub Pagesなどのサイト設定に関するYAMLファイルです。
- **`dist/index.html`**: プロジェクトのライブデモページとして機能するHTMLファイルです。MML入力とABC記譜法の表示、音楽再生のためのUIを含みます。
- **`dist/main.js`**: Webpackによってバンドルされた、ブラウザで実行するためのJavaScriptコードです。MMLからABC記譜法への変換ロジックやabcjsとの連携処理が含まれます。
- **`dist/mml2abc.mjs`**: PeggyJSによって生成されたMMLパーサーのES Modules版です。ブラウザ環境での利用を想定しています。
- **`generated-docs/`**: ドキュメント生成ツールによって生成されるファイルが格納されるディレクトリです。
- **`googled947dc864c270e07.html`**: Googleサイト認証用のファイルで、プロジェクトの機能には直接関係しません。
- **`issue-notes/6.md`**: 特定のissueに関するメモや詳細情報が記述されたマークダウンファイルです。
- **`jest.config.js`**: Jestテストフレームワークの設定ファイルです。テスト対象の指定やTypeScriptのトランスパイル設定などを含みます。
- **`package-lock.json`**: `package.json`に記述された依存関係の正確なバージョンと依存ツリーを記録するファイルです。
- **`package.json`**: プロジェクトのメタデータ（名前、バージョン、スクリプト、依存関係など）を定義するファイルです。
- **`peggyjs/mml2abc.pegjs`**: このプロジェクトの中核となるファイルで、MMLからABC記譜法への変換ルールを定義するPeggyJS文法ファイルです。MMLの構文解析の全てがここに記述されています。
- **`src/main.ts`**: 現在は内容が空ですが、主要なTypeScriptコードが記述されることが想定されるファイルです。
- **`src/mml2abc.commonjs.js`**: `peggyjs/mml2abc.pegjs`からPeggyJSによって生成されたMMLパーサーのCommonJS版です。主にNode.js環境でのテストやサーバーサイドでの利用を想定しています。
- **`test/mml2abc.test.ts`**: MMLパーサー (`mml2abc.commonjs.js`) の機能を検証するためのJestテストコードです。様々なMML入力に対する変換結果の正確性を確認します。
- **`tsconfig.json`**: TypeScriptコンパイラの設定ファイルです。コンパイルオプション（ターゲットECMAScriptバージョン、モジュール形式など）を定義します。
- **`webpack.config.js`**: Webpackの設定ファイルです。エントリーポイント、出力先、モジュール解決、ローダー（TypeScriptなど）、開発サーバーの挙動などを定義します。

## 関数詳細説明
- **`MMLs` (in `peggyjs/mml2abc.pegjs`)**: PeggyJS文法における最上位ルール。複数のMML記述ブロック全体を解析します。
- **`MML` (in `peggyjs/mml2abc.pegjs`)**: 単一のMML記述行またはブロックを解析するためのルールです。
- **`NOTE` (in `peggyjs/mml2abc.pegjs`)**: MMLの音符コマンド（例: `c`, `d#`, `e-`など）を解析するルールです。
- **`REST` (in `peggyjs/mml2abc.pegjs`)**: MMLの休符コマンド（例: `r`）を解析するルールです。
- **`OCTAVE`, `OCTAVE_UP`, `OCTAVE_DOWN` (in `peggyjs/mml2abc.pegjs`)**: オクターブ変更コマンド（例: `o`, `>`, `<`）を解析するルールです。
- **`NOTE_LENGTH` (in `peggyjs/mml2abc.pegjs`)**: 音符や休符の長さ指定（例: `4`, `8.`, `16`など）を解析するルールです。
- **`CHORD` (in `peggyjs/mml2abc.pegjs`)**: MMLの和音コマンドを解析するルールです。
- **`PROGRAM_CHANGE` (in `peggyjs/mml2abc.pegjs`)**: 楽器プログラムチェンジコマンドを解析するルールです。
- **`TEMPO` (in `peggyjs/mml2abc.pegjs`)**: テンポ変更コマンド（例: `t`）を解析するルールです。
- **`VOLUME` (in `peggyjs/mml2abc.pegjs`)**: 音量変更コマンド（例: `v`）を解析するルールです。
- **`STACCATO` (in `peggyjs/mml2abc.pegjs`)**: スタッカート指定（例: `@s`）を解析するルールです。
- **`TRANSPOSE` (in `peggyjs/mml2abc.pegjs`)**: 移調指定を解析するルールです。
- **`REPEAT` (in `peggyjs/mml2abc.pegjs`)**: 繰り返しブロック（例: `[...]*n`）を解析するルールです。
- **`INLINE_ABC` (in `peggyjs/mml2abc.pegjs`)**: MML中に直接ABC記譜法を埋め込むためのルールです。
- **`peg$parse` (in `src/mml2abc.commonjs.js`)**: PeggyJSによって生成されたパーサーの主要なエントリポイント関数です。MML文字列を解析し、内部的に定義された文法ルールに基づいて中間表現を生成します。
- **`getNoteLengthAbc` (in `src/mml2abc.commonjs.js`)**: MMLの音符長さ表記をABC記譜法の適切な形式に変換するヘルパー関数です。
- **`decimalToFraction` (in `src/mml2abc.commonjs.js`)**: 小数値を分数表記に変換するための内部ヘルパー関数です。
- **`initTrackParams` (in `src/mml2abc.commonjs.js`)**: 各トラック（パート）の初期パラメータ（例: 音量、オクターブ、テンポなど）を初期化する関数です。
- **`insertVolumeBeforeNoteOrRest` (in `src/mml2abc.commonjs.js`)**: 音符や休符の前にMMLで指定された音量変化をABC記譜法形式で挿入する関数です。
- **`volume2abc` (in `src/mml2abc.commonjs.js`)**: MMLの音量指定をABC記譜法が解釈できる音量表現に変換する関数です。
- **`createAbc` (in `src/mml2abc.commonjs.js`)**: パーサーが生成したMMLの中間データ構造を受け取り、最終的なABC記譜法文字列を構築する中心的な関数です。
- **`postProcess` (in `src/mml2abc.commonjs.js`)**: `createAbc`によって生成されたABC記譜法文字列に対して、最終的な調整や整形を行う関数です。

## 関数呼び出し階層ツリー
```
提供された情報では関数呼び出し階層を詳細に分析できませんでした。
しかし、プロジェクトの性質と生成されるファイルから、一般的な呼び出しフローを推測できます。

[テスト環境 (test/mml2abc.test.ts)]
└── 外部呼び出し (src/mml2abc.commonjs.js のエクスポートされたパーサー関数)

[パーサー内部 (src/mml2abc.commonjs.js)]
└── peg$parse (MML文字列の解析を開始するエントリポイント)
    └── peg$parseMMLs (最上位のMMLルールを解析)
        ├── peg$parseMML (個々のMML要素を解析)
        │   ├── peg$parseNOTE (音符解析)
        │   ├── peg$parseREST (休符解析)
        │   ├── peg$parseOCTAVE (オクターブ変更解析)
        │   ├── peg$parseNOTE_LENGTH (音符長解析)
        │   ├── peg$parseCHORD (和音解析)
        │   └── ... (他のMMLコマンド解析関数)
        └── createAbc (解析結果からABC記譜法文字列を生成)
            ├── initTrackParams (トラックパラメータ初期化)
            ├── insertVolumeBeforeNoteOrRest (音量挿入)
            ├── volume2abc (MML音量をABC形式に変換)
            └── postProcess (最終的なABC記譜法の整形)

---
Generated at: 2026-03-08 07:02:52 JST
