import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Edit, PlusIcon, TrashIcon } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { useDebounce } from "@/hooks/use-debounce";
import { API_URL } from "@/config";
import { STORAGE_KEY } from "@/auth";
import { LoadingTable } from "@/components/loading/table-loading";
import Breadcrumbs from "@/components/ui/breadcrumbs";

export const Route = createFileRoute("/admin/blogs/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <BlogPage />;
}

export interface IBlog {
  _id: string;
  title: string;
  content: string;
  description?: string;
  image?: string;
  user?: {
    _id: string;
    fullName: string;
    email: string;
    image: string;
  };
  slug: string;
  collections: string[];
  createdAt: string;
}

function BlogPage() {
  const [blogs, setBlogs] = useState<IBlog[]>([]);
  const [selectedBlogs, setSelectedBlogs] = useState<string[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const debouncedSearch = useDebounce(search);

  useEffect(() => {
    fetchBlogs();
  }, [debouncedSearch, page]);

  const fetchBlogs = async () => {
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem(STORAGE_KEY);
      if (!token) throw new Error("Unauthorized: No token found");

      const res = await fetch(
        `${API_URL}/blogs?page=${page}&limit=10&search=${debouncedSearch}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!res.ok) throw new Error("Failed to fetch blogs");

      const data = await res.json();
      setBlogs(data.data);
      setTotalPages(data.pagination.totalPages);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem(STORAGE_KEY);
      if (!token) throw new Error("Unauthorized: No token found");

      const res = await fetch(`${API_URL}/blogs/delete-many`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ids: selectedBlogs }),
      });

      if (!res.ok) throw new Error("Failed to delete blogs");

      setSelectedBlogs([]);
      setPage(1);
      fetchBlogs();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    }
  };

  const allSelected = useMemo(
    () => selectedBlogs.length === blogs.length && blogs.length > 0,
    [selectedBlogs, blogs]
  );

  return (
    <div>
      <Breadcrumbs
        items={[
          { label: "App", href: "/admin" },
          { label: "Danh sách", isCurrent: true },
        ]}
      />
      <div className="p-6 relative space-y-4">
        {loading && <LoadingTable />}
        <div className="flex h-10 py-3 justify-between space-x-1 items-center">
          <Input
            className="max-w-xs"
            placeholder="Tìm tiêu đề bài viết"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <span className="flex space-x-2">
            <Button
              variant="outline"
              size="icon"
              onClick={handleDelete}
              disabled={!selectedBlogs.length}
            >
              <TrashIcon
                className={`${selectedBlogs.length ? "text-destructive" : ""}`}
                strokeWidth={1}
              />
            </Button>
            <Link to="/admin/blogs/create">
              <Button size="icon">
                <PlusIcon />
              </Button>
            </Link>
          </span>
        </div>
        {error && <p className="text-red-500">{error}</p>}

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <Checkbox
                  checked={allSelected}
                  onCheckedChange={(checked) =>
                    setSelectedBlogs(checked ? blogs.map((b) => b._id) : [])
                  }
                />
              </TableHead>
              <TableHead className="max-w-sm">Tiêu đề</TableHead>
              <TableHead>Slug</TableHead>
              <TableHead>Tác giả</TableHead>
              <TableHead>Ngày tạo</TableHead>
              <TableHead>Hành động</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {blogs.map((blog) => (
              <TableRow key={blog._id}>
                <TableCell>
                  <Checkbox
                    checked={selectedBlogs.includes(blog._id)}
                    onCheckedChange={(checked) =>
                      setSelectedBlogs((prev) =>
                        checked
                          ? [...prev, blog._id]
                          : prev.filter((id) => id !== blog._id)
                      )
                    }
                  />
                </TableCell>
                <TableCell>{blog.title}</TableCell>
                <TableCell>{blog.slug}</TableCell>
                <TableCell>{blog.user?.fullName}</TableCell>
                <TableCell>
                  {new Date(blog.createdAt).toLocaleString("vi-VN", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                  })}
                </TableCell>
                <TableCell>
                  <Link to="/admin/blogs/$blogId" params={{ blogId: blog._id }}>
                    <Button variant="outline" size="icon">
                      <Edit strokeWidth={1} className="cursor-pointer" />
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="flex justify-between mt-4">
          <Button disabled={page === 1} onClick={() => setPage((p) => p - 1)}>
            Prev
          </Button>
          <span>
            Page {page} of {totalPages}
          </span>
          <Button
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
