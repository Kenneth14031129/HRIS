import { useState } from 'react'
import {
  Calendar,
  Clock,
  Plus,
  Search,
  CheckCircle,
  XCircle,
  AlertCircle,
  CalendarDays,
  TrendingUp,
  Eye,
  ChevronLeft,
  ChevronRight,
  Download
} from 'lucide-react'
import Sidebar from '../../components/Sidebar'
import Header from '../../components/Header'
import AddLeave from './AddLeave'
import ViewLeave from './ViewLeave'
import MetricCard from '../Reports/MetricCard'

const Leave = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [showAddLeave, setShowAddLeave] = useState(false)
  const [selectedLeave, setSelectedLeave] = useState<any>(null)
  const [showViewLeave, setShowViewLeave] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [typeFilter, setTypeFilter] = useState('all')
  const itemsPerPage = 5
  const leaveStats = [
    {
      title: 'Today\'s Requests',
      value: '47',
      change: '+8',
      changeType: 'increase',
      icon: Calendar,
      color: 'yellow',
      period: 'submitted today'
    },
    {
      title: 'Pending Now',
      value: '12',
      change: '3',
      changeType: 'neutral',
      icon: Clock,
      color: 'yellow',
      period: 'awaiting review'
    },
    {
      title: 'Approved Today',
      value: '5',
      change: '+2',
      changeType: 'increase',
      icon: CheckCircle,
      color: 'yellow',
      period: 'vs yesterday'
    },
    {
      title: 'Available Days',
      value: '18',
      change: '-3',
      changeType: 'decrease',
      icon: CalendarDays,
      color: 'yellow',
      period: 'current balance'
    }
  ]

  const leaveRequests = [
    { id: 1, employee: 'Sarah Johnson', department: 'Marketing', type: 'Annual Leave', startDate: 'Sep 25', endDate: 'Sep 27', days: 3, status: 'pending', avatar: 'SJ', submittedDate: 'Sep 20', reason: 'Family vacation' },
    { id: 2, employee: 'Mike Chen', department: 'Engineering', type: 'Sick Leave', startDate: 'Sep 23', endDate: 'Sep 23', days: 1, status: 'approved', avatar: 'MC', submittedDate: 'Sep 23', reason: 'Medical appointment' },
    { id: 3, employee: 'Emily Davis', department: 'Design', type: 'Personal Leave', startDate: 'Oct 1', endDate: 'Oct 2', days: 2, status: 'pending', avatar: 'ED', submittedDate: 'Sep 18', reason: 'Personal matters' },
    { id: 4, employee: 'Alex Thompson', department: 'Sales', type: 'Annual Leave', startDate: 'Oct 5', endDate: 'Oct 12', days: 8, status: 'approved', avatar: 'AT', submittedDate: 'Sep 15', reason: 'Annual holiday' },
    { id: 5, employee: 'Lisa Wang', department: 'HR', type: 'Maternity Leave', startDate: 'Oct 15', endDate: 'Jan 15', days: 90, status: 'approved', avatar: 'LW', submittedDate: 'Aug 10', reason: 'Maternity leave' },
    { id: 6, employee: 'John Smith', department: 'Engineering', type: 'Annual Leave', startDate: 'Oct 20', endDate: 'Oct 24', days: 5, status: 'approved', avatar: 'JS', submittedDate: 'Sep 12', reason: 'Extended weekend' },
    { id: 7, employee: 'Anna Wilson', department: 'Marketing', type: 'Sick Leave', startDate: 'Sep 22', endDate: 'Sep 22', days: 1, status: 'rejected', avatar: 'AW', submittedDate: 'Sep 22', reason: 'Flu symptoms' },
    { id: 8, employee: 'David Brown', department: 'Finance', type: 'Personal Leave', startDate: 'Nov 3', endDate: 'Nov 5', days: 3, status: 'pending', avatar: 'DB', submittedDate: 'Sep 21', reason: 'Moving house' },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-500/10 text-green-400 border-green-500/30'
      case 'pending': return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30'
      case 'rejected': return 'bg-red-500/10 text-red-400 border-red-500/30'
      default: return 'bg-gray-500/10 text-gray-400 border-gray-500/30'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return <CheckCircle className="w-4 h-4" />
      case 'pending': return <Clock className="w-4 h-4" />
      case 'rejected': return <XCircle className="w-4 h-4" />
      default: return <AlertCircle className="w-4 h-4" />
    }
  }

  const getLeaveTypeColor = (type: string) => {
    switch (type) {
      case 'Annual Leave': return 'bg-blue-500/10 text-blue-400 border-blue-500/30'
      case 'Sick Leave': return 'bg-red-500/10 text-red-400 border-red-500/30'
      case 'Personal Leave': return 'bg-purple-500/10 text-purple-400 border-purple-500/30'
      case 'Maternity Leave': return 'bg-pink-500/10 text-pink-400 border-pink-500/30'
      default: return 'bg-gray-500/10 text-gray-400 border-gray-500/30'
    }
  }

  // Filter and search logic
  const filteredRequests = leaveRequests.filter(request => {
    const matchesSearch = request.employee.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.type.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === 'all' || request.status === statusFilter
    const matchesType = typeFilter === 'all' || request.type === typeFilter

    return matchesSearch && matchesStatus && matchesType
  })

  // Pagination logic
  const totalPages = Math.ceil(filteredRequests.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentItems = filteredRequests.slice(startIndex, endIndex)

  const goToPage = (page: number) => {
    setCurrentPage(page)
  }

  const goToPrevious = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1))
  }

  const goToNext = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages))
  }

  const handleSaveLeave = (leaveData: any) => {
    // Here you would typically send the data to your backend
    console.log('New leave request:', leaveData)
    // For now, just close the modal
    setShowAddLeave(false)
  }

  const handleViewLeave = (request: any) => {
    setSelectedLeave(request)
    setShowViewLeave(true)
  }

  const handleApproveLeave = (id: number, comments?: string) => {
    console.log('Approving leave request:', id, comments)
    // Update leave status in your backend
    setShowViewLeave(false)
  }

  const handleRejectLeave = (id: number, comments?: string) => {
    console.log('Rejecting leave request:', id, comments)
    // Update leave status in your backend
    setShowViewLeave(false)
  }

  const handleEditLeave = (id: number) => {
    console.log('Editing leave request:', id)
    setShowViewLeave(false)
    // Open edit modal
  }

  const handleDeleteLeave = (id: number) => {
    console.log('Deleting leave request:', id)
    setShowViewLeave(false)
    // Delete leave request
  }

  const handleCancelLeave = (id: number, comments?: string) => {
    console.log('Cancelling leave request:', id, comments)
    // Update leave status to cancelled in your backend
    setShowViewLeave(false)
  }

  return (
    <div className="flex h-screen bg-gray-900">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />

        <main className="flex-1 overflow-auto p-6 space-y-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {/* Page Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white mb-2">Leave Management</h1>
              <p className="text-gray-400">Manage employee leave requests and balances</p>
            </div>
            <button
              onClick={() => setShowAddLeave(true)}
              className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white px-6 py-3 rounded-xl font-medium flex items-center space-x-2 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <Plus className="w-5 h-5" />
              <span>New Leave Request</span>
            </button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {leaveStats.map((stat, index) => (
              <MetricCard
                key={stat.title}
                title={stat.title}
                value={stat.value}
                subtitle={stat.period}
                icon={stat.icon}
                trend={stat.changeType !== 'neutral' ? {
                  value: parseFloat(stat.change.replace('+', '').replace('-', '')),
                  isPositive: stat.changeType === 'increase',
                  period: stat.period
                } : undefined}
                color={stat.color}
                animate={true}
              />
            ))}
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
                  placeholder="Search leave requests..."
                  className="bg-gray-700 border border-gray-600 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500 transition-colors"
                />
              </div>

              {/* Status Filter */}
              <div className="relative z-10">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-yellow-500 transition-colors relative z-10"
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>

              {/* Type Filter */}
              <div className="relative z-10">
                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-yellow-500 transition-colors relative z-10"
                >
                  <option value="all">All Types</option>
                  <option value="Annual Leave">Annual Leave</option>
                  <option value="Sick Leave">Sick Leave</option>
                  <option value="Personal Leave">Personal Leave</option>
                  <option value="Maternity Leave">Maternity Leave</option>
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

          {/* Leave Requests Table */}
          <div className="bg-gray-800 border border-gray-700 rounded-2xl overflow-hidden">

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-750">
                  <tr>
                    <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider px-6 py-4">Employee</th>
                    <th className="text-center text-xs font-medium text-gray-400 uppercase tracking-wider px-6 py-4">Type</th>
                    <th className="text-center text-xs font-medium text-gray-400 uppercase tracking-wider px-6 py-4">Start Date</th>
                    <th className="text-center text-xs font-medium text-gray-400 uppercase tracking-wider px-6 py-4">End Date</th>
                    <th className="text-center text-xs font-medium text-gray-400 uppercase tracking-wider px-6 py-4">Days</th>
                    <th className="text-center text-xs font-medium text-gray-400 uppercase tracking-wider px-6 py-4">Status</th>
                    <th className="text-center text-xs font-medium text-gray-400 uppercase tracking-wider px-6 py-4">Submitted</th>
                    <th className="text-center text-xs font-medium text-gray-400 uppercase tracking-wider px-6 py-4">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {currentItems.map((request) => (
                    <tr key={request.id} className="hover:bg-gray-750 transition-colors duration-200">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-white font-semibold text-xs">
                            {request.avatar}
                          </div>
                          <div>
                            <p className="text-white font-medium text-sm">{request.employee}</p>
                            <p className="text-gray-400 text-xs">{request.department}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <span className={`px-3 py-1 rounded-lg border text-xs font-medium ${getLeaveTypeColor(request.type)}`}>
                          {request.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-white text-sm text-center">{request.startDate}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-white text-sm text-center">{request.endDate}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-white text-sm font-medium text-center">{request.days}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <span className={`inline-flex items-center space-x-1 px-3 py-1 rounded-lg border text-xs font-medium ${getStatusColor(request.status)}`}>
                          {getStatusIcon(request.status)}
                          <span className="capitalize">{request.status}</span>
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-400 text-sm text-center">{request.submittedDate}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <div className="flex items-center justify-center space-x-2">
                          <button
                            onClick={() => handleViewLeave(request)}
                            className="p-2 text-gray-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-all duration-200"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                        </div>
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
                  Showing {startIndex + 1} to {Math.min(endIndex, filteredRequests.length)} of {filteredRequests.length} results
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

      {/* Add Leave Modal */}
      {showAddLeave && (
        <AddLeave
          onClose={() => setShowAddLeave(false)}
          onSave={handleSaveLeave}
        />
      )}

      {/* View Leave Modal */}
      {showViewLeave && selectedLeave && (
        <ViewLeave
          leaveRequest={selectedLeave}
          onClose={() => setShowViewLeave(false)}
          onApprove={handleApproveLeave}
          onReject={handleRejectLeave}
          onCancel={handleCancelLeave}
          onEdit={handleEditLeave}
          onDelete={handleDeleteLeave}
        />
      )}
    </div>
  )
}

export default Leave