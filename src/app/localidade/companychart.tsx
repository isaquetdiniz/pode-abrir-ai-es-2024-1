"use client";

import React from "react";
import {
  ChartContainer,
  ChartTooltipContent,
  ChartLegend,
} from "@/components/ui/chart";

import {
  ComposedChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Bar,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { cn } from "@/libs/shadcn/utils";
import { cva } from "class-variance-authority";

const chartVariants = cva("w-full h-full", {
  variants: {
    size: {
      default: "h-72",
      sm: "h-56",
      lg: "h-96",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

export interface CompanyStatusChartProps {
  className?: string;
  size?: "default" | "sm" | "lg";
}

const CompanyStatusChart = React.forwardRef<
  HTMLDivElement,
  CompanyStatusChartProps
>(({ className, size, ...props }, ref) => {
  const data = [
    { year: 2020, opened: 150, closed: 30 },
    { year: 2021, opened: 200, closed: 50 },
    { year: 2022, opened: 250, closed: 70 },
    { year: 2023, opened: 300, closed: 100 },
    { year: 2024, opened: 400, closed: 120 },
  ];

  return (
    <div
      className={cn("relative", className)}
      style={{ width: "362px", height: "222px" }}
      ref={ref}
      {...props}
    >
      <div className="absolute inset-0 rounded-xl border p-4 bg-white shadow-md">
        <ChartContainer
          config={{
            opened: { color: "#FF5E03" },
            closed: { color: "#B90A0A" },
          }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip content={<ChartTooltipContent />} />
              <Bar dataKey="opened" name="Abertas" fill="#FF5E03" />
              <Bar dataKey="closed" name="Fechadas" fill="#B90A0A" />
              <ChartLegend />
            </ComposedChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>
    </div>
  );
});

CompanyStatusChart.displayName = "CompanyStatusChart";

export { CompanyStatusChart };
