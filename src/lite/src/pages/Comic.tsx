// 直接展示页：打开就看原始漫画，不做租户 → 工作区 → 素材的层级导航，页尾也不放文字提示
// 页面只认 models/workspace 的形状；素材字节与事实源仓一致（public/works/ 下 cmp 核对）
import { workspaces } from '../models/workspace'

function Comic() {
  // 现行只有一个工作区；多个时按序直排，不做筛选与跳转
  const [workspace] = workspaces

  if (!workspace) {
    return (
      <div className="liteEmpty">
        <h2>还没有上架的漫画</h2>
      </div>
    )
  }

  return (
    <main className="comic">
      <header className="comicHead">
        <p>{workspace.title}</p>
        <h2>原始漫画</h2>
        <p className="comicMeta">{workspace.description}</p>
      </header>

      {workspace.assets.map((asset) => (
        <figure key={asset.name} className="comicPage">
          <img src={asset.src} alt={asset.caption ?? asset.name} loading="lazy" />
          {asset.caption && <figcaption>{asset.caption}</figcaption>}
        </figure>
      ))}
    </main>
  )
}

export default Comic
