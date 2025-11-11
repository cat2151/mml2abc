Last updated: 2025-11-12

# Development Status

## 現在のIssues
オープン中のIssueはありません。

## 次の一手候補
1.  開発状況レポートの生成品質改善
    -   最初の小さな一歩: 現在の `development-status-prompt.md` と `generated-docs/development-status.md` の内容を比較し、生成されたレポートの精度と指示の遵守状況を評価する。
    -   Agent実行プロンプ:
        ```
        対象ファイル: .github/actions-tmp/.github_automation/project_summary/prompts/development-status-prompt.mdと.github/actions-tmp/generated-docs/development-status.md

        実行内容: 対象ファイルを分析し、開発状況生成プロンプト（本プロンプト）の指示が生成された開発状況レポートにどの程度正確に反映されているかを評価してください。特に、以下の点を中心に分析してください：
        1) 現在のIssuesの要約が3行に収まっているか、正確か
        2) 次の一手候補が3つリストされているか、それぞれが具体的か
        3) 各候補の最初の小さな一歩が実行可能か
        4) 各候補のAgent実行プロンプトがガイドラインに従って記述されているか
        5) ハルシネーションや不適切な提案が含まれていないか

        確認事項: 分析前に、現在の開発状況生成プロンプトの要件と制約を再確認してください。

        期待する出力: 評価結果と、`development-status-prompt.md`を改善するための具体的な提案をmarkdown形式で出力してください。
        ```

2.  共通GitHub Actionsワークフローの利用ガイドライン作成
    -   最初の小さな一歩: `.github/workflows/call-daily-project-summary.yml` のワークフロー定義をレビューし、外部プロジェクトが利用する際に必要となる設定項目、入力パラメータ、前提条件を洗い出す。
    -   Agent実行プロンプト:
        ```
        対象ファイル: .github/workflows/call-daily-project-summary.ymlと.github/actions-tmp/.github_automation/project_summary/docs/daily-summary-setup.md

        実行内容: 対象ファイルについて、外部プロジェクトがこの`call-daily-project-summary.yml`ワークフローを利用する際に必要な設定項目を洗い出し、以下の観点から分析してください：
        1) 必須入力パラメータ（例：repository-token, target-branch）
        2) 必須シークレット（例：GITHUB_TOKEN, GEMINI_API_KEY）
        3) ファイル配置やリポジトリ構造の前提条件
        4) 外部プロジェクトでの利用時に必要な追加設定や考慮事項

        確認事項: 作業前に既存のworkflowファイルとの依存関係、および`daily-summary-setup.md`の内容との整合性を確認してください。

        期待する出力: 外部プロジェクトがこの`call-daily-project-summary.yml`を導入する際の手順書をmarkdown形式で生成してください。具体的には：必須パラメータの設定方法、シークレットの登録手順、前提条件の確認項目を含めてください。
        ```

3.  MML2ABCコンバーターのテストケース拡充
    -   最初の小さな一歩: `test/mml2abc.test.ts` をレビューし、現在のテストでカバーされているMML構文と、まだテストされていない可能性のある複雑なMML構文やエッジケース（例: ネストされた繰り返し、異なる音価の組み合わせ、無音指定など）を特定する。
    -   Agent実行プロンプト:
        ```
        対象ファイル: src/mml2abc.commonjs.jsとpeggyjs/mml2abc.pegjsとtest/mml2abc.test.ts

        実行内容: 対象ファイルを分析し、MMLからABCへの変換ロジックにおいて、現在の`test/mml2abc.test.ts`で十分にカバーされていないMML構文や変換の脆弱性を見つけ出してください。特に、パーサージェネレーター（peggyjs）で定義されている文法と、実際の変換ロジックの対応関係に注目してください。

        確認事項: MMLの一般的な記法とABC記法の変換ルールについて理解していることを前提とします。

        期待する出力: 追加すべきMML入力とそれに対応する期待されるABC出力のペアを3つ提案し、それぞれのテストケースがどのようなMML構文やエッジケースをカバーするのかを説明するmarkdown形式のリストを生成してください。

---
Generated at: 2025-11-12 07:03:15 JST
