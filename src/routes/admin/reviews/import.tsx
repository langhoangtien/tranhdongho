import Breadcrumbs from "@/components/ui/breadcrumbs";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { API_URL } from "@/config";
import { createFileRoute } from "@tanstack/react-router";
import { ImportIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";

export const Route = createFileRoute("/admin/reviews/import")({
  component: RouteComponent,
});

function RouteComponent() {
  return <ImportReviewsPage />;
}

const reviewSchema = z.object({
  customer: z.string().min(1, "Tên phải có ít nhất 3 ký tự"),
  productId: z.string().min(1, "Product ID không được để trống"),
  title: z.string(),
  body: z.string().min(1, "Nội dung phải có ít nhất 10 ký tự"),
  rating: z.number().min(1).max(5),
  images: z.array(z.string().url("URL hình ảnh không hợp lệ")).optional(),
  videos: z.array(z.string().url("URL video không hợp lệ")).optional(),
  imageUploads: z.array(z.string()).optional(),
  liked: z.number().optional(),
  purchaseVerified: z.boolean().optional(),
  createdAt: z.string(),
});

const reviewsSchema = z.array(reviewSchema);

function ImportReviewsPage() {
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    let parsedData;
    try {
      parsedData = JSON.parse(value);
    } catch (error) {
      console.log("JSON parse error", error);
      toast.error("Lỗi: JSON không hợp lệ");
      return;
    }

    const result = reviewsSchema.safeParse(parsedData);
    if (!result.success) {
      console.log("Validation error", result.error);

      toast.error("Dữ liệu không hợp lệ: " + result.error.errors[0].message);
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Unauthorized: No token found");

      const res = await fetch(`${API_URL}/reviews/bulk-create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(result.data),
      });

      if (!res.ok) {
        const errorResponse = await res.json();
        throw new Error(
          errorResponse.message || "Có lỗi xảy ra khi gửi dữ liệu"
        );
      }

      toast.success("Import thành công!");
      setValue("");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Đã xảy ra lỗi không xác định"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Breadcrumbs
        items={[
          { label: "App", href: "/admin" },
          { label: "Danh sách", href: "/admin/reviews" },
          { label: "Đánh giá", isCurrent: true },
        ]}
      />

      <div className="max-w-7xl w-full mx-auto p-6 bg-background rounded-lg">
        <div className="space-y-4">
          <label className="block text-sm font-medium text-accent-foreground mb-1">
            Nhập chuỗi JSON*
          </label>
          <Textarea
            disabled={loading}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder='{"reviews": [{"customer": "John Doe", "productId": "123", "title": "Great!", "body": "Very nice product", "rating": 5, "createdAt": "2024-03-31T12:00:00Z"}]}'
            className="resize-none h-48"
          />
          <div className="flex justify-end">
            <Button disabled={loading} onClick={handleSubmit}>
              Import <ImportIcon />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
