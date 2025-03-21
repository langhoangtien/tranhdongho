import NavMobile from "./nav-mobile";
import { useIsMobile } from "@/hooks/use-mobile";
import NavDesktop from "./nav-desktop";

export default function Header() {
  const isMobile = useIsMobile();
  return (
    <header className="w-full sticky top-0 z-50  bg-background/90 shadow-md ">
      {/* <CarouselHeader /> */}
      <div className="mx-auto max-w-7xl p-2 md:p-4">
        {" "}
        {isMobile ? <NavMobile /> : <NavDesktop />}
      </div>
    </header>
  );
}
