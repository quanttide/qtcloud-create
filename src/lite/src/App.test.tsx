import { describe, it, expect, afterEach } from 'vitest'
import { render, screen, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'
import App from './App'

// 冒烟：两个页签、三级压入页与素材图必须渲染可用。白屏（坏 import、渲染期崩溃、内容定位失败）会在这里失败
describe('页面渲染冒烟', () => {
  const routes = [
    { path: '/workbench', text: '创始人个人' },
    { path: '/workbench/quanttide-founder', text: '职场言情' },
    { path: '/workbench/quanttide-founder/urban-romance', text: '咖啡厅重逢 · 漫画初稿（7 格）' },
    { path: '/about', text: /谁的、哪个作品、里面有什么/ },
  ]

  for (const { path, text } of routes) {
    it(`渲染 ${path}（${text}）`, () => {
      window.history.pushState({}, '', path)
      render(<App />)
      expect(screen.getAllByText(text).length).toBeGreaterThan(0)
    })
  }

  it('未知租户给出未找到', () => {
    window.history.pushState({}, '', '/workbench/no-such')
    render(<App />)
    expect(screen.getByText('租户未找到')).toBeInTheDocument()
  })

  it('未知工作区给出未找到', () => {
    window.history.pushState({}, '', '/workbench/quanttide-founder/no-such')
    render(<App />)
    expect(screen.getByText('工作区未找到')).toBeInTheDocument()
  })

  it('未知路径重定向到工作台', () => {
    window.history.pushState({}, '', '/whatever')
    render(<App />)
    expect(screen.getAllByText('创始人个人').length).toBeGreaterThan(0)
  })

  it('顶栏标题与底部两页签', () => {
    window.history.pushState({}, '', '/workbench')
    render(<App />)
    expect(screen.getByRole('heading', { name: '量潮创意工作台' })).toBeInTheDocument()
    const nav = screen.getByRole('navigation', { name: '主导航' })
    expect(nav).toBeInTheDocument()
    for (const label of ['工作台', '关于']) {
      expect(screen.getAllByText(label).length).toBeGreaterThan(0)
    }
  })

  it('压入页隐藏底部导航', () => {
    window.history.pushState({}, '', '/workbench/quanttide-founder/urban-romance')
    render(<App />)
    expect(screen.queryByRole('navigation', { name: '主导航' })).toBeNull()
  })

  it('素材图走站内地址', () => {
    window.history.pushState({}, '', '/workbench/quanttide-founder/urban-romance')
    render(<App />)
    const images = screen.getAllByRole('img')
    expect(images.length).toBeGreaterThan(0)
    expect(images[0].getAttribute('src')).toBe('/works/coffee-reunion-comic.jpeg')
    expect(images[0].getAttribute('alt')).toBe('咖啡厅重逢 · 漫画初稿（7 格）')
  })
})

afterEach(cleanup)
