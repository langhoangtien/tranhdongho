import OrderForm from "@/components/admin/order-form";

import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/orders/create")({
  component: RouteComponent,
});

function RouteComponent() {
  return <OrderForm />;
}
