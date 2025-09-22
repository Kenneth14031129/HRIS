import {
  X,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Briefcase,
  DollarSign,
} from 'lucide-react'

interface Employee {
  id: number
  name: string
  email: string
  phone: string
  position: string
  department: string
  location: string
  salary: string
  startDate: string
  status: string
  avatar: string
  performance: number
}

interface ViewDetailsProps {
  isOpen: boolean
  onClose: () => void
  employee: Employee | null
}

const ViewDetails = ({ isOpen, onClose, employee }: ViewDetailsProps) => {
  if (!isOpen || !employee) return null

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-500/10 text-green-400 border-green-500/30'
      case 'On Leave': return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30'
      case 'Terminated': return 'bg-red-500/10 text-red-400 border-red-500/30'
      default: return 'bg-gray-500/10 text-gray-400 border-gray-500/30'
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop with blur */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative bg-gray-800 border border-gray-700 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <h2 className="text-xl font-semibold text-white">Employee Details</h2>
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
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
              {employee.avatar}
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white">{employee.name}</h3>
              <p className="text-yellow-400 font-medium">{employee.position}</p>
              <span className={`inline-block px-3 py-1 rounded-lg border text-xs font-medium mt-2 ${getStatusColor(employee.status)}`}>
                {employee.status}
              </span>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Contact Information */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-white border-b border-gray-700 pb-2">Contact Information</h4>

              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-yellow-400" />
                <div>
                  <p className="text-sm text-gray-400">Email</p>
                  <p className="text-white">{employee.email}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-yellow-400" />
                <div>
                  <p className="text-sm text-gray-400">Phone</p>
                  <p className="text-white">{employee.phone}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-yellow-400" />
                <div>
                  <p className="text-sm text-gray-400">Location</p>
                  <p className="text-white">{employee.location}</p>
                </div>
              </div>
            </div>

            {/* Employment Information */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-white border-b border-gray-700 pb-2">Employment Information</h4>

              <div className="flex items-center space-x-3">
                <Briefcase className="w-5 h-5 text-yellow-400" />
                <div>
                  <p className="text-sm text-gray-400">Department</p>
                  <p className="text-white">{employee.department}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Calendar className="w-5 h-5 text-yellow-400" />
                <div>
                  <p className="text-sm text-gray-400">Start Date</p>
                  <p className="text-white">{employee.startDate}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <DollarSign className="w-5 h-5 text-yellow-400" />
                <div>
                  <p className="text-sm text-gray-400">Salary</p>
                  <p className="text-white">{employee.salary}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Performance Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-400">Overall Performance</span>
                  <span className="text-sm font-medium text-white">{employee.performance}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-yellow-400 to-orange-500 h-3 rounded-full transition-all duration-300"
                    style={{ width: `${employee.performance}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ViewDetails