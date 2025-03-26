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

export const Route = createFileRoute("/admin/orders/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <OrderPage />;
}

export interface IOrder {
  _id: string;
  email?: string;
  name?: string;
  status: string;
  paymentMethod: string;
  total?: string;
  createdAt: string;
}

export default function OrderPage() {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const debouncedSearch = useDebounce(search);

  useEffect(() => {
    fetchOrders();
  }, [debouncedSearch, page]);

  const fetchOrders = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem(STORAGE_KEY);
      if (!token) throw new Error("Unauthorized: No token found");

      const res = await fetch(
        `${API_URL}/orders?page=${page}&limit=10&search=${debouncedSearch}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!res.ok) throw new Error("Failed to fetch orders");

      const data = await res.json();
      setOrders(data.data);
      setTotalPages(data.pagination.totalPages);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Unknown error");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem(STORAGE_KEY);
      if (!token) throw new Error("Unauthorized: No token found");

      const res = await fetch(`${API_URL}/orders/delete-many`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ids: selectedOrders }),
      });

      if (!res.ok) throw new Error("Failed to delete orders");

      setSelectedOrders([]);
      setPage(1);
      fetchOrders();
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError("Unknown error");
    }
  };

  const allSelected = useMemo(
    () => selectedOrders.length === orders.length && orders.length > 0,
    [selectedOrders, orders]
  );

  return (
    <div className="p-6 relative space-y-4">
      {loading && <LoadingTable />}
      <div className="flex h-10 py-3 justify-between space-x-1 items-center">
        <Input
          className="max-w-xs"
          placeholder="Tìm email hoặc tên khách hàng"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <span className="flex space-x-2">
          <Button
            variant="outline"
            size="icon"
            onClick={handleDelete}
            disabled={!selectedOrders.length}
          >
            <TrashIcon
              className={`${selectedOrders.length ? "text-destructive" : ""}`}
              strokeWidth={1}
            />
          </Button>
          <Link to="/admin/orders/create">
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
                  setSelectedOrders(checked ? orders.map((o) => o._id) : [])
                }
              />
            </TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Tên khách hàng</TableHead>
            <TableHead>Trạng thái</TableHead>
            <TableHead>Phương thức thanh toán</TableHead>
            <TableHead>Tổng tiền</TableHead>
            <TableHead>Ngày tạo</TableHead>
            <TableHead>Hành động</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {orders.map((order) => (
            <TableRow key={order._id}>
              <TableCell>
                <Checkbox
                  checked={selectedOrders.includes(order._id)}
                  onCheckedChange={(checked) =>
                    setSelectedOrders((prev) =>
                      checked
                        ? [...prev, order._id]
                        : prev.filter((id) => id !== order._id)
                    )
                  }
                />
              </TableCell>
              <TableCell>{order.email}</TableCell>
              <TableCell>{order.name}</TableCell>
              <TableCell>{order.status}</TableCell>
              <TableCell>{order.paymentMethod}</TableCell>
              <TableCell>{order.total}</TableCell>
              <TableCell>
                {new Date(order.createdAt).toLocaleDateString()}
              </TableCell>
              <TableCell>
                <Link
                  to="/admin/orders/$orderId"
                  params={{ orderId: order._id }}
                >
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
