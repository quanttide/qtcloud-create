// 工作区契约：静态数据先行，页面只认本形状；provider 接通后换数据源，页面不动
// 对应 docs/intro 的第二、三级：工作区 = 一部作品一个目录，素材/资源 = 目录里的图片与视频
// 不设发布态——目录即语义，磁盘上没有目录，界面上就不出现（docs/dev-guide 原则 2）

export type AssetKind = 'image' | 'video'

export interface Asset {
  kind: AssetKind
  // 文件名，与磁盘同名
  name: string
  // 站内路径（public/ 下），图片字节与事实源仓一致
  src: string
  // 一句话说明，显示在素材下方
  caption?: string
}

export interface Workspace {
  // 工作区名，与磁盘二级目录同名（urban-romance），兼可读路径
  name: string
  // 所属租户名，与磁盘一级目录同名
  tenant: string
  // 中文名，如「职场言情」
  title: string
  description: string
  assets: Asset[]
}

function nameOf(path: string): string | null {
  if (!path.startsWith('/data/workspaces/') || !path.endsWith('.ts')) return null
  return path.slice('/data/workspaces/'.length, -3)
}

// 载荷键 = data/workspaces/<name>.ts；文件名与 name 对不上的载荷不入库
export function selectWorkspaces(modules: Record<string, Workspace>): Workspace[] {
  return Object.entries(modules)
    .map(([path, workspace]) => (nameOf(path) === workspace.name ? workspace : null))
    .filter((item): item is Workspace => item !== null)
    .sort((a, b) => a.name.localeCompare(b.name))
}

// 工作区内容库：data/workspaces/ 静态载荷，一个文件一个工作区
const workspaceModules = import.meta.glob('/data/workspaces/**/*.ts', {
  eager: true,
  import: 'default',
}) as Record<string, Workspace>

export const workspaces: Workspace[] = selectWorkspaces(workspaceModules)

export function getWorkspace(tenant: string, name: string): Workspace | undefined {
  return workspaces.find((item) => item.tenant === tenant && item.name === name)
}

// 某个租户下的工作区，租户页出入口用它；目录不存在则该项不出现
export function workspacesOf(tenantName: string): Workspace[] {
  return workspaces.filter((item) => item.tenant === tenantName)
}
