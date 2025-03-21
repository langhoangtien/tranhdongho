import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { SearchIcon, X } from "lucide-react";

export default function SearchHeader() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" variant="outline">
          <SearchIcon
            strokeWidth={1}
            className="size-4 cursor-pointer"
          ></SearchIcon>
        </Button>
      </SheetTrigger>
      <SheetContent showClose={false} side={"top"}>
        <SheetHeader>
          <SheetTitle></SheetTitle>
        </SheetHeader>
        <div className="w-full flex flex-row space-x-4 justify-center items-center p-4">
          <div className="relative w-full max-w-2xl">
            <div className="absolute inset-y-0 end-0 flex items-center pe-3.5 pointer-events-none">
              <SearchIcon className="w-5 h-5 text-gray-500" />
            </div>
            <input
              type="text"
              id="small_filled"
              className="block rounded-lg px-2.5 pb-2 border pt-5 w-full text-sm text-gray-700  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-700 focus-visible:ring-offset appearance-none peer"
              placeholder=" "
            />
            <label
              htmlFor="small_filled"
              className="absolute text-base text-gray-500 duration-300 transform -translate-y-3 scale-75 top-3.5 z-10 origin-[0] start-2.5  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
            >
              Search
            </label>
          </div>
          <SheetClose asChild>
            <X
              strokeWidth={1}
              className="h-7 w-7 text-gray-700 cursor-pointer"
            />
          </SheetClose>
        </div>
      </SheetContent>
    </Sheet>
  );
}
