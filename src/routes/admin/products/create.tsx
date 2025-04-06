import ProductForm from "@/components/admin/product-form";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/products/create")({
  component: RouteComponent,
});

function RouteComponent() {
  return <ProductForm />;
}
