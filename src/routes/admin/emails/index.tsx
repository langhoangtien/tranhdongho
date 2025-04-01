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
import { Edit, TrashIcon, PlusIcon } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { useDebounce } from "@/hooks/use-debounce";
import { API_URL } from "@/config";
import { STORAGE_KEY } from "@/auth";
import { LoadingTable } from "@/components/loading/table-loading";
import Breadcrumbs from "@/components/ui/breadcrumbs";
import { SortableHeader } from "@/components/admin/table-custom";

export const Route = createFileRoute("/admin/emails/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <EmailPage />;
}

export interface IEmail {
  _id: string;
  sender: string;
  recipient: string;
  subject: string;
  body: string;
  status: "sent" | "failed" | "draft" | "queued";
  createdAt: string;
}

export default function EmailPage() {
  const [emails, setEmails] = useState<IEmail[]>([]);
  const [selectedEmails, setSelectedEmails] = useState<string[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sortField, setSortField] = useState<string>("createdAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const debouncedSearch = useDebounce(search);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch]);

  useEffect(() => {
    fetchEmails();
  }, [debouncedSearch, page, sortField, sortOrder]);

  const fetchEmails = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem(STORAGE_KEY);
      if (!token) throw new Error("Unauthorized: No token found");

      const res = await fetch(
        `${API_URL}/emails?page=${page}&limit=10&search=${debouncedSearch}&sortBy=${sortField}&sortOrder=${sortOrder}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!res.ok) throw new Error("Failed to fetch emails");

      const data = await res.json();
      setEmails(data.data);
      setTotalPages(data.pagination?.totalPages ?? 1);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };
  const handleSort = (field: string) => {
    setSortField(field);
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem(STORAGE_KEY);
      if (!token) throw new Error("Unauthorized: No token found");

      const res = await fetch(`${API_URL}/emails/delete-many`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ids: selectedEmails }),
      });

      if (!res.ok) throw new Error("Failed to delete emails");

      setSelectedEmails([]);
      setPage(1);
      fetchEmails();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Unknown error");
    }
  };

  const allSelected = useMemo(
    () => selectedEmails.length === emails.length && emails.length > 0,
    [selectedEmails, emails]
  );
  return (
    <div>
      <Breadcrumbs
        items={[
          { label: "App", href: "/admin" },
          { label: "Emails", isCurrent: true },
        ]}
      />
      <div className="p-6 relative space-y-4">
        {loading && <LoadingTable />}
        <div className="flex h-10 py-3 justify-between space-x-1 items-center">
          <Input
            className="max-w-xs"
            placeholder="Tìm theo người gửi hoặc chủ đề"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <span className="flex space-x-2">
            <Button
              variant="outline"
              size="icon"
              onClick={handleDelete}
              disabled={!selectedEmails.length}
            >
              <TrashIcon
                className={`$ {selectedEmails.length ? "text-destructive" : ""}`}
                strokeWidth={1}
              />
            </Button>
            <Link to="/admin/emails/create">
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
                    setSelectedEmails(checked ? emails.map((r) => r._id) : [])
                  }
                />
              </TableHead>
              <SortableHeader
                field="sender"
                label="Người gửi"
                sortField={sortField}
                sortOrder={sortOrder}
                onSort={handleSort}
              />
              <SortableHeader
                field="recipient"
                label="Người nhận"
                sortField={sortField}
                sortOrder={sortOrder}
                onSort={handleSort}
              />
              <SortableHeader
                field="subject"
                label="Chủ đề"
                sortField={sortField}
                sortOrder={sortOrder}
                onSort={handleSort}
              />

              <SortableHeader
                field="status"
                label="Trạng thái"
                sortField={sortField}
                sortOrder={sortOrder}
                onSort={handleSort}
              />
              <SortableHeader
                field="createdAt"
                label="Ngày gửi"
                sortField={sortField}
                sortOrder={sortOrder}
                onSort={handleSort}
              />
              <TableHead>Hành động</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {emails.map((email) => (
              <TableRow key={email._id}>
                <TableCell>
                  <Checkbox
                    checked={selectedEmails.includes(email._id)}
                    onCheckedChange={(checked) =>
                      setSelectedEmails((prev) =>
                        checked
                          ? [...prev, email._id]
                          : prev.filter((id) => id !== email._id)
                      )
                    }
                  />
                </TableCell>
                <TableCell>{email.sender}</TableCell>
                <TableCell>{email.recipient}</TableCell>
                <TableCell>{email.subject}</TableCell>
                <TableCell>{email.status}</TableCell>
                <TableCell>
                  {new Date(email.createdAt).toLocaleString("vi-VN", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                  })}
                </TableCell>
                <TableCell>
                  <Link
                    to="/admin/emails/$emailId"
                    params={{ emailId: email._id }}
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
    </div>
  );
}
