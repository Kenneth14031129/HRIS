import { useState } from 'react'
import {
  Search,
  Plus,
  Download,
  Upload,
  Eye,
  Edit,
  Trash2,
  Mail,
  Calendar,
  Briefcase,
  User,
  Users,
  TrendingUp,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'
import Sidebar from '../../components/Sidebar'
import Header from '../../components/Header'
import ViewDetails from './ViewDetails'
import AddEmployee from './AddEmployee'
import EditEmployee from './EditEmployee'
import MetricCard from '../Reports/MetricCard'

const Employee = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedDepartment, setSelectedDepartment] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [selectedEmployee, setSelectedEmployee] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5
  const [employees, setEmployees] = useState([
    {
      id: 1,
      name: 'John Smith',
      email: 'john.smith@company.com',
      phone: '+1 (555) 123-4567',
      position: 'Senior Developer',
      department: 'Engineering',
      location: 'New York, NY',
      salary: '$95,000',
      startDate: '2021-03-15',
      status: 'Active',
      avatar: 'JS',
      performance: 98
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      email: 'sarah.johnson@company.com',
      phone: '+1 (555) 987-6543',
      position: 'Marketing Manager',
      department: 'Marketing',
      location: 'Los Angeles, CA',
      salary: '$85,000',
      startDate: '2020-08-22',
      status: 'Active',
      avatar: 'SJ',
      performance: 96
    },
    {
      id: 3,
      name: 'Mike Chen',
      email: 'mike.chen@company.com',
      phone: '+1 (555) 456-7890',
      position: 'Sales Representative',
      department: 'Sales',
      location: 'Chicago, IL',
      salary: '$65,000',
      startDate: '2022-01-10',
      status: 'Active',
      avatar: 'MC',
      performance: 94
    },
    {
      id: 4,
      name: 'Emily Davis',
      email: 'emily.davis@company.com',
      phone: '+1 (555) 321-0987',
      position: 'UX Designer',
      department: 'Design',
      location: 'San Francisco, CA',
      salary: '$78,000',
      startDate: '2021-11-05',
      status: 'Active',
      avatar: 'ED',
      performance: 92
    },
    {
      id: 5,
      name: 'David Brown',
      email: 'david.brown@company.com',
      phone: '+1 (555) 654-3210',
      position: 'HR Specialist',
      department: 'Human Resources',
      location: 'Austin, TX',
      salary: '$72,000',
      startDate: '2020-06-18',
      status: 'On Leave',
      avatar: 'DB',
      performance: 90
    }
  ])

  const handleAddEmployee = (newEmployee: any) => {
    setEmployees(prev => [...prev, newEmployee])
  }

  const handleUpdateEmployee = (updatedEmployee: any) => {
    setEmployees(prev => prev.map(emp =>
      emp.id === updatedEmployee.id ? updatedEmployee : emp
    ))
  }

  const departments = ['Engineering', 'Marketing', 'Sales', 'Design', 'Human Resources']
  const statuses = ['Active', 'On Leave', 'Terminated']

  const filteredEmployees = employees.filter(employee => {
    const matchesSearch = employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.position.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDepartment = selectedDepartment === 'all' || employee.department === selectedDepartment
    const matchesStatus = selectedStatus === 'all' || employee.status === selectedStatus

    return matchesSearch && matchesDepartment && matchesStatus
  })

  // Pagination logic
  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentItems = filteredEmployees.slice(startIndex, endIndex)

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
      case 'Active': return 'bg-green-500/10 text-green-400 border-green-500/30'
      case 'On Leave': return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30'
      case 'Terminated': return 'bg-red-500/10 text-red-400 border-red-500/30'
      default: return 'bg-gray-500/10 text-gray-400 border-gray-500/30'
    }
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
              <h1 className="text-2xl font-bold text-white mb-2">Employee Management</h1>
              <p className="text-gray-400">Manage employee information and records</p>
            </div>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white px-6 py-3 rounded-xl font-medium flex items-center space-x-2 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <Plus className="w-5 h-5" />
              <span>Add Employee</span>
            </button>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <MetricCard
              title="Total Employees"
              value={employees.length}
              subtitle="active today"
              icon={Users}
              trend={{ value: 12, isPositive: true, period: 'since last month' }}
              color="yellow"
              animate={true}
            />
            <MetricCard
              title="Active Today"
              value={employees.filter(e => e.status === 'Active').length}
              subtitle="working status"
              icon={User}
              trend={{ value: 93.5, isPositive: true, period: 'employment rate' }}
              color="green"
              animate={true}
            />
            <MetricCard
              title="Departments"
              value={departments.length}
              subtitle="current structure"
              icon={Briefcase}
              color="blue"
              animate={true}
            />
            <MetricCard
              title="New Employees"
              value={8}
              subtitle="this month"
              icon={Calendar}
              trend={{ value: 3, isPositive: true, period: 'vs last month' }}
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
                <Upload className="w-4 h-4" />
                <span>Import</span>
              </button>
              <button className="flex items-center space-x-2 bg-gray-700 hover:bg-gray-600 border border-gray-600 rounded-lg px-4 py-2 text-gray-300 transition-colors">
                <Download className="w-4 h-4" />
                <span>Export</span>
              </button>
            </div>
          </div>

          {/* Employee Table */}
          <div className="bg-gray-800 border border-gray-700 rounded-2xl overflow-hidden relative z-10">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-750">
                  <tr>
                    <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider px-6 py-4">Employee</th>
                    <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider px-6 py-4">Position</th>
                    <th className="text-center text-xs font-medium text-gray-400 uppercase tracking-wider px-6 py-4">Department</th>
                    <th className="text-center text-xs font-medium text-gray-400 uppercase tracking-wider px-6 py-4">Status</th>
                    <th className="text-center text-xs font-medium text-gray-400 uppercase tracking-wider px-6 py-4">Performance</th>
                    <th className="text-center text-xs font-medium text-gray-400 uppercase tracking-wider px-6 py-4">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {currentItems.map((employee) => (
                    <tr key={employee.id} className="hover:bg-gray-750 transition-colors duration-200">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-white font-semibold text-xs">
                            {employee.avatar}
                          </div>
                          <div>
                            <p className="text-white font-medium text-sm">{employee.name}</p>
                            <p className="text-gray-400 text-xs">{employee.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <p className="text-white text-sm">{employee.position}</p>
                        <p className="text-gray-400 text-xs">Since {employee.startDate}</p>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-white text-sm text-center">{employee.department}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <span className={`px-3 py-1 rounded-lg border text-xs font-medium ${getStatusColor(employee.status)}`}>
                          {employee.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <div className="flex items-center justify-center space-x-2">
                          <div className="w-16 bg-gray-700 rounded-full h-2 relative">
                            <div
                              className="bg-yellow-400 h-2 rounded-full absolute top-0 left-0"
                              style={{ width: `${employee.performance}%` }}
                            ></div>
                          </div>
                          <span className="text-sm text-gray-300 ml-2">{employee.performance}%</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <div className="flex items-center justify-center space-x-2">
                          <button
                            onClick={() => {
                              setSelectedEmployee(employee)
                              setIsViewModalOpen(true)
                            }}
                            className="p-2 text-gray-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-all duration-200"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => {
                              setSelectedEmployee(employee)
                              setIsEditModalOpen(true)
                            }}
                            className="p-2 text-gray-400 hover:text-yellow-400 hover:bg-yellow-500/10 rounded-lg transition-all duration-200"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all duration-200"
                          >
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
                  Showing {startIndex + 1} to {Math.min(endIndex, filteredEmployees.length)} of {filteredEmployees.length} results
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

      {/* ViewDetails Modal */}
      <ViewDetails
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        employee={selectedEmployee}
      />

      {/* AddEmployee Modal */}
      <AddEmployee
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddEmployee}
      />

      {/* EditEmployee Modal */}
      <EditEmployee
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onUpdate={handleUpdateEmployee}
        employee={selectedEmployee}
      />
    </div>
  )
}

export default Employee