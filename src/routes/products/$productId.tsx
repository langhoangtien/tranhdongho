import ProductPage from "@/components/purfect/product-page";

import { getProductByIdOrSlug } from "@/lib/api";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/products/$productId")({
  component: RouteComponent,
  loader: ({ params }) => getProductByIdOrSlug(params.productId),
  pendingComponent: () => <div>Loading...</div>,
  errorComponent: () => <div>Error!</div>,
});

function RouteComponent() {
  return <ProductPage />;
}
