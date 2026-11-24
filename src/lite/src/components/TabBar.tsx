import type { ReactNode } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { TABS, isTabPath, type TabIcon } from '../routes'

// 线性图标：工作台=目录、关于=说明；当前页着色
const ICONS: Record<TabIcon, ReactNode> = {
  workbench: (
    <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
      <path
        d="M3.5 7.5A1.5 1.5 0 0 1 5 6h4l2 2.5h8A1.5 1.5 0 0 1 20.5 10v8A1.5 1.5 0 0 1 19 19.5H5A1.5 1.5 0 0 1 3.5 18z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M7 13.5h8" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  ),
  about: (
    <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
      <circle cx="12" cy="12" r="8.5" fill="none" stroke="currentColor" strokeWidth="1.7" />
      <path d="M12 11v5.5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <circle cx="12" cy="7.8" r="1" fill="currentColor" />
    </svg>
  ),
}

// 底部导航（微信式）：图标在上、文字在下，当前页高亮；压入页隐藏
function TabBar() {
  const { pathname } = useLocation()
  if (!isTabPath(pathname)) return null

  return (
    <nav className="tabBar" aria-label="主导航">
      {TABS.map((tab) => (
        <NavLink
          key={tab.path}
          to={tab.path}
          end={tab.path === '/workbench'}
          className={({ isActive }) => `tabItem${isActive ? ' active' : ''}`}
        >
          <span className="tabIcon">{ICONS[tab.icon]}</span>
          <span className="tabLabel">{tab.label}</span>
        </NavLink>
      ))}
    </nav>
  )
}

export default TabBar
