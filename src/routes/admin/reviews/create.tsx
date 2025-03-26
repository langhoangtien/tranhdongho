import ReviewForm from "@/components/admin/review-form";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/reviews/create")({
  component: RouteComponent,
});

function RouteComponent() {
  return <ReviewForm />;
}
