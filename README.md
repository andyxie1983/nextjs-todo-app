# 📝 Todo App - Next.js 全栈 Demo

一个简单的待办事项应用，演示 Next.js App Router + API Routes。

## 功能

- ✅ 添加 / 删除 / 完成待办事项
- ✅ 后端 API（`/api/todos`）
- ✅ 健康检查接口（`/api/health`）
- ✅ 响应式界面

## 运行

```bash
npm install
npm run dev
```

打开 http://localhost:3000

## API 接口

| 方法 | 路径 | 说明 |
|------|------|------|
| GET | /api/todos | 获取所有待办 |
| POST | /api/todos | 新增待办 |
| PATCH | /api/todos/:id | 切换完成状态 |
| DELETE | /api/todos/:id | 删除待办 |
| GET | /api/health | 健康检查 |

## 部署

推送到 GitHub 后，关联 [Vercel](https://vercel.com) 即可自动部署。
