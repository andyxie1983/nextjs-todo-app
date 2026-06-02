import './globals.css'

export const metadata = {
  title: 'Todo App',
  description: 'A simple todo app with Next.js API routes',
}

export default function RootLayout({ children }) {
  return (
    <html lang="zh">
      <body>{children}</body>
    </html>
  )
}
