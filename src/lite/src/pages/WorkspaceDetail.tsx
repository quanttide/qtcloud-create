// 素材视图（压入页）：images 缩略图网格、videos 列表（docs/user-guide）
// 目录里有什么，这里就出什么；没有目录就整页不出现（docs/dev-guide 原则 2）
import { useParams } from 'react-router-dom'
import { getTenant } from '../models/tenant'
import { getWorkspace } from '../models/workspace'

function WorkspaceDetail() {
  const { tenant: tenantName = '', workspace: workspaceName = '' } = useParams()
  const workspace = getWorkspace(tenantName, workspaceName)

  if (!workspace) {
    return (
      <div className="liteNotFound">
        <h2>工作区未找到</h2>
      </div>
    )
  }

  const tenant = getTenant(workspace.tenant)
  const images = workspace.assets.filter((asset) => asset.kind === 'image')
  const videos = workspace.assets.filter((asset) => asset.kind === 'video')

  return (
    <main>
      <section className="listSection" aria-labelledby="workspace-title">
        <div className="sectionHead">
          <div>
            <p>{tenant ? `${tenant.title} · ${workspace.name}` : workspace.name}</p>
            <h2 id="workspace-title">{workspace.title}</h2>
          </div>
        </div>

        <p className="cardDesc">{workspace.description}</p>

        {workspace.assets.length === 0 ? (
          <p className="assetEmpty">这个工作区还没有素材。</p>
        ) : (
          <>
            {images.length > 0 && (
              <div className="assetGrid">
                {images.map((asset) => (
                  <figure key={asset.name} className="assetCard">
                    <img src={asset.src} alt={asset.caption ?? asset.name} />
                    {asset.caption && (
                      <figcaption className="assetCaption">{asset.caption}</figcaption>
                    )}
                  </figure>
                ))}
              </div>
            )}

            {videos.length > 0 && (
              <ul className="assetEmpty">
                {videos.map((asset) => (
                  <li key={asset.name}>
                    <video controls src={asset.src} />
                    <p className="assetCaption">{asset.caption ?? asset.name}</p>
                  </li>
                ))}
              </ul>
            )}
          </>
        )}
      </section>
    </main>
  )
}

export default WorkspaceDetail
