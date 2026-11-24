# CHANGELOG

所有显著变更都将记录在此文件中。

格式基于 [Keep a Changelog](https://keepachangelog.com/zh-CN/1.0.0/)。

版本遵循语义化版本规范：0.0.x（探索期）→ 0.x.y（验证期）→ x.y.z（正式期）

---

- Lite 改名「量潮创意云」并删掉页尾文字提示：顶栏与 `<title>` 同步，`pages/About.tsx` 移除

- 改为直接展示：撤下宣传册成片与租户 → 工作区 → 素材三层导航，单页直出两章原始分格八页（`public/works/`，字节与 `data/context/profile/panels/` 一致），「关于」接在页尾不另开页

- qtcloud-create 上线 Lite：新增 `deploy-lite.yml`（`lite/*` tag 触发）与站点基础设施（OSS 桶 `qtcloud-create-lite`、CDN `lite.create.cloud.quanttide.com`、单域名证书与 DNS）

- 初始化 `src/lite/`：按 qtclass Lite 惯例的只读陈列站（租户 → 工作区 → 素材三级导航、契约静态先行），上架《职场言情》咖啡厅重逢漫画初稿

- 初始化 `src/studio/`：工作台界面骨架（工作区列表、迭代时间线、素材面板与生成画布）

- 定位收敛：工作台只要租户、工作区、素材/资源三级，去掉时间线等其余设计

- 新增 `docs/intro`、`docs/user-guide`、`docs/dev-guide`（三视角）与 `ROADMAP.md`

## [Unreleased]

- 初始化仓骨架（README、CHANGELOG、LICENSE）
