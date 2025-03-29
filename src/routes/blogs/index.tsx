import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";

import { Skeleton } from "@/components/ui/skeleton";
import { API_URL } from "@/config";
import { IBlog } from "../admin/blogs";
import { Button } from "@/components/ui/button";
import { ChevronsDown, RotateCw } from "lucide-react";

import Image from "@/components/image";
import { Badge } from "@/components/ui/badge";
export const Route = createFileRoute("/blogs/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <Blogpage />;
}

export interface IResponseBlogs {
  data: IBlog[];
  pagination: {
    total: number;
    limit: number;
    page: number;
    totalPages: number;
  };
}

export default function Blogpage() {
  const [blogs, setBlogs] = useState<IBlog[]>([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({ total: 0, totalPages: 0 });
  const [page, setPage] = useState(1);
  const fetchBlogs = async (page: number, reset: boolean = false) => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams({
        page: page.toString(),
        limit: "6",
      });

      const res = await fetch(`${API_URL}/blogs?${queryParams}`);
      if (!res.ok) throw new Error("Can't fetch blogs");
      const data: IResponseBlogs = await res.json();

      setPagination({
        total: data.pagination.total,
        totalPages: data.pagination.totalPages,
      });
      const blogsData = data.data;

      setBlogs((prev) => (reset ? blogsData : [...prev, ...blogsData]));
      setPage(data.pagination.page);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchBlogs(1, true);
  }, []);

  if (loading) return <Skeleton className="h-40 w-full" />;

  return (
    <div className="pt-34 pb-17.5">
      <div className="max-w-[1170px] mx-auto px-4 sm:px-8 xl:px-0">
        <div className="max-w-[770px] mx-auto w-full text-center mb-12.5">
          <h1 className="font-bold text-6xl sm:text-4xl lg:text-3xl text-dark mb-4">
            Archive
          </h1>
          <p>See all posts we have ever written.</p>
        </div>
        <BlogList blogs={blogs} />
      </div>

      <div className="text-center mt-4">
        {page < pagination.totalPages && (
          <Button
            onClick={() => fetchBlogs(page + 1)}
            disabled={loading}
            className="flex items-center gap-2"
            variant="ghost"
          >
            {loading ? (
              <RotateCw className="mr-1 animate-spin" />
            ) : (
              <ChevronsDown />
            )}
            {loading ? "Loading..." : "See more"}
          </Button>
        )}
      </div>
    </div>
  );
}

export function BlogList({ blogs }: { blogs: IBlog[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-11 py-4 gap-x-7.5">
      {blogs.map((blog) => (
        <div key={blog._id} className="group">
          <div className="mb-6 overflow-hidden rounded-md transition-all group-hover:scale-105">
            <Image src={blog.image} alt="image" className="w-full" />
          </div>
          <h4>
            <Link
              to={`/blogs/${blog.slug}`}
              className="block text-dark font-bold text-xl mb-3.5"
            >
              <span className="bg-linear-to-r from-primary/50 to-primary/40 bg-[length:0px_10px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 hover:bg-[length:100%_3px] group-hover:bg-[length:100%_10px]">
                {blog.title}
              </span>
            </Link>
          </h4>
          <p>{blog.description}</p>
          <div className="flex flex-wrap gap-3 items-center justify-between mt-4.5">
            <div className="flex items-center gap-2.5">
              <div className="flex items-center gap-3">
                <div className="flex w-6 h-6 rounded-full overflow-hidden">
                  <Image src={blog.user?.image} alt="user" />
                </div>
                <p className="text-sm">{blog.user?.fullName}</p>
              </div>
              <span className="flex w-[3px] h-[3px] rounded-full bg-dark-2" />
              <p className="text-sm">
                {" "}
                {new Intl.DateTimeFormat("en-US", {
                  month: "short",
                  day: "2-digit",
                  year: "numeric",
                }).format(new Date(blog.createdAt))}
              </p>
            </div>
            <Badge>{!!blog.collections[0] && blog.collections[0]}</Badge>
          </div>
        </div>
      ))}
    </div>
  );
}
