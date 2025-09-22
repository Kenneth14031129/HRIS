import { useState } from 'react'
import { X, Calendar, User, FileText, Clock } from 'lucide-react'

interface AddLeaveProps {
  onClose: () => void
  onSave: (leaveData: any) => void
}

const AddLeave = ({ onClose, onSave }: AddLeaveProps) => {
  const [formData, setFormData] = useState({
    employee: '',
    leaveType: '',
    startDate: '',
    endDate: '',
    reason: '',
    days: 0
  })

  const leaveTypes = [
    'Annual Leave',
    'Sick Leave',
    'Personal Leave',
    'Maternity Leave',
    'Emergency Leave'
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))

    // Calculate days when dates change
    if (name === 'startDate' || name === 'endDate') {
      const start = name === 'startDate' ? new Date(value) : new Date(formData.startDate)
      const end = name === 'endDate' ? new Date(value) : new Date(formData.endDate)

      if (start && end && end >= start) {
        const diffTime = Math.abs(end.getTime() - start.getTime())
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1
        setFormData(prev => ({ ...prev, days: diffDays }))
      }
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-opacity-50 backdrop-blur flex items-center justify-center p-4 z-50">
      <div className="bg-gray-800 rounded-2xl border border-gray-700 w-full max-w-2xl max-h-[90vh] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-yellow-500/10 rounded-lg">
              <Calendar className="w-6 h-6 text-yellow-400" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-white">New Leave Request</h2>
              <p className="text-gray-400 text-sm">Submit a new leave request</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Employee Selection */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-300 mb-2">
              <User className="w-4 h-4 mr-2 text-yellow-400" />
              Employee
            </label>
            <select
              name="employee"
              value={formData.employee}
              onChange={handleInputChange}
              required
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-yellow-500 transition-colors"
            >
              <option value="">Select Employee</option>
              <option value="Sarah Johnson">Sarah Johnson</option>
              <option value="Mike Chen">Mike Chen</option>
              <option value="Emily Davis">Emily Davis</option>
              <option value="Alex Thompson">Alex Thompson</option>
              <option value="Lisa Wang">Lisa Wang</option>
              <option value="John Smith">John Smith</option>
              <option value="Anna Wilson">Anna Wilson</option>
              <option value="David Brown">David Brown</option>
            </select>
          </div>

          {/* Leave Type */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-300 mb-2">
              <FileText className="w-4 h-4 mr-2 text-yellow-400" />
              Leave Type
            </label>
            <select
              name="leaveType"
              value={formData.leaveType}
              onChange={handleInputChange}
              required
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-yellow-500 transition-colors"
            >
              <option value="">Select Leave Type</option>
              {leaveTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          {/* Date Range */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="flex items-center text-sm font-medium text-gray-300 mb-2">
                <Calendar className="w-4 h-4 mr-2 text-yellow-400" />
                Start Date
              </label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleInputChange}
                required
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-yellow-500 transition-colors"
              />
            </div>
            <div>
              <label className="flex items-center text-sm font-medium text-gray-300 mb-2">
                <Calendar className="w-4 h-4 mr-2 text-yellow-400" />
                End Date
              </label>
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleInputChange}
                required
                min={formData.startDate}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-yellow-500 transition-colors"
              />
            </div>
          </div>

          {/* Days Display */}
          {formData.days > 0 && (
            <div className="bg-gray-750 rounded-lg p-4">
              <div className="flex items-center text-sm text-gray-300">
                <Clock className="w-4 h-4 mr-2 text-yellow-400" />
                <span>Total Days: </span>
                <span className="text-white font-medium ml-1">{formData.days} days</span>
              </div>
            </div>
          )}

          {/* Reason */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-300 mb-2">
              <FileText className="w-4 h-4 mr-2 text-yellow-400" />
              Reason
            </label>
            <textarea
              name="reason"
              value={formData.reason}
              onChange={handleInputChange}
              required
              rows={3}
              placeholder="Enter reason for leave request..."
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500 transition-colors resize-none"
            />
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-700">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 text-gray-400 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white px-6 py-2 rounded-lg font-medium transition-all duration-200"
            >
              Submit Request
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddLeave