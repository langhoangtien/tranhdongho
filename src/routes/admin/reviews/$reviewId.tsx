import ReviewForm from "@/components/admin/review-form";
import { createFileRoute, useParams } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/reviews/$reviewId")({
  component: RouteComponent,
});

function RouteComponent() {
  const { reviewId } = useParams({ strict: false });

  return <ReviewForm id={reviewId ?? null} />;
}
