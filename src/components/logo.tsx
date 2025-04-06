import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";

// ---------------------------------------------------------------------

export const Logo = () => {
  return (
    <span className="w-28 h-10 text-primary justify-center flex items-center">
      {" "}
      <img src={`/logo.png`} alt="Logo" className="w-full h-full" />
    </span>
  );
};

export const LogoWithLink = ({ className }: { className?: string }) => {
  return (
    <Link
      to="/"
      className={cn("w-36 h-12 justify-center  flex items-center", className)}
    >
      {" "}
      <img
        src={`/logo.png`}
        alt="Logo"
        className="w-full object-contain h-full"
      />
    </Link>
  );
};
