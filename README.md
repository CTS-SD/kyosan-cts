# Kyosan CTS

京都産業大学キャンパスツアースタッフ (CTS) 向け内部 Web アプリ。

## 機能

- **ぷらっとテスト** - スタッフが大学知識を試すクイズゲーム
- **管理ダッシュボード** - Google OAuth ログインによるクイズ・設定・部署管理
- **部署発表** - 新入生向け配属・部署公開アニメーション
- **メンバー管理** - 部署発表に表示するスタッフの登録・編集

## Tech Stack

| カテゴリ | ライブラリ |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack) |
| Language | TypeScript 5.9 (strict) |
| UI | React 19, Tailwind CSS 4, Shadcn/ui, Radix UI, Motion |
| Database | PostgreSQL 17 via Drizzle ORM |
| Auth | Better-Auth (Google OAuth) |
| Forms | React Hook Form + Zod 4 |
| State | Zustand (client), TanStack React Query (server), nuqs (URL) |
| Linting | Biome |
| Testing | Vitest (unit), Playwright (E2E) |

## コマンド

```bash
pnpm dev --turbopack   # 開発サーバー起動
pnpm build             # プロダクションビルド
pnpm typecheck         # TypeScript 型チェック
pnpm lint              # Biome lint
pnpm format            # Biome フォーマット
pnpm check             # lint + format (combined)
pnpm test:unit         # ユニットテスト (watch)
pnpm test:unit run     # ユニットテスト (1回)
pnpm test:e2e          # E2E テスト (Playwright)
```

### DB コマンド

```bash
pnpm db:generate  # マイグレーション生成
pnpm db:migrate   # マイグレーション実行
pnpm db:studio    # Drizzle Studio 起動
pnpm db:backup    # DB バックアップ
```

## ディレクトリ構成

```
app/                    # Next.js App Router
  (public)/             # 公開ルート (ホーム, サインイン, クイズプレイ)
  admin/                # 管理者ルート (クイズ CRUD, 設定, 部署管理)
  members/              # メンバーディレクトリ
  api/auth/             # Better-Auth API

components/             # 共通 React コンポーネント
features/               # 機能別モジュール (auth, config, quiz, student)
hooks/                  # React フック (query/ = TanStack Query フック)
lib/                    # コアロジック
  auth/                 # Better-Auth 設定
  db/                   # Drizzle ORM (schema/, migrations/)
  env.ts                # 環境変数バリデーション
scripts/                # DB バックアップ・シードスクリプト
```

## 開発環境セットアップ

Docker Compose で PostgreSQL を起動する。

```bash
docker compose up -d
```

- 開発 DB: `localhost:5432`
- テスト DB: `localhost:5433` (エフェメラル、テスト毎にリセット)

`.env.local` を作成し、必要な環境変数を設定する。
