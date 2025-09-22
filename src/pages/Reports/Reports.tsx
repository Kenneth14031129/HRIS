import { useState } from 'react'
import {
  Download,
  Users,
  UserCheck,
  CreditCard,
  TrendingDown,
  BarChart3,
  Activity,
  DollarSign,
  Target,
  Award,
  AlertCircle
} from 'lucide-react'
import Sidebar from '../../components/Sidebar'
import Header from '../../components/Header'
import AdvancedLineChart from './AdvancedLineChart'
import AdvancedBarChart from './AdvancedBarChart'
import AdvancedPieChart from './AdvancedPieChart'
import AdvancedAreaChart from './AdvancedAreaChart'
import MetricCard from './MetricCard'

const Reports = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('monthly')
  const [selectedReport, setSelectedReport] = useState('overview')

  // Sample data for charts
  const employeeGrowthData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
    datasets: [
      {
        label: 'Total Employees',
        data: [45, 48, 52, 50, 55, 58, 62, 65, 68],
        borderColor: 'rgb(251, 191, 36)',
        backgroundColor: 'rgba(251, 191, 36, 0.1)',
        fill: true,
        tension: 0.4,
      },
      {
        label: 'New Hires',
        data: [5, 3, 7, 2, 8, 6, 9, 4, 7],
        borderColor: 'rgb(34, 197, 94)',
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        fill: true,
        tension: 0.4,
      }
    ]
  }

  const departmentDistributionData = {
    labels: ['Engineering', 'Marketing', 'Sales', 'HR', 'Design', 'Finance'],
    datasets: [
      {
        data: [25, 15, 18, 8, 12, 10],
        backgroundColor: [
          'rgba(251, 191, 36, 0.95)',
          'rgba(34, 197, 94, 0.95)',
          'rgba(59, 130, 246, 0.95)',
          'rgba(239, 68, 68, 0.95)',
          'rgba(147, 51, 234, 0.95)',
          'rgba(16, 185, 129, 0.95)',
        ],
        borderColor: [
          'rgb(251, 191, 36)',
          'rgb(34, 197, 94)',
          'rgb(59, 130, 246)',
          'rgb(239, 68, 68)',
          'rgb(147, 51, 234)',
          'rgb(16, 185, 129)',
        ],
        borderWidth: 2,
      }
    ]
  }

  const attendanceData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'Present',
        data: [95, 92, 97, 94],
        backgroundColor: 'rgba(34, 197, 94, 0.8)',
        borderColor: 'rgb(34, 197, 94)',
        borderWidth: 2,
        borderRadius: 8,
      },
      {
        label: 'Absent',
        data: [3, 5, 2, 4],
        backgroundColor: 'rgba(239, 68, 68, 0.8)',
        borderColor: 'rgb(239, 68, 68)',
        borderWidth: 2,
        borderRadius: 8,
      },
      {
        label: 'Late',
        data: [2, 3, 1, 2],
        backgroundColor: 'rgba(251, 191, 36, 0.8)',
        borderColor: 'rgb(251, 191, 36)',
        borderWidth: 2,
        borderRadius: 8,
      }
    ]
  }

  const payrollTrendsData = {
    labels: ['Q1', 'Q2', 'Q3', 'Q4'],
    datasets: [
      {
        label: 'Total Payroll ($K)',
        data: [450, 520, 580, 620],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.2)',
        fill: true,
        tension: 0.4,
      },
      {
        label: 'Overtime ($K)',
        data: [45, 62, 58, 71],
        borderColor: 'rgb(251, 191, 36)',
        backgroundColor: 'rgba(251, 191, 36, 0.2)',
        fill: true,
        tension: 0.4,
      }
    ]
  }

  const recruitmentData = {
    labels: ['Applications', 'Interviews', 'Offers', 'Hired'],
    datasets: [
      {
        label: 'Count',
        data: [150, 45, 28, 22],
        backgroundColor: [
          'rgba(251, 191, 36, 0.8)',
          'rgba(59, 130, 246, 0.8)',
          'rgba(34, 197, 94, 0.8)',
          'rgba(147, 51, 234, 0.8)',
        ],
        borderColor: [
          'rgb(251, 191, 36)',
          'rgb(59, 130, 246)',
          'rgb(34, 197, 94)',
          'rgb(147, 51, 234)',
        ],
        borderWidth: 2,
        borderRadius: 8,
      }
    ]
  }

  const reportTypes = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'employees', label: 'Employees', icon: Users },
    { id: 'attendance', label: 'Attendance', icon: UserCheck },
    { id: 'payroll', label: 'Payroll', icon: CreditCard },
    { id: 'recruitment', label: 'Recruitment', icon: Target },
  ]

  const periods = [
    { id: 'weekly', label: 'Weekly' },
    { id: 'monthly', label: 'Monthly' },
    { id: 'quarterly', label: 'Quarterly' },
    { id: 'yearly', label: 'Yearly' },
  ]

  return (
    <div className="flex h-screen bg-gray-900">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />

        <main className="flex-1 overflow-auto p-6 space-y-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {/* Page Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white mb-2">Analytics & Reports</h1>
              <p className="text-gray-400">Comprehensive insights into your HR metrics and performance</p>
            </div>
            <div className="flex items-center space-x-3">
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-yellow-500 transition-colors"
              >
                {periods.map(period => (
                  <option key={period.id} value={period.id}>{period.label}</option>
                ))}
              </select>
              <button className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white px-6 py-2 rounded-lg font-medium flex items-center space-x-2 transition-all duration-200">
                <Download className="w-4 h-4" />
                <span>Export</span>
              </button>
            </div>
          </div>

          {/* Report Type Selector */}
          <div className="flex items-center space-x-2 bg-gray-800 border border-gray-700 rounded-xl p-2">
            {reportTypes.map((type) => {
              const Icon = type.icon
              return (
                <button
                  key={type.id}
                  onClick={() => setSelectedReport(type.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    selectedReport === type.id
                      ? 'bg-yellow-500 text-black'
                      : 'text-gray-400 hover:text-white hover:bg-gray-700'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{type.label}</span>
                </button>
              )
            })}
          </div>

          {/* Key Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <MetricCard
              title="Total Employees"
              value={68}
              subtitle="Active workforce"
              icon={Users}
              trend={{ value: 12.5, isPositive: true, period: 'vs last month' }}
              color="blue"
              animate={true}
            />
            <MetricCard
              title="Attendance Rate"
              value="94.2%"
              subtitle="This month"
              icon={UserCheck}
              trend={{ value: 2.1, isPositive: true, period: 'vs last month' }}
              color="green"
              animate={true}
            />
            <MetricCard
              title="Total Payroll"
              value="$620K"
              subtitle="This quarter"
              icon={DollarSign}
              trend={{ value: 6.8, isPositive: true, period: 'vs last quarter' }}
              color="yellow"
              animate={true}
            />
            <MetricCard
              title="Turnover Rate"
              value="3.2%"
              subtitle="This year"
              icon={TrendingDown}
              trend={{ value: 1.5, isPositive: false, period: 'vs last year' }}
              color="red"
              animate={true}
            />
          </div>

          {/* Main Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Employee Growth Trend */}
            <div className="lg:col-span-1">
              <AdvancedAreaChart
                title="Employee Growth Trend"
                data={employeeGrowthData}
                height={350}
                stacked={false}
                animate={true}
              />
            </div>

            {/* Department Distribution */}
            <div className="lg:col-span-1">
              <AdvancedPieChart
                title="Department Distribution"
                data={departmentDistributionData}
                height={350}
                showPercentage={true}
                cutout={65}
                animate={true}
              />
            </div>

            {/* Attendance Overview */}
            <div className="lg:col-span-1">
              <AdvancedBarChart
                title="Weekly Attendance Overview"
                data={attendanceData}
                height={350}
                stacked={true}
                animate={true}
              />
            </div>

            {/* Payroll Trends */}
            <div className="lg:col-span-1">
              <AdvancedLineChart
                title="Quarterly Payroll Trends"
                data={payrollTrendsData}
                height={350}
                showGrid={true}
                animate={true}
              />
            </div>
          </div>

          {/* Additional Metrics */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recruitment Funnel */}
            <div className="lg:col-span-1">
              <AdvancedBarChart
                title="Recruitment Funnel"
                data={recruitmentData}
                height={300}
                horizontal={false}
                animate={true}
              />
            </div>

            {/* Performance Summary */}
            <div className="lg:col-span-2 bg-gray-800 border border-gray-700 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-white mb-6 flex items-center space-x-2">
                <Activity className="w-5 h-5 text-yellow-400" />
                <span>Performance Summary</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gradient-to-br from-green-500/10 to-green-600/5 border border-green-500/20 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-3">
                    <Award className="w-6 h-6 text-green-400" />
                    <span className="text-green-400 text-sm font-medium">Excellent</span>
                  </div>
                  <div className="text-2xl font-bold text-white">42</div>
                  <div className="text-sm text-gray-400">Employees (90%+)</div>
                </div>

                <div className="bg-gradient-to-br from-yellow-500/10 to-yellow-600/5 border border-yellow-500/20 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-3">
                    <Target className="w-6 h-6 text-yellow-400" />
                    <span className="text-yellow-400 text-sm font-medium">Good</span>
                  </div>
                  <div className="text-2xl font-bold text-white">18</div>
                  <div className="text-sm text-gray-400">Employees (75-89%)</div>
                </div>

                <div className="bg-gradient-to-br from-red-500/10 to-red-600/5 border border-red-500/20 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-3">
                    <AlertCircle className="w-6 h-6 text-red-400" />
                    <span className="text-red-400 text-sm font-medium">Needs Improvement</span>
                  </div>
                  <div className="text-2xl font-bold text-white">8</div>
                  <div className="text-sm text-gray-400">Employees (&lt;75%)</div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-700">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Average Performance Score</span>
                  <span className="text-white font-medium">87.3%</span>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default Reports