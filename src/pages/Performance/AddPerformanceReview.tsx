import { useState } from 'react'
import { X, User, Target, Calendar, Star, FileText, TrendingUp } from 'lucide-react'

interface AddPerformanceReviewProps {
  isOpen: boolean
  onClose: () => void
  onAdd: (review: any) => void
}

const AddPerformanceReview = ({ isOpen, onClose, onAdd }: AddPerformanceReviewProps) => {
  const [formData, setFormData] = useState({
    employeeName: '',
    reviewType: '',
    period: '',
    dueDate: '',
    reviewer: '',
    goals: '',
    description: '',
    status: 'Draft'
  })

  const reviewTypes = ['Annual Review', 'Quarterly Review', 'Mid-Year Review', 'Goal Setting', 'PIP Review']
  const statuses = ['Draft', 'In Progress', 'Completed']
  const employees = ['John Smith', 'Sarah Johnson', 'Mike Chen', 'Emily Davis', 'David Brown']
  const reviewers = ['Sarah Johnson', 'Mike Chen', 'Emily Davis', 'David Brown', 'John Smith']

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Generate employee avatar initials
    const nameParts = formData.employeeName.split(' ')
    const employeeAvatar = nameParts.map(part => part.charAt(0)).join('').toUpperCase()

    // Create new performance review object
    const newReview = {
      id: Date.now(), // Simple ID generation
      employeeName: formData.employeeName,
      employeeAvatar,
      type: formData.reviewType,
      period: formData.period,
      status: formData.status,
      score: null, // Will be added when review is completed
      dueDate: formData.dueDate,
      completedDate: null,
      reviewer: formData.reviewer,
      goals: parseInt(formData.goals) || 0,
      completedGoals: 0,
      description: formData.description
    }

    onAdd(newReview)

    // Reset form
    setFormData({
      employeeName: '',
      reviewType: '',
      period: '',
      dueDate: '',
      reviewer: '',
      goals: '',
      description: '',
      status: 'Draft'
    })

    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-800 border border-gray-700 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <div>
            <h2 className="text-xl font-semibold text-white">Create Performance Review</h2>
            <p className="text-sm text-gray-400 mt-1">Set up a new performance review or goal setting session</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-700 rounded-lg text-gray-400 hover:text-white transition-all duration-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Review Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-white flex items-center space-x-2">
              <Star className="w-5 h-5 text-yellow-400" />
              <span>Review Information</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="employeeName" className="block text-sm font-medium text-gray-300 mb-2">
                  Employee *
                </label>
                <select
                  id="employeeName"
                  name="employeeName"
                  value={formData.employeeName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2.5 bg-gray-750 border border-gray-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all duration-200"
                >
                  <option value="">Select Employee</option>
                  {employees.map(emp => (
                    <option key={emp} value={emp}>{emp}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="reviewType" className="block text-sm font-medium text-gray-300 mb-2">
                  Review Type *
                </label>
                <select
                  id="reviewType"
                  name="reviewType"
                  value={formData.reviewType}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2.5 bg-gray-750 border border-gray-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all duration-200"
                >
                  <option value="">Select Review Type</option>
                  {reviewTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="period" className="block text-sm font-medium text-gray-300 mb-2">
                  Review Period *
                </label>
                <input
                  type="text"
                  id="period"
                  name="period"
                  value={formData.period}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2.5 bg-gray-750 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all duration-200"
                  placeholder="e.g., Q4 2024, 2024, etc."
                />
              </div>

              <div>
                <label htmlFor="reviewer" className="block text-sm font-medium text-gray-300 mb-2">
                  Reviewer *
                </label>
                <select
                  id="reviewer"
                  name="reviewer"
                  value={formData.reviewer}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2.5 bg-gray-750 border border-gray-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all duration-200"
                >
                  <option value="">Select Reviewer</option>
                  {reviewers.map(reviewer => (
                    <option key={reviewer} value={reviewer}>{reviewer}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Schedule & Goals */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-white flex items-center space-x-2">
              <Target className="w-5 h-5 text-yellow-400" />
              <span>Schedule & Goals</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="dueDate" className="block text-sm font-medium text-gray-300 mb-2">
                  Due Date *
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="date"
                    id="dueDate"
                    name="dueDate"
                    value={formData.dueDate}
                    onChange={handleInputChange}
                    required
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-750 border border-gray-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all duration-200"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="goals" className="block text-sm font-medium text-gray-300 mb-2">
                  Number of Goals
                </label>
                <input
                  type="number"
                  id="goals"
                  name="goals"
                  value={formData.goals}
                  onChange={handleInputChange}
                  min="0"
                  max="20"
                  className="w-full px-4 py-2.5 bg-gray-750 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all duration-200"
                  placeholder="Enter number of goals"
                />
              </div>

              <div className="md:col-span-2">
                <label htmlFor="status" className="block text-sm font-medium text-gray-300 mb-2">
                  Review Status *
                </label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2.5 bg-gray-750 border border-gray-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all duration-200"
                >
                  {statuses.map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Additional Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-white flex items-center space-x-2">
              <FileText className="w-5 h-5 text-yellow-400" />
              <span>Additional Details</span>
            </h3>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-2">
                Description / Notes
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-4 py-2.5 bg-gray-750 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all duration-200 resize-none"
                placeholder="Enter any additional notes or objectives for this review..."
              />
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end space-x-4 pt-6 border-t border-gray-700">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 bg-gray-750 hover:bg-gray-700 border border-gray-600 text-gray-300 rounded-xl transition-all duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-yellow-500 hover:bg-yellow-600 text-black rounded-xl font-medium transition-all duration-200 hover:scale-105"
            >
              Create Review
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddPerformanceReview