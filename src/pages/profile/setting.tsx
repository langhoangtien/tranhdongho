import { Radius, ThemeColor, useTheme } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
const themeColors = [
  { title: "Mặc định", value: "", border: "border-slate-500" },
  { title: "Xanh dương", value: "theme-blue", border: "border-blue-500" },
  { title: "Xanh lá cây", value: "theme-green", border: "border-green-500" },
  { title: "Đỏ", value: "theme-red", border: "border-red-500" },
  { title: "Vàng", value: "theme-yellow", border: "border-yellow-500" },
  { title: "Tím", value: "theme-violet", border: "border-violet-500" },
  { title: "Hồng", value: "theme-rose", border: "border-rose-500" },
  { title: "Zinc", value: "theme-zinc", border: "border-zinc-500" },
];
const themeRadius = [
  { title: "XS", value: "0rem", rounded: "rounded-none" },
  { title: "SM", value: "0.5rem", rounded: "rounded-sm" },
  { title: "MD", value: "0.75rem", rounded: "rounded-md" },
  { title: "LG", value: "1rem", rounded: "rounded-lg" },
  { title: "XL", value: "1.5rem", rounded: "rounded-xl" },
  { title: "2XL", value: "2rem", rounded: "rounded-2xl" },
];

export default function Setting() {
  const { color, setColor, setRadius, radius } = useTheme();
  const handleColor = (value: ThemeColor) => {
    setColor(value);
  };
  console.log("COLOR", color);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Cài đặt cá nhân</CardTitle>
        <CardDescription>Tùy chọn chủ đề.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col space-y-6">
        <div className="space-y-2 flex flex-col">
          <label className="text-sm font-medium">Màu sắc</label>
          <RadioGroup
            className="space-x-1 flex"
            onValueChange={handleColor}
            defaultValue={color}
          >
            {themeColors.map((item) => (
              <div key={item.value} className="flex items-center space-x-2">
                <RadioGroupItem
                  className={item.border}
                  value={item.value}
                  id={item.value}
                />
                <label htmlFor="r1">{item.title}</label>
              </div>
            ))}
          </RadioGroup>
        </div>
        <div className="space-y-2 flex flex-col">
          <label className="text-sm font-medium">Bo tròn</label>
          <div className="space-x-2 flex">
            {themeRadius.map((item) => (
              <div key={item.value} className="flex items-center  space-x-2">
                <Button
                  onClick={() => setRadius(item.value as Radius)}
                  variant="outline"
                  className={` ${item.rounded} ${item.value === radius ? "border-primary" : "border-border"} `}
                  value={item.value}
                  id={item.value}
                >
                  {item.title}
                </Button>
              </div>
            ))}
          </div>
        </div>
        <div>
          {" "}
          <Button>Lưu</Button>
        </div>
      </CardContent>
    </Card>
  );
}
