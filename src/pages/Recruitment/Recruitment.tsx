import { useState } from 'react'
import {
  Search,
  Plus,
  Download,
  Upload,
  Eye,
  Edit,
  Trash2,
  Users,
  Briefcase,
  Calendar,
  Clock,
  TrendingUp,
  ChevronLeft,
  ChevronRight,
  MapPin,
  DollarSign
} from 'lucide-react'
import Sidebar from '../../components/Sidebar'
import Header from '../../components/Header'
import AddRecruitment from './AddRecruitment'
import ViewRecruitment from './ViewRecruitment'
import EditRecruitment from './EditRecruitment'
import MetricCard from '../Reports/MetricCard'

const Recruitment = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [departmentFilter, setDepartmentFilter] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [selectedJobPosting, setSelectedJobPosting] = useState<typeof jobPostings[0] | null>(null)
  const itemsPerPage = 5

  // Sample job postings data
  const [jobPostings, setJobPostings] = useState([
    {
      id: 1,
      title: 'Senior Software Engineer',
      department: 'Engineering',
      location: 'San Francisco, CA',
      type: 'Full-time',
      status: 'Active',
      applications: 24,
      postedDate: '2024-01-15',
      deadline: '2024-02-15',
      salary: '$120,000 - $150,000',
      description: 'We are seeking a highly skilled Senior Software Engineer to join our dynamic engineering team. You will be responsible for designing, developing, and maintaining scalable web applications using modern technologies. This role offers the opportunity to work on cutting-edge projects and mentor junior developers.',
      responsibilities: '• Lead the design and development of complex software systems\n• Collaborate with cross-functional teams to define and implement new features\n• Write clean, maintainable, and efficient code\n• Conduct code reviews and provide mentorship to junior developers\n• Participate in architectural discussions and technical decision-making\n• Ensure software quality through testing and documentation',
      requirements: '• Bachelor\'s degree in Computer Science or related field\n• 5+ years of experience in software development\n• Proficiency in JavaScript, TypeScript, React, and Node.js\n• Experience with cloud platforms (AWS, Azure, or GCP)\n• Strong understanding of software architecture and design patterns\n• Experience with agile development methodologies\n• Excellent problem-solving and communication skills',
      benefits: '• Competitive salary and equity package\n• Comprehensive health, dental, and vision insurance\n• 401(k) matching up to 6%\n• Flexible working hours and remote work options\n• Professional development budget ($2,000/year)\n• Unlimited PTO policy\n• Modern office with free meals and snacks'
    },
    {
      id: 2,
      title: 'Marketing Manager',
      department: 'Marketing',
      location: 'New York, NY',
      type: 'Full-time',
      status: 'Active',
      applications: 18,
      postedDate: '2024-01-20',
      deadline: '2024-02-20',
      salary: '$80,000 - $100,000',
      description: 'We are looking for a creative and data-driven Marketing Manager to develop and execute comprehensive marketing strategies that drive brand awareness and customer acquisition. You will lead marketing campaigns across multiple channels and work closely with sales and product teams.',
      responsibilities: '• Develop and implement comprehensive marketing strategies\n• Manage digital marketing campaigns across multiple channels\n• Analyze marketing performance and optimize campaigns for ROI\n• Collaborate with sales team to generate qualified leads\n• Manage marketing budget and vendor relationships\n• Create compelling marketing content and messaging\n• Monitor market trends and competitor activities',
      requirements: '• Bachelor\'s degree in Marketing, Business, or related field\n• 3+ years of experience in marketing management\n• Proven track record with digital marketing campaigns\n• Experience with marketing automation tools (HubSpot, Marketo)\n• Strong analytical skills and data-driven mindset\n• Excellent written and verbal communication skills\n• Creative thinking and problem-solving abilities',
      benefits: '• Competitive salary with performance bonuses\n• Health, dental, and vision insurance\n• 401(k) with company matching\n• Flexible work arrangements\n• Marketing conference and training budget\n• Creative workspace in Manhattan\n• Team outings and company events'
    },
    {
      id: 3,
      title: 'UX Designer',
      department: 'Design',
      location: 'Remote',
      type: 'Full-time',
      status: 'Active',
      applications: 32,
      postedDate: '2024-01-10',
      deadline: '2024-02-10',
      salary: '$75,000 - $95,000'
    },
    {
      id: 4,
      title: 'Sales Representative',
      department: 'Sales',
      location: 'Chicago, IL',
      type: 'Full-time',
      status: 'Closed',
      applications: 45,
      postedDate: '2024-01-05',
      deadline: '2024-02-05',
      salary: '$60,000 - $80,000'
    },
    {
      id: 5,
      title: 'HR Specialist',
      department: 'Human Resources',
      location: 'Austin, TX',
      type: 'Part-time',
      status: 'Draft',
      applications: 0,
      postedDate: '2024-01-25',
      deadline: '2024-02-25',
      salary: '$50,000 - $65,000'
    },
    {
      id: 6,
      title: 'Data Analyst',
      department: 'Engineering',
      location: 'Boston, MA',
      type: 'Full-time',
      status: 'Active',
      applications: 28,
      postedDate: '2024-01-18',
      deadline: '2024-02-18',
      salary: '$70,000 - $90,000'
    }
  ])

  const departments = ['Engineering', 'Marketing', 'Sales', 'Design', 'Human Resources']
  const statuses = ['Active', 'Closed', 'Draft', 'On Hold']

  // Filter logic
  const filteredJobPostings = jobPostings.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || job.status === statusFilter
    const matchesDepartment = departmentFilter === 'all' || job.department === departmentFilter

    return matchesSearch && matchesStatus && matchesDepartment
  })

  // Pagination logic
  const totalPages = Math.ceil(filteredJobPostings.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentItems = filteredJobPostings.slice(startIndex, endIndex)

  const goToPage = (page: number) => {
    setCurrentPage(page)
  }

  const goToPrevious = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1))
  }

  const goToNext = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages))
  }

  const handleAddJobPosting = (newJobPosting: typeof jobPostings[0]) => {
    setJobPostings(prev => [...prev, newJobPosting])
  }

  const handleViewJobPosting = (jobPosting: typeof jobPostings[0]) => {
    setSelectedJobPosting(jobPosting)
    setIsViewModalOpen(true)
  }

  const handleEditJobPosting = (jobPosting: typeof jobPostings[0]) => {
    setSelectedJobPosting(jobPosting)
    setIsEditModalOpen(true)
  }

  const handleUpdateJobPosting = (updatedJobPosting: typeof jobPostings[0]) => {
    setJobPostings(prev => prev.map(job =>
      job.id === updatedJobPosting.id ? updatedJobPosting : job
    ))
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-500/10 text-green-400 border-green-500/30'
      case 'Closed': return 'bg-red-500/10 text-red-400 border-red-500/30'
      case 'Draft': return 'bg-gray-500/10 text-gray-400 border-gray-500/30'
      case 'On Hold': return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30'
      default: return 'bg-gray-500/10 text-gray-400 border-gray-500/30'
    }
  }

  // Stats data
  const recruitmentStats = [
    {
      title: 'Active Positions',
      value: jobPostings.filter(job => job.status === 'Active').length,
      icon: Briefcase,
      change: '+3',
      changeType: 'increase',
      period: 'currently open'
    },
    {
      title: 'Applications Today',
      value: jobPostings.reduce((sum, job) => sum + job.applications, 0),
      icon: Users,
      change: '+15%',
      changeType: 'increase',
      period: 'received today'
    },
    {
      title: 'Interviews Today',
      value: '32',
      icon: Calendar,
      change: '+8',
      changeType: 'increase',
      period: 'scheduled today'
    },
    {
      title: 'Pending Offers',
      value: '5',
      icon: Clock,
      change: '2',
      changeType: 'neutral',
      period: 'awaiting response'
    }
  ]

  return (
    <div className="flex h-screen bg-gray-900">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />

        <main className="flex-1 overflow-auto p-6 space-y-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {/* Page Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white mb-2">Recruitment Management</h1>
              <p className="text-gray-400">Manage job postings and track applications</p>
            </div>
            <button
              type="button"
              onClick={() => setIsAddModalOpen(true)}
              className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white px-6 py-3 rounded-xl font-medium flex items-center space-x-2 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <Plus className="w-5 h-5" />
              <span>Add Job Posting</span>
            </button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {recruitmentStats.map((stat, index) => (
              <MetricCard
                key={stat.title}
                title={stat.title}
                value={stat.value}
                subtitle={stat.period}
                icon={stat.icon}
                trend={stat.changeType !== 'neutral' ? {
                  value: parseFloat(stat.change.replace('+', '').replace('%', '')),
                  isPositive: stat.changeType === 'increase',
                  period: stat.period
                } : undefined}
                color="yellow"
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
                  placeholder="Search job postings..."
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
                  {statuses.map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>

              {/* Department Filter */}
              <div className="relative z-10">
                <select
                  value={departmentFilter}
                  onChange={(e) => setDepartmentFilter(e.target.value)}
                  className="bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-yellow-500 transition-colors relative z-10"
                >
                  <option value="all">All Departments</option>
                  {departments.map(dept => (
                    <option key={dept} value={dept}>{dept}</option>
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

          {/* Job Postings Table */}
          <div className="bg-gray-800 border border-gray-700 rounded-2xl overflow-hidden relative z-10">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-750">
                  <tr>
                    <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider px-6 py-4">Job Title</th>
                    <th className="text-center text-xs font-medium text-gray-400 uppercase tracking-wider px-6 py-4">Department</th>
                    <th className="text-center text-xs font-medium text-gray-400 uppercase tracking-wider px-6 py-4">Location</th>
                    <th className="text-center text-xs font-medium text-gray-400 uppercase tracking-wider px-6 py-4">Applications</th>
                    <th className="text-center text-xs font-medium text-gray-400 uppercase tracking-wider px-6 py-4">Status</th>
                    <th className="text-center text-xs font-medium text-gray-400 uppercase tracking-wider px-6 py-4">Posted</th>
                    <th className="text-center text-xs font-medium text-gray-400 uppercase tracking-wider px-6 py-4">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {currentItems.map((job) => (
                    <tr key={job.id} className="hover:bg-gray-750 transition-colors duration-200">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-white font-semibold text-xs">
                            {job.title.charAt(0)}
                          </div>
                          <div>
                            <p className="text-white font-medium text-sm">{job.title}</p>
                            <div className="flex items-center space-x-2 text-xs text-gray-400">
                              <DollarSign className="w-3 h-3" />
                              <span>{job.salary}</span>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-white text-sm text-center">{job.department}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <div className="flex items-center justify-center space-x-1 text-sm text-gray-300">
                          <MapPin className="w-3 h-3" />
                          <span>{job.location}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <span className="text-white font-medium text-sm">{job.applications}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <span className={`px-3 py-1 rounded-lg border text-xs font-medium ${getStatusColor(job.status)}`}>
                          {job.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-400 text-sm text-center">{job.postedDate}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <div className="flex items-center justify-center space-x-2">
                          <button
                            type="button"
                            onClick={() => handleViewJobPosting(job)}
                            className="p-2 text-gray-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-all duration-200"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleEditJobPosting(job)}
                            className="p-2 text-gray-400 hover:text-yellow-400 hover:bg-yellow-500/10 rounded-lg transition-all duration-200"
                          >
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
                  Showing {startIndex + 1} to {Math.min(endIndex, filteredJobPostings.length)} of {filteredJobPostings.length} results
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

      {/* AddRecruitment Modal */}
      <AddRecruitment
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddJobPosting}
      />

      {/* ViewRecruitment Modal */}
      <ViewRecruitment
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        jobPosting={selectedJobPosting}
      />

      {/* EditRecruitment Modal */}
      <EditRecruitment
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onUpdate={handleUpdateJobPosting}
        jobPosting={selectedJobPosting}
      />
    </div>
  )
}

export default Recruitment