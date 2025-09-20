import { useState } from 'react'
import { User, CreditCard, TrendingUp, BarChart3 } from 'lucide-react'
import HRIS_Logo from '../assets/HRIS_Logo.png'

const Landing = () => {
  const [isLoginMode, setIsLoginMode] = useState(true)

  return (
    <div className="min-h-screen relative overflow-hidden bg-gray-900"
         style={{
           backgroundImage: `
             linear-gradient(45deg, rgba(255,255,255,0.03) 25%, transparent 25%),
             linear-gradient(-45deg, rgba(255,255,255,0.03) 25%, transparent 25%),
             linear-gradient(45deg, transparent 75%, rgba(255,255,255,0.03) 75%),
             linear-gradient(-45deg, transparent 75%, rgba(255,255,255,0.03) 75%)
           `,
           backgroundSize: '20px 20px',
           backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px'
         }}>

      <div className="relative z-10 min-h-screen flex">
        <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-md">
            <div className="p-6 backdrop-blur-md bg-black/30 rounded-3xl border border-white/10 shadow-2xl">
              <div className="text-center mb-6">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 backdrop-blur bg-black/30 rounded-2xl flex items-center justify-center shadow-lg ring-2 ring-yellow-500/30 p-2">
                    <img src={HRIS_Logo} alt="HRIS Logo" className="w-full h-full object-contain" />
                  </div>
                </div>
                <h1 className="text-3xl font-bold text-yellow-400 mb-2 tracking-tight">HRIS Portal</h1>
                <p className="text-yellow-300 font-medium">Human Resource Information System</p>
              </div>

              <div className="flex mb-6 backdrop-blur bg-black/30 rounded-2xl p-1 border border-gray-700">
                <button
                  onClick={() => setIsLoginMode(true)}
                  className={`flex-1 py-2.5 px-4 rounded-xl text-sm font-semibold transition-all duration-300 ${
                    isLoginMode
                      ? 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-black shadow-lg'
                      : 'text-yellow-300 hover:text-yellow-400 hover:bg-gray-800'
                  }`}
                >
                  Sign In
                </button>
                <button
                  onClick={() => setIsLoginMode(false)}
                  className={`flex-1 py-2.5 px-4 rounded-xl text-sm font-semibold transition-all duration-300 ${
                    !isLoginMode
                      ? 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-black shadow-lg'
                      : 'text-yellow-300 hover:text-yellow-400 hover:bg-gray-800'
                  }`}
                >
                  Register
                </button>
              </div>

              <form className="space-y-4">
                {!isLoginMode && (
                  <>
                    <div>
                      <input
                        type="text"
                        placeholder="Full Name"
                        className="w-full px-4 py-3 backdrop-blur bg-black/30 border border-gray-700 rounded-xl text-yellow-400 placeholder-yellow-600 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-all duration-300 focus:bg-gray-800"
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        placeholder="Employee ID"
                        className="w-full px-4 py-3 backdrop-blur bg-black/30 border border-gray-700 rounded-xl text-yellow-400 placeholder-yellow-600 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-all duration-300 focus:bg-gray-800"
                      />
                    </div>
                  </>
                )}

                <div>
                  <input
                    type="email"
                    placeholder="Email Address"
                    className="w-full px-4 py-3 backdrop-blur bg-black/30 border border-gray-700 rounded-xl text-yellow-400 placeholder-yellow-600 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-all duration-300 focus:bg-gray-800"
                  />
                </div>

                <div>
                  <input
                    type="password"
                    placeholder="Password"
                    className="w-full px-4 py-3 backdrop-blur bg-black/30 border border-gray-700 rounded-xl text-yellow-400 placeholder-yellow-600 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-all duration-300 focus:bg-gray-800"
                  />
                </div>

                {!isLoginMode && (
                  <div>
                    <input
                      type="password"
                      placeholder="Confirm Password"
                      className="w-full px-4 py-3 backdrop-blur bg-black/30 border border-gray-700 rounded-xl text-yellow-400 placeholder-yellow-600 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-all duration-300 focus:bg-gray-800"
                    />
                  </div>
                )}

                {isLoginMode && (
                  <div className="flex items-center justify-between text-sm">
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded border-gray-600 bg-gray-900 text-yellow-500 focus:ring-yellow-400 focus:ring-offset-0" />
                      <span className="ml-2 text-yellow-300 font-medium">Remember me</span>
                    </label>
                    <a href="#" className="text-yellow-400 hover:text-yellow-300 font-semibold transition-colors">
                      Forgot password?
                    </a>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-black py-3 px-6 rounded-xl font-bold hover:from-yellow-500 hover:to-yellow-600 focus:outline-none focus:ring-4 focus:ring-yellow-400/50 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl mt-6"
                >
                  {isLoginMode ? 'Sign In' : 'Create Account'}
                </button>
              </form>

              <div className="mt-6 text-center text-sm text-yellow-500">
                Need help? Contact{' '}
                <a href="mailto:support@hris.company.com" className="text-yellow-400 hover:text-yellow-300 font-semibold transition-colors">
                  IT Support
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="hidden lg:flex flex-1 items-center justify-center px-8">
          <div className="max-w-2xl text-white">
            <div className="text-center mb-12">
              <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-yellow-400 via-white to-yellow-300 bg-clip-text text-transparent">
                Streamline Your HR Operations
              </h2>
              <p className="text-xl text-white/90 leading-relaxed">
                Manage employee data, payroll, benefits, and performance all in one secure platform.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="group cursor-pointer animate-fade-in-up" style={{animationDelay: '0.2s'}}>
                <div className="backdrop-blur-md bg-gradient-to-br from-blue-500/20 to-blue-600/10 border border-blue-400/30 rounded-2xl p-6 hover:from-blue-500/30 hover:to-blue-600/20 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl">
                  <div className="flex items-center mb-4">
                    <div className="p-3 bg-blue-500/20 rounded-xl mr-4 group-hover:bg-blue-500/30 transition-all duration-300">
                      <User className="w-6 h-6 text-blue-300 group-hover:text-blue-200 group-hover:rotate-12 transition-all duration-300" />
                    </div>
                    <h3 className="text-lg font-semibold text-blue-200">Employee Portal</h3>
                  </div>
                  <p className="text-white/80 text-sm leading-relaxed">Self-service access to personal data, leave requests, and company resources</p>
                </div>
              </div>

              <div className="group cursor-pointer animate-fade-in-up" style={{animationDelay: '0.4s'}}>
                <div className="backdrop-blur-md bg-gradient-to-br from-purple-500/20 to-purple-600/10 border border-purple-400/30 rounded-2xl p-6 hover:from-purple-500/30 hover:to-purple-600/20 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl">
                  <div className="flex items-center mb-4">
                    <div className="p-3 bg-purple-500/20 rounded-xl mr-4 group-hover:bg-purple-500/30 transition-all duration-300">
                      <CreditCard className="w-6 h-6 text-purple-300 group-hover:text-purple-200 group-hover:rotate-12 transition-all duration-300" />
                    </div>
                    <h3 className="text-lg font-semibold text-purple-200">Payroll System</h3>
                  </div>
                  <p className="text-white/80 text-sm leading-relaxed">Automated payroll processing with tax calculations and direct deposits</p>
                </div>
              </div>

              <div className="group cursor-pointer animate-fade-in-up" style={{animationDelay: '0.6s'}}>
                <div className="backdrop-blur-md bg-gradient-to-br from-green-500/20 to-green-600/10 border border-green-400/30 rounded-2xl p-6 hover:from-green-500/30 hover:to-green-600/20 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl">
                  <div className="flex items-center mb-4">
                    <div className="p-3 bg-green-500/20 rounded-xl mr-4 group-hover:bg-green-500/30 transition-all duration-300">
                      <TrendingUp className="w-6 h-6 text-green-300 group-hover:text-green-200 group-hover:rotate-12 transition-all duration-300" />
                    </div>
                    <h3 className="text-lg font-semibold text-green-200">Performance</h3>
                  </div>
                  <p className="text-white/80 text-sm leading-relaxed">Track goals, reviews, and career development with real-time analytics</p>
                </div>
              </div>

              <div className="group cursor-pointer animate-fade-in-up" style={{animationDelay: '0.8s'}}>
                <div className="backdrop-blur-md bg-gradient-to-br from-yellow-500/20 to-yellow-600/10 border border-yellow-400/30 rounded-2xl p-6 hover:from-yellow-500/30 hover:to-yellow-600/20 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl">
                  <div className="flex items-center mb-4">
                    <div className="p-3 bg-yellow-500/20 rounded-xl mr-4 group-hover:bg-yellow-500/30 transition-all duration-300">
                      <BarChart3 className="w-6 h-6 text-yellow-300 group-hover:text-yellow-200 group-hover:rotate-12 transition-all duration-300" />
                    </div>
                    <h3 className="text-lg font-semibold text-yellow-200">Analytics</h3>
                  </div>
                  <p className="text-white/80 text-sm leading-relaxed">Comprehensive reporting and insights for data-driven HR decisions</p>
                </div>
              </div>
            </div>

            <div className="mt-12 text-center">
              <div className="inline-flex items-center space-x-8 text-white/70">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                  <span className="text-sm font-medium">99.9% Uptime</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-blue-400 rounded-full mr-2 animate-pulse"></div>
                  <span className="text-sm font-medium">Bank-Level Security</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-yellow-400 rounded-full mr-2 animate-pulse"></div>
                  <span className="text-sm font-medium">24/7 Support</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-4 left-4 text-white/70 text-sm">
        � 2025 HRIS System. All rights reserved.
      </div>
    </div>
  )
}

export default Landing