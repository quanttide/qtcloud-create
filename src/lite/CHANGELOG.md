# CHANGELOG

所有显著变更都将记录在此文件中。

格式基于 [Keep a Changelog](https://keepachangelog.com/zh-CN/1.0.0/)。

---

## [Unreleased]

- 改名「量潮创意云 Lite」（顶栏与页面标题、meta 描述同步），删掉页尾「关于」文字提示与 `pages/About.tsx`
- 改为直接展示：单页直出两章原始分格八页（源自 `quanttide-context-of-creative-work` 的 `profile/panels/`，字节一致），去掉租户 → 工作区 → 素材三层导航与页签
- ~~上架《职场言情》咖啡厅重逢漫画初稿（7 格，源自 `brochure/photo.jpeg`）~~ 已撤下：那是宣传册成片，改上原始分格
- 初始化 `src/lite/`：按 qtclass Lite 惯例的只读展示——契约静态先行（`models/workspace.ts`、`models/tenant.ts`）、一文件一对象载荷、微信式顶栏
