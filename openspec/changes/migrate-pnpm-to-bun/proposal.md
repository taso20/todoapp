# Proposal

## Why

パッケージ管理をpnpmからBunへ統一し，依存関係の導入と既存スクリプトの実行に使うツールを一本化する．あわせて，pnpm固有の名称と設定をリポジトリから除去する．

## What Changes

- `pnpm-lock.yaml`をBunのロックファイルへ置き換える．
- `package.json`に使用するBunのバージョンを宣言する．
- privateパッケージ名を`todo-pnpm-ts-app`から`todo-so`へ変更する．
- READMEと`.gitignore`からpnpm固有の記述を除去し，必要なBun向け記述へ更新する．
- 既存の依存パッケージ，Viteのスクリプト，アプリケーション挙動は変更しない．

## Capabilities

### New Capabilities

なし．この変更は開発ツールの移行であり，ユーザー向け機能を追加しない．

### Modified Capabilities

なし．既存のユーザー向け要件は変更しない．

## Impact

`package.json`，ロックファイル，README，`.gitignore`が影響を受ける．アプリケーションのソースコード，ランタイムAPI，プロダクション依存関係，ビルド成果物は変更対象外とする．
