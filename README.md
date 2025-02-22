# README.md

# Tobor

这是一个使用 [grammy](https://grammy.dev/zh/) 框架构建的简单 Telegram 机器人项目。该项目旨在提供一个基础的框架，便于扩展和自定义功能。

## 项目结构

```
tobor
├── api
│   └── webhook.ts
├── scripts
│   └── webhook.sh
├── src
│   ├── modules
│   │   ├── commands
│   │   │   ├── ...
│   │   │   ├── types.ts
│   │   │   └── index.ts
│   │   ├── handlers
│   │   │   ├── ...
│   │   │   ├── types.ts
│   │   │   └── index.ts
│   │   └── middlewares
│   │       ├── ...
│   │       ├── types.ts
│   │       └── index.ts
│   ├── config
│   │   └── index.ts
│   ├── types
│   │   └── index.ts
│   ├── utils
│   │   └── index.ts
│   └── index.ts
├── .env.example
├── .gitignore
├── package.json
├── tsconfig.json
├── vercel.json
├── index.ts
└── README.md
```

## 安装与使用

1. 克隆项目到本地：
   ```bash
   git clone <repository-url>
   cd tobor
   ```

2. 安装依赖：
   ```bash
   npm install
   ```

3. 配置环境变量：
   在 `.env` 文件中添加你的 Telegram bot token。

4. 启动项目：
   ```bash
   npm run dev
   ```

## 备忘录

设置Webhook：`npm run set-webhook`

查看日志：`vercel logs your-vercel-url`
