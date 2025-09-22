import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js'
import type { ChartOptions } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'

ChartJS.register(ArcElement, Tooltip, Legend)

interface AdvancedPieChartProps {
  title: string
  data: {
    labels: string[]
    datasets: {
      label?: string
      data: number[]
      backgroundColor: string[]
      borderColor: string[]
      borderWidth?: number
      hoverBorderWidth?: number
      hoverBackgroundColor?: string[]
    }[]
  }
  height?: number
  showLegend?: boolean
  showPercentage?: boolean
  cutout?: number
  animate?: boolean
}

const AdvancedPieChart = ({
  title,
  data,
  height = 400,
  showLegend = true,
  showPercentage = true,
  cutout = 60,
  animate = true
}: AdvancedPieChartProps) => {
  const options: ChartOptions<'doughnut'> = {
    responsive: true,
    maintainAspectRatio: false,
    animation: animate ? {
      animateRotate: true,
      animateScale: true,
      duration: 2000,
      easing: 'easeInOutQuart',
    } : false,
    cutout: `${cutout}%`,
    plugins: {
      legend: {
        display: showLegend,
        position: 'bottom' as const,
        align: 'center' as const,
        labels: {
          color: '#D1D5DB',
          font: {
            size: 12,
            weight: 500,
          },
          usePointStyle: true,
          pointStyle: 'circle',
          padding: 20,
          boxWidth: 12,
          boxHeight: 12,
          generateLabels: function(chart) {
            const data = chart.data
            if (data.labels?.length && data.datasets?.length) {
              return data.labels.map((label, i) => {
                const dataset = data.datasets[0]
                const value = dataset.data[i] as number
                const total = (dataset.data as number[]).reduce((sum, val) => sum + val, 0)
                const percentage = ((value / total) * 100).toFixed(1)

                return {
                  text: showPercentage ? `${label} (${percentage}%)` : label as string,
                  fillStyle: Array.isArray(dataset.backgroundColor)
                    ? dataset.backgroundColor[i]
                    : dataset.backgroundColor as string,
                  strokeStyle: Array.isArray(dataset.borderColor)
                    ? dataset.borderColor[i]
                    : dataset.borderColor as string,
                  lineWidth: 2,
                  hidden: false,
                  index: i,
                  pointStyle: 'circle',
                  fontColor: '#D1D5DB',
                }
              })
            }
            return []
          }
        },
      },
      title: {
        display: true,
        text: title,
        color: '#F9FAFB',
        font: {
          size: 16,
          weight: 'bold',
        },
        padding: {
          top: 10,
          bottom: 30,
        },
      },
      tooltip: {
        enabled: true,
        backgroundColor: 'rgba(17, 24, 39, 0.95)',
        titleColor: '#F9FAFB',
        bodyColor: '#D1D5DB',
        borderColor: '#374151',
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: true,
        titleFont: {
          size: 14,
          weight: 'bold',
        },
        bodyFont: {
          size: 13,
        },
        padding: 12,
        caretPadding: 8,
        callbacks: {
          label: function(context) {
            const label = context.label || ''
            const value = context.parsed
            const total = (context.dataset.data as number[]).reduce((sum, val) => sum + val, 0)
            const percentage = ((value / total) * 100).toFixed(1)

            return [
              `${label}: ${new Intl.NumberFormat('en-US').format(value)}`,
              `Percentage: ${percentage}%`
            ]
          }
        }
      },
    },
    elements: {
      arc: {
        borderWidth: 2,
        hoverBorderWidth: 4,
      },
    },
  }

  // Calculate total for center text
  const total = data.datasets[0]?.data.reduce((sum, val) => sum + val, 0) || 0

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6 hover:border-gray-600 transition-all duration-300 relative">
      <div style={{ height: `${height}px` }} className="relative flex flex-col">
        <div className="flex-1 relative">
          <Doughnut data={data} options={options} />

          {/* Center text overlay for doughnut chart */}
          {cutout > 0 && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">
                  {new Intl.NumberFormat('en-US').format(total)}
                </div>
                <div className="text-sm text-gray-400">Total</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AdvancedPieChart