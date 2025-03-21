import { AppSidebar } from "@/components/app-sidebar";
import { ModeToggle } from "@/components/mode-toggle";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { z } from "zod";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { BellRingIcon } from "lucide-react";
import { AuthContext } from "@/auth";

export const Route = createFileRoute("/admin")({
  component: RouteComponent,
  validateSearch: z.object({
    redirect: z.string().optional().catch(""),
  }),
  beforeLoad: ({ context, search }) => {
    const authContext = context as { auth: AuthContext };
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
        <header className="sticky px-4 bg-background justify-between inset-x-0 top-0 isolate z-10 flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <SidebarTrigger />
          <div className="flex h-16 shrink-0 items-center justify-end gap-2">
            <div className="flex items-center gap-1">
              <ModeToggle />
              <Button
                variant="outline"
                className="cursor-pointer bg-background p-1 hover:bg-accent"
                size="icon"
              >
                <BellRingIcon strokeWidth={1} className="size-5" />
              </Button>
            </div>
          </div>
        </header>
        <div className="p-4">
          {" "}
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="#">
                  Building Your Application
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Data Fetching</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        <Outlet />
      </SidebarInset>
    </SidebarProvider>
  );
}
