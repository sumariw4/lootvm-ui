"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";
import { Area, AreaChart } from "recharts";

const metrics = [
  {
    title: "Earnings",
    value: "$1,250.00",
    change: "+12.5%",
    data: [
      { v: 400 }, { v: 300 }, { v: 500 }, { v: 450 }, { v: 600 }, { v: 550 }, { v: 700 },
    ],
    color: "hsl(var(--primary))",
  },
  {
    title: "Active Users",
    value: "1,234",
    change: "+8.2%",
    data: [
      { v: 200 }, { v: 250 }, { v: 220 }, { v: 280 }, { v: 300 }, { v: 320 }, { v: 350 },
    ],
    color: "hsl(142 76% 36%)",
  },
  {
    title: "Total Views",
    value: "45,678",
    change: "+23.1%",
    data: [
      { v: 1000 }, { v: 1200 }, { v: 1100 }, { v: 1400 }, { v: 1300 }, { v: 1500 }, { v: 1600 },
    ],
    color: "hsl(221 83% 53%)",
  },
  {
    title: "Conversion Rate",
    value: "4.5%",
    change: "+1.2%",
    data: [
      { v: 3.2 }, { v: 3.5 }, { v: 3.8 }, { v: 4.0 }, { v: 4.2 }, { v: 4.3 }, { v: 4.5 },
    ],
    color: "hsl(38 92% 50%)",
  },
];

export function MetricCards() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {metrics.map((metric) => (
        <Card key={metric.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {metric.title}
            </CardTitle>
            <span className="text-xs font-medium text-emerald-500">{metric.change}</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metric.value}</div>
            <ChartContainer
              config={{ v: { label: metric.title, color: metric.color } }}
              className="mt-3 h-12 w-full"
            >
              <AreaChart data={metric.data} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                <Area
                  type="monotone"
                  dataKey="v"
                  stroke={metric.color}
                  fill={metric.color}
                  fillOpacity={0.15}
                  strokeWidth={2}
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
