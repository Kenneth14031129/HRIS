import type { LucideIcon } from 'lucide-react'

interface MetricCardProps {
  title: string
  value: string | number
  subtitle?: string
  icon: LucideIcon
  trend?: {
    value: number
    isPositive: boolean
    period: string
  }
  color?: 'blue' | 'green' | 'yellow' | 'red' | 'purple' | 'indigo'
  size?: 'sm' | 'md' | 'lg'
  animate?: boolean
}

const MetricCard = ({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  color = 'yellow',
  size = 'md',
  animate = true
}: MetricCardProps) => {
  const colorClasses = {
    blue: 'from-blue-500/20 to-blue-600/10 border-blue-500/40 bg-blue-500/20 text-white',
    green: 'from-green-500/20 to-green-600/10 border-green-500/40 bg-green-500/20 text-white',
    yellow: 'from-yellow-500/20 to-yellow-600/10 border-yellow-500/40 bg-yellow-500/20 text-white',
    red: 'from-red-500/20 to-red-600/10 border-red-500/40 bg-red-500/20 text-white',
    purple: 'from-purple-500/20 to-purple-600/10 border-purple-500/40 bg-purple-500/20 text-white',
    indigo: 'from-indigo-500/20 to-indigo-600/10 border-indigo-500/40 bg-indigo-500/20 text-white'
  }

  const sizeClasses = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  }

  const iconSizes = {
    sm: 'w-5 h-5',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  }

  const valueSizes = {
    sm: 'text-xl',
    md: 'text-2xl',
    lg: 'text-3xl'
  }

  const [bgGradient, borderClass, iconBgClass, iconColorClass] = colorClasses[color].split(' ')

  const formatValue = (val: string | number) => {
    if (typeof val === 'number') {
      return new Intl.NumberFormat('en-US').format(val)
    }
    return val
  }

  return (
    <div className={`
      bg-gradient-to-br ${bgGradient} border ${borderClass} rounded-2xl ${sizeClasses[size]}
      ${animate ? 'animate-fade-in-up' : ''} backdrop-blur-sm relative overflow-hidden
    `}>
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
      </div>

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className={`p-3 ${iconBgClass} rounded-xl`}>
            <Icon className={`${iconSizes[size]} text-white`} />
          </div>
          {trend && (
            <div className={`flex items-center space-x-1 ${trend.isPositive ? 'text-green-400' : 'text-red-400'}`}>
              <span className="text-sm font-medium">
                {trend.isPositive ? '+' : ''}{trend.value}%
              </span>
              <span className="text-xs text-gray-400">{trend.period}</span>
            </div>
          )}
        </div>

        <div>
          <h3 className={`${valueSizes[size]} font-bold text-white mb-1`}>
            {formatValue(value)}
          </h3>
          <p className="text-sm text-gray-400">
            {title}
          </p>
          {subtitle && (
            <p className="text-xs text-gray-500 mt-1">
              {subtitle}
            </p>
          )}
        </div>

      </div>
    </div>
  )
}

export default MetricCard