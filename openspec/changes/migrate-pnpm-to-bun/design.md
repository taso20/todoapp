# Design

## Context

現在は`pnpm-lock.yaml`だけが存在し，`package.json`にpackage managerの宣言はない．Bun 1.4.2が利用可能であり，既存の`dev`，`build`，`lint`，`preview`スクリプトはpackage manager固有のコマンドを含まない．動機は[proposal.md](./proposal.md)を参照する．

## Goals / Non-Goals

**Goals:**

- Bun 1.4.2で再現可能な依存関係を保持する．
- pnpm固有のリポジトリ表現を除去する．
- 既存のlintとproduction buildがBun経由で成功することを確認する．

**Non-Goals:**

- 依存パッケージの追加，削除，更新は行わない．
- npm scripts，Vite設定，アプリケーションコード，生成済み`dist/`は変更しない．
- Bun固有APIやBun test runnerは導入しない．

## Decisions

### Bunのバージョンを`packageManager`で固定する

`package.json`に`"packageManager": "bun@1.4.2"`を追加する．READMEだけでバージョンを伝える案は機械的に検出できないため採用しない．

### 既存の依存宣言からBunロックファイルを生成する

既存の`package.json`と`pnpm-lock.yaml`を入力として`bun install`を実行し，生成された`bun.lock`を追跡する．生成後は`pnpm-lock.yaml`を削除し，複数のロックファイルを併存させない．依存バージョンを手作業で転記する案は採用しない．

### package manager非依存の既存アプリ名を維持する

ユーザーが設定したprivateパッケージ名`todo-so`を維持する．公開パッケージではないため，名前変更に伴う互換レイヤーは設けない．

### pnpm固有の文書と無視設定だけを除去する

READMEのツール一覧をBunへ更新し，`.gitignore`の`pnpm-debug.log*`を削除する．Bun向けの未使用設定や補助スクリプトは追加しない．

## Risks / Trade-offs

- ロックファイル生成時に解決される推移依存関係が変わる可能性がある → 依存宣言を変更せず，`bun run lint`と`bun run build`を実行する．
- pnpmを前提とした未記載のローカル手順が使えなくなる → `packageManager`とREADMEでBunを明示し，pnpmロックファイルを残さない．

## Migration Plan

1. Bun 1.4.2で依存関係を導入し，`bun.lock`を生成する．
2. `package.json`，README，`.gitignore`を最小限更新し，`pnpm-lock.yaml`を削除する．
3. frozen lockfileでの導入，lint，production build，差分の空白検査を実行する．
4. 問題があれば変更対象ファイルをGitから復元し，pnpm構成へ戻す．
