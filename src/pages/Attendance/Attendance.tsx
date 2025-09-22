import { useState } from 'react'
import {
  Search,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Users,
  UserCheck,
  UserX,
  TrendingUp,
  Download,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'
import Sidebar from '../../components/Sidebar'
import Header from '../../components/Header'
import MetricCard from '../Reports/MetricCard'

const Attendance = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [selectedDepartment, setSelectedDepartment] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  const attendanceData = [
    {
      id: 1,
      name: 'John Smith',
      department: 'Engineering',
      checkIn: '09:00 AM',
      checkOut: '06:15 PM',
      totalHours: '9h 15m',
      status: 'Present',
      avatar: 'JS',
      lateBy: null
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      department: 'Marketing',
      checkIn: '09:15 AM',
      checkOut: '06:00 PM',
      totalHours: '8h 45m',
      status: 'Present',
      avatar: 'SJ',
      lateBy: '15 min'
    },
    {
      id: 3,
      name: 'Mike Chen',
      department: 'Sales',
      checkIn: '10:30 AM',
      checkOut: '07:00 PM',
      totalHours: '8h 30m',
      status: 'Late',
      avatar: 'MC',
      lateBy: '1h 30m'
    },
    {
      id: 4,
      name: 'Emily Davis',
      department: 'Design',
      checkIn: '--',
      checkOut: '--',
      totalHours: '--',
      status: 'Absent',
      avatar: 'ED',
      lateBy: null
    },
    {
      id: 5,
      name: 'David Brown',
      department: 'Human Resources',
      checkIn: '08:45 AM',
      checkOut: '05:30 PM',
      totalHours: '8h 45m',
      status: 'Present',
      avatar: 'DB',
      lateBy: null
    }
  ]

  const departments = ['Engineering', 'Marketing', 'Sales', 'Design', 'Human Resources']
  const statuses = ['Present', 'Late', 'Absent', 'Half Day']

  const filteredAttendance = attendanceData.filter(record => {
    const matchesSearch = record.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.department.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDepartment = selectedDepartment === 'all' || record.department === selectedDepartment
    const matchesStatus = selectedStatus === 'all' || record.status === selectedStatus

    return matchesSearch && matchesDepartment && matchesStatus
  })

  // Pagination logic
  const totalPages = Math.ceil(filteredAttendance.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentItems = filteredAttendance.slice(startIndex, endIndex)

  const goToPage = (page: number) => {
    setCurrentPage(page)
  }

  const goToPrevious = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1))
  }

  const goToNext = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages))
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Present': return <CheckCircle className="w-4 h-4 text-green-400" />
      case 'Late': return <AlertCircle className="w-4 h-4 text-yellow-400" />
      case 'Absent': return <XCircle className="w-4 h-4 text-red-400" />
      case 'Half Day': return <Clock className="w-4 h-4 text-blue-400" />
      default: return <Clock className="w-4 h-4 text-gray-400" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Present': return 'bg-green-500/10 text-green-400 border-green-500/30'
      case 'Late': return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30'
      case 'Absent': return 'bg-red-500/10 text-red-400 border-red-500/30'
      case 'Half Day': return 'bg-blue-500/10 text-blue-400 border-blue-500/30'
      default: return 'bg-gray-500/10 text-gray-400 border-gray-500/30'
    }
  }

  // Calculate statistics
  const totalEmployees = attendanceData.length
  const presentCount = attendanceData.filter(r => r.status === 'Present').length
  const lateCount = attendanceData.filter(r => r.status === 'Late').length
  const absentCount = attendanceData.filter(r => r.status === 'Absent').length
  const attendanceRate = Math.round(((presentCount + lateCount) / totalEmployees) * 100)

  return (
    <div className="flex h-screen bg-gray-900">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />

        <main className="flex-1 overflow-auto p-6 space-y-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {/* Page Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white mb-2">Attendance Management</h1>
              <p className="text-gray-400">Track employee attendance and working hours</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-gray-800 border border-gray-700 rounded-xl p-2">
                <Calendar className="w-5 h-5 text-yellow-400" />
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="bg-transparent text-white font-medium focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <MetricCard
              title="Total Employees"
              value={totalEmployees}
              subtitle="checked in today"
              icon={Users}
              trend={{ value: 2, isPositive: true, period: 'vs yesterday' }}
              color="blue"
              animate={true}
            />
            <MetricCard
              title="Present Today"
              value={presentCount + lateCount}
              subtitle="current attendance"
              icon={UserCheck}
              trend={{ value: attendanceRate, isPositive: true, period: `${attendanceRate}%` }}
              color="green"
              animate={true}
            />
            <MetricCard
              title="Late Today"
              value={lateCount}
              subtitle="late arrivals"
              icon={AlertCircle}
              color="yellow"
              animate={true}
            />
            <MetricCard
              title="Absent Today"
              value={absentCount}
              subtitle="not present"
              icon={UserX}
              color="red"
              animate={true}
            />
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between bg-gray-800 border border-gray-700 rounded-2xl p-4 relative z-20">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search employees..."
                  className="bg-gray-700 border border-gray-600 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500 transition-colors"
                />
              </div>

              {/* Department Filter */}
              <div className="relative z-10">
                <select
                  value={selectedDepartment}
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                  className="bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-yellow-500 transition-colors relative z-10"
                >
                  <option value="all">All Departments</option>
                  {departments.map(dept => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>

              {/* Status Filter */}
              <div className="relative z-10">
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-yellow-500 transition-colors relative z-10"
                >
                  <option value="all">All Status</option>
                  {statuses.map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <button className="flex items-center space-x-2 bg-gray-700 hover:bg-gray-600 border border-gray-600 rounded-lg px-4 py-2 text-gray-300 transition-colors">
                <Download className="w-4 h-4" />
                <span>Export</span>
              </button>
            </div>
          </div>

          {/* Attendance Table */}
          <div className="bg-gray-800 border border-gray-700 rounded-2xl overflow-hidden relative z-10">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-750">
                  <tr>
                    <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider px-6 py-4">Employee</th>
                    <th className="text-center text-xs font-medium text-gray-400 uppercase tracking-wider px-6 py-4">Check In</th>
                    <th className="text-center text-xs font-medium text-gray-400 uppercase tracking-wider px-6 py-4">Check Out</th>
                    <th className="text-center text-xs font-medium text-gray-400 uppercase tracking-wider px-6 py-4">Total Hours</th>
                    <th className="text-center text-xs font-medium text-gray-400 uppercase tracking-wider px-6 py-4">Status</th>
                    <th className="text-center text-xs font-medium text-gray-400 uppercase tracking-wider px-6 py-4">Late By</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {currentItems.map((record) => (
                    <tr key={record.id} className="hover:bg-gray-750 transition-colors duration-200">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-white font-semibold text-xs">
                            {record.avatar}
                          </div>
                          <div>
                            <p className="text-white font-medium text-sm">{record.name}</p>
                            <p className="text-gray-400 text-xs">{record.department}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <div className="flex items-center justify-center space-x-1">
                          <Clock className="w-3 h-3 text-gray-400" />
                          <span className="text-white text-sm">{record.checkIn}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <div className="flex items-center justify-center space-x-1">
                          <Clock className="w-3 h-3 text-gray-400" />
                          <span className="text-white text-sm">{record.checkOut}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-white text-sm font-medium text-center">{record.totalHours}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <span className={`inline-flex items-center space-x-1 px-3 py-1 rounded-lg border text-xs font-medium ${getStatusColor(record.status)}`}>
                          {getStatusIcon(record.status)}
                          <span>{record.status}</span>
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        {record.lateBy ? (
                          <span className="text-yellow-400 text-sm font-medium">{record.lateBy}</span>
                        ) : (
                          <span className="text-gray-500 text-sm">--</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between px-6 py-4 border-t border-gray-700">
              <div className="flex items-center text-sm text-gray-400">
                <span>
                  Showing {startIndex + 1} to {Math.min(endIndex, filteredAttendance.length)} of {filteredAttendance.length} results
                </span>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={goToPrevious}
                  disabled={currentPage === 1}
                  className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                <div className="flex items-center space-x-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => goToPage(page)}
                      className={`px-3 py-1 text-sm rounded-lg transition-all duration-200 ${
                        currentPage === page
                          ? 'bg-yellow-500 text-white'
                          : 'text-gray-400 hover:text-white hover:bg-gray-700'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>

                <button
                  onClick={goToNext}
                  disabled={currentPage === totalPages}
                  className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>

    </div>
  )
}

export default Attendance