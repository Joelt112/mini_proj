"use client"

import { useState, useEffect } from "react"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"
import { ChartContainer } from "@/components/ui/chart"
import { Skeleton } from "@/components/ui/skeleton"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "@/store/store"
import { getAllUsers } from "@/store/slices/superAdminSlice"

export default function AdminUsersGraph() {
  const dispatch = useDispatch<AppDispatch>()
  const { totalAuctioneers, totalBidders, loading } = useSelector((state: RootState) => state.superAdmin)
  const [data, setData] = useState<Array<{ name: string; value: number; color: string }>>([])
  const allUsers = useSelector((state: RootState) => state.superAdmin.totalBidders.concat(state.superAdmin.totalAuctioneers))
  useEffect(() => {
    dispatch(getAllUsers())
  }, [dispatch])

  useEffect(() => {
    const bidderCount = allUsers.filter(user => user.role === 'bidder').length
    const auctioneerCount = allUsers.filter(user => user.role === 'auctioneer').length
    const activeData = [
      { 
        name: "Bidders", 
        value: totalBidders.length, 
        color: "hsl(var(--primary))" 
      },
      { 
        name: "Auctioneers", 
        value: totalAuctioneers.length, 
        color: "#3b82f6" 
      },
      // Keep static admin data as per original design
      { 
        name: "Admins", 
        value: 1, 
        color: "#10b981" 
      }
    ]
    setData(activeData)
  }, [totalAuctioneers, totalBidders])

  if (loading) {
    return <Skeleton className="h-[300px] w-full bg-white/10" />
  }

  return (
    <div className="h-[400px] w-full mb-24">
      <ChartContainer
        config={{
          bidders: {
            label: "Bidders",
            color: "hsl(var(--primary))",
          },
          auctioneers: {
            label: "Auctioneers",
            color: "#3b82f6",
          },
          admins: {
            label: "Admins",
            color: "#10b981",
          },
        }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={120}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Legend formatter={(value) => <span style={{ color: "white" }}>{value}</span>} />
            <Tooltip formatter={(value) => [`${value} users`, ""]} labelFormatter={(label) => ""} />
          </PieChart>
        </ResponsiveContainer>
      </ChartContainer>

      <div className="grid grid-cols-3 gap-4 mt-6">
        {data.map((item, index) => (
          <div key={index} className="bg-white/10 rounded-lg p-4 text-center">
            <h4 className="text-lg font-medium" style={{ color: item.color }}>
              {item.name}
            </h4>
            <p className="text-2xl font-bold">{item.value.toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  )
}