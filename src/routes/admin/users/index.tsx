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

export const Route = createFileRoute("/admin/users/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <UserPage />;
}

export interface User {
  _id: string;
  username: string;
  fullName: string;
  email: string;
  createdAt: string;
  image?: string;
}

export default function UserPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const debouncedSearch = useDebounce(search);

  useEffect(() => {
    fetchUsers();
  }, [debouncedSearch, page]);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem(STORAGE_KEY);
      if (!token) throw new Error("Unauthorized: No token found");

      const res = await fetch(
        `${API_URL}/users?page=${page}&limit=10&search=${debouncedSearch}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!res.ok) throw new Error("Failed to fetch Users");

      const data = await res.json();
      setUsers(data.data);
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

      const res = await fetch(`${API_URL}/users/delete-many`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ids: selectedUsers }),
      });

      if (!res.ok) throw new Error("Failed to delete Users");

      setSelectedUsers([]);
      if (page !== 1) {
        setPage(1);
      } else fetchUsers();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    }
  };

  const allSelected = useMemo(
    () => selectedUsers.length === users.length && users.length > 0,
    [selectedUsers, users]
  );

  return (
    <div className="p-6 relative space-y-4">
      {loading && <LoadingTable />}
      <div className="flex h-10 py-3 justify-between space-x-1 items-center">
        <Input
          className="max-w-xs"
          placeholder="Tìm tên hoặc email"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <span className="flex space-x-2">
          <Button
            variant={"outline"}
            size="icon"
            onClick={handleDelete}
            disabled={!selectedUsers.length}
          >
            <TrashIcon
              className={`${selectedUsers.length ? "text-destructive" : ""}`}
              strokeWidth={1}
            />
          </Button>
          <Link to="/admin/products/create">
            <Button size="icon">
              <PlusIcon strokeWidth={1.25} />
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
                  setSelectedUsers(checked ? users.map((u) => u._id) : [])
                }
              />
            </TableHead>
            <TableHead>Tên đăng nhập</TableHead>
            <TableHead>Họ và tên</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Ngày tạo</TableHead>
            <TableHead>Hành động</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {users.map((user) => (
            <TableRow key={user._id}>
              <TableCell>
                <Checkbox
                  checked={selectedUsers.includes(user._id)}
                  onCheckedChange={(checked) =>
                    setSelectedUsers((prev) =>
                      checked
                        ? [...prev, user._id]
                        : prev.filter((id) => id !== user._id)
                    )
                  }
                />
              </TableCell>
              <TableCell>{user.username}</TableCell>
              <TableCell>{user.fullName}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                {user.createdAt
                  ? new Date(user.createdAt).toLocaleDateString()
                  : "N/A"}
              </TableCell>
              <TableCell>
                <Link to="/admin/users/$userId" params={{ userId: user._id }}>
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
  );
}
