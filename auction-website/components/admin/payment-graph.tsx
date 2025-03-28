"use client"

import { useState, useEffect } from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Skeleton } from "@/components/ui/skeleton"

// Mock data for monthly revenue
const mockRevenueData = [
  { month: "Jan", revenue: 0},
  { month: "Feb", revenue: 0 },
  { month: "Mar", revenue: 1 },
  { month: "Apr", revenue: 0 },
  { month: "May", revenue: 0 },
  { month: "Jun", revenue: 0 },
  { month: "Jul", revenue: 0 },
  { month: "Aug", revenue: 0 },
  { month: "Sep", revenue: 0 },
  { month: "Oct", revenue: 0 },
  { month: "Nov", revenue: 0 },
  { month: "Dec", revenue: 0 },
]

export default function AdminPaymentGraph() {
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  // Simulate API call to fetch revenue data
  useEffect(() => {
    const fetchData = async () => {
      // In a real app, this would be an API call
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setData(mockRevenueData)
      setIsLoading(false)
    }

    fetchData()
  }, [])

  if (isLoading) {
    return <Skeleton className="h-[300px] w-full bg-white/10" />
  }

  return (
    <div className="h-[400px] w-full">
      <ChartContainer
        config={{
          revenue: {
            label: "Revenue",
            color: "hsl(var(--primary))",
          },
        }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis dataKey="month" tick={{ fill: "white" }} axisLine={{ stroke: "rgba(255,255,255,0.2)" }} />
            <YAxis
              tick={{ fill: "white" }}
              axisLine={{ stroke: "rgba(255,255,255,0.2)" }}
              tickFormatter={(value) => `$${value.toLocaleString()}`}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey="revenue" name="Revenue" fill="var(--color-revenue)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  )
}

