import ProductSkeleton from "@/components/product-detail-skeleton";
import ProductPage from "@/components/purfect/product-page";

import { getProductByIdOrSlug } from "@/lib/api";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/products/$productId")({
  component: RouteComponent,
  loader: ({ params }) => getProductByIdOrSlug(params.productId),
  pendingComponent: () => <ProductSkeleton />,
  errorComponent: () => <div>Error!</div>,
});

function RouteComponent() {
  return <ProductPage />;
}
