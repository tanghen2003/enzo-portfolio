# Enzo Portfolio

Matrix 風格個人作品集網站，內建 AI ChatBot（Groq API）。

![Preview](https://via.placeholder.com/800x400/000000/00ffaa?text=Matrix+Portfolio)

## ✨ 功能

- 🎨 Matrix 數字雨動畫背景
- 📱 響應式設計（手機/平板/桌面）
- 🤖 AI ChatBot（Groq Llama 3.1）
- ⚡ Vite + React + TypeScript
- 🎯 Tailwind CSS 樣式

## 🚀 快速開始

### 1. 安裝依賴

```bash
pnpm install
# 或
npm install
```

### 2. 設定環境變數

複製 `.env.example` 為 `.env`，並填入你的 Groq API Key：

```bash
cp .env.example .env
```

到 [console.groq.com](https://console.groq.com) 註冊並取得免費 API Key。

### 3. 啟動開發伺服器

```bash
pnpm dev
# 或
npm run dev
```

打開 [http://localhost:3000](http://localhost:3000) 查看網站。

## 📦 建置

```bash
pnpm build
```

建置產物在 `dist/` 目錄。

## 🛠️ 技術棧

- **框架**: React 18 + TypeScript
- **建置工具**: Vite 5
- **樣式**: Tailwind CSS
- **AI**: Groq API (Llama 3.1)

## 📁 專案結構

```
enzo-portfolio/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── ChatBot.tsx      # AI 聊天機器人
│   │   └── MatrixRain.tsx   # Matrix 數字雨背景
│   ├── App.tsx              # 主應用組件
│   ├── main.tsx             # 入口點
│   └── index.css            # 全域樣式
├── .env.example             # 環境變數範例
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

## 🔧 自訂

### 修改個人資訊

編輯 `src/App.tsx` 中的：
- `projects` - 專案列表
- `skills` - 技能清單
- `contacts` - 聯絡資訊

### 修改 ChatBot 設定

編輯 `src/components/ChatBot.tsx` 中的 `SYSTEM_PROMPT` 來調整 AI 的回應風格。

### 修改配色

編輯 `tailwind.config.js` 中的 `colors.matrix` 來更改主題色。

## 📄 授權

MIT License

---

Made with 💚 by Enzo
