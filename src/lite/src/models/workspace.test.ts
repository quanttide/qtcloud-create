import { describe, it, expect } from 'vitest'
import { selectWorkspaces, workspaces, workspacesOf, getWorkspace } from './workspace'

const sample = {
  '/data/workspaces/urban-romance.ts': {
    name: 'urban-romance',
    tenant: 'quanttide-founder',
    title: '职场言情',
    description: '示例',
    assets: [],
  },
  '/data/workspaces/mismatch.ts': {
    name: 'not-the-file-name',
    tenant: 'quanttide-founder',
    title: '对不上号',
    description: '文件名与 name 不一致',
    assets: [],
  },
}

describe('工作区契约与内容', () => {
  it('载荷文件名与 name 对不上时被过滤', () => {
    expect(selectWorkspaces(sample).map((workspace) => workspace.name)).toEqual(['urban-romance'])
  })

  it('职场言情工作区在库，漫画初稿已上架', () => {
    expect(workspaces.length).toBe(1)
    const workspace = getWorkspace('quanttide-founder', 'urban-romance')
    expect(workspace?.title).toBe('职场言情')
    expect(workspace?.assets.map((asset) => asset.name)).toEqual(['coffee-reunion-comic.jpeg'])
    expect(workspace?.assets[0].src).toBe('/works/coffee-reunion-comic.jpeg')
  })

  it('按租户取工作区：有目录才有项', () => {
    expect(workspacesOf('quanttide-founder').map((workspace) => workspace.name)).toEqual([
      'urban-romance',
    ])
    expect(workspacesOf('quanttide-tech')).toHaveLength(0)
  })
})
