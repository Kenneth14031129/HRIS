import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import Dashboard from './pages/Dashboard'
import Employee from './pages/Employee/Employee'
import Attendance from './pages/Attendance/Attendance'
import Payroll from './pages/Payroll/Payroll'
import Leave from './pages/Leave/Leave'
import Recruitment from './pages/Recruitment/Recruitment'
import Reports from './pages/Reports/Reports'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/employees" element={<Employee />} />
        <Route path="/attendance" element={<Attendance />} />
        <Route path="/payroll" element={<Payroll />} />
        <Route path="/leave" element={<Leave />} />
        <Route path="/recruitment" element={<Recruitment />} />
        <Route path="/reports" element={<Reports />} />
      </Routes>
    </Router>
  )
}

export default App
