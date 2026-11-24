// 路由路径与链接地址的唯一来源
// 三级即导航（docs/dev-guide 原则 2）：租户 → 工作区 → 素材，与磁盘目录一一对应
export const ROUTE_PATHS = {
  workbench: '/workbench',
  tenantItem: '/workbench/:tenant',
  workspaceItem: '/workbench/:tenant/:workspace',
  about: '/about',
} as const

// 底部导航两个页签（顺序即导航顺序：工作台、关于）
export const TABS = [
  { path: ROUTE_PATHS.workbench, label: '工作台', icon: 'workbench' },
  { path: ROUTE_PATHS.about, label: '关于', icon: 'about' },
] as const

export type TabIcon = (typeof TABS)[number]['icon']

// 页签根路径显示底部导航；工作区与素材两层为压入页，按微信惯例隐藏页签
const TAB_PATHS: string[] = [ROUTE_PATHS.workbench, ROUTE_PATHS.about]

export function isTabPath(pathname: string): boolean {
  return TAB_PATHS.includes(pathname)
}

export function tenantPath(name: string): string {
  return `/workbench/${name}`
}

export function workspacePath(tenant: string, workspace: string): string {
  return `/workbench/${tenant}/${workspace}`
}
