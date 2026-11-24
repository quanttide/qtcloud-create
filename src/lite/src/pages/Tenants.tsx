// 租户列表（页签首屏）：每个租户一张卡，带工作区数量（docs/user-guide：首屏是租户列表）
import { Link } from 'react-router-dom'
import { tenants } from '../models/tenant'
import { workspacesOf } from '../models/workspace'
import { tenantPath } from '../routes'

function Tenants() {
  return (
    <main>
      <section className="listSection" aria-labelledby="tenants-title">
        <div className="sectionHead">
          <div>
            <p>Tenants</p>
            <h2 id="tenants-title">租户</h2>
          </div>
        </div>

        <div className="cardGrid">
          {tenants.map((tenant) => (
            <Link key={tenant.name} to={tenantPath(tenant.name)} className="card">
              <div className="cardTop">
                <h3>{tenant.title}</h3>
                <span>{workspacesOf(tenant.name).length} 个工作区</span>
              </div>
              <p className="cardDesc">{tenant.description}</p>
              <p className="cardMeta">{tenant.name}</p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}

export default Tenants
