'use client'
import { formatINR } from '@/util/helpers'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
  ResponsiveContainer,
} from 'recharts'

// Custom Tooltip
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function CustomTooltip({ active, payload, label }: any) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/80 p-3 rounded-lg border text-sm">
        <p className="font-semibold text-muted-foreground">{label}</p>
        <p className="text-orange-600 font-bold">
          {formatINR(payload[0].value)}
        </p>
      </div>
    )
  }
  return null
}

export default function Charts({
  data: { salesData },
}: {
  data: { salesData: { month: string; totalSales: number }[] }
}) {
  return (
    <div className="h-full w-full bg-orange-50 p-4 rounded-xl shadow">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={salesData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />

          <Tooltip content={<CustomTooltip />} />
          <Legend />

          <ReferenceLine y={0} stroke="#000" />

          <Bar
            dataKey="totalSales"
            fill="#f97316"
            radius={[4, 4, 0, 0]}
            animationDuration={1200}
            animationEasing="ease-out"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
