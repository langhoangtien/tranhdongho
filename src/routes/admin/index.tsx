import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <Dashboard />;
}
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
// import { Progress } from "@/components/ui/progress";
import {
  BarChart,
  ResponsiveContainer,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

import {
  BoxIcon,
  Calendar1Icon,
  CircleDollarSignIcon,
  Users,
} from "lucide-react";

const salesData = [
  { name: "1", sales: 150 },
  { name: "2", sales: 350 },
  { name: "3", sales: 180 },
  { name: "4", sales: 300 },
  { name: "5", sales: 200 },
  { name: "6", sales: 220 },
  { name: "7", sales: 250 },
  { name: "8", sales: 130 },
  { name: "9", sales: 270 },
  { name: "10", sales: 350 },
  { name: "11", sales: 400 },
  { name: "12", sales: 500 },
  { name: "13", sales: 600 },
  { name: "14", sales: 700 },
  { name: "15", sales: 800 },
  { name: "16", sales: 900 },
  { name: "17", sales: 1000 },
  { name: "18", sales: 1100 },
  { name: "19", sales: 1200 },
  { name: "20", sales: 1300 },
  { name: "21", sales: 1400 },
  { name: "22", sales: 1500 },
  { name: "23", sales: 1600 },
  { name: "24", sales: 1700 },
  { name: "25", sales: 1800 },
  { name: "26", sales: 1900 },
  { name: "27", sales: 2000 },
  { name: "28", sales: 2100 },
  { name: "29", sales: 2200 },
  { name: "30", sales: 2300 },
];

export default function Dashboard() {
  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>
            <CircleDollarSignIcon size={30} strokeWidth={1.25} />
          </CardTitle>
        </CardHeader>

        <CardContent>
          <CardDescription>Doanh thu</CardDescription>
          <p className="text-3xl font-semibold">6,599k</p>
          <p className="text-red-500">↓ 5.07%</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>
            <Users size={30} strokeWidth={1.25} />
          </CardTitle>
        </CardHeader>

        <CardContent>
          <CardDescription>Khách hàng</CardDescription>
          <p className="text-3xl font-semibold">3,782</p>
          <p className="text-green-500">↑ 11.01%</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            <BoxIcon size={30} strokeWidth={1.25} />
          </CardTitle>
        </CardHeader>

        <CardContent>
          <CardDescription>Đơn hàng</CardDescription>
          <p className="text-3xl font-semibold">5,359</p>
          <p className="text-red-500">↓ 9.05%</p>
        </CardContent>
      </Card>
      <Card className="col-span-1 lg:col-span-3">
        <CardHeader>
          <CardTitle>Monthly Sales</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={salesData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="sales" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Monthly Target</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-4xl font-bold">75.55%</p>
          {/* <Progress value={75.55} className="h-2" /> */}
          <p className="text-green-500">+10%</p>
          <p>
            You earned $3287 today, it's higher than last month. Keep up the
            good work!
          </p>
        </CardContent>
      </Card>

      <Card className="col-span-1 lg:col-span-3">
        <CardHeader className="flex justify-between items-center">
          <CardTitle>Statistics</CardTitle>
          <div className="flex gap-2">
            <Button variant="outline">Overview</Button>
            <Button variant="outline">Sales</Button>
            <Button variant="outline">Revenue</Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Calendar1Icon /> Mar 25, 2025 - Mar 31, 2025
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-48 bg-blue-100 rounded-lg"></div>
        </CardContent>
      </Card>
    </div>
  );
}
