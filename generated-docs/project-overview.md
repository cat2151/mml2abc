Last updated: 2025-11-12

# Project Overview

## プロジェクト概要
- MML（Music Macro Language）をABC記譜法に変換するJavaScriptライブラリです。
- ブラウザ上でMMLの楽譜を生成し、音楽再生を可能にすることを目的としています。
- 特に、ObsidianのようなノートアプリでMMLを使った音楽表現を実現することを目指しています。

## 技術スタック
- フロントエンド:
  - **abcjs**: ブラウザで五線譜を描画し、SoundFont GM音源ソフトシンセを鳴らすためのライブラリ。生成されたABC記譜法を視覚化・再生する役割を担います。
  - **webpack-dev-server**: 開発中にブラウザページをライブリロード（ホットリロード）し、リアルタイムでの確認を可能にします。
- 音楽・オーディオ:
  - **MML (Music Macro Language)**: 入力として使用される音楽記述言語。SiONおよびZ-MUSICのサブセットを方言として採用しています。
  - **ABC music notation**: MMLから変換される出力形式。シンプルで読みやすい楽譜記述言語です。
- 開発ツール:
  - **Node.js**: JavaScript実行環境。開発時のビルド、テストスクリプト実行などに使用されます。
  - **VSCode (Visual Studio Code)**: 開発環境として推奨されるエディタ。Jest拡張と連携し、テスト駆動開発を支援します。
- テスト:
  - **Jest**: JavaScriptのテストフレームワーク。MMLパーサーのTDD（テスト駆動開発）に使用され、コードの品質と正確性を保証します。
  - **ts-jest**: JestがTypeScriptファイルを実行できるようにするためのトランスフォーマ。
- ビルドツール:
  - **peggy**: MMLの文法定義ファイル（`.pegjs`）から、MMLパーサーのJavaScriptコードを自動生成するパーサジェネレータ。
  - **webpack**: プロジェクトのJavaScriptファイルをバンドルし、ブラウザで効率的に動作する形式に変換します。
- 言語機能:
  - **JavaScript**: プロジェクトの主要なプログラミング言語。
  - **TypeScript**: 静的型付けを導入し、開発効率とコードの信頼性を向上させるための言語。
- 自動化・CI/CD:
  - **chokidar-cli**: ファイルの変更を監視し、`peggy`によるパーサーの再生成やJestテストの自動実行をトリガーします。
  - **npm-run-all**: 複数のnpmスクリプトを並行または直列で実行するためのツール。
- 開発標準:
  - **TypeScript**: 型安全性を提供し、コード品質の向上とエラーの早期発見に貢献します。

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
- **`.gitignore`**: Gitがバージョン管理の対象から除外するファイルやディレクトリを指定します。
- **`LICENSE`**: プロジェクトの配布および使用に関するライセンス情報を提供します。
- **`README.ja.md` / `README.md`**: プロジェクトの目的、機能、使用方法、開発手順などの概要を日本語と英語で記述したドキュメントです。
- **`_config.yml`**: GitHub Pagesのビルド設定ファイルで、静的サイトの生成に利用されます。
- **`dist/`**: プロジェクトのビルド成果物（ウェブブラウザで動作するファイル）が格納されるディレクトリです。
  - **`dist/index.html`**: MML2ABCライブラリのデモページです。MMLを入力し、ABC記譜法に変換して表示・再生するウェブインターフェースを提供します。
  - **`dist/main.js`**: webpackによってバンドルされた、ブラウザ向けのMML2ABCライブラリのJavaScriptコードです。
  - **`dist/mml2abc.mjs`**: ES Modules形式で提供されるMML2ABCライブラリのJavaScriptコードです。
- **`generated-docs/`**: ドキュメント生成ツールによって作成されたドキュメントが格納される予定のディレクトリです。
- **`jest.config.js`**: Jestテストフレームワークの設定ファイルで、テストの実行方法や対象を指定します。
- **`package-lock.json`**: `package.json`に記述された依存関係の厳密なバージョンと依存ツリーを記録し、複数環境での一貫した依存関係インストールを保証します。
- **`package.json`**: プロジェクトのメタデータ（名前、バージョン、説明など）、依存関係、開発スクリプト（ビルド、テスト、監視など）を定義します。
- **`peggyjs/`**: Peggy.jsのパーサー定義ファイルが格納されるディレクトリです。
  - **`peggyjs/mml2abc.pegjs`**: Music Macro Language (MML) の文法規則を定義するファイルです。この定義に基づいて、MMLをABC記譜法に変換するパーサーが自動生成されます。
- **`src/`**: プロジェクトのソースコードが格納されるディレクトリです。
  - **`src/main.ts`**: プロジェクトのTypeScriptエントリポイントですが、現在のところ内容はほとんどありません。
  - **`src/mml2abc.commonjs.js`**: `mml2abc.pegjs`からPeggy.jsによって自動生成された、MMLパーサーのCommonJS形式のJavaScriptコードです。MML文字列を解析し、ABC記譜法に変換する主要なロジックが含まれています。
- **`test/`**: プロジェクトのテストコードが格納されるディレクトリです。
  - **`test/mml2abc.test.ts`**: `mml2abc`パーサーの機能が期待通りに動作するかを検証するためのテストスイートです。TypeScriptで記述されています。
- **`tsconfig.json`**: TypeScriptコンパイラの設定ファイルで、コンパイルオプション（出力ターゲット、モジュール解決方法など）を定義します。
- **`webpack.config.js`**: webpackバンドラーの設定ファイルで、モジュールの解決、バンドルの方法、出力先などを定義します。

## 関数詳細説明
このプロジェクトでは、主に`peggyjs/mml2abc.pegjs`で定義された文法規則と、それから自動生成される`src/mml2abc.commonjs.js`内のパーサー関連関数が中心となります。

**`peggyjs/mml2abc.pegjs`内の文法規則（自動生成されるパーサーの構成要素）:**
これらの「関数」はMMLの特定の構文要素を解析するための規則として定義されています。
- **`MMLs`**: (解析対象: 複数のMMLシーケンス) 複数のMMLトラック全体を解析する最上位の規則。
- **`MML`**: (解析対象: 単一のMMLシーケンス) 単一のMMLトラック（例えば`o4cdefg`）を解析する規則。
- **`NOTE`**: (解析対象: 音符) MMLにおける音符（例: `c`, `d#`, `e-`）を解析し、対応するABC記譜法の音符に変換する。
- **`REST`**: (解析対象: 休符) MMLにおける休符（例: `r`）を解析する。
- **`OCTAVE`**: (解析対象: オクターブ指定) `o`コマンドによるオクターブの絶対指定（例: `o4`）を解析する。
- **`OCTAVE_UP`**: (解析対象: オクターブ上げ) `>`記号によるオクターブを一つ上げるコマンドを解析する。
- **`OCTAVE_DOWN`**: (解析対象: オクターブ下げ) `<`記号によるオクターブを一つ下げるコマンドを解析する。
- **`NOTE_LENGTH`**: (解析対象: 音符の長さ) `l`コマンドや音符の後ろに続く数値（例: `l4`, `c1`）で音符の長さを指定する部分を解析する。
- **`CHORD`**: (解析対象: 和音) `<...>`で囲まれた和音表記（例: `<c,e,g>`）を解析する。
- **`PROGRAM_CHANGE`**: (解析対象: 音色変更) `@`コマンドによる音色変更（例: `@1`）を解析する。
- **`TEMPO`**: (解析対象: テンポ変更) `t`コマンドによるテンポ指定（例: `t120`）を解析する。
- **`VOLUME`**: (解析対象: 音量変更) `v`コマンドによる音量指定（例: `v100`）を解析する。
- **`STACCATO`**: (解析対象: スタッカート) `$staccato(...)`形式のスタッカート表現を解析する。
- **`TRANSPOSE`**: (解析対象: 移調) `$transpose(...)`形式の移調表現を解析する。
- **`REPEAT`**: (解析対象: 繰り返し) `[...]n`形式の繰り返し表現を解析する。
- **`INLINE_ABC`**: (解析対象: ABC記譜法埋め込み) `$abc(...)`でMML内に直接ABC記譜法を埋め込む形式を解析する。
- **`TIME_SHIFT`**: (解析対象: 時間シフト) `$timeShift(...)`形式の時間シフト表現を解析する。
- **`TRACK_SEPARATOR`**: (解析対象: トラック区切り) `&`記号によるトラック間の区切りを解析する。
- **`PITCH`**: (解析対象: 音の高さ) 音名（`a`から`g`）とその修飾記号（`#`, `-`など）を解析する。
- **`SHARP`**: (解析対象: シャープ) `+`または`#`記号を解析する。
- **`FLAT`**: (解析対象: フラット) `-`記号を解析する。
- **`MINUS`**: (解析対象: マイナス記号) 数値の符号としての`-`を解析する。
- **`INTEGER`**: (解析対象: 整数) 数値を解析する。

**`src/mml2abc.commonjs.js`内の主要な関数:**
このファイルは`mml2abc.pegjs`から自動生成されたパーサーのランタイムコードを含みます。
- **`getNoteLengthAbc(length: number, tie?: boolean): string`**:
  - 役割: 数値で指定された音符の長さをABC記譜法に対応する文字列に変換します。音符がタイで連結されているかどうかも考慮します。
  - 引数: `length` (数値): 音符の長さ、`tie` (真偽値, オプション): タイの有無。
  - 戻り値: (文字列) ABC記譜法の長さ表現（例: `"2"`, `"1/2"`）。
- **`decimalToFraction(decimal: number): string`**:
  - 役割: 小数値を最も近い分数表現の文字列に変換します。
  - 引数: `decimal` (数値): 変換する小数値。
  - 戻り値: (文字列) 分数形式の文字列（例: `"1/4"`）。
- **`updateSharpFlats(abc: string, track: object): string`**:
  - 役割: 生成されたABC記譜法文字列内のシャープやフラットの表示を調整し、トラックの状態（現在のキーや臨時記号の状態）を更新します。
  - 引数: `abc` (文字列): ABC記譜法の一部、`track` (オブジェクト): トラックの現在の状態。
  - 戻り値: (文字列) 調整後のABC記譜法文字列。
- **`peg$parseMMLs`, `peg$parseMML`, `peg$parseNOTE`, ... (`peg$parse`プレフィックスの関数群)**:
  - 役割: `mml2abc.pegjs`で定義された各文法規則に対応する、Peggy.jsパーサーの内部関数群です。入力MML文字列を解析し、抽象構文木 (AST) を構築したり、直接ABC記譜法の断片を生成したりします。これらはパーサーのコアロジックを構成します。
  - 引数/戻り値: 内部的に複雑な状態管理を行いながら、文字列の特定部分を解析し、結果を返します。
- **`initTrackParams(): object`**:
  - 役割: 各MMLトラックの初期パラメータ（例: デフォルトオクターブ、音量、移調設定など）を初期化するオブジェクトを生成します。
  - 引数: なし。
  - 戻り値: (オブジェクト) 初期化されたトラックパラメータ。
- **`insertVolumeBeforeNoteOrRest(abc: string, track: object): string`**:
  - 役割: 音符や休符の前に、現在のトラックの音量設定をABC記譜法の形式で挿入します。
  - 引数: `abc` (文字列): ABC記譜法の断片、`track` (オブジェクト): トラックの現在の状態。
  - 戻り値: (文字列) 音量情報が挿入されたABC記譜法文字列。
- **`volume2abc(vol: number): string`**:
  - 役割: MMLの音量値（0-127）をABC記譜法に対応する音量コマンドに変換します。
  - 引数: `vol` (数値): MMLの音量値。
  - 戻り値: (文字列) ABC記譜法の音量コマンド（例: `!volume(100)!`）。
- **`createAbc(mmlAst: object, options: object): string`**:
  - 役割: MMLパーサーによって生成された抽象構文木 (AST) を受け取り、最終的なABC記譜法文字列に変換する主要な関数です。各種オプションも適用されます。
  - 引数: `mmlAst` (オブジェクト): MMLの抽象構文木、`options` (オブジェクト): 変換オプション。
  - 戻り値: (文字列) 完成したABC記譜法文字列。
- **`postProcess(abc: string): string`**:
  - 役割: `createAbc`で生成されたABC記譜法文字列に対して、最終的な後処理（例: 整形、不要な空白の除去、特定の記号の調整など）を行います。
  - 引数: `abc` (文字列): 生成されたABC記譜法文字列。
  - 戻り値: (文字列) 後処理済みのABC記譜法文字列。
- **`if`, `while`, `function`, `for`, `map`, `replace`, `switch`**:
  - 役割: これらはJavaScriptの標準的な制御構文や組み込みメソッドであり、`src/mml2abc.commonjs.js`内のコードロジックを構成するために使用されています。特定の関数ではなく、コードフローやデータ操作の一部として機能します。

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
Generated at: 2025-11-12 07:03:39 JST
