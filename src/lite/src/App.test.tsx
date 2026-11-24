import { describe, it, expect, afterEach } from 'vitest'
import { render, screen, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'
import App from './App'

// 冒烟：单页直出原始漫画。白屏（坏 import、渲染期崩溃、内容定位失败）会在这里失败
describe('单页展示', () => {
  it('顶栏标题与工作区', () => {
    window.history.pushState({}, '', '/')
    render(<App />)
    expect(screen.getByRole('heading', { name: '量潮创意云' })).toBeInTheDocument()
    expect(screen.getByText('原始漫画')).toBeInTheDocument()
    expect(screen.getByText('职场言情')).toBeInTheDocument()
  })

  it('八页原始漫画按章节顺序直排', () => {
    window.history.pushState({}, '', '/')
    render(<App />)
    const images = screen.getAllByRole('img')
    expect(images).toHaveLength(8)
    expect(images[0].getAttribute('src')).toBe('/works/coffee-reunion/1.png')
    expect(images[3].getAttribute('src')).toBe('/works/coffee-reunion/4.png')
    expect(images[4].getAttribute('src')).toBe('/works/rainy-night/1.png')
    expect(images[7].getAttribute('src')).toBe('/works/rainy-night/4.png')
  })

  it('章节与页码说明随图给出', () => {
    window.history.pushState({}, '', '/')
    render(<App />)
    expect(screen.getByText('咖啡厅重逢 · 第 1 页')).toBeInTheDocument()
    expect(screen.getByText('雨夜未眠 · 第 4 页')).toBeInTheDocument()
  })

  it('页尾不留文字提示', () => {
    window.history.pushState({}, '', '/')
    render(<App />)
    expect(screen.queryByRole('heading', { name: '关于' })).toBeNull()
    expect(screen.queryByText(/谁的、哪个作品、里面有什么/)).toBeNull()
    // 正文以最后一页的说明收尾，其后没有别的文字节点
    const text = (document.body.textContent ?? '').trim()
    expect(text.endsWith('雨夜未眠 · 第 4 页')).toBe(true)
  })

  it('不做层级导航：无页签、无链接', () => {
    window.history.pushState({}, '', '/')
    render(<App />)
    expect(screen.queryByRole('navigation')).toBeNull()
    expect(document.querySelectorAll('a')).toHaveLength(0)
  })

  it('未知路径回到首页', () => {
    window.history.pushState({}, '', '/workbench/quanttide-founder/urban-romance')
    render(<App />)
    expect(screen.getAllByRole('img')).toHaveLength(8)
  })
})

afterEach(cleanup)
