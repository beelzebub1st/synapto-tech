"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { sampleRevenue } from "@/content/sample-data";

const chartData = sampleRevenue.map((row) => ({ ...row }));

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-midnight">Analytics</h1>
        <p className="mt-1 text-sm text-muted-foreground">Revenue and order volume (sample).</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Orders vs revenue</CardTitle>
          <CardDescription>Monthly comparison</CardDescription>
        </CardHeader>
        <CardContent className="h-[360px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e6ea" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#5c6670" }} axisLine={false} tickLine={false} />
              <YAxis yAxisId="left" tick={{ fontSize: 12, fill: "#5c6670" }} axisLine={false} tickLine={false} />
              <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 12, fill: "#5c6670" }} axisLine={false} tickLine={false} />
              <Tooltip />
              <Legend />
              <Bar yAxisId="left" dataKey="revenue" fill="#526BFF" name="Revenue" radius={[6, 6, 0, 0]} />
              <Bar yAxisId="right" dataKey="orders" fill="#a7b8a7" name="Orders" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
