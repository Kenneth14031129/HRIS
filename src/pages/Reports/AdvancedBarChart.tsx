import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import type { ChartOptions } from 'chart.js'
import { Bar } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
)

interface AdvancedBarChartProps {
  title: string
  data: {
    labels: string[]
    datasets: {
      label: string
      data: number[]
      backgroundColor: string | string[]
      borderColor: string | string[]
      borderWidth?: number
      borderRadius?: number
      borderSkipped?: boolean
    }[]
  }
  height?: number
  horizontal?: boolean
  stacked?: boolean
  showLegend?: boolean
  showGrid?: boolean
  animate?: boolean
}

const AdvancedBarChart = ({
  title,
  data,
  height = 400,
  horizontal = false,
  stacked = false,
  showLegend = true,
  showGrid = true,
  animate = true
}: AdvancedBarChartProps) => {
  const options: ChartOptions<'bar'> = {
    indexAxis: horizontal ? 'y' as const : 'x' as const,
    responsive: true,
    maintainAspectRatio: false,
    animation: animate ? {
      duration: 1500,
      easing: 'easeInOutQuart',
    } : false,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    scales: {
      x: {
        stacked: stacked,
        display: true,
        grid: {
          display: showGrid,
          color: 'rgba(75, 85, 99, 0.3)',
          lineWidth: 1,
        },
        ticks: {
          color: '#9CA3AF',
          font: {
            size: 11,
          },
          maxRotation: horizontal ? 0 : 45,
        },
        border: {
          color: '#4B5563',
        },
      },
      y: {
        stacked: stacked,
        display: true,
        grid: {
          display: showGrid,
          color: 'rgba(75, 85, 99, 0.3)',
          lineWidth: 1,
        },
        ticks: {
          color: '#9CA3AF',
          font: {
            size: 11,
          },
          callback: function(value) {
            return new Intl.NumberFormat('en-US').format(value as number)
          }
        },
        border: {
          color: '#4B5563',
        },
      },
    },
    plugins: {
      legend: {
        display: showLegend,
        position: 'top' as const,
        labels: {
          color: '#D1D5DB',
          font: {
            size: 12,
            weight: 500,
          },
          usePointStyle: true,
          pointStyle: 'rect',
          padding: 20,
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
            let label = context.dataset.label || ''
            if (label) {
              label += ': '
            }
            if (context.parsed.y !== null) {
              const value = horizontal ? context.parsed.x : context.parsed.y
              label += new Intl.NumberFormat('en-US').format(value)
            }
            return label
          }
        }
      },
    },
    elements: {
      bar: {
        borderRadius: 6,
        borderSkipped: false,
      },
    },
  }

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6 hover:border-gray-600 transition-all duration-300">
      <div style={{ height: `${height}px` }}>
        <Bar data={data} options={options} />
      </div>
    </div>
  )
}

export default AdvancedBarChart