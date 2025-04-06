import { CheckoutPage } from "@/components/checkout-page";
import SimpleLayout from "@/layout/simple-layout";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/checkout")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <SimpleLayout>
      <CheckoutPage />
    </SimpleLayout>
  );
}
