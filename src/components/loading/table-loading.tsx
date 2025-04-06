import { LoaderCircleIcon } from "lucide-react";

export const LoadingTable = () => {
  return (
    <div className="absolute inset-0 z-10 flex items-center justify-center bg-background/35">
      <LoaderCircleIcon
        strokeWidth={1.25}
        size={36}
        className="animate-spin text-accent-foreground"
      />
    </div>
  );
};
