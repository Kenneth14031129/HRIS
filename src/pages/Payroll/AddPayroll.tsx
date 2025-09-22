import { useState } from 'react'
import { X, User, Calendar, DollarSign, TrendingUp, CreditCard, TrendingDown, Briefcase } from 'lucide-react'

interface AddPayrollProps {
  isOpen: boolean
  onClose: () => void
  onAdd: (payrollRecord: any) => void
}

const AddPayroll = ({ isOpen, onClose, onAdd }: AddPayrollProps) => {
  const [formData, setFormData] = useState({
    employeeId: '',
    employeeName: '',
    position: '',
    department: '',
    payPeriodStart: '',
    payPeriodEnd: '',
    payDate: '',
    baseSalary: '',
    overtime: '0',
    bonus: '0',
    deductions: '0',
    status: 'Pending'
  })

  const departments = ['Engineering', 'Marketing', 'Sales', 'Design', 'Human Resources']
  const statuses = ['Paid', 'Processing', 'Pending', 'Failed']

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const calculateNetPay = () => {
    const baseSalary = parseFloat(formData.baseSalary) || 0
    const overtime = parseFloat(formData.overtime) || 0
    const bonus = parseFloat(formData.bonus) || 0
    const deductions = parseFloat(formData.deductions) || 0

    // Calculate biweekly base salary (assuming annual salary / 26 pay periods)
    const biweeklyBase = baseSalary / 26
    const grossPay = biweeklyBase + overtime + bonus
    const netPay = grossPay - deductions

    return {
      biweeklyBase,
      grossPay,
      netPay
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const { netPay } = calculateNetPay()

    // Generate avatar initials
    const nameParts = formData.employeeName.split(' ')
    const avatar = nameParts.map(part => part.charAt(0)).join('').toUpperCase()

    // Create new payroll record
    const newPayrollRecord = {
      id: Date.now(),
      employeeId: formData.employeeId,
      employeeName: formData.employeeName,
      position: formData.position,
      department: formData.department,
      payPeriod: `${formData.payPeriodStart} to ${formData.payPeriodEnd}`,
      baseSalary: parseFloat(formData.baseSalary),
      overtime: parseFloat(formData.overtime),
      bonus: parseFloat(formData.bonus),
      deductions: parseFloat(formData.deductions),
      netPay: Math.round(netPay),
      status: formData.status,
      payDate: formData.payDate,
      avatar
    }

    onAdd(newPayrollRecord)

    // Reset form
    setFormData({
      employeeId: '',
      employeeName: '',
      position: '',
      department: '',
      payPeriodStart: '',
      payPeriodEnd: '',
      payDate: '',
      baseSalary: '',
      overtime: '0',
      bonus: '0',
      deductions: '0',
      status: 'Pending'
    })

    onClose()
  }

  if (!isOpen) return null

  const { biweeklyBase, grossPay, netPay } = calculateNetPay()

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-800 border border-gray-700 rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <div>
            <h2 className="text-xl font-semibold text-white">Process New Payroll</h2>
            <p className="text-sm text-gray-400 mt-1">Fill in the details to process employee payroll</p>
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
          {/* Employee Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-white flex items-center space-x-2">
              <User className="w-5 h-5 text-yellow-400" />
              <span>Employee Information</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="employeeId" className="block text-sm font-medium text-gray-300 mb-2">
                  Employee ID *
                </label>
                <input
                  type="text"
                  id="employeeId"
                  name="employeeId"
                  value={formData.employeeId}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2.5 bg-gray-750 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all duration-200"
                  placeholder="Enter employee ID"
                />
              </div>

              <div>
                <label htmlFor="employeeName" className="block text-sm font-medium text-gray-300 mb-2">
                  Employee Name *
                </label>
                <input
                  type="text"
                  id="employeeName"
                  name="employeeName"
                  value={formData.employeeName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2.5 bg-gray-750 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all duration-200"
                  placeholder="Enter employee name"
                />
              </div>

              <div>
                <label htmlFor="position" className="block text-sm font-medium text-gray-300 mb-2">
                  Position *
                </label>
                <input
                  type="text"
                  id="position"
                  name="position"
                  value={formData.position}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2.5 bg-gray-750 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all duration-200"
                  placeholder="Enter position"
                />
              </div>

              <div>
                <label htmlFor="department" className="block text-sm font-medium text-gray-300 mb-2">
                  Department *
                </label>
                <div className="relative">
                  <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <select
                    id="department"
                    name="department"
                    value={formData.department}
                    onChange={handleInputChange}
                    required
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-750 border border-gray-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all duration-200"
                  >
                    <option value="">Select Department</option>
                    {departments.map(dept => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Pay Period Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-white flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-yellow-400" />
              <span>Pay Period Information</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label htmlFor="payPeriodStart" className="block text-sm font-medium text-gray-300 mb-2">
                  Pay Period Start *
                </label>
                <input
                  type="date"
                  id="payPeriodStart"
                  name="payPeriodStart"
                  value={formData.payPeriodStart}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2.5 bg-gray-750 border border-gray-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all duration-200"
                />
              </div>

              <div>
                <label htmlFor="payPeriodEnd" className="block text-sm font-medium text-gray-300 mb-2">
                  Pay Period End *
                </label>
                <input
                  type="date"
                  id="payPeriodEnd"
                  name="payPeriodEnd"
                  value={formData.payPeriodEnd}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2.5 bg-gray-750 border border-gray-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all duration-200"
                />
              </div>

              <div>
                <label htmlFor="payDate" className="block text-sm font-medium text-gray-300 mb-2">
                  Pay Date *
                </label>
                <input
                  type="date"
                  id="payDate"
                  name="payDate"
                  value={formData.payDate}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2.5 bg-gray-750 border border-gray-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all duration-200"
                />
              </div>
            </div>
          </div>

          {/* Earnings and Deductions */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-white flex items-center space-x-2">
              <DollarSign className="w-5 h-5 text-yellow-400" />
              <span>Earnings and Deductions</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="baseSalary" className="block text-sm font-medium text-gray-300 mb-2">
                  Annual Base Salary *
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="number"
                    id="baseSalary"
                    name="baseSalary"
                    value={formData.baseSalary}
                    onChange={handleInputChange}
                    required
                    min="0"
                    step="1000"
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-750 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all duration-200"
                    placeholder="Enter annual salary"
                  />
                </div>
                {formData.baseSalary && (
                  <p className="text-xs text-gray-400 mt-1">
                    Biweekly: ${Math.round(biweeklyBase).toLocaleString()}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="overtime" className="block text-sm font-medium text-gray-300 mb-2">
                  Overtime Pay
                </label>
                <div className="relative">
                  <TrendingUp className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="number"
                    id="overtime"
                    name="overtime"
                    value={formData.overtime}
                    onChange={handleInputChange}
                    min="0"
                    step="0.01"
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-750 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all duration-200"
                    placeholder="Enter overtime amount"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="bonus" className="block text-sm font-medium text-gray-300 mb-2">
                  Bonus/Commission
                </label>
                <div className="relative">
                  <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="number"
                    id="bonus"
                    name="bonus"
                    value={formData.bonus}
                    onChange={handleInputChange}
                    min="0"
                    step="0.01"
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-750 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all duration-200"
                    placeholder="Enter bonus amount"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="deductions" className="block text-sm font-medium text-gray-300 mb-2">
                  Total Deductions
                </label>
                <div className="relative">
                  <TrendingDown className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="number"
                    id="deductions"
                    name="deductions"
                    value={formData.deductions}
                    onChange={handleInputChange}
                    min="0"
                    step="0.01"
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-750 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all duration-200"
                    placeholder="Enter deductions amount"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Status */}
          <div className="space-y-4">
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-300 mb-2">
                Payment Status *
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

          {/* Pay Summary */}
          {(formData.baseSalary || formData.overtime || formData.bonus || formData.deductions) && (
            <div className="bg-gradient-to-r from-yellow-500/10 to-yellow-600/5 border border-yellow-500/20 rounded-xl p-4">
              <h4 className="text-lg font-semibold text-white mb-3">Pay Summary</h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Gross Pay</span>
                  <span className="text-white font-medium">${Math.round(grossPay).toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Total Deductions</span>
                  <span className="text-red-400 font-medium">-${Math.round(parseFloat(formData.deductions) || 0).toLocaleString()}</span>
                </div>
                <div className="border-t border-gray-600 pt-2">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-white">Net Pay</span>
                    <span className="text-xl font-bold text-green-400">${Math.round(netPay).toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

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
              Process Payroll
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddPayroll