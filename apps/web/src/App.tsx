import { useEffect, useState } from 'react'
import './App.css'

type ApiState = 'checking' | 'online' | 'offline'
const layers = [
  ['React + TypeScript', '浏览器中的页面与交互'],
  ['NestJS API', '业务逻辑、验证与权限边界'],
  ['Prisma + MySQL', '保存成长、照片和项目数据'],
  ['Docker', '让开发与服务器环境保持一致'],
]

function App() {
  const [apiState, setApiState] = useState<ApiState>('checking')
  useEffect(() => {
    const api = import.meta.env.VITE_API_URL ?? 'http://localhost:3000/api'
    fetch(`${api}/health`)
      .then((response) => {
        if (!response.ok) throw new Error('API unavailable')
        setApiState('online')
      })
      .catch(() => setApiState('offline'))
  }, [])

  return (
    <main>
      <section className="hero">
        <span className="pill">全栈重构 · 阶段 01</span>
        <h1>我的小宇宙，<br />正在长出后台。</h1>
        <p>页面不再只是写死的内容。接下来，每段经历、每张照片和每个项目都会通过后台管理并存进数据库。</p>
        <div className={`status ${apiState}`}>
          <span aria-hidden="true" />
          {apiState === 'checking' && '正在连接后端…'}
          {apiState === 'online' && '前端与 API 已连通'}
          {apiState === 'offline' && '前端已启动，等待 API'}
        </div>
      </section>
      <section className="stack" aria-labelledby="stack-title">
        <div className="section-title"><span>这次不是黑盒</span><h2 id="stack-title">四层系统，一层一层学</h2></div>
        <div className="grid">
          {layers.map(([title, description], index) => (
            <article key={title}><strong>0{index + 1}</strong><h3>{title}</h3><p>{description}</p></article>
          ))}
        </div>
      </section>
    </main>
  )
}

export default App
