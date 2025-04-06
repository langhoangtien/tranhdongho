import * as React from "react";
import { Outlet, createRootRoute, useLocation } from "@tanstack/react-router";
import NotFound from "@/components/not-found";

import {
  CheckCircle,
  Info,
  AlertTriangle,
  XCircle,
  Loader2,
} from "lucide-react";
import { Toaster } from "@/components/ui/sonner";
import ServerError from "@/components/server-error";
import { useEffect } from "react";

export const Route = createRootRoute({
  component: RootComponent,
  notFoundComponent: () => <NotFound />,
  errorComponent: () => <ServerError />,
});

function RootComponent() {
  useScrollToTop();
  return (
    <React.Fragment>
      <Toaster
        position="top-right"
        expand={true}
        icons={{
          success: (
            <CheckCircle
              strokeWidth={1.25}
              size={16}
              className="text-green-500 mt-1"
            />
          ),
          info: (
            <Info strokeWidth={1.25} size={16} className="text-blue-500 mt-1" />
          ),
          warning: (
            <AlertTriangle
              strokeWidth={1.25}
              size={16}
              className="text-yellow-500 mt-1"
            />
          ),
          error: (
            <XCircle
              strokeWidth={1.25}
              size={16}
              className="text-red-500 mt-1"
            />
          ),
          loading: (
            <Loader2
              strokeWidth={1.25}
              size={16}
              className="animate-spin mt-1"
            />
          ),
        }}
      />
      <Outlet />
    </React.Fragment>
  );
}
function useScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
