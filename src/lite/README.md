# qtcloud-create Lite

量潮创意工作的只读展示站：**打开就看原始漫画**，不做租户 → 工作区 → 素材的层级导航。按 `qtclass` 的 `src/lite` 惯例初始化（契约静态先行、一文件一对象、微信式顶栏），只换载体不改写文字。

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
data/workspaces/         # 工作区载荷（一文件一工作区，assets 按阅读顺序列漫画页）
public/works/            # 上架的原始漫画页，字节与事实源仓一致（cmp 核对）
src/
├── models/workspace.ts  # 工作区契约（含 Asset）+ 按文件名过滤的载荷入库
├── models/tenant.ts     # 租户契约（磁盘一级目录的映射，页面暂未用）
├── pages/Comic.tsx      # 单页：漫画竖排直出，页尾接 About
├── pages/About.tsx      # 关于（文字取自 docs/intro，同页不跳转）
├── components/AppBar.tsx
└── routes.ts            # 路由路径的唯一来源：只有根路径
```

## 数据面

契约静态先行：页面只认 `models/` 的形状，数据源当前为仓内静态载荷；provider 接通后换数据源，页面不动。不设发布态——目录即语义，磁盘上没有目录，界面上就不出现（`docs/dev-guide` 原则 2）。

漫画事实源是 `quanttide-context-of-creative-work` 的 `profile/panels/`（两章各四页竖条），这里只放上架件副本，图片用 `cmp` 核字节一致；正文文字正本在 `docs/intro`，本页只换载体。

## 上线

部署与 tag 归 `quanttide-site-release`，本目录不自行落版本、不自行打 tag；发布走 `lite/*` tag 触发 `.github/workflows/deploy-lite.yml`。
