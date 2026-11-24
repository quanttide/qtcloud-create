// 工作区列表（压入页）：点租户进来，每个工作区一行，带素材数（docs/user-guide）
import { Link, useParams } from 'react-router-dom'
import { getTenant } from '../models/tenant'
import { workspacesOf } from '../models/workspace'
import { workspacePath } from '../routes'

function Workspaces() {
  const { tenant: tenantName = '' } = useParams()
  const tenant = getTenant(tenantName)

  if (!tenant) {
    return (
      <div className="liteNotFound">
        <h2>租户未找到</h2>
      </div>
    )
  }

  const list = workspacesOf(tenant.name)

  return (
    <main>
      <section className="listSection" aria-labelledby="workspaces-title">
        <div className="sectionHead">
          <div>
            <p>{tenant.name}</p>
            <h2 id="workspaces-title">{tenant.title} · 工作区</h2>
          </div>
        </div>

        {list.length === 0 ? (
          <p className="assetEmpty">这个租户下还没有工作区。</p>
        ) : (
          <div className="cardGrid">
            {list.map((workspace) => (
              <Link
                key={workspace.name}
                to={workspacePath(tenant.name, workspace.name)}
                className="card"
              >
                <div className="cardTop">
                  <h3>{workspace.title}</h3>
                  <span>{workspace.assets.length} 件素材</span>
                </div>
                <p className="cardDesc">{workspace.description}</p>
                <p className="cardMeta">{workspace.name}</p>
              </Link>
            ))}
          </div>
        )}
      </section>
    </main>
  )
}

export default Workspaces
