import { useTheme } from "@/components/theme-provider";

import { Moon, Sun } from "lucide-react";
import { Button } from "./ui/button";

export function ModeToggle() {
  const { setTheme, theme } = useTheme();
  const handleTheme = () => {
    if (theme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };

  return (
    <Button onClick={handleTheme} variant="outline" size="icon">
      <Moon strokeWidth={1.25} className="dark:hidden" />
      <Sun strokeWidth={1.25} className="hidden  dark:block" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
