# mml2abc
A library transpiles Music Macro Language into ABC music notation.

# demo
https://cat2151.github.io/mml2abc/dist/

# 分担
- `mml2abc.pegjs を作ること`
  - が、このリポジトリの担当です。
- `easyにmml2abcを使える仕組み を作ること`
  - は、[easymmlabc](https://github.com/cat2151/easymmlabc/)で担当します。

# このprojectが優先すること
- 関数に`MML文字列`を与えて、`abcjsが演奏可能な文字列`を取得できること。

# 開発手順
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
