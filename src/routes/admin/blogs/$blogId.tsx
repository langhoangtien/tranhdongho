import BlogForm from "@/components/admin/blog-form";
import { createFileRoute, useParams } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/blogs/$blogId")({
  component: RouteComponent,
});

function RouteComponent() {
  const { blogId } = useParams({ strict: false });
  return <BlogForm id={blogId} />;
}
