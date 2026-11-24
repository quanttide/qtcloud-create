import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom'
import AppBar from './components/AppBar'
import Comic from './pages/Comic'
import { ROUTE_PATHS } from './routes'
import './App.css'

// 路由表单独导出，便于测试
export function AppRoutes() {
  return (
    <Routes>
      <Route path={ROUTE_PATHS.home} element={<Comic />} />
      <Route path="*" element={<Navigate to={ROUTE_PATHS.home} replace />} />
    </Routes>
  )
}

// 外壳：顶栏 + 单页内容（原始漫画直排，页尾接「关于」）
function App() {
  return (
    <BrowserRouter>
      <div className="liteApp">
        <AppBar />
        <main className="liteMain">
          <AppRoutes />
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App
