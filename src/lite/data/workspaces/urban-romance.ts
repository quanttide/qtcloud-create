import type { Workspace } from '../../src/models/workspace'

// 工作区名与描述源自 quanttide-profile-of-creative-work 的 quanttide-founder/urban-romance/README.md
// 漫画页源自 quanttide-context-of-creative-work 的 profile/panels/（原始分格，只换载体、字节一致）
const workspace: Workspace = {
  name: 'urban-romance',
  tenant: 'quanttide-founder',
  title: '职场言情',
  description: '职场言情改编的高频迭代工作区：中间过程与素材在本目录内按迭代留痕。',
  assets: [
    { kind: 'image', name: 'coffee-reunion/1.png', src: '/works/coffee-reunion/1.png', caption: '咖啡厅重逢 · 第 1 页' },
    { kind: 'image', name: 'coffee-reunion/2.png', src: '/works/coffee-reunion/2.png', caption: '咖啡厅重逢 · 第 2 页' },
    { kind: 'image', name: 'coffee-reunion/3.png', src: '/works/coffee-reunion/3.png', caption: '咖啡厅重逢 · 第 3 页' },
    { kind: 'image', name: 'coffee-reunion/4.png', src: '/works/coffee-reunion/4.png', caption: '咖啡厅重逢 · 第 4 页' },
    { kind: 'image', name: 'rainy-night/1.png', src: '/works/rainy-night/1.png', caption: '雨夜未眠 · 第 1 页' },
    { kind: 'image', name: 'rainy-night/2.png', src: '/works/rainy-night/2.png', caption: '雨夜未眠 · 第 2 页' },
    { kind: 'image', name: 'rainy-night/3.png', src: '/works/rainy-night/3.png', caption: '雨夜未眠 · 第 3 页' },
    { kind: 'image', name: 'rainy-night/4.png', src: '/works/rainy-night/4.png', caption: '雨夜未眠 · 第 4 页' },
  ],
}

export default workspace
