import { LogoWithLink } from "@/components/logo";

export default function Header() {
  return (
    <header className="w-full p-4 sticky top-0 z-50 flex   bg-background/90  ">
      <LogoWithLink />
    </header>
  );
}
