import { AppSidebar } from "@/components/app-sidebar";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { z } from "zod";
import {
  createFileRoute,
  Link,
  Outlet,
  redirect,
} from "@tanstack/react-router";
import { HomeIcon } from "lucide-react";
import { AuthContext } from "@/auth";
import NotificationBell from "@/layout/main-layout/notification";

export const Route = createFileRoute("/admin")({
  component: RouteComponent,
  validateSearch: z.object({
    redirect: z.string().optional().catch(""),
  }),
  beforeLoad: async ({ context, search }) => {
    const authContext = context as { auth: AuthContext };

    if (!authContext.auth.user) {
      await authContext.auth.initialize();
    }

    if (!authContext.auth.isAuthenticated) {
      throw redirect({ to: search.redirect || "/login" });
    }
  },
});

function RouteComponent() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="sticky px-4 bg-background shadow-sm justify-between inset-x-0 top-0 isolate z-10 flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <SidebarTrigger />
          <div className="flex h-16 shrink-0 items-center justify-end gap-2">
            <div className="flex items-center gap-1">
              <ModeToggle />
              <NotificationBell />
            </div>
          </div>
        </header>

        <Outlet />
        <Link className="fixed right-4 bottom-4 z-20" to="/">
          <Button size="icon" variant="outline">
            <HomeIcon strokeWidth={1.25} />
          </Button>
        </Link>
      </SidebarInset>
    </SidebarProvider>
  );
}
