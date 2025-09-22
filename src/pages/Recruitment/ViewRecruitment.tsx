import { useState } from 'react'
import {
  X,
  MapPin,
  Clock,
  Users,
  Building,
  Eye,
  Download,
  CheckCircle,
  XCircle,
  Mail,
  Phone,
  FileText,
  Star,
  MessageSquare
} from 'lucide-react'

interface JobPosting {
  id: number
  title: string
  department: string
  location: string
  type: string
  status: string
  applications: number
  postedDate: string
  deadline: string
  salary: string
  description?: string
  requirements?: string
  responsibilities?: string
  benefits?: string
}

interface Application {
  id: number
  candidateName: string
  email: string
  phone: string
  appliedDate: string
  status: 'Applied' | 'Screening' | 'Interview' | 'Offer' | 'Hired' | 'Rejected'
  resumeUrl?: string
  coverLetter?: string
  experience: string
  rating?: number
}

interface ViewRecruitmentProps {
  isOpen: boolean
  onClose: () => void
  jobPosting: JobPosting | null
}

const ViewRecruitment: React.FC<ViewRecruitmentProps> = ({ isOpen, onClose, jobPosting }) => {
  const [activeTab, setActiveTab] = useState<'details' | 'applications'>('details')

  // Sample applications data
  const [applications] = useState<Application[]>([
    {
      id: 1,
      candidateName: 'John Smith',
      email: 'john.smith@email.com',
      phone: '+1 (555) 123-4567',
      appliedDate: '2024-01-20',
      status: 'Interview',
      experience: '5+ years in Software Development',
      rating: 4.5
    },
    {
      id: 2,
      candidateName: 'Sarah Johnson',
      email: 'sarah.johnson@email.com',
      phone: '+1 (555) 987-6543',
      appliedDate: '2024-01-18',
      status: 'Screening',
      experience: '3 years in Frontend Development',
      rating: 4.2
    },
    {
      id: 3,
      candidateName: 'Mike Chen',
      email: 'mike.chen@email.com',
      phone: '+1 (555) 456-7890',
      appliedDate: '2024-01-15',
      status: 'Applied',
      experience: '7+ years in Full Stack Development',
      rating: 4.8
    },
    {
      id: 4,
      candidateName: 'Emily Davis',
      email: 'emily.davis@email.com',
      phone: '+1 (555) 321-0987',
      appliedDate: '2024-01-22',
      status: 'Offer',
      experience: '4 years in React Development',
      rating: 4.6
    }
  ])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-500/10 text-green-400 border-green-500/30'
      case 'Closed': return 'bg-red-500/10 text-red-400 border-red-500/30'
      case 'Draft': return 'bg-gray-500/10 text-gray-400 border-gray-500/30'
      case 'On Hold': return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30'
      default: return 'bg-gray-500/10 text-gray-400 border-gray-500/30'
    }
  }

  const getApplicationStatusColor = (status: string) => {
    switch (status) {
      case 'Applied': return 'bg-blue-500/10 text-blue-400 border-blue-500/30'
      case 'Screening': return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30'
      case 'Interview': return 'bg-purple-500/10 text-purple-400 border-purple-500/30'
      case 'Offer': return 'bg-green-500/10 text-green-400 border-green-500/30'
      case 'Hired': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
      case 'Rejected': return 'bg-red-500/10 text-red-400 border-red-500/30'
      default: return 'bg-gray-500/10 text-gray-400 border-gray-500/30'
    }
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-3 h-3 ${i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-600'}`}
      />
    ))
  }

  if (!isOpen || !jobPosting) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-gray-800 border border-gray-700 rounded-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center text-white font-bold text-lg">
              {jobPosting.title.charAt(0)}
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">{jobPosting.title}</h2>
              <div className="flex items-center space-x-4 text-sm text-gray-400">
                <div className="flex items-center space-x-1">
                  <Building className="w-4 h-4" />
                  <span>{jobPosting.department}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <MapPin className="w-4 h-4" />
                  <span>{jobPosting.location}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>{jobPosting.type}</span>
                </div>
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 hover:bg-gray-700 rounded-lg text-gray-400 hover:text-white transition-all duration-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-700">
          <button
            type="button"
            onClick={() => setActiveTab('details')}
            className={`px-6 py-3 font-medium transition-all duration-200 ${
              activeTab === 'details'
                ? 'text-yellow-400 border-b-2 border-yellow-400 bg-yellow-500/5'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <FileText className="w-4 h-4 inline mr-2" />
            Job Details
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('applications')}
            className={`px-6 py-3 font-medium transition-all duration-200 ${
              activeTab === 'applications'
                ? 'text-yellow-400 border-b-2 border-yellow-400 bg-yellow-500/5'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Users className="w-4 h-4 inline mr-2" />
            Applications ({applications.length})
          </button>
        </div>

        <div className="overflow-y-auto max-h-[calc(90vh-200px)] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {activeTab === 'details' ? (
            <div className="p-6 space-y-6">
              {/* Job Overview */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Status and Key Info */}
                <div className="lg:col-span-1 space-y-4">
                  <div className="bg-gray-750 rounded-xl p-4 border border-gray-600">
                    <h3 className="text-lg font-semibold text-white mb-4">Job Overview</h3>

                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Status</span>
                        <span className={`px-3 py-1 rounded-lg border text-xs font-medium ${getStatusColor(jobPosting.status)}`}>
                          {jobPosting.status}
                        </span>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Applications</span>
                        <span className="text-white font-medium">{jobPosting.applications}</span>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Posted Date</span>
                        <span className="text-white">{jobPosting.postedDate}</span>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Deadline</span>
                        <span className="text-white">{jobPosting.deadline}</span>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Salary</span>
                        <span className="text-green-400 font-medium">{jobPosting.salary}</span>
                      </div>
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="bg-gray-750 rounded-xl p-4 border border-gray-600">
                    <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
                    <div className="space-y-2">
                      <button
                        type="button"
                        className="w-full flex items-center space-x-2 px-4 py-2 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30 text-blue-400 rounded-lg transition-all duration-200"
                      >
                        <Download className="w-4 h-4" />
                        <span>Export Applications</span>
                      </button>
                      <button
                        type="button"
                        className="w-full flex items-center space-x-2 px-4 py-2 bg-green-500/10 hover:bg-green-500/20 border border-green-500/30 text-green-400 rounded-lg transition-all duration-200"
                      >
                        <CheckCircle className="w-4 h-4" />
                        <span>Close Position</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Job Details */}
                <div className="lg:col-span-2 space-y-4">
                  {jobPosting.description && (
                    <div className="bg-gray-750 rounded-xl p-4 border border-gray-600">
                      <h3 className="text-lg font-semibold text-white mb-3">Job Description</h3>
                      <p className="text-gray-300 leading-relaxed whitespace-pre-line">{jobPosting.description}</p>
                    </div>
                  )}

                  {jobPosting.responsibilities && (
                    <div className="bg-gray-750 rounded-xl p-4 border border-gray-600">
                      <h3 className="text-lg font-semibold text-white mb-3">Key Responsibilities</h3>
                      <p className="text-gray-300 leading-relaxed whitespace-pre-line">{jobPosting.responsibilities}</p>
                    </div>
                  )}

                  {jobPosting.requirements && (
                    <div className="bg-gray-750 rounded-xl p-4 border border-gray-600">
                      <h3 className="text-lg font-semibold text-white mb-3">Requirements & Qualifications</h3>
                      <p className="text-gray-300 leading-relaxed whitespace-pre-line">{jobPosting.requirements}</p>
                    </div>
                  )}

                  {jobPosting.benefits && (
                    <div className="bg-gray-750 rounded-xl p-4 border border-gray-600">
                      <h3 className="text-lg font-semibold text-white mb-3">Benefits & Perks</h3>
                      <p className="text-gray-300 leading-relaxed whitespace-pre-line">{jobPosting.benefits}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="p-6">
              {/* Applications List */}
              <div className="space-y-4">
                {applications.map((application) => (
                  <div key={application.id} className="bg-gray-750 rounded-xl p-4 border border-gray-600 hover:border-gray-500 transition-all duration-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                          {application.candidateName.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <h4 className="text-white font-medium">{application.candidateName}</h4>
                          <div className="flex items-center space-x-4 text-sm text-gray-400">
                            <div className="flex items-center space-x-1">
                              <Mail className="w-3 h-3" />
                              <span>{application.email}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Phone className="w-3 h-3" />
                              <span>{application.phone}</span>
                            </div>
                          </div>
                          <p className="text-xs text-gray-500 mt-1">{application.experience}</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <div className="flex items-center space-x-1 mb-1">
                            {application.rating && renderStars(application.rating)}
                            {application.rating && <span className="text-xs text-gray-400 ml-1">{application.rating}</span>}
                          </div>
                          <span className={`px-3 py-1 rounded-lg border text-xs font-medium ${getApplicationStatusColor(application.status)}`}>
                            {application.status}
                          </span>
                          <p className="text-xs text-gray-500 mt-1">Applied: {application.appliedDate}</p>
                        </div>

                        <div className="flex space-x-2">
                          <button
                            type="button"
                            className="p-2 text-gray-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-all duration-200"
                            title="View Resume"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            className="p-2 text-gray-400 hover:text-green-400 hover:bg-green-500/10 rounded-lg transition-all duration-200"
                            title="Accept"
                          >
                            <CheckCircle className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all duration-200"
                            title="Reject"
                          >
                            <XCircle className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            className="p-2 text-gray-400 hover:text-yellow-400 hover:bg-yellow-500/10 rounded-lg transition-all duration-200"
                            title="Add Note"
                          >
                            <MessageSquare className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ViewRecruitment