// 内存数据库（演示用）
let todos = [
  { id: 1, text: '学习 Next.js API Routes', done: true },
  { id: 2, text: '部署到 Vercel', done: false },
  { id: 3, text: '分享给朋友', done: false },
]
let nextId = 4

export function getTodos() {
  return todos
}

export function addTodo(text) {
  const todo = { id: nextId++, text, done: false }
  todos.push(todo)
  return todo
}

export function toggleTodo(id) {
  const todo = todos.find(t => t.id === id)
  if (todo) todo.done = !todo.done
  return todo
}

export function deleteTodo(id) {
  todos = todos.filter(t => t.id !== id)
}
