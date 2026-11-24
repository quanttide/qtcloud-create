# qtcloud-create Lite

量潮创意工作台的只读陈列站：租户 → 工作区 → 素材三级导航，与磁盘目录一一对应。按 `qtclass` 的 `src/lite` 惯例初始化（微信式外壳、契约静态先行、一文件一对象），只换载体不改写文字。

## 开发

```bash
npm install
npm run dev      # 本地预览
npm run build    # tsc + vite 构建
npm run lint
npm test
```

## 结构

```
data/tenants/            # 租户载荷（一文件一租户）
data/workspaces/         # 工作区载荷（一文件一工作区，assets 列出上架素材）
public/works/            # 上架素材，字节与事实源仓一致（cmp 核对）
src/
├── models/tenant.ts     # 租户契约 + 按文件名过滤的载荷入库
├── models/workspace.ts  # 工作区契约（含 Asset）+ 按租户取工作区
├── pages/               # 页签两页：Tenants（租户列表）/ About（定位与边界）
│                        # 压入两页：Workspaces（工作区列表）/ WorkspaceDetail（素材视图），隐藏页签
├── components/          # AppBar / TabBar
└── routes.ts            # 路由路径与链接地址的唯一来源
```

## 数据面

契约静态先行：页面只认 `models/` 的形状，数据源当前为仓内静态载荷；provider 接通后换数据源，页面不动。不设发布态——目录即语义，磁盘上没有目录，界面上就不出现（`docs/dev-guide` 原则 2）。

素材事实源是 git 仓文件（`quanttide-profile-of-creative-work`、`quanttide-context-of-creative-work`），这里只放上架件的副本，图片用 `cmp` 核字节一致；正文文字正本在 `docs/intro`，本页只换载体。

## 上线

部署与 tag 归 `quanttide-site-release`，本目录不自行落版本、不自行打 tag。
