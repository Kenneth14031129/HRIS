import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import {
  LayoutDashboard,
  Users,
  UserCheck,
  Calendar,
  CreditCard,
  FileText,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Briefcase,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import HRIS_Logo from '../assets/HRIS_Logo.png'

interface MenuItem {
  id: string
  icon: LucideIcon
  label: string
  color: string
  path: string
}

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  const menuItems: MenuItem[] = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard', color: 'yellow', path: '/dashboard' },
    { id: 'employees', icon: Users, label: 'Employees', color: 'yellow', path: '/employees' },
    { id: 'attendance', icon: UserCheck, label: 'Attendance', color: 'yellow', path: '/attendance' },
    { id: 'payroll', icon: CreditCard, label: 'Payroll', color: 'yellow', path: '/payroll' },
    { id: 'leave', icon: Calendar, label: 'Leave Management', color: 'yellow', path: '/leave' },
    { id: 'recruitment', icon: Briefcase, label: 'Recruitment', color: 'yellow', path: '/recruitment' },
    { id: 'reports', icon: FileText, label: 'Reports', color: 'yellow', path: '/reports' },
  ]

  const getItemClasses = (item: MenuItem) => {
    const isActive = location.pathname === item.path
    const baseClasses = "group flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-300 cursor-pointer relative overflow-hidden"

    if (isActive) {
      return `${baseClasses} bg-gradient-to-r from-${item.color}-500/20 to-${item.color}-600/10 text-${item.color}-300 shadow-lg ring-1 ring-${item.color}-500/30`
    }
    return `${baseClasses} text-gray-400 hover:text-white hover:bg-gray-800/50`
  }

  const getIconClasses = (item: MenuItem) => {
    const isActive = location.pathname === item.path
    const baseClasses = "transition-all duration-300"

    if (isActive) {
      return `${baseClasses} text-${item.color}-400 drop-shadow-lg`
    }
    return `${baseClasses} group-hover:text-white group-hover:scale-110`
  }

  const handleNavigation = (item: MenuItem) => {
    navigate(item.path)
  }

  return (
    <div className={`bg-gray-900 border-r border-gray-800 transition-all duration-300 flex flex-col ${isCollapsed ? 'w-20' : 'w-72'}`}>
      {/* Header */}
      <div className="p-6 border-b border-gray-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-black/10 rounded-xl flex items-center justify-center shadow-lg">
              <img src={HRIS_Logo} alt="HRIS Logo" className="w-6 h-6 object-contain" />
            </div>
            {!isCollapsed && (
              <div>
                <h1 className="text-lg font-bold text-white">HRIS Portal</h1>
                <p className="text-xs text-gray-400">HR Management</p>
              </div>
            )}
          </div>
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 rounded-lg text-gray-400 hover:text-white transition-all duration-200"
          >
            {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon
          return (
            <div
              key={item.id}
              onClick={() => handleNavigation(item)}
              className={getItemClasses(item)}
            >
              {/* Active item background glow */}
              {location.pathname === item.path && (
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-pulse" />
              )}

              <Icon className={`w-5 h-5 ${isCollapsed ? 'mx-auto' : 'mr-3'} ${getIconClasses(item)}`} />

              {!isCollapsed && (
                <span className="transition-all duration-300">{item.label}</span>
              )}

              {/* Active item indicator */}
              {location.pathname === item.path && !isCollapsed && (
                <div className={`absolute right-3 w-2 h-2 bg-${item.color}-400 rounded-full animate-pulse`} />
              )}
            </div>
          )
        })}
      </nav>

      {/* User Profile Section */}
      <div className="p-4 border-t border-gray-800">

        {/* Settings and Logout */}
        <div className="space-y-2">
          

          <button className={`w-full flex items-center ${isCollapsed ? 'justify-center' : 'px-3'} py-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-all duration-200`}>
            <LogOut className={`w-4 h-4 ${isCollapsed ? '' : 'mr-3'}`} />
            {!isCollapsed && <span className="text-sm">Logout</span>}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Sidebar