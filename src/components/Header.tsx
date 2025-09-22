import { useState } from 'react'
import {
  Bell,
  Mail,
  ChevronDown
} from 'lucide-react'

const Header = () => {
  const [notifications] = useState(5)
  const [messages] = useState(3)

  return (
    <header className="px-6 py-4">
      <div className="flex items-center justify-end">
        {/* Actions & Profile */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <button className="relative p-2.5 text-gray-400 hover:text-white rounded-lg transition-all duration-200 group">
            <Bell className="w-5 h-5 group-hover:animate-bounce" />
            {notifications > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {notifications}
              </span>
            )}
          </button>

          {/* Messages */}
          <button className="relative p-2.5 text-gray-400 hover:text-white rounded-lg transition-all duration-200 group">
            <Mail className="w-5 h-5 group-hover:animate-bounce" />
            {messages > 0 && (
              <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {messages}
              </span>
            )}
          </button>

          {/* Divider */}
          <div className="h-8 w-px bg-gray-700"></div>

          {/* Profile Dropdown */}
          <div className="relative group z-20">
            <button className="flex items-center space-x-3 px-3 py-2 rounded-xl transition-all duration-200">
              <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-white font-semibold text-sm shadow-lg">
                JD
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-sm font-medium text-white">John Doe</p>
                <p className="text-xs text-gray-400">HR Manager</p>
              </div>
              <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-white transition-all duration-200 group-hover:rotate-180" />
            </button>

            {/* Dropdown Menu (Hidden by default, can be shown with state) */}
            <div className="absolute right-0 mt-2 w-48 bg-gray-800 border border-gray-700 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              <div className="py-2">
                <a href="#" className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700 transition-colors">
                  Profile Settings
                </a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700 transition-colors">
                  Account Settings
                </a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700 transition-colors">
                  Help & Support
                </a>
                <div className="border-t border-gray-700 my-1"></div>
                <a href="#" className="block px-4 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors">
                  Sign Out
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header