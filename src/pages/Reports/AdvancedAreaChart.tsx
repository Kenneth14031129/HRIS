import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js'
import type { ChartOptions } from 'chart.js'
import { Line } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

interface AdvancedAreaChartProps {
  title: string
  data: {
    labels: string[]
    datasets: {
      label: string
      data: number[]
      borderColor: string
      backgroundColor: string
      fill: boolean
      tension?: number
    }[]
  }
  height?: number
  stacked?: boolean
  showLegend?: boolean
  showGrid?: boolean
  animate?: boolean
}

const AdvancedAreaChart = ({
  title,
  data,
  height = 400,
  stacked = false,
  showLegend = true,
  showGrid = true,
  animate = true
}: AdvancedAreaChartProps) => {
  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    animation: animate ? {
      duration: 2500,
      easing: 'easeInOutCubic',
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
          maxRotation: 45,
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
          pointStyle: 'circle',
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
              label += new Intl.NumberFormat('en-US').format(context.parsed.y)
            }
            return label
          },
          footer: function(tooltipItems) {
            if (stacked && tooltipItems.length > 1) {
              const total = tooltipItems.reduce((sum, item) => sum + item.parsed.y, 0)
              return `Total: ${new Intl.NumberFormat('en-US').format(total)}`
            }
            return ''
          }
        }
      },
      filler: {
        propagate: false,
      },
    },
    elements: {
      line: {
        tension: 0.4,
        borderWidth: 2,
      },
      point: {
        radius: 4,
        hoverRadius: 6,
        borderWidth: 2,
        hoverBorderWidth: 3,
      },
    },
  }

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6 hover:border-gray-600 transition-all duration-300">
      <div style={{ height: `${height}px` }}>
        <Line data={data} options={options} />
      </div>
    </div>
  )
}

export default AdvancedAreaChart