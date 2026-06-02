import { NextResponse } from 'next/server'
import { getTodos, addTodo } from './db'

// GET /api/todos - 获取所有待办
export async function GET() {
  return NextResponse.json(getTodos())
}

// POST /api/todos - 新增待办
export async function POST(request) {
  const { text } = await request.json()
  if (!text || !text.trim()) {
    return NextResponse.json({ error: '内容不能为空' }, { status: 400 })
  }
  const todo = addTodo(text.trim())
  return NextResponse.json(todo, { status: 201 })
}
