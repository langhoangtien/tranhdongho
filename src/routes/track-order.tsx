import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import MainLayout from "@/layout/main-layout";
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

interface FormData {
  trackingNumber: string;
}
function TrackOrder() {
  const [formData, setFormData] = useState<FormData>({
    trackingNumber: "",
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = (): boolean => {
    const newErrors: Partial<FormData & { attachmentsError?: string }> = {};

    if (!formData.trackingNumber)
      newErrors.trackingNumber = "Tracking Number is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    // Clear error when input is valid
    const newErrors = { ...errors };
    if (name === "trackingNumber" && value.trim()) {
      delete newErrors.trackingNumber;
    }

    setFormData({ ...formData, [name]: value });
    setErrors(newErrors);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);

      setErrors({ trackingNumber: "Tracking Number not found" });
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-4">
      <h2 className="text-center text-3xl font-semibold my-8">
        Order Tracking
      </h2>

      <p>
        Once your order has shipped, you will receive an email from us with a
        link to track your order. You can also enter the order name and your
        email in the box below to get the status of your shipment.
      </p>
      {submitted ? (
        <p className="text-red-500">Tracking Number not found</p>
      ) : (
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
          <Input
            placeholder="Tracking Number"
            name="trackingNumber"
            value={formData.trackingNumber}
            onChange={handleChange}
          />
          {errors.trackingNumber && (
            <p className="text-red-500 text-sm">{errors.trackingNumber}</p>
          )}
          <div>
            {" "}
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
