# Config 設定說明

## 目錄結構

```
config/
├── env.type.ts              # 環境變數型別定義
├── env.dev.ts               # 開發環境設定
├── env.prod.ts              # 生產環境設定
├── secrets.local.ts         # 本地機密設定（gitignored）
└── secrets.local.example.ts # 機密設定範本
```

## 初次設定

1. 複製範本檔案：
   ```bash
   cp config/secrets.local.example.ts config/secrets.local.ts
   ```

2. 編輯 `secrets.local.ts`，填入實際的 token：
   ```typescript
   export const GITHUB_TOKEN = "ghp_your_actual_token_here";
   ```

3. 切換環境並生成 `.env`：
   ```bash
   pnpm switch dev   # 開發環境
   pnpm switch prod  # 生產環境
   ```

## 檔案說明

| 檔案 | 用途 | Git 追蹤 |
|------|------|----------|
| `env.type.ts` | 定義 `EnvConfig` 型別 | ✅ |
| `env.dev.ts` | 開發環境變數 | ✅ |
| `env.prod.ts` | 生產環境變數 | ✅ |
| `secrets.local.ts` | 存放敏感資訊（token 等） | ❌ |
| `secrets.local.example.ts` | 機密設定範本 | ✅ |

## 新增機密變數

1. 在 `secrets.local.ts` 新增 export：
   ```typescript
   export const GITHUB_TOKEN = "...";
   export const NEW_SECRET = "...";
   ```

2. 同步更新 `secrets.local.example.ts` 範本

3. 在 `env.dev.ts` / `env.prod.ts` 中 import 並使用
