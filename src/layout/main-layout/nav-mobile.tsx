import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Menu } from "lucide-react";

import { menu } from "./nav-desktop";
import { LogoWithLink } from "@/components/logo";
import SearchHeader from "./search";
import CartHeader from "./cart-header";

export default function NavMobile() {
  return (
    <div className="flex justify-between items-center space-x-1 py-2 px-4">
      <Sheet>
        <SheetTrigger asChild>
          <Menu strokeWidth={1} className="size-6 "></Menu>
        </SheetTrigger>
        <SheetContent onOpenAutoFocus={(e) => e.preventDefault()} side={"left"}>
          <SheetHeader>
            <SheetTitle></SheetTitle>
            <SheetDescription></SheetDescription>
          </SheetHeader>
          <div className="flex flex-col space-y-4 p-4 ">
            {menu.map((item) => (
              <a
                key={item.name}
                className="text-lg font-semibold "
                href={item.link}
              >
                {item.name}
              </a>
            ))}
          </div>
          <SheetFooter>
            <SheetClose asChild>
              {/* <Button type="submit">Save changes</Button> */}
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>

      <LogoWithLink />
      <span className="flex space-x-2 items-center">
        <SearchHeader />
        <CartHeader />
      </span>
    </div>
  );
}
