# MyFirst：个人全栈网站

这个项目用于完整学习 Web 工程：前端、后端、数据库、文件存储、部署与运维都保留在同一个 Git 仓库中。

## 目录

- `apps/web`：React + TypeScript 前端
- `apps/api`：NestJS + Prisma API
- `apps/api/prisma`：MySQL 数据模型
- `docker-compose.yml`：本地 MySQL 与 Adminer
- `dist`：已上线的静态原型，重构期间继续保留

## 本地启动

1. 将 `.env.example` 复制为 `.env`。
2. 运行 `npm install`。
3. 运行 `npm run infra:up`。
4. 运行 `npm run db:generate` 和 `npm run db:migrate`。
5. 运行 `npm run dev`。

前端：http://localhost:5173  
API：http://localhost:3000/api/health  
数据库管理：http://localhost:8080
