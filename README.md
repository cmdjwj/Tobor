# README.md

# Tobor

这是一个使用 [grammy](https://grammy.dev/zh/) 框架构建的简单 Telegram 机器人项目。该项目旨在提供一个基础的框架，便于扩展和自定义功能。

## 项目结构

```
tobor
├── src
│   ├── bot.ts            # 配置 bot 的基本设置
│   ├── commands           # 命令处理函数
│   │   └── index.ts
│   ├── config             # 配置设置
│   │   └── index.ts
│   ├── handlers           # 事件处理函数
│   │   └── index.ts
│   ├── middlewares        # 中间件函数
│   │   └── index.ts
│   ├── types              # 自定义类型和接口
│   │   └── index.ts
│   └── utils              # 工具函数
│       └── index.ts
├── .env.example           # 环境变量配置示例文件
├── .gitignore             # 版本控制忽略文件
├── package.json           # npm 配置文件
├── tsconfig.json          # TypeScript 配置文件
└── README.md              # 项目文档
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
   npm start
   ```
