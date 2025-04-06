import BlogForm from "@/components/admin/blog-form";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/blogs/create")({
  component: RouteComponent,
});

function RouteComponent() {
  return <BlogForm />;
}
