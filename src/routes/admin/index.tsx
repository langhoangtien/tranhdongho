import { createFileRoute } from "@tanstack/react-router";
import { Users } from "lucide-react";

import { Card, CardContent, CardDescription } from "@/components/ui/card";
import RadialChart from "@/components/admin/radial-chart";
import { useEffect, useState } from "react";
import { API_URL } from "@/config";
import { STORAGE_KEY } from "@/auth";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const Route = createFileRoute("/admin/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <Dashboard />;
}

type Visitor = {
  country: string;
  city: string;
  totalCount: number;
  totalAddToCart: number;
  orderCount: number;
  date: string;
  topCountries: {
    country: string;
    count: number;
    countAddToCart: number;
  }[];
};
export default function Dashboard() {
  const [visitor, setVisitor] = useState<Visitor>({
    country: "",
    city: "",
    totalCount: 0,
    totalAddToCart: 0,
    topCountries: [],
    orderCount: 0,
    date: "",
  });
  const getVistor = async () => {
    const token = localStorage.getItem(STORAGE_KEY);
    if (!token) return;
    try {
      const responseJson = await fetch(`${API_URL}/geo-stat/range`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const response = await responseJson.json();

      setVisitor(response);
    } catch (error) {
      console.error("Error fetching location:", error);
    }
  };
  useEffect(() => {
    getVistor();
  }, []);

  const data = [
    {
      title: "Lượt vào trang",
      value: visitor.totalCount,
      icon: <Users />,
    },
    {
      title: "Lượt thêm vào giỏ hàng",
      value: visitor.totalAddToCart,
      icon: <Users />,
    },
    {
      title: "Đơn hàng",
      value: visitor.orderCount,

      icon: <Users />,
    },
  ];

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {data.map((item, index) => (
        <Card>
          <CardContent key={index}>
            <CardDescription>{item.title}</CardDescription>
            <p className="text-3xl font-semibold"> {item.value} </p>
            <p className="text-green-500">0%</p>
          </CardContent>
        </Card>
      ))}

      <div className="col-span-1 lg:col-span-1">
        <RadialChart
          data={[
            {
              browser: "safari",
              visitors: visitor.totalCount,
              fill: "var(--primary)",
            },
          ]}
        />
      </div>
      <div className="col-span-1 lg:col-span-1">
        <Card>
          <Table>
            <TableCaption>Try cập theo quốc gia.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Quốc gia</TableHead>
                <TableHead>Lượt ghé qua</TableHead>
                <TableHead>Lượt thêm vào giỏ hàng</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {visitor.topCountries.map((country) => (
                <TableRow key={country.country}>
                  <TableCell className="font-medium">
                    {country.country}
                  </TableCell>
                  <TableCell>{country.count}</TableCell>
                  <TableCell>{country.countAddToCart}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>
    </div>
  );
}
