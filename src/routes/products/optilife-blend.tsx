import PufectPage from "@/components/purfect/purfect-fuel-blend";
import { getProductByIdOrSlug } from "@/lib/api";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/products/optilife-blend")({
  component: RouteComponent,

  loader: () => getProductByIdOrSlug("purfect-fuel-blend"),
  pendingComponent: () => <div>Loading...</div>,
  errorComponent: () => <div>Error!</div>,
});

function RouteComponent() {
  return <PufectPage />;
}
