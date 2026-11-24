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

  it('职场言情工作区在库，八页原始漫画已上架', () => {
    expect(workspaces.length).toBe(1)
    const workspace = getWorkspace('quanttide-founder', 'urban-romance')
    expect(workspace?.title).toBe('职场言情')
    expect(workspace?.assets).toHaveLength(8)
    expect(workspace?.assets.map((asset) => asset.name)).toEqual([
      'coffee-reunion/1.png',
      'coffee-reunion/2.png',
      'coffee-reunion/3.png',
      'coffee-reunion/4.png',
      'rainy-night/1.png',
      'rainy-night/2.png',
      'rainy-night/3.png',
      'rainy-night/4.png',
    ])
    expect(workspace?.assets[0].src).toBe('/works/coffee-reunion/1.png')
    expect(workspace?.assets[7].src).toBe('/works/rainy-night/4.png')
  })

  it('按租户取工作区：有目录才有项', () => {
    expect(workspacesOf('quanttide-founder').map((workspace) => workspace.name)).toEqual([
      'urban-romance',
    ])
    expect(workspacesOf('quanttide-tech')).toHaveLength(0)
  })
})
