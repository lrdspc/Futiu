"use client"

import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

/**
 * A component that displays progress charts for weight and workout data.
 *
 * This component renders a line chart for weight progression and a bar chart for workout
 * frequency. It uses the `recharts` library tocreate the charts.
 *
 * @param {object} props - The props for the component.
 * @param {any[]} props.weightData - An array of data points for the weight chart.
 * @param {any[]} props.workoutData - An array of data points for the workout chart.
 * @returns {JSX.Element} The progress charts component.
 */
export function ProgressCharts({ weightData, workoutData }: { weightData: any[]; workoutData: any[] }) {
  return (
    <>
      <ChartContainer
        config={{
          weight: {
            label: "Peso (kg)",
            color: "hsl(var(--accent))",
          },
        }}
        className="h-[300px]"
      >
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={weightData}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-border/50" />
            <XAxis dataKey="date" className="text-xs" />
            <YAxis className="text-xs" />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Line
              type="monotone"
              dataKey="weight"
              stroke="var(--color-weight)"
              strokeWidth={2}
              dot={{ fill: "var(--color-weight)", r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </ChartContainer>

      <ChartContainer
        config={{
          workouts: {
            label: "Treinos",
            color: "hsl(var(--primary))",
          },
        }}
        className="h-[300px]"
      >
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={workoutData}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-border/50" />
            <XAxis dataKey="week" className="text-xs" />
            <YAxis className="text-xs" />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey="workouts" fill="var(--color-workouts)" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartContainer>
    </>
  )
}
