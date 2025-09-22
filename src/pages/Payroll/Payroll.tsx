import { useState } from 'react'
import {
  Search,
  Plus,
  Download,
  Eye,
  Edit,
  DollarSign,
  TrendingUp,
  Users,
  CreditCard,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'
import Sidebar from '../../components/Sidebar'
import Header from '../../components/Header'
import ViewPayroll from './ViewPayroll'
import AddPayroll from './AddPayroll'
import EditPayroll from './EditPayroll'
import MetricCard from '../Reports/MetricCard'

const Payroll = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedPeriod, setSelectedPeriod] = useState('current')
  const [selectedDepartment, setSelectedDepartment] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [selectedPayrollRecord, setSelectedPayrollRecord] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  const [payrollRecords, setPayrollRecords] = useState([
    {
      id: 1,
      employeeId: 'EMP001',
      employeeName: 'John Smith',
      position: 'Senior Developer',
      department: 'Engineering',
      payPeriod: '2024-01-01 to 2024-01-15',
      baseSalary: 95000,
      overtime: 2400,
      bonus: 5000,
      deductions: 1850,
      netPay: 47275,
      status: 'Paid',
      payDate: '2024-01-16',
      avatar: 'JS'
    },
    {
      id: 2,
      employeeId: 'EMP002',
      employeeName: 'Sarah Johnson',
      position: 'Marketing Manager',
      department: 'Marketing',
      payPeriod: '2024-01-01 to 2024-01-15',
      baseSalary: 85000,
      overtime: 0,
      bonus: 2000,
      deductions: 1650,
      netPay: 41675,
      status: 'Paid',
      payDate: '2024-01-16',
      avatar: 'SJ'
    },
    {
      id: 3,
      employeeId: 'EMP003',
      employeeName: 'Mike Chen',
      position: 'Sales Representative',
      department: 'Sales',
      payPeriod: '2024-01-01 to 2024-01-15',
      baseSalary: 65000,
      overtime: 1200,
      bonus: 3500,
      deductions: 1350,
      netPay: 33675,
      status: 'Processing',
      payDate: '2024-01-16',
      avatar: 'MC'
    },
    {
      id: 4,
      employeeId: 'EMP004',
      employeeName: 'Emily Davis',
      position: 'UX Designer',
      department: 'Design',
      payPeriod: '2024-01-01 to 2024-01-15',
      baseSalary: 78000,
      overtime: 800,
      bonus: 1500,
      deductions: 1550,
      netPay: 38375,
      status: 'Pending',
      payDate: '2024-01-16',
      avatar: 'ED'
    },
    {
      id: 5,
      employeeId: 'EMP005',
      employeeName: 'David Brown',
      position: 'HR Specialist',
      department: 'Human Resources',
      payPeriod: '2024-01-01 to 2024-01-15',
      baseSalary: 72000,
      overtime: 0,
      bonus: 1000,
      deductions: 1450,
      netPay: 35775,
      status: 'Paid',
      payDate: '2024-01-16',
      avatar: 'DB'
    }
  ])

  const departments = ['Engineering', 'Marketing', 'Sales', 'Design', 'Human Resources']
  const statuses = ['Paid', 'Processing', 'Pending', 'Failed']
  const payPeriods = [
    { value: 'current', label: 'Current Period (Jan 1-15, 2024)' },
    { value: 'previous', label: 'Previous Period (Dec 16-31, 2023)' },
    { value: 'custom', label: 'Custom Period' }
  ]

  const handleAddPayroll = (newPayrollRecord: any) => {
    setPayrollRecords(prev => [...prev, newPayrollRecord])
  }

  const handleUpdatePayroll = (updatedPayrollRecord: any) => {
    setPayrollRecords(prev => prev.map(record =>
      record.id === updatedPayrollRecord.id ? updatedPayrollRecord : record
    ))
  }

  const filteredRecords = payrollRecords.filter(record => {
    const matchesSearch = record.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.position.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDepartment = selectedDepartment === 'all' || record.department === selectedDepartment
    const matchesStatus = selectedStatus === 'all' || record.status === selectedStatus

    return matchesSearch && matchesDepartment && matchesStatus
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

  const totalGrossPay = payrollRecords.reduce((sum, record) => sum + record.baseSalary/26 + record.overtime + record.bonus, 0)
  const totalNetPay = payrollRecords.reduce((sum, record) => sum + record.netPay, 0)
  const avgNetPay = totalNetPay / payrollRecords.length

  return (
    <div className="flex h-screen bg-gray-900">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />

        <main className="flex-1 overflow-auto p-6 space-y-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {/* Page Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white mb-2">Payroll Management</h1>
              <p className="text-gray-400">Manage employee payroll records and payments</p>
            </div>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white px-6 py-3 rounded-xl font-medium flex items-center space-x-2 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <Plus className="w-5 h-5" />
              <span>Process Payroll</span>
            </button>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <MetricCard
              title="Current Gross Pay"
              value={formatCurrency(totalGrossPay)}
              subtitle="current period"
              icon={DollarSign}
              trend={{ value: 5.2, isPositive: true, period: 'vs last period' }}
              color="yellow"
              animate={true}
            />
            <MetricCard
              title="Current Net Pay"
              value={formatCurrency(totalNetPay)}
              subtitle="ready for payment"
              icon={TrendingUp}
              trend={{ value: 3.1, isPositive: true, period: 'vs last period' }}
              color="green"
              animate={true}
            />
            <MetricCard
              title="Employees Processed"
              value={payrollRecords.length}
              subtitle="current batch"
              icon={Users}
              color="blue"
              animate={true}
            />
            <MetricCard
              title="Average Net Pay"
              value={formatCurrency(avgNetPay)}
              subtitle="current period"
              icon={CreditCard}
              trend={{ value: 2.8, isPositive: true, period: 'vs last period' }}
              color="purple"
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
                  placeholder="Search payroll records..."
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

              {/* Pay Period Filter */}
              <div className="relative z-10">
                <select
                  value={selectedPeriod}
                  onChange={(e) => setSelectedPeriod(e.target.value)}
                  className="bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-yellow-500 transition-colors relative z-10"
                >
                  {payPeriods.map(period => (
                    <option key={period.value} value={period.value}>{period.label}</option>
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

          {/* Payroll Table */}
          <div className="bg-gray-800 border border-gray-700 rounded-2xl overflow-hidden relative z-10">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-750">
                  <tr>
                    <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider px-6 py-4">Employee</th>
                    <th className="text-center text-xs font-medium text-gray-400 uppercase tracking-wider px-6 py-4">Pay Period</th>
                    <th className="text-center text-xs font-medium text-gray-400 uppercase tracking-wider px-6 py-4">Base Salary</th>
                    <th className="text-center text-xs font-medium text-gray-400 uppercase tracking-wider px-6 py-4">Net Pay</th>
                    <th className="text-center text-xs font-medium text-gray-400 uppercase tracking-wider px-6 py-4">Status</th>
                    <th className="text-center text-xs font-medium text-gray-400 uppercase tracking-wider px-6 py-4">Actions</th>
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
                            <p className="text-white font-medium text-sm">{record.employeeName}</p>
                            <p className="text-gray-400 text-xs">{record.employeeId} • {record.position}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <p className="text-white text-sm">{record.payPeriod}</p>
                        <p className="text-gray-400 text-xs">{record.payDate}</p>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-white text-sm font-medium text-center">{formatCurrency(record.baseSalary/26)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-green-400 font-semibold text-sm text-center">{formatCurrency(record.netPay)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <span className={`inline-flex items-center px-3 py-1 rounded-lg border text-xs font-medium ${getStatusColor(record.status)}`}>
                          {record.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <div className="flex items-center justify-center space-x-2">
                          <button
                            onClick={() => {
                              setSelectedPayrollRecord(record)
                              setIsViewModalOpen(true)
                            }}
                            className="p-2 text-gray-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-all duration-200"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => {
                              setSelectedPayrollRecord(record)
                              setIsEditModalOpen(true)
                            }}
                            className="p-2 text-gray-400 hover:text-yellow-400 hover:bg-yellow-500/10 rounded-lg transition-all duration-200"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-gray-400 hover:text-green-400 hover:bg-green-500/10 rounded-lg transition-all duration-200">
                            <Download className="w-4 h-4" />
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

      {/* ViewPayroll Modal */}
      <ViewPayroll
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        payrollRecord={selectedPayrollRecord}
      />

      {/* AddPayroll Modal */}
      <AddPayroll
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddPayroll}
      />

      {/* EditPayroll Modal */}
      <EditPayroll
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onUpdate={handleUpdatePayroll}
        payrollRecord={selectedPayrollRecord}
      />
    </div>
  )
}

export default Payroll