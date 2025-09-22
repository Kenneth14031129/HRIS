import { useState } from 'react'
import {
  Search,
  Plus,
  Download,
  Upload,
  Eye,
  Edit,
  Trash2,
  Target,
  TrendingUp,
  Star,
  Clock,
  Award,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'
import Sidebar from '../../components/Sidebar'
import Header from '../../components/Header'
import ViewPerformanceDetails from './ViewPerformanceDetails'
import AddPerformanceReview from './AddPerformanceReview'

const Performance = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedType, setSelectedType] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [selectedRecord, setSelectedRecord] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  const [performanceRecords, setPerformanceRecords] = useState([
    {
      id: 1,
      employeeName: 'John Smith',
      employeeAvatar: 'JS',
      type: 'Annual Review',
      period: '2024',
      status: 'Completed',
      score: 98,
      dueDate: '2024-03-15',
      completedDate: '2024-03-12',
      reviewer: 'Sarah Johnson',
      goals: 5,
      completedGoals: 5
    },
    {
      id: 2,
      employeeName: 'Sarah Johnson',
      employeeAvatar: 'SJ',
      type: 'Quarterly Review',
      period: 'Q3 2024',
      status: 'In Progress',
      score: null,
      dueDate: '2024-09-30',
      completedDate: null,
      reviewer: 'Mike Chen',
      goals: 4,
      completedGoals: 3
    },
    {
      id: 3,
      employeeName: 'Mike Chen',
      employeeAvatar: 'MC',
      type: 'Goal Setting',
      period: 'Q4 2024',
      status: 'Draft',
      score: null,
      dueDate: '2024-10-15',
      completedDate: null,
      reviewer: 'Emily Davis',
      goals: 6,
      completedGoals: 1
    },
    {
      id: 4,
      employeeName: 'Emily Davis',
      employeeAvatar: 'ED',
      type: 'Mid-Year Review',
      period: '2024',
      status: 'Completed',
      score: 92,
      dueDate: '2024-06-30',
      completedDate: '2024-06-28',
      reviewer: 'David Brown',
      goals: 4,
      completedGoals: 4
    },
    {
      id: 5,
      employeeName: 'David Brown',
      employeeAvatar: 'DB',
      type: 'PIP Review',
      period: 'Q3 2024',
      status: 'Overdue',
      score: null,
      dueDate: '2024-09-15',
      completedDate: null,
      reviewer: 'John Smith',
      goals: 3,
      completedGoals: 1
    }
  ])

  const handleAddReview = (newReview: any) => {
    setPerformanceRecords(prev => [...prev, newReview])
  }

  const reviewTypes = ['Annual Review', 'Quarterly Review', 'Mid-Year Review', 'Goal Setting', 'PIP Review']
  const statuses = ['Draft', 'In Progress', 'Completed', 'Overdue']

  const filteredRecords = performanceRecords.filter(record => {
    const matchesSearch = record.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.reviewer.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = selectedType === 'all' || record.type === selectedType
    const matchesStatus = selectedStatus === 'all' || record.status === selectedStatus

    return matchesSearch && matchesType && matchesStatus
  })

  // Pagination logic
  const totalPages = Math.ceil(filteredRecords.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentItems = filteredRecords.slice(startIndex, endIndex)

  const goToPage = (page: number) => {
    setCurrentPage(page)
  }

  const goToPrevious = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1))
  }

  const goToNext = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages))
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-green-500/10 text-green-400 border-green-500/30'
      case 'In Progress': return 'bg-blue-500/10 text-blue-400 border-blue-500/30'
      case 'Draft': return 'bg-gray-500/10 text-gray-400 border-gray-500/30'
      case 'Overdue': return 'bg-red-500/10 text-red-400 border-red-500/30'
      default: return 'bg-gray-500/10 text-gray-400 border-gray-500/30'
    }
  }

  const getScoreColor = (score: number | null) => {
    if (!score) return 'text-gray-400'
    if (score >= 90) return 'text-green-400'
    if (score >= 80) return 'text-yellow-400'
    if (score >= 70) return 'text-orange-400'
    return 'text-red-400'
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
              <h1 className="text-2xl font-bold text-white mb-2">Performance Management</h1>
              <p className="text-gray-400">Manage employee performance reviews and goals</p>
            </div>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white px-6 py-3 rounded-xl font-medium flex items-center space-x-2 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <Plus className="w-5 h-5" />
              <span>Create Review</span>
            </button>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gradient-to-br from-yellow-500/10 to-yellow-600/5 border border-yellow-500/20 rounded-2xl p-6 hover:from-yellow-500/15 hover:to-yellow-600/10 hover:border-yellow-500/30 transition-all duration-300 group animate-fade-in-up backdrop-blur-sm"
                 style={{ animationDelay: '0s' }}>
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-yellow-500/10 rounded-xl group-hover:bg-yellow-500/20 transition-all duration-300">
                  <Star className="w-6 h-6 text-yellow-400" />
                </div>
                <div className="flex items-center space-x-1">
                  <TrendingUp className="w-4 h-4 text-green-400" />
                  <span className="text-sm font-medium text-green-400">+2</span>
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-1">{performanceRecords.length}</h3>
                <p className="text-sm text-gray-400">Total Reviews</p>
                <p className="text-xs text-gray-500 mt-1">this quarter</p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-yellow-500/10 to-yellow-600/5 border border-yellow-500/20 rounded-2xl p-6 hover:from-yellow-500/15 hover:to-yellow-600/10 hover:border-yellow-500/30 transition-all duration-300 group animate-fade-in-up backdrop-blur-sm"
                 style={{ animationDelay: '0.1s' }}>
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-yellow-500/10 rounded-xl group-hover:bg-yellow-500/20 transition-all duration-300">
                  <Award className="w-6 h-6 text-yellow-400" />
                </div>
                <div className="flex items-center space-x-1">
                  <span className="text-sm font-medium text-green-400">94.2%</span>
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-1">{performanceRecords.filter(r => r.status === 'Completed').length}</h3>
                <p className="text-sm text-gray-400">Completed Reviews</p>
                <p className="text-xs text-gray-500 mt-1">avg. score</p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-yellow-500/10 to-yellow-600/5 border border-yellow-500/20 rounded-2xl p-6 hover:from-yellow-500/15 hover:to-yellow-600/10 hover:border-yellow-500/30 transition-all duration-300 group animate-fade-in-up backdrop-blur-sm"
                 style={{ animationDelay: '0.2s' }}>
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-yellow-500/10 rounded-xl group-hover:bg-yellow-500/20 transition-all duration-300">
                  <Target className="w-6 h-6 text-yellow-400" />
                </div>
                <div className="flex items-center space-x-1">
                  <span className="text-sm font-medium text-gray-400">85%</span>
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-1">{performanceRecords.reduce((acc, r) => acc + r.completedGoals, 0)}</h3>
                <p className="text-sm text-gray-400">Goals Achieved</p>
                <p className="text-xs text-gray-500 mt-1">completion rate</p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-yellow-500/10 to-yellow-600/5 border border-yellow-500/20 rounded-2xl p-6 hover:from-yellow-500/15 hover:to-yellow-600/10 hover:border-yellow-500/30 transition-all duration-300 group animate-fade-in-up backdrop-blur-sm"
                 style={{ animationDelay: '0.3s' }}>
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-yellow-500/10 rounded-xl group-hover:bg-yellow-500/20 transition-all duration-300">
                  <Clock className="w-6 h-6 text-yellow-400" />
                </div>
                <div className="flex items-center space-x-1">
                  <span className="text-sm font-medium text-red-400">!</span>
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-1">{performanceRecords.filter(r => r.status === 'Overdue').length}</h3>
                <p className="text-sm text-gray-400">Overdue Reviews</p>
                <p className="text-xs text-gray-500 mt-1">need attention</p>
              </div>
            </div>
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
                  placeholder="Search reviews..."
                  className="bg-gray-700 border border-gray-600 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500 transition-colors"
                />
              </div>

              {/* Type Filter */}
              <div className="relative z-10">
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-yellow-500 transition-colors relative z-10"
                >
                  <option value="all">All Types</option>
                  {reviewTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
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
                <Upload className="w-4 h-4" />
                <span>Import</span>
              </button>
              <button className="flex items-center space-x-2 bg-gray-700 hover:bg-gray-600 border border-gray-600 rounded-lg px-4 py-2 text-gray-300 transition-colors">
                <Download className="w-4 h-4" />
                <span>Export</span>
              </button>
            </div>
          </div>

          {/* Performance Table */}
          <div className="bg-gray-800 border border-gray-700 rounded-2xl overflow-hidden relative z-10">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-750">
                  <tr>
                    <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider px-6 py-4">Employee</th>
                    <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider px-6 py-4">Review Type</th>
                    <th className="text-center text-xs font-medium text-gray-400 uppercase tracking-wider px-6 py-4">Period</th>
                    <th className="text-center text-xs font-medium text-gray-400 uppercase tracking-wider px-6 py-4">Status</th>
                    <th className="text-center text-xs font-medium text-gray-400 uppercase tracking-wider px-6 py-4">Score</th>
                    <th className="text-center text-xs font-medium text-gray-400 uppercase tracking-wider px-6 py-4">Goals</th>
                    <th className="text-center text-xs font-medium text-gray-400 uppercase tracking-wider px-6 py-4">Due Date</th>
                    <th className="text-center text-xs font-medium text-gray-400 uppercase tracking-wider px-6 py-4">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {currentItems.map((record) => (
                    <tr key={record.id} className="hover:bg-gray-750 transition-colors duration-200">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-white font-semibold text-xs">
                            {record.employeeAvatar}
                          </div>
                          <div>
                            <p className="text-white font-medium text-sm">{record.employeeName}</p>
                            <p className="text-gray-400 text-xs">Reviewer: {record.reviewer}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <p className="text-white text-sm">{record.type}</p>
                        <p className="text-gray-400 text-xs">{record.period}</p>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-white text-sm text-center">{record.period}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <span className={`px-3 py-1 rounded-lg border text-xs font-medium ${getStatusColor(record.status)}`}>
                          {record.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        {record.score ? (
                          <div className="flex items-center justify-center space-x-2">
                            <div className="w-12 bg-gray-700 rounded-full h-2 relative">
                              <div
                                className="bg-yellow-400 h-2 rounded-full absolute top-0 left-0"
                                style={{ width: `${record.score}%` }}
                              ></div>
                            </div>
                            <span className={`text-sm font-medium ${getScoreColor(record.score)}`}>{record.score}%</span>
                          </div>
                        ) : (
                          <span className="text-gray-400 text-sm">-</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <div className="text-sm">
                          <span className="text-white">{record.completedGoals}/{record.goals}</span>
                          <p className="text-gray-400 text-xs">
                            {Math.round((record.completedGoals / record.goals) * 100)}% complete
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <p className="text-white text-sm">{record.dueDate}</p>
                        {record.status === 'Overdue' && (
                          <p className="text-red-400 text-xs">Overdue</p>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <div className="flex items-center justify-center space-x-2">
                          <button
                            onClick={() => {
                              setSelectedRecord(record)
                              setIsViewModalOpen(true)
                            }}
                            className="p-2 text-gray-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-all duration-200"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-gray-400 hover:text-yellow-400 hover:bg-yellow-500/10 rounded-lg transition-all duration-200">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all duration-200">
                            <Trash2 className="w-4 h-4" />
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
                  Showing {startIndex + 1} to {Math.min(endIndex, filteredRecords.length)} of {filteredRecords.length} results
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

      {/* ViewPerformanceDetails Modal */}
      <ViewPerformanceDetails
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        record={selectedRecord}
      />

      {/* AddPerformanceReview Modal */}
      <AddPerformanceReview
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddReview}
      />
    </div>
  )
}

export default Performance