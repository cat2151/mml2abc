Last updated: 2025-12-02

# Project Overview

## プロジェクト概要
- Music Macro Language (MML) をABC記譜法に変換するJavaScriptライブラリです。
- ブラウザやObsidianでMMLを使った音楽演奏を可能にし、シンプルなテキスト変換機能を提供します。
- abcjsとの連携により、楽譜表示と音源再生を実現する概念実証プロジェクトです。

## 技術スタック
- フロントエンド: JavaScript (ライブラリの主要開発言語、ブラウザ環境で動作), abcjs (ABC記譜法をブラウザで描画し、SoundFont GM音源で再生するライブラリ)
- 音楽・オーディオ: Music Macro Language (MML) (音楽記述の入力フォーマット), ABC Music Notation (MMLから変換される標準的な音楽記譜法), abcjs (SoundFont GM音源ソフトシンセとして機能し、ブラウザでの音楽再生を可能にする)
- 開発ツール: VSCode (推奨される統合開発環境)
- テスト: Jest (JavaScriptのテストフレームワーク), ts-jest (TypeScriptで記述されたテストコードをJestで実行するためのプリセット)
- ビルドツール: Peggy.js (MMLの文法定義からパーサを生成するパーサジェネレータ), TypeScript (型安全なJavaScript開発を可能にする言語), webpack (JavaScriptモジュールをバンドルし、ブラウザで利用可能な形式に変換するツール), ts-loader (webpackがTypeScriptファイルを処理するためのローダー), chokidar-cli (ファイル変更を監視し、自動ビルドやテストをトリガーするツール)
- 言語機能: ES Modules (ブラウザ向けのJavaScriptモジュール形式), CommonJS (Node.js環境やテスト向けのJavaScriptモジュール形式)
- 自動化・CI/CD: npm-run-all (複数のnpmスクリプトを効率的に実行するユーティリティ), chokidar-cli (ファイル変更時の自動処理トリガー)
- 開発標準: TDD (テスト駆動開発) (開発プロセスとして採用され、Jestによるテストがその中核をなす), TypeScript (コードの品質と保守性向上に貢献)

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
- **`.gitignore`**: Gitバージョン管理システムにおいて、追跡対象から除外するファイルやディレクトリを指定します。ビルド生成物や一時ファイルなどが含まれます。
- **`LICENSE`**: プロジェクトの利用条件や著作権情報が記載されたライセンスファイルです。
- **`README.ja.md`**: このプロジェクトの概要、目的、機能、使用方法などが日本語で詳しく説明されています。
- **`README.md`**: プロジェクトの概要、目的、機能、使用方法などが英語で詳しく説明されています。
- **`_config.yml`**: GitHub Pagesのサイト設定を定義するファイルです。
- **`dist/`**: プロジェクトのビルド成果物（ブラウザで実行可能なファイル）が格納されるディレクトリです。
    - **`dist/index.html`**: ブラウザでプロジェクトのデモや動作確認を行うためのHTMLファイルです。mml2abcライブラリとabcjsを読み込み、MMLの変換と音楽再生のインターフェースを提供します。
    - **`dist/main.js`**: `webpack`によってバンドルされた、ブラウザ向けに最適化されたJavaScriptコードのメインファイルです。mml2abcライブラリのコア機能が含まれています。
    - **`dist/mml2abc.mjs`**: ES Modules形式で提供されるmml2abcライブラリの本体ファイルです。ブラウザ環境で直接インポートして使用できます。
- **`generated-docs/`**: (この時点では空ですが、将来的に自動生成されるドキュメントが格納されることを意図したディレクトリです。)
- **`googled947dc864c270e07.html`**: Google Search Consoleなど、Googleサービスでのサイト所有権確認に使用されるファイルです。
- **`jest.config.js`**: JavaScriptのテストフレームワークであるJestの設定ファイルです。テストの実行方法や対象ファイルなどが定義されています。
- **`package-lock.json`**: `package.json`に基づいてインストールされたnpmパッケージの厳密なバージョンと依存関係ツリーを記録し、ビルドの再現性を保証します。
- **`package.json`**: プロジェクトのメタデータ（名前、バージョン、スクリプト、依存関係など）を定義するファイルです。開発に必要なツールやライブラリの情報が含まれています。
- **`peggyjs/`**: Peggy.jsパーサジェネレータの定義ファイルが格納されるディレクトリです。
    - **`peggyjs/mml2abc.pegjs`**: Music Macro Language (MML) の文法規則を定義するファイルです。この定義に基づいて、MML文字列を解析し、その構造を抽象構文木 (AST) に変換するパーサが自動生成されます。
- **`src/`**: プロジェクトのTypeScriptソースコードが格納されるディレクトリです。
    - **`src/main.ts`**: TypeScriptのメインエントリポイントですが、このプロジェクトでは主に他のファイルからの生成物を中心に使用するため、現在のところ内容は空です。
    - **`src/mml2abc.commonjs.js`**: Peggy.jsによって生成されたMMLパーサのコードと、そのパーサが生成したASTをABC記譜法に変換するロジックが含まれるJavaScriptファイルです。CommonJS形式で提供され、Node.js環境やテストで使用されます。
- **`test/`**: プロジェクトのテストコードが格納されるディレクトリです。
    - **`test/mml2abc.test.ts`**: `mml2abc`ライブラリの機能、特にMMLからABCへの変換処理の正確性を検証するためのJestテストコードです。TypeScriptで記述されています。
- **`tsconfig.json`**: TypeScriptコンパイラの設定ファイルです。TypeScriptコードのコンパイルオプション（ターゲットECMAScriptバージョン、モジュール解決方法など）を定義します。
- **`webpack.config.js`**: webpackバンドラーの設定ファイルです。ソースコードの入力点、出力先、使用するローダー（例: TypeScriptのトランスパイル）、開発サーバーの設定などを定義します。

## 関数詳細説明
このプロジェクトでは、主に`peggyjs/mml2abc.pegjs`で定義されるMMLパーサの規則と、`src/mml2abc.commonjs.js`で定義されるMML-to-ABC変換ロジックの関数群があります。

### `peggyjs/mml2abc.pegjs`内の関数（パーサ規則）
これらの関数は、MML文字列を解析し、その構成要素を識別するためにPeggy.jsによって内部的に生成される規則です。
- **`MMLs`**: 複数のMMLトラックを含む全体を解析する最上位の規則です。
- **`MML`**: 単一のMMLトラックまたはセクションを解析します。
- **`NOTE`**: `c`, `d#`, `g-` などの音符を解析し、そのピッチと長さを抽出します。
- **`REST`**: `r` などの休符を解析します。
- **`OCTAVE`**: `o4` などのオクターブ指定を解析します。
- **`OCTAVE_UP`**: `<` などのオクターブ上昇記号を解析します。
- **`OCTAVE_DOWN`**: `>` などのオクターブ下降記号を解析します。
- **`NOTE_LENGTH`**: `4`, `8.`, `16` などの音符や休符の長さを解析します。
- **`CHORD`**: `[ceg]` などの和音を解析します。
- **`PROGRAM_CHANGE`**: `@p10` などの音色（プログラム）変更コマンドを解析します。
- **`TEMPO`**: `@t120` などのテンポ指定コマンドを解析します。
- **`VOLUME`**: `@v100` などの音量指定コマンドを解析します。
- **`STACCATO`**: `q` などのスタッカート記号を解析します。
- **`TRANSPOSE`**: `@k+2` などの移調コマンドを解析します。
- **`REPEAT`**: `{:` `}:` などの繰り返し記号を解析します。
- **`INLINE_ABC`**: `#ABC...` のようにMML内に直接ABC記譜法を埋め込む部分を解析します。
- **`TIME_SHIFT`**: `&` などの時間シフト記号を解析します。
- **`TRACK_SEPARATOR`**: `,` などの複数のMMLトラックを区切る記号を解析します。
- **`PITCH`**: 音符の基本的なピッチ（`a`から`g`）を解析します。
- **`SHARP`**: `#` または `+` などのシャープ記号を解析します。
- **`FLAT`**: `-` などのフラット記号を解析します。
- **`MINUS`**: マイナス記号を解析します。
- **`INTEGER`**: 数値（整数）を解析します。

### `src/mml2abc.commonjs.js`内の関数
これらの関数は、MMLパーサが生成した抽象構文木 (AST) を受け取り、最終的なABC記譜法文字列を構築するためのロジックを提供します。
- **`getNoteLengthAbc(length, dotCount, staccato)`**:
    - **役割**: MMLの音長、付点数、スタッカート情報から、対応するABC記譜法の音長文字列を生成します。
    - **引数**: `length` (基本となる音符の長さ), `dotCount` (付点の数), `staccato` (スタッカートの有無)
    - **戻り値**: ABC記譜法での音長表現文字列（例: "4", "8.", "16"）
- **`decimalToFraction(decimal)`**:
    - **役割**: 小数値を最も近い分数表現の文字列に変換します。音長の計算などで使用されます。
    - **引数**: `decimal` (変換したい小数値)
    - **戻り値**: 分数表現の文字列
- **`updateSharpFlats(currentPitch, currentOctave, sharpFlats)`**:
    - **役割**: 指定された音高とオクターブ、および現在の調号に基づいて、シャープ/フラットの適用を更新または判断します。
- **`initTrackParams()`**:
    - **役割**: 各MMLトラックの解析を開始する前に、オクターブ、テンポ、音量などのトラック固有のパラメータを初期状態にリセットします。
- **`insertVolumeBeforeNoteOrRest(elements, volumeAbc)`**:
    - **役割**: 変換中のABC記譜法要素リストにおいて、音符または休符の直前に音量指定のABC記譜法文字列を挿入します。
- **`volume2abc(volume)`**:
    - **役割**: MMLで指定された音量値（0-127）を、abcjsが認識できるABC記譜法の音量記号（例: `!p!`, `!mf!`, `!f!`）に変換します。
    - **引数**: `volume` (MMLでの音量値)
    - **戻り値**: ABC記譜法での音量記号文字列
- **`createAbc(mmlAst)`**:
    - **役割**: MMLパーサによって生成された抽象構文木 (AST) を入力として受け取り、MMLの各要素を解釈しながら、対応するABC記譜法文字列を生成します。これがMMLからABCへの変換の中心となる関数です。
    - **引数**: `mmlAst` (MMLパーサが生成したMMLのAST)
    - **戻り値**: 完全なABC記譜法文字列
- **`postProcess(abcString)`**:
    - **役割**: `createAbc`で生成されたABC記譜法文字列に対して、最終的な調整や整形を行います。例えば、不要な記号の除去や、特定の記法の最適化などです。
    - **引数**: `abcString` (未処理のABC記譜法文字列)
    - **戻り値**: 後処理が適用されたABC記譜法文字列
- **`peg$parse(...)` および `peg$parseMMLs(...)` などの `peg$` で始まる関数**:
    - **役割**: これらはPeggy.jsによって自動生成されるパーサの内部関数群です。MML文字列をトークン化し、文法規則に基づいて解析を行い、抽象構文木 (AST) を構築するプロセスを担います。通常、これらの関数は直接外部から呼び出すことはありません。
- **`text()`, `offset()`, `range()`, `location()`, `expected()`, `error()`**:
    - **役割**: これらはPeggy.jsパーサが解析中に現在のテキスト、オフセット、範囲、位置、期待される入力、およびエラー情報にアクセスするためのユーティリティ関数です。

## 関数呼び出し階層ツリー
```
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

---
Generated at: 2025-12-02 07:03:16 JST
