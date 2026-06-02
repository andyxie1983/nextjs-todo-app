import { NextResponse } from 'next/server'

// GET /api/health - 健康检查接口
export async function GET() {
  return NextResponse.json({
    status: 'ok',
    time: new Date().toISOString(),
    message: '🚀 Next.js 后端运行中！'
  })
}
