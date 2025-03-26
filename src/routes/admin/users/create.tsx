import UserForm from "@/components/admin/user-form";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/users/create")({
  component: RouteComponent,
});

function RouteComponent() {
  return <UserForm />;
}
