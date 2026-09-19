# Tasks

## 1. Bunへの移行

- [x] 1.1 `package.json`の名前`todo-so`を維持し，`packageManager`に`bun@1.4.2`を追加して，既存の依存宣言とscriptsに差分がないことを確認する．
- [x] 1.2 Bun 1.4.2で`bun.lock`を生成して`pnpm-lock.yaml`を削除し，`bun install --frozen-lockfile`が成功することを確認する．
- [x] 1.3 READMEのpnpm表記をBunへ変更し，`.gitignore`から`pnpm-debug.log*`を削除して，`rg "pnpm" package.json README.md .gitignore`が一致なしになることを確認する．

## 2. 回帰確認

- [x] 2.1 `bun run lint`と`bun run build`を実行し，いずれも成功することを確認する．
- [x] 2.2 `git diff --check`を実行し，アプリケーションソース，Vite設定，依存宣言，生成済み`dist/`に意図しない差分がないことを確認する．
