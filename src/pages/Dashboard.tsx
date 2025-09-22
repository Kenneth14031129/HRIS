import {
  Users,
  UserCheck,
  Clock,
  DollarSign,
  TrendingUp,
  Calendar,
  Activity,
  CheckCircle,
  Star,
  Award,
  BarChart3,
  PieChart,
} from 'lucide-react'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import MetricCard from './Reports/MetricCard'

const Dashboard = () => {
  const stats = [
    {
      title: 'Total Employees',
      value: '247',
      change: '+12',
      changeType: 'increase',
      icon: Users,
      color: 'yellow',
      period: 'active today'
    },
    {
      title: 'Present Today',
      value: '231',
      change: '93.5%',
      changeType: 'neutral',
      icon: UserCheck,
      color: 'yellow',
      period: 'attendance rate'
    },
    {
      title: 'Avg Work Hours',
      value: '8.2',
      change: '+0.5',
      changeType: 'increase',
      icon: Clock,
      color: 'yellow',
      period: 'today'
    },
    {
      title: 'Current Payroll',
      value: '$847K',
      change: '+5.2%',
      changeType: 'increase',
      icon: DollarSign,
      color: 'yellow',
      period: 'current period'
    }
  ]

  const recentActivities = [
    { id: 1, type: 'join', user: 'Sarah Johnson', action: 'joined the company', time: '2 hours ago', avatar: 'SJ' },
    { id: 2, type: 'leave', user: 'Mike Chen', action: 'submitted leave request', time: '4 hours ago', avatar: 'MC' },
    { id: 3, type: 'promotion', user: 'Emily Davis', action: 'got promoted to Senior Developer', time: '1 day ago', avatar: 'ED' },
    { id: 4, type: 'review', user: 'Alex Thompson', action: 'completed performance review', time: '2 days ago', avatar: 'AT' },
  ]

  const topPerformers = [
    { id: 1, name: 'John Smith', department: 'Engineering', score: 98, avatar: 'JS', trend: 'up' },
    { id: 2, name: 'Lisa Wang', department: 'Marketing', score: 96, avatar: 'LW', trend: 'up' },
    { id: 3, name: 'David Brown', department: 'Sales', score: 94, avatar: 'DB', trend: 'neutral' },
    { id: 4, name: 'Anna Wilson', department: 'Design', score: 92, avatar: 'AW', trend: 'up' },
  ]

  const upcomingEvents = [
    { id: 1, title: 'Team Building Event', date: 'Sep 25', time: '10:00 AM', type: 'event' },
    { id: 2, title: 'Q3 Performance Reviews', date: 'Sep 28', time: '2:00 PM', type: 'review' },
    { id: 3, title: 'New Hire Orientation', date: 'Oct 2', time: '9:00 AM', type: 'orientation' },
    { id: 4, title: 'Monthly All-Hands', date: 'Oct 5', time: '3:00 PM', type: 'meeting' },
  ]

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'join': return <CheckCircle className="w-4 h-4 text-green-400" />
      case 'leave': return <Calendar className="w-4 h-4 text-blue-400" />
      case 'promotion': return <Award className="w-4 h-4 text-yellow-400" />
      case 'review': return <Star className="w-4 h-4 text-purple-400" />
      default: return <Activity className="w-4 h-4 text-gray-400" />
    }
  }

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'event': return 'bg-green-500/10 text-green-400 border-green-500/30'
      case 'review': return 'bg-purple-500/10 text-purple-400 border-purple-500/30'
      case 'orientation': return 'bg-blue-500/10 text-blue-400 border-blue-500/30'
      case 'meeting': return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30'
      default: return 'bg-gray-500/10 text-gray-400 border-gray-500/30'
    }
  }

  return (
    <div className="flex h-screen bg-gray-900">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />

        <main className="flex-1 overflow-auto p-6 space-y-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <MetricCard
                key={stat.title}
                title={stat.title}
                value={stat.value}
                subtitle={stat.period}
                icon={stat.icon}
                trend={{
                  value: parseFloat(stat.change.replace('+', '').replace('%', '')),
                  isPositive: stat.changeType === 'increase',
                  period: stat.period
                }}
                color={stat.color}
                animate={true}
              />
            ))}
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recent Activities */}
            <div className="lg:col-span-2 bg-gray-800 border border-gray-700 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-white flex items-center">
                  <Activity className="w-5 h-5 mr-2 text-yellow-400" />
                  Recent Activities
                </h3>
                <button className="text-sm text-yellow-400 hover:text-yellow-300 transition-colors">View All</button>
              </div>

              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-center space-x-4 p-4 bg-gray-750 rounded-xl hover:bg-gray-700 transition-all duration-200">
                    <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                      {activity.avatar}
                    </div>
                    <div className="flex-1">
                      <p className="text-white font-medium">{activity.user}</p>
                      <p className="text-gray-400 text-sm">{activity.action}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getActivityIcon(activity.type)}
                      <span className="text-xs text-gray-500">{activity.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Performers */}
            <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-white flex items-center">
                  <Star className="w-5 h-5 mr-2 text-yellow-400" />
                  Top Performers
                </h3>
                <button className="text-sm text-yellow-400 hover:text-yellow-300 transition-colors">View All</button>
              </div>

              <div className="space-y-4">
                {topPerformers.map((performer) => (
                  <div key={performer.id} className="flex items-center space-x-4 p-4 bg-gray-750 rounded-xl hover:bg-gray-700 transition-all duration-200">
                    <div className="relative">
                      <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                        {performer.avatar}
                      </div>
                    </div>
                    <div className="flex-1">
                      <p className="text-white font-medium text-sm">{performer.name}</p>
                      <p className="text-gray-400 text-xs">{performer.department}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-bold text-sm">{performer.score}%</p>
                      <div className="flex items-center justify-end">
                        {performer.trend === 'up' ? (
                          <TrendingUp className="w-3 h-3 text-green-400" />
                        ) : (
                          <div className="w-3 h-3" />
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Upcoming Events */}
            <div className="lg:col-span-2 bg-gray-800 border border-gray-700 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-white flex items-center">
                  <Calendar className="w-5 h-5 mr-2 text-yellow-400" />
                  Upcoming Events
                </h3>
                <button className="text-sm text-yellow-400 hover:text-yellow-300 transition-colors">View Calendar</button>
              </div>

              <div className="space-y-4">
                {upcomingEvents.map((event) => (
                  <div key={event.id} className="flex items-center justify-between p-4 bg-gray-750 rounded-xl hover:bg-gray-700 transition-all duration-200">
                    <div className="flex items-center space-x-4">
                      <div className={`px-3 py-1 rounded-lg border text-xs font-medium ${getEventTypeColor(event.type)}`}>
                        {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                      </div>
                      <div>
                        <p className="text-white font-medium text-sm">{event.title}</p>
                        <p className="text-gray-400 text-xs">{event.time}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-medium text-sm">{event.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-white flex items-center">
                  <BarChart3 className="w-5 h-5 mr-2 text-yellow-400" />
                  Quick Actions
                </h3>
              </div>

              <div className="space-y-4">
                {[
                  { label: 'Add Employee', icon: Users, color: 'yellow', description: 'Add new team member' },
                  { label: 'Generate Report', icon: PieChart, color: 'yellow', description: 'Create HR analytics' },
                  { label: 'Schedule Review', icon: Star, color: 'yellow', description: 'Plan performance review' },
                  { label: 'View Analytics', icon: BarChart3, color: 'yellow', description: 'Check system metrics' },
                ].map((action) => {
                  const Icon = action.icon
                  return (
                    <div key={action.label} className="flex items-center space-x-4 p-4 bg-gray-750 rounded-xl hover:bg-gray-700 transition-all duration-200 cursor-pointer group">
                      <div className={`p-3 bg-${action.color}-500/10 rounded-xl group-hover:bg-${action.color}-500/20 transition-all duration-300`}>
                        <Icon className={`w-5 h-5 text-${action.color}-400 group-hover:scale-110 transition-transform duration-200`} />
                      </div>
                      <div className="flex-1">
                        <p className="text-white font-medium text-sm">{action.label}</p>
                        <p className="text-gray-400 text-xs">{action.description}</p>
                      </div>
                      <div className="text-right">
                        <div className="w-2 h-2 bg-yellow-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default Dashboard