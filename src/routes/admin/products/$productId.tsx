import ProductForm from "@/components/admin/product-form";
import { createFileRoute, useParams } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/products/$productId")({
  component: RouteComponent,
});

function RouteComponent() {
  const { productId } = useParams({ strict: false });

  return <ProductForm id={productId ?? null} />;
}
