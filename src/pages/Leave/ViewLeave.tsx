import { useState } from 'react'
import {
  X,
  Calendar,
  User,
  FileText,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  MessageSquare,
  Building2,
  Mail,
  Phone,
  CalendarDays,
  Users,
  Activity,
  Ban
} from 'lucide-react'

interface LeaveRequest {
  id: number
  employee: string
  department: string
  type: string
  startDate: string
  endDate: string
  days: number
  status: string
  avatar: string
  submittedDate: string
  reason: string
  approver?: string
  approvedDate?: string
  comments?: string
  email?: string
  phone?: string
  manager?: string
  emergencyContact?: string
}

interface ViewLeaveProps {
  leaveRequest: LeaveRequest
  onClose: () => void
  onEdit?: (id: number) => void
  onDelete?: (id: number) => void
  onApprove?: (id: number, comments?: string) => void
  onReject?: (id: number, comments?: string) => void
  onCancel?: (id: number, comments?: string) => void
}

const ViewLeave = ({
  leaveRequest,
  onClose,
  onApprove,
  onReject,
  onCancel
}: ViewLeaveProps) => {
  const [showComments, setShowComments] = useState(false)
  const [actionComments, setActionComments] = useState('')
  const [actionType, setActionType] = useState<'approve' | 'reject' | 'cancel' | null>(null)

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
      case 'approved': return <CheckCircle className="w-5 h-5" />
      case 'pending': return <Clock className="w-5 h-5" />
      case 'rejected': return <XCircle className="w-5 h-5" />
      default: return <AlertCircle className="w-5 h-5" />
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

  const calculateBusinessDays = () => {
    const start = new Date(leaveRequest.startDate)
    const end = new Date(leaveRequest.endDate)
    let businessDays = 0

    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      const dayOfWeek = d.getDay()
      if (dayOfWeek !== 0 && dayOfWeek !== 6) { // Not Sunday (0) or Saturday (6)
        businessDays++
      }
    }
    return businessDays
  }

  const handleAction = (type: 'approve' | 'reject' | 'cancel') => {
    if (type === 'approve' && onApprove) {
      onApprove(leaveRequest.id, actionComments)
    } else if (type === 'reject' && onReject) {
      onReject(leaveRequest.id, actionComments)
    } else if (type === 'cancel' && onCancel) {
      onCancel(leaveRequest.id, actionComments)
    }
    setActionComments('')
    setShowComments(false)
    setActionType(null)
  }

  const showActionModal = (type: 'approve' | 'reject' | 'cancel') => {
    setActionType(type)
    setShowComments(true)
  }

  return (
    <div className="fixed inset-0 bg-opacity-50 backdrop-blur flex items-center justify-center p-4 z-50">
      <div className="bg-gray-800 rounded-2xl border border-gray-700 w-full max-w-4xl max-h-[95vh] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
              {leaveRequest.avatar}
            </div>
            <div>
              <h2 className="text-xl font-semibold text-white">Leave Request Details</h2>
              <p className="text-gray-400 text-sm">Request ID: #{leaveRequest.id.toString().padStart(4, '0')}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {leaveRequest.status === 'pending' && (
              <>
                <button
                  onClick={() => showActionModal('approve')}
                  className="bg-green-500/10 hover:bg-green-500/20 text-green-400 border border-green-500/30 px-4 py-2 rounded-lg transition-all duration-200 flex items-center space-x-2"
                >
                  <CheckCircle className="w-4 h-4" />
                  <span>Approve</span>
                </button>
                <button
                  onClick={() => showActionModal('reject')}
                  className="bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 px-4 py-2 rounded-lg transition-all duration-200 flex items-center space-x-2"
                >
                  <XCircle className="w-4 h-4" />
                  <span>Reject</span>
                </button>
                <button
                  onClick={() => showActionModal('cancel')}
                  className="bg-gray-500/10 hover:bg-gray-500/20 text-gray-400 border border-gray-500/30 px-4 py-2 rounded-lg transition-all duration-200 flex items-center space-x-2"
                >
                  <Ban className="w-4 h-4" />
                  <span>Cancel</span>
                </button>
              </>
            )}
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Employee Info */}
            <div className="space-y-6">
              {/* Employee Card */}
              <div className="bg-gray-750 rounded-xl p-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                      {leaveRequest.avatar}
                    </div>
                    <div>
                      <p className="text-white font-semibold text-lg">{leaveRequest.employee}</p>
                      <div className="flex items-center text-gray-400 text-sm">
                        <Building2 className="w-4 h-4 mr-1" />
                        {leaveRequest.department}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 pt-4 border-t border-gray-600">
                    <div className="flex items-center text-sm">
                      <Mail className="w-4 h-4 mr-3 text-gray-400" />
                      <span className="text-gray-300">{leaveRequest.email || `${leaveRequest.employee.toLowerCase().replace(' ', '.')}@company.com`}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Phone className="w-4 h-4 mr-3 text-gray-400" />
                      <span className="text-gray-300">{leaveRequest.phone || '+1 (555) 123-4567'}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Users className="w-4 h-4 mr-3 text-gray-400" />
                      <span className="text-gray-300">Manager: {leaveRequest.manager || 'John Doe'}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="bg-gray-750 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                  <Activity className="w-5 h-5 mr-2 text-yellow-400" />
                  Leave Statistics
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Calendar Days</span>
                    <span className="text-white font-medium">{leaveRequest.days}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Business Days</span>
                    <span className="text-white font-medium">{calculateBusinessDays()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Remaining Balance</span>
                    <span className="text-green-400 font-medium">15 days</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Leave Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Status Banner */}
              <div className={`rounded-xl p-4 border ${getStatusColor(leaveRequest.status)}`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {getStatusIcon(leaveRequest.status)}
                    <div>
                      <p className="font-semibold capitalize">{leaveRequest.status}</p>
                      <p className="text-sm opacity-80">
                        {leaveRequest.status === 'pending' ? 'Awaiting approval' :
                         leaveRequest.status === 'approved' ? `Approved on ${leaveRequest.approvedDate || 'N/A'}` :
                         'Request was rejected'}
                      </p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-lg border text-xs font-medium ${getLeaveTypeColor(leaveRequest.type)}`}>
                    {leaveRequest.type}
                  </span>
                </div>
              </div>

              {/* Leave Details */}
              <div className="bg-gray-750 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-6 flex items-center">
                  <Calendar className="w-5 h-5 mr-2 text-yellow-400" />
                  Leave Details
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm text-gray-400 block mb-1">Start Date</label>
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-blue-400" />
                        <span className="text-white font-medium">{leaveRequest.startDate}</span>
                      </div>
                    </div>

                    <div>
                      <label className="text-sm text-gray-400 block mb-1">Duration</label>
                      <div className="flex items-center space-x-2">
                        <CalendarDays className="w-4 h-4 text-green-400" />
                        <span className="text-white font-medium">{leaveRequest.days} days</span>
                      </div>
                    </div>

                    <div>
                      <label className="text-sm text-gray-400 block mb-1">Submitted On</label>
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-purple-400" />
                        <span className="text-white font-medium">{leaveRequest.submittedDate}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="text-sm text-gray-400 block mb-1">End Date</label>
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-blue-400" />
                        <span className="text-white font-medium">{leaveRequest.endDate}</span>
                      </div>
                    </div>

                    <div>
                      <label className="text-sm text-gray-400 block mb-1">Leave Type</label>
                      <span className={`inline-flex items-center px-3 py-1 rounded-lg border text-sm font-medium ${getLeaveTypeColor(leaveRequest.type)}`}>
                        {leaveRequest.type}
                      </span>
                    </div>

                    {leaveRequest.approver && (
                      <div>
                        <label className="text-sm text-gray-400 block mb-1">Approved By</label>
                        <div className="flex items-center space-x-2">
                          <User className="w-4 h-4 text-yellow-400" />
                          <span className="text-white font-medium">{leaveRequest.approver}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Reason */}
              <div className="bg-gray-750 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                  <FileText className="w-5 h-5 mr-2 text-yellow-400" />
                  Reason for Leave
                </h3>
                <div className="bg-gray-700 rounded-lg p-4">
                  <p className="text-gray-300 leading-relaxed">{leaveRequest.reason}</p>
                </div>
              </div>

              {/* Comments Section */}
              {leaveRequest.comments && (
                <div className="bg-gray-750 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                    <MessageSquare className="w-5 h-5 mr-2 text-yellow-400" />
                    Approval Comments
                  </h3>
                  <div className="bg-gray-700 rounded-lg p-4">
                    <p className="text-gray-300 leading-relaxed">{leaveRequest.comments}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Action Comments Modal */}
      {showComments && actionType && (
        <div className="fixed inset-0 backdrop-blur bg-opacity-50 flex items-center justify-center p-4 z-60">
          <div className="bg-gray-800 rounded-xl border border-gray-700 w-full max-w-md">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-white mb-4">
                {actionType === 'approve' ? 'Approve' :
                 actionType === 'reject' ? 'Reject' : 'Cancel'} Leave Request
              </h3>

              <div className="mb-4">
                <label className="text-sm text-gray-400 block mb-2">
                  Comments {(actionType === 'reject' || actionType === 'cancel') ? '(Required)' : '(Optional)'}
                </label>
                <textarea
                  value={actionComments}
                  onChange={(e) => setActionComments(e.target.value)}
                  placeholder={`Add ${actionType === 'approve' ? 'approval' :
                               actionType === 'reject' ? 'rejection' : 'cancellation'} comments...`}
                  rows={3}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500 transition-colors resize-none"
                />
              </div>

              <div className="flex items-center justify-end space-x-3">
                <button
                  onClick={() => {
                    setShowComments(false)
                    setActionType(null)
                    setActionComments('')
                  }}
                  className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleAction(actionType)}
                  disabled={(actionType === 'reject' || actionType === 'cancel') && !actionComments.trim()}
                  className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 ${
                    actionType === 'approve'
                      ? 'bg-green-500 hover:bg-green-600 text-white'
                      : actionType === 'reject'
                      ? 'bg-red-500 hover:bg-red-600 text-white'
                      : 'bg-gray-500 hover:bg-gray-600 text-white'
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {actionType === 'approve' ? 'Approve' :
                   actionType === 'reject' ? 'Reject' : 'Cancel'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ViewLeave