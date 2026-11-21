# 创意工作台介绍

qtcloud-create 是量潮创意工作的**工作台**：把租户、工作区、素材/资源这三级目录变成能看、能传的界面。

## 三级结构

```
租户 → 工作区 → 素材/资源
```

- **租户**——创意项目属于谁：`quanttide-founder`（创始人个人）、`quanttide-tech`（量潮科技），互不混放
- **工作区**——一部作品一个目录：`urban-romance`（职场言情）、`rebirth-romance`（重生言情）
- **素材/资源**——工作区里的图片与视频：`images/`、`videos/`

工作台只回答三个问题：**谁的、哪个作品、里面有什么。**

## 边界

不要时间线、不要迭代条目、不要版本对比、不要迁出按钮、不要生成画布。过程留痕发生在 git 提交历史里，工作台不重复做这件事。

## 与邻居的分工

- 小说原文在 `quanttide-founder` 的 fiction 仓——写作地，人维护，不动
- 方法与教程在 `quanttide-create` 域仓的 `docs/`
- 立项后的成片生产在 `quanttide-drama`

## 事实源

数据就是 git 仓里的文件（`quanttide-profile-of-creative-work` 等）。工作台不建数据库——关掉它，git 里的一切照旧。
