import {
  X,
  Calendar,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Briefcase,
  User,
  CreditCard,
} from 'lucide-react'

interface PayrollRecord {
  id: number
  employeeId: string
  employeeName: string
  position: string
  department: string
  payPeriod: string
  baseSalary: number
  overtime: number
  bonus: number
  deductions: number
  netPay: number
  status: string
  payDate: string
  avatar: string
}

interface ViewPayrollProps {
  isOpen: boolean
  onClose: () => void
  payrollRecord: PayrollRecord | null
}

const ViewPayroll = ({ isOpen, onClose, payrollRecord }: ViewPayrollProps) => {
  if (!isOpen || !payrollRecord) return null

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Paid': return 'bg-green-500/10 text-green-400 border-green-500/30'
      case 'Processing': return 'bg-blue-500/10 text-blue-400 border-blue-500/30'
      case 'Pending': return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30'
      case 'Failed': return 'bg-red-500/10 text-red-400 border-red-500/30'
      default: return 'bg-gray-500/10 text-gray-400 border-gray-500/30'
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount)
  }

  const biweeklySalary = payrollRecord.baseSalary / 26
  const grossPay = biweeklySalary + payrollRecord.overtime + payrollRecord.bonus

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop with blur */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative bg-gray-800 border border-gray-700 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <h2 className="text-xl font-semibold text-white">Payroll Details</h2>
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
          {/* Employee Info Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                {payrollRecord.avatar}
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">{payrollRecord.employeeName}</h3>
                <p className="text-yellow-400 font-medium">{payrollRecord.position}</p>
                <p className="text-gray-400 text-sm">{payrollRecord.employeeId}</p>
              </div>
            </div>
            <span className={`inline-block px-4 py-2 rounded-lg border text-sm font-medium ${getStatusColor(payrollRecord.status)}`}>
              {payrollRecord.status}
            </span>
          </div>

          {/* Pay Period Info */}
          <div className="bg-gray-750 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Calendar className="w-5 h-5 text-yellow-400" />
                <div>
                  <p className="text-sm text-gray-400">Pay Period</p>
                  <p className="text-white font-medium">{payrollRecord.payPeriod}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-400">Pay Date</p>
                <p className="text-white font-medium">{payrollRecord.payDate}</p>
              </div>
            </div>
          </div>

          {/* Earnings Breakdown */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white border-b border-gray-700 pb-2">Earnings Breakdown</h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Base Salary */}
              <div className="bg-gray-750 rounded-xl p-4">
                <div className="flex items-center space-x-3">
                  <DollarSign className="w-5 h-5 text-yellow-400" />
                  <div className="flex-1">
                    <p className="text-sm text-gray-400">Base Salary (Biweekly)</p>
                    <p className="text-white font-semibold text-lg">{formatCurrency(biweeklySalary)}</p>
                  </div>
                </div>
              </div>

              {/* Overtime */}
              <div className="bg-gray-750 rounded-xl p-4">
                <div className="flex items-center space-x-3">
                  <TrendingUp className="w-5 h-5 text-blue-400" />
                  <div className="flex-1">
                    <p className="text-sm text-gray-400">Overtime Pay</p>
                    <p className="text-blue-400 font-semibold text-lg">{formatCurrency(payrollRecord.overtime)}</p>
                  </div>
                </div>
              </div>

              {/* Bonus */}
              <div className="bg-gray-750 rounded-xl p-4">
                <div className="flex items-center space-x-3">
                  <CreditCard className="w-5 h-5 text-green-400" />
                  <div className="flex-1">
                    <p className="text-sm text-gray-400">Bonus/Commission</p>
                    <p className="text-green-400 font-semibold text-lg">{formatCurrency(payrollRecord.bonus)}</p>
                  </div>
                </div>
              </div>

              {/* Deductions */}
              <div className="bg-gray-750 rounded-xl p-4">
                <div className="flex items-center space-x-3">
                  <TrendingDown className="w-5 h-5 text-red-400" />
                  <div className="flex-1">
                    <p className="text-sm text-gray-400">Total Deductions</p>
                    <p className="text-red-400 font-semibold text-lg">-{formatCurrency(payrollRecord.deductions)}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Pay Summary */}
          <div className="bg-gradient-to-r from-yellow-500/10 to-yellow-600/5 border border-yellow-500/20 rounded-xl p-6">
            <h4 className="text-lg font-semibold text-white mb-4">Pay Summary</h4>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Gross Pay</span>
                <span className="text-white font-medium">{formatCurrency(grossPay)}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-400">Total Deductions</span>
                <span className="text-red-400 font-medium">-{formatCurrency(payrollRecord.deductions)}</span>
              </div>

              <div className="border-t border-gray-600 pt-3">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-white">Net Pay</span>
                  <span className="text-2xl font-bold text-green-400">{formatCurrency(payrollRecord.netPay)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Employee Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-white border-b border-gray-700 pb-2">Employee Information</h4>

              <div className="flex items-center space-x-3">
                <Briefcase className="w-5 h-5 text-yellow-400" />
                <div>
                  <p className="text-sm text-gray-400">Department</p>
                  <p className="text-white">{payrollRecord.department}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <User className="w-5 h-5 text-yellow-400" />
                <div>
                  <p className="text-sm text-gray-400">Employee ID</p>
                  <p className="text-white">{payrollRecord.employeeId}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-white border-b border-gray-700 pb-2">Annual Information</h4>

              <div className="flex items-center space-x-3">
                <DollarSign className="w-5 h-5 text-yellow-400" />
                <div>
                  <p className="text-sm text-gray-400">Annual Salary</p>
                  <p className="text-white">{formatCurrency(payrollRecord.baseSalary)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ViewPayroll