import { NextResponse } from 'next/server'
import { toggleTodo, deleteTodo } from '../db'

// PATCH /api/todos/[id] - 切换完成状态
export async function PATCH(request, { params }) {
  const id = parseInt(params.id)
  const todo = toggleTodo(id)
  if (!todo) {
    return NextResponse.json({ error: '未找到' }, { status: 404 })
  }
  return NextResponse.json(todo)
}

// DELETE /api/todos/[id] - 删除待办
export async function DELETE(request, { params }) {
  const id = parseInt(params.id)
  deleteTodo(id)
  return NextResponse.json({ success: true })
}
