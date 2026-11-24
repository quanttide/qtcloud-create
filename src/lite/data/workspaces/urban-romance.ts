import type { Workspace } from '../../src/models/workspace'

// 工作区名与描述源自 quanttide-profile-of-creative-work 的 quanttide-founder/urban-romance/README.md
// 漫画初稿源自 quanttide-context-of-creative-work 的 brochure/photo.jpeg（只换载体，图片字节一致）
const workspace: Workspace = {
  name: 'urban-romance',
  tenant: 'quanttide-founder',
  title: '职场言情',
  description: '职场言情改编的高频迭代工作区：中间过程与素材在本目录内按迭代留痕。',
  assets: [
    {
      kind: 'image',
      name: 'coffee-reunion-comic.jpeg',
      src: '/works/coffee-reunion-comic.jpeg',
      caption: '咖啡厅重逢 · 漫画初稿（7 格）',
    },
  ],
}

export default workspace
