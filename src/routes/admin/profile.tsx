import ProfilePage from "@/pages/profile";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/profile")({
  component: RouteComponent,
});

function RouteComponent() {
  return <ProfilePage />;
}
