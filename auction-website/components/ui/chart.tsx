"use client"

import type * as React from "react"

import { cn } from "@/lib/utils"

// Format: { THEME_NAME: CSS_SELECTOR }
const THEMES = { light: "", dark: ".dark" } as const

interface ChartConfig {
  [key: string]: {
    label: string
    color: string
  }
}

interface ChartContainerProps {
  config: ChartConfig
  children: React.ReactNode
  className?: string
}

export function ChartContainer({ config, children, className }: ChartContainerProps) {
  return (
    <div
      className={cn("w-full h-full", className)}
      style={
        Object.entries(config).reduce((styles, [key, value]) => {
          return {
            ...styles,
            [`--color-${key}`]: value.color,
          }
        }, {}) as React.CSSProperties
      }
    >
      {children}
    </div>
  )
}

interface ChartTooltipProps {
  className?: string
  children?: React.ReactNode
}

export function ChartTooltip({
  className,
  children,
  ...props
}: ChartTooltipProps & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("rounded-lg border bg-background p-2 shadow-md", className)} {...props}>
      {children}
    </div>
  )
}

export function ChartTooltipContent({ active, payload, label }: any) {
  if (!active || !payload?.length) {
    return null
  }

  return (
    <ChartTooltip>
      <div className="flex flex-col gap-0.5">
        <p className="text-xs text-muted-foreground">{label}</p>
        {payload.map((item: any) => (
          <div key={item.name} className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full" style={{ backgroundColor: item.color }} />
            <p className="text-sm font-medium">
              {item.name}: ${item.value.toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </ChartTooltip>
  )
}

