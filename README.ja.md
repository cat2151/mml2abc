# mml2abc

<p align="left">
  <a href="README.ja.md"><img src="https://img.shields.io/badge/🇯🇵-Japanese-red.svg" alt="Japanese"></a>
  <a href="README.md"><img src="https://img.shields.io/badge/🇺🇸-English-blue.svg" alt="English"></a>
  <a href="https://deepwiki.com/cat2151/mml2abc"><img src="https://deepwiki.com/badge.svg" alt="Ask DeepWiki"></a>
  <a href="https://cat2151.github.io/mml2abc/dist/"><img src="https://img.shields.io/badge/🌐-Live_Demo-green.svg" alt="Live Demo"></a>
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
