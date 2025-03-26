import UserForm from "@/components/admin/user-form";
import { createFileRoute, useParams } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/users/$userId")({
  component: RouteComponent,
});

function RouteComponent() {
  const { userId } = useParams({ strict: false });

  return <UserForm id={userId} />;
}
