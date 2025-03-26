import { LogoWithLink } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Link, useMatchRoute } from "@tanstack/react-router";
import { ShoppingCart, User2Icon } from "lucide-react";
import SearchHeader from "./search";
import { Badge } from "@/components/ui/badge";

export const menu = [
  { name: "About Us", link: "/about-us" },
  { name: "Buy", link: "/products/optilife-blend" },
  { name: "Contact", link: "/contact-us" },
  { name: "Track Order", link: "/track-order" },
];
export default function NavDesktop() {
  const matchRoute = useMatchRoute();

  return (
    <div className="flex flex-col justify-center  space-y-8 ">
      <div className="flex justify-between items-center space-x-1 py-2 px-4">
        <LogoWithLink />
        <div className="flex space-x-8 justify-center">
          {menu.map((item) => (
            <Link
              key={item.name}
              className={`text-base font-normal border-b-2 hover:border-accent-foreground  py-1 ${
                matchRoute({ to: item.link })
                  ? "border-accent-foreground"
                  : "border-transparent"
              }`}
              to={item.link}
            >
              {item.name}
            </Link>
          ))}
        </div>
        <span className="flex space-x-2 items-center ">
          <SearchHeader />
          <Button className="relative" size="icon" variant="outline">
            <Badge className="absolute -top-2.5 -right-2 min-w-[1.25rem] min-h-[1.25rem] flex items-center justify-center rounded-full text-xs shadow">
              0
            </Badge>
            <ShoppingCart strokeWidth={1} className="text-accent-foreground" />
          </Button>
          <Link to="/login">
            <Button size="icon" variant="outline">
              {" "}
              <User2Icon
                strokeWidth={1}
                className="text-accent-foreground"
                size={24}
              />
            </Button>
          </Link>
        </span>
      </div>
    </div>
  );
}
