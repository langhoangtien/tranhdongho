import { createFileRoute } from "@tanstack/react-router";
import { BoxIcon, CircleDollarSignIcon, UsersRoundIcon } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import RadialChart from "@/components/admin/radial-chart";
import BarChat from "@/components/admin/bar-chart";

export const Route = createFileRoute("/admin/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <Dashboard />;
}

const data = [
  {
    title: "Doanh thu",
    value: 6599,
    percent: -5.07,
    icon: <CircleDollarSignIcon size={30} strokeWidth={1.25} />,
  },
  {
    title: "Khách hàng",
    value: 3782,
    percent: 11.01,
    icon: <UsersRoundIcon size={30} strokeWidth={1.25} />,
  },
  {
    title: "Đơn hàng",
    value: 5359,
    percent: -9.05,
    icon: <BoxIcon size={30} strokeWidth={1.25} />,
  },
];
export default function Dashboard() {
  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {data.map((item) => (
        <Card key={item.title}>
          <CardHeader>
            <CardTitle>{item.icon}</CardTitle>
          </CardHeader>

          <CardContent>
            <CardDescription>{item.title}</CardDescription>
            <p className="text-3xl font-semibold"> {item.value} </p>
            <p
              className={`${item.percent > 0 ? " text-green-500" : "text-red-500"}`}
            >
              {item.percent > 0 ? "↑" : "↓"} {item.percent}%
            </p>
          </CardContent>
        </Card>
      ))}

      <div className="col-span-1 lg:col-span-1">
        <RadialChart />
      </div>
      <div className="col-span-1 lg:col-span-2">
        <BarChat />
      </div>
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
    </div>
  );
}
