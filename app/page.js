'use client'
import { useState, useEffect } from 'react'

export default function Home() {
  const [todos, setTodos] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(true)
  const [serverTime, setServerTime] = useState('')

  // 从后端 API 获取待办列表
  useEffect(() => {
    fetchTodos()
    fetchHealth()
  }, [])

  async function fetchTodos() {
    const res = await fetch('/api/todos')
    const data = await res.json()
    setTodos(data)
    setLoading(false)
  }

  async function fetchHealth() {
    const res = await fetch('/api/health')
    const data = await res.json()
    setServerTime(data.time)
  }

  // 添加待办
  async function addTodo(e) {
    e.preventDefault()
    if (!input.trim()) return
    const res = await fetch('/api/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: input }),
    })
    const newTodo = await res.json()
    setTodos([...todos, newTodo])
    setInput('')
  }

  // 切换完成状态
  async function toggleTodo(id) {
    const res = await fetch(`/api/todos/${id}`, { method: 'PATCH' })
    const updated = await res.json()
    setTodos(todos.map(t => t.id === id ? updated : t))
  }

  // 删除待办
  async function deleteTodo(id) {
    await fetch(`/api/todos/${id}`, { method: 'DELETE' })
    setTodos(todos.filter(t => t.id !== id))
  }

  if (loading) return <div style={styles.container}><p>加载中...</p></div>

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🚀 待办事项 v2.0</h1>
      <p style={styles.subtitle}>Next.js 全栈 Demo — 自动部署测试</p>
      
      {serverTime && (
        <div style={styles.badge}>
          🟢 服务器在线 · {new Date(serverTime).toLocaleString('zh-CN')}
        </div>
      )}

      <form onSubmit={addTodo} style={styles.form}>
        <input
          style={styles.input}
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="添加新的待办事项..."
        />
        <button style={styles.button} type="submit">添加</button>
      </form>

      <div style={styles.list}>
        {todos.length === 0 && <p style={styles.empty}>暂无待办事项，添加一个吧！</p>}
        {todos.map(todo => (
          <div key={todo.id} style={styles.item}>
            <span
              onClick={() => toggleTodo(todo.id)}
              style={{
                ...styles.text,
                textDecoration: todo.done ? 'line-through' : 'none',
                opacity: todo.done ? 0.5 : 1,
                cursor: 'pointer',
              }}
            >
              {todo.done ? '✅' : '⬜'} {todo.text}
            </span>
            <button onClick={() => deleteTodo(todo.id)} style={styles.deleteBtn}>🗑️</button>
          </div>
        ))}
      </div>

      <p style={styles.footer}>
        共 {todos.length} 项 · 已完成 {todos.filter(t => t.done).length} 项
      </p>
      <p style={styles.version}>v2.0 · Powered by Next.js + Vercel 🎉</p>
    </div>
  )
}

const styles = {
  container: {
    background: 'white',
    borderRadius: '16px',
    padding: '40px',
    width: '100%',
    maxWidth: '500px',
    boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
  },
  title: { fontSize: '28px', marginBottom: '4px' },
  subtitle: { color: '#888', fontSize: '14px', marginBottom: '16px' },
  badge: {
    background: '#f0fff4', border: '1px solid #c6f6d5', borderRadius: '8px',
    padding: '8px 12px', fontSize: '13px', color: '#276749', marginBottom: '20px',
  },
  form: { display: 'flex', gap: '8px', marginBottom: '24px' },
  input: {
    flex: 1, padding: '12px 16px', border: '2px solid #eee',
    borderRadius: '8px', fontSize: '16px', outline: 'none',
  },
  button: {
    padding: '12px 20px', background: '#667eea', color: 'white',
    border: 'none', borderRadius: '8px', fontSize: '16px', cursor: 'pointer',
  },
  list: { display: 'flex', flexDirection: 'column', gap: '8px' },
  item: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    padding: '12px 16px', background: '#f8f9fa', borderRadius: '8px',
  },
  text: { fontSize: '16px' },
  deleteBtn: { background: 'none', border: 'none', fontSize: '18px', cursor: 'pointer' },
  empty: { color: '#aaa', textAlign: 'center', padding: '20px' },
  footer: { color: '#888', fontSize: '13px', textAlign: 'center', marginTop: '16px' },
  version: { color: '#aaa', fontSize: '12px', textAlign: 'center', marginTop: '8px' },
}
