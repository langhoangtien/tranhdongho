import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import MainLayout from "@/layout/main-layout";
import { z } from "zod";

// Định nghĩa schema validate bằng Zod
const formSchema = z.object({
  trackingNumber: z
    .string()
    .min(3, "Tracking Number must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
});

export const Route = createFileRoute("/track-order")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <MainLayout>
      <TrackOrder />
    </MainLayout>
  );
}

// Định nghĩa kiểu dữ liệu cho form
type FormData = z.infer<typeof formSchema>;

function TrackOrder() {
  const [formData, setFormData] = useState<FormData>({
    trackingNumber: "",
    email: "",
  });

  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>(
    {}
  );
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));

    // Validate ngay khi nhập
    const fieldValidation = formSchema.safeParse({
      ...formData,
      [name]: value,
    });
    if (!fieldValidation.success) {
      const fieldErrors = fieldValidation.error.flatten().fieldErrors;
      setErrors({
        trackingNumber: fieldErrors.trackingNumber?.[0] || "",
        email: fieldErrors.email?.[0] || "",
      });
    } else {
      setErrors({});
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = formSchema.safeParse(formData);

    if (!validation.success) {
      // Nếu form không hợp lệ, hiển thị lỗi
      const fieldErrors = validation.error.flatten().fieldErrors;
      setErrors({
        trackingNumber: fieldErrors.trackingNumber?.[0] || "",
        email: fieldErrors.email?.[0] || "",
      });
      return;
    }

    // Xử lý khi form hợp lệ
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-4">
      <h2 className="text-center text-3xl font-semibold my-8">
        Order Tracking
      </h2>

      <p>
        Once your order has shipped, you will receive an email from us with a
        link to track your order. You can also enter the tracking number and
        your email in the box below to get the status of your shipment.
      </p>

      {submitted ? (
        <p className="text-destructive">Tracking Number not found</p>
      ) : (
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
          <div>
            <Input
              placeholder="Tracking Number"
              name="trackingNumber"
              value={formData.trackingNumber}
              onChange={handleChange}
            />
            {errors.trackingNumber && (
              <p className="text-destructive text-sm">
                {errors.trackingNumber}
              </p>
            )}
          </div>
          <div>
            <Input
              placeholder="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && (
              <p className="text-destructive text-sm">{errors.email}</p>
            )}
          </div>
          <div>
            <Button type="submit">Track Order</Button>
          </div>
        </form>
      )}

      <p className="font-serif text-gray-400">
        If you just received a shipment notification, please allow 3 to 5
        working days for the tracking information to update.
      </p>
    </div>
  );
}
