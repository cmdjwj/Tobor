# README.md

# Tobor

这是一个使用 [grammy](https://grammy.dev/zh/) 框架构建的简单 Telegram 机器人项目。该项目旨在提供一个基础的框架，便于扩展和自定义功能。

## 项目结构

```
tobor
├── api
│   └── webhook.ts
├── src
│   ├── bot
│   │   └── index.ts
│   ├── commands
│   │   └── index.ts
│   ├── config
│   │   └── index.ts
│   ├── handlers
│   │   └── index.ts
│   ├── middlewares
│   │   └── index.ts
│   ├── types
│   │   └── index.ts
│   └── utils
│       └── index.ts
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

查看日志：
`vercel logs your-vercel-url`

## TODO

- [ ] 更新项目结构，完善日志
- [ ] 添加大模型响应（以及权限设置）