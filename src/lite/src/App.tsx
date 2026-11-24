import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom'
import AppBar from './components/AppBar'
import TabBar from './components/TabBar'
import Tenants from './pages/Tenants'
import Workspaces from './pages/Workspaces'
import WorkspaceDetail from './pages/WorkspaceDetail'
import About from './pages/About'
import { ROUTE_PATHS } from './routes'
import './App.css'

// 路由表单独导出，便于测试
export function AppRoutes() {
  return (
    <Routes>
      <Route path={ROUTE_PATHS.workbench} element={<Tenants />} />
      <Route path={ROUTE_PATHS.tenantItem} element={<Workspaces />} />
      <Route path={ROUTE_PATHS.workspaceItem} element={<WorkspaceDetail />} />
      <Route path={ROUTE_PATHS.about} element={<About />} />
      <Route path="*" element={<Navigate to={ROUTE_PATHS.workbench} replace />} />
    </Routes>
  )
}

// 外壳：微信式顶栏 + 页签根页底部导航；工作区与素材两层为压入页
function App() {
  return (
    <BrowserRouter>
      <div className="liteApp">
        <AppBar />
        <main className="liteMain">
          <AppRoutes />
        </main>
        <TabBar />
      </div>
    </BrowserRouter>
  )
}

export default App
