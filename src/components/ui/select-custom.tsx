import * as React from "react";

import { cn } from "@/lib/utils";
import { ChevronDownIcon } from "lucide-react";

function Select({ className, ...props }: React.ComponentProps<"select">) {
  return (
    <div className="relative">
      <select
        data-slot="select"
        className={cn(
          "appearance-none placeholder:text-muted-foreground selection:bg-background selection:text-primary-foreground  border-input flex h-9 w-full min-w-0 rounded-md border bg-accent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
          "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
          className
        )}
        {...props}
      />
      <div className="absolute top-1/2 right-3 -translate-y-1/2 pointer-events-none">
        <ChevronDownIcon size={16} strokeWidth={1} />
      </div>
    </div>
  );
}

export { Select };
