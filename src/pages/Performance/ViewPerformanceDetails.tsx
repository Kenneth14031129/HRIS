import {
  X,
  User,
  Calendar,
  Target,
  Star,
  Clock,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  FileText
} from 'lucide-react'

interface PerformanceRecord {
  id: number
  employeeName: string
  employeeAvatar: string
  type: string
  period: string
  status: string
  score: number | null
  dueDate: string
  completedDate: string | null
  reviewer: string
  goals: number
  completedGoals: number
  description?: string
}

interface ViewPerformanceDetailsProps {
  isOpen: boolean
  onClose: () => void
  record: PerformanceRecord | null
}

const ViewPerformanceDetails = ({ isOpen, onClose, record }: ViewPerformanceDetailsProps) => {
  if (!isOpen || !record) return null

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

  const getGoalCompletionColor = (completed: number, total: number) => {
    const percentage = (completed / total) * 100
    if (percentage === 100) return 'text-green-400'
    if (percentage >= 75) return 'text-yellow-400'
    if (percentage >= 50) return 'text-orange-400'
    return 'text-red-400'
  }

  const isOverdue = record.status !== 'Completed' && new Date(record.dueDate) < new Date()

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop with blur */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative bg-gray-800 border border-gray-700 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <h2 className="text-xl font-semibold text-white">Performance Review Details</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-700 rounded-lg text-gray-400 hover:text-white transition-all duration-200"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Review Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                {record.employeeAvatar}
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">{record.employeeName}</h3>
                <p className="text-yellow-400 font-medium">{record.type}</p>
                <p className="text-gray-400 text-sm">{record.period}</p>
              </div>
            </div>
            <div className="text-right">
              <span className={`inline-block px-3 py-1 rounded-lg border text-xs font-medium ${getStatusColor(record.status)}`}>
                {record.status}
              </span>
              {isOverdue && (
                <div className="flex items-center space-x-1 mt-2 text-red-400">
                  <AlertCircle className="w-4 h-4" />
                  <span className="text-xs">Overdue</span>
                </div>
              )}
            </div>
          </div>

          {/* Performance Score */}
          {record.score && (
            <div className="bg-gray-750 border border-gray-600 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-semibold text-white flex items-center space-x-2">
                  <Star className="w-5 h-5 text-yellow-400" />
                  <span>Performance Score</span>
                </h4>
                <span className={`text-2xl font-bold ${getScoreColor(record.score)}`}>
                  {record.score}%
                </span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-4 relative overflow-hidden">
                <div
                  className="bg-gradient-to-r from-yellow-400 to-orange-500 h-4 rounded-full transition-all duration-500"
                  style={{ width: `${record.score}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-xs text-gray-400 mt-2">
                <span>0%</span>
                <span>50%</span>
                <span>100%</span>
              </div>
            </div>
          )}

          {/* Goals Progress */}
          <div className="bg-gray-750 border border-gray-600 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-semibold text-white flex items-center space-x-2">
                <Target className="w-5 h-5 text-yellow-400" />
                <span>Goals Progress</span>
              </h4>
              <span className={`text-lg font-bold ${getGoalCompletionColor(record.completedGoals, record.goals)}`}>
                {record.completedGoals}/{record.goals}
              </span>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Completed Goals</span>
                <span className="text-white font-medium">{record.completedGoals}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Total Goals</span>
                <span className="text-white font-medium">{record.goals}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Completion Rate</span>
                <span className={`font-medium ${getGoalCompletionColor(record.completedGoals, record.goals)}`}>
                  {Math.round((record.completedGoals / record.goals) * 100)}%
                </span>
              </div>
            </div>

            <div className="mt-4">
              <div className="w-full bg-gray-700 rounded-full h-3 relative overflow-hidden">
                <div
                  className="bg-gradient-to-r from-blue-400 to-blue-600 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${(record.completedGoals / record.goals) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Review Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Review Information */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-white border-b border-gray-700 pb-2">Review Information</h4>

              <div className="flex items-center space-x-3">
                <User className="w-5 h-5 text-yellow-400" />
                <div>
                  <p className="text-sm text-gray-400">Reviewer</p>
                  <p className="text-white">{record.reviewer}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <FileText className="w-5 h-5 text-yellow-400" />
                <div>
                  <p className="text-sm text-gray-400">Review Type</p>
                  <p className="text-white">{record.type}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Calendar className="w-5 h-5 text-yellow-400" />
                <div>
                  <p className="text-sm text-gray-400">Period</p>
                  <p className="text-white">{record.period}</p>
                </div>
              </div>
            </div>

            {/* Timeline Information */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-white border-b border-gray-700 pb-2">Timeline</h4>

              <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-yellow-400" />
                <div>
                  <p className="text-sm text-gray-400">Due Date</p>
                  <p className="text-white">{record.dueDate}</p>
                </div>
              </div>

              {record.completedDate && (
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <div>
                    <p className="text-sm text-gray-400">Completed Date</p>
                    <p className="text-white">{record.completedDate}</p>
                  </div>
                </div>
              )}

              <div className="flex items-center space-x-3">
                <TrendingUp className="w-5 h-5 text-yellow-400" />
                <div>
                  <p className="text-sm text-gray-400">Status</p>
                  <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${getStatusColor(record.status)}`}>
                    {record.status}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Description/Notes */}
          {record.description && (
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-white border-b border-gray-700 pb-2">Notes & Description</h4>
              <div className="bg-gray-750 border border-gray-600 rounded-xl p-4">
                <p className="text-gray-300 leading-relaxed">{record.description}</p>
              </div>
            </div>
          )}

          {/* Action Items */}
          {record.status !== 'Completed' && (
            <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/5 border border-yellow-500/20 rounded-xl p-4">
              <h4 className="text-lg font-semibold text-white mb-3 flex items-center space-x-2">
                <AlertCircle className="w-5 h-5 text-yellow-400" />
                <span>Action Required</span>
              </h4>
              <div className="space-y-2 text-sm text-gray-300">
                {record.status === 'Draft' && (
                  <p>• Review needs to be started and completed by {record.dueDate}</p>
                )}
                {record.status === 'In Progress' && (
                  <p>• Review is currently in progress, due by {record.dueDate}</p>
                )}
                {record.status === 'Overdue' && (
                  <p className="text-red-400">• Review is overdue since {record.dueDate}</p>
                )}
                {record.completedGoals < record.goals && (
                  <p>• {record.goals - record.completedGoals} goals remaining to be completed</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ViewPerformanceDetails