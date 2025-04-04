import ProductSkeleton from "@/components/product-detail-skeleton";
import PufectPage from "@/components/purfect/purfect-fuel-blend";
import { getProductByIdOrSlug } from "@/lib/api";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/products/purfect-fuel-blend")({
  component: RouteComponent,
  loader: () => getProductByIdOrSlug("purfect-fuel-blend"),
  pendingComponent: () => <ProductSkeleton />,
});

function RouteComponent() {
  return <PufectPage />;
}
