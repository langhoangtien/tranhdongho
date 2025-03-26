import OrderForm from "@/components/admin/order-form";
import { createFileRoute, useParams } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/orders/$orderId")({
  component: RouteComponent,
});

function RouteComponent() {
  const { orderId } = useParams({ strict: false });
  return <OrderForm id={orderId} />;
}
