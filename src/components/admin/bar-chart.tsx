import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
  { month: "January", desktop: 186, mobile: 80, tablet: 50 },
  { month: "February", desktop: 105, mobile: 200, tablet: 40 },
  { month: "March", desktop: 137, mobile: 120, tablet: 35 },
  { month: "April", desktop: 73, mobile: 90, tablet: 40 },
  { month: "May", desktop: 309, mobile: 130, tablet: 56 },
  { month: "June", desktop: 214, mobile: 140, tablet: 30 },
  { month: "July", desktop: 186, mobile: 80, tablet: 53 },
  { month: "August", desktop: 105, mobile: 200, tablet: 30 },
  { month: "September", desktop: 137, mobile: 120, tablet: 42 },
  { month: "October", desktop: 173, mobile: 190, tablet: 45 },
  { month: "November", desktop: 309, mobile: 130, tablet: 47 },
  { month: "December", desktop: 114, mobile: 140, tablet: 37 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--primary)",
  },
  mobile: {
    label: "Mobile",
    color: "var(--primary-lighter)",
  },
  tablet: {
    label: "Tablet",
    color: "var(--primary-light)",
  },
} satisfies ChartConfig;

export default function BarChat() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Bar Chart - Stacked + Legend</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          className="aspect-video md:aspect-[4]"
          config={chartConfig}
        >
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar
              barSize={20}
              dataKey="desktop"
              stackId="a"
              fill="var(--color-desktop)"
              radius={[0, 0, 4, 4]}
            />
            <Bar
              dataKey="mobile"
              stackId="a"
              fill="var(--color-mobile)"
              radius={[0, 0, 0, 0]}
            />
            <Bar
              dataKey="tablet"
              stackId="a"
              fill="var(--color-tablet)"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 12 months
        </div>
      </CardFooter>
    </Card>
  );
}
