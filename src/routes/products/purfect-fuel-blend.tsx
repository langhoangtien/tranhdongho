import { LoadingTable } from "@/components/loading/table-loading";
import PufectPage from "@/components/purfect/purfect-fuel-blend";
import { getProductByIdOrSlug } from "@/lib/api";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/products/purfect-fuel-blend")({
  component: RouteComponent,
  loader: () => getProductByIdOrSlug("purfect-fuel-blend"),
  pendingComponent: () => <LoadingTable />,
});

function RouteComponent() {
  return <PufectPage />;
}
