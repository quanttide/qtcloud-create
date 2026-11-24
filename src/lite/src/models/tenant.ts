// 租户契约：静态数据先行，页面只认本形状；provider 接通后换数据源，页面不动
// 对应 docs/intro 的三级结构第一级：租户 = 创意项目属于谁，互不混放

export interface Tenant {
  // 租户名，与磁盘一级目录同名（quanttide-founder / quanttide-tech），兼可读路径
  name: string
  // 中文名，如「创始人个人」
  title: string
  description: string
}

// 载荷键 = data/tenants/<name>.ts；文件名与 name 对不上的载荷不入库
export function selectTenants(modules: Record<string, Tenant>): Tenant[] {
  return Object.entries(modules)
    .map(([path, tenant]) => (nameOf(path) === tenant.name ? tenant : null))
    .filter((item): item is Tenant => item !== null)
    .sort((a, b) => a.name.localeCompare(b.name))
}

function nameOf(path: string): string | null {
  if (!path.startsWith('/data/tenants/') || !path.endsWith('.ts')) return null
  return path.slice('/data/tenants/'.length, -3)
}

// 租户内容库：data/tenants/ 静态载荷，一个文件一个租户
const tenantModules = import.meta.glob('/data/tenants/**/*.ts', {
  eager: true,
  import: 'default',
}) as Record<string, Tenant>

export const tenants: Tenant[] = selectTenants(tenantModules)

export function getTenant(name: string): Tenant | undefined {
  return tenants.find((item) => item.name === name)
}
