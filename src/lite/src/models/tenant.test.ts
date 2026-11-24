import { describe, it, expect } from 'vitest'
import { selectTenants, tenants, getTenant } from './tenant'

describe('租户契约与内容', () => {
  it('载荷文件名与 name 对不上时被过滤', () => {
    const sample = {
      '/data/tenants/quanttide-founder.ts': {
        name: 'quanttide-founder',
        title: '创始人个人',
        description: '示例',
      },
      '/data/tenants/mismatch.ts': {
        name: 'not-the-file-name',
        title: '对不上号',
        description: '文件名与 name 不一致',
      },
    }
    expect(selectTenants(sample).map((tenant) => tenant.name)).toEqual(['quanttide-founder'])
  })

  it('创始人租户在库', () => {
    expect(tenants.map((tenant) => tenant.name)).toEqual(['quanttide-founder'])
    expect(getTenant('quanttide-founder')?.title).toBe('创始人个人')
    expect(getTenant('quanttide-tech')).toBeUndefined()
  })
})
