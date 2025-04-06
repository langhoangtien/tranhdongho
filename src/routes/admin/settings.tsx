import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { API_URL } from "@/config";
import { toast } from "sonner";
import Breadcrumbs from "@/components/ui/breadcrumbs";
export const Route = createFileRoute("/admin/settings")({
  component: RouteComponent,
});

function RouteComponent() {
  return <SettingsForm />;
}

export const settingsSchema = z.object({
  companyName: z.string().optional(),
  companyAddress: z.string().optional(),
  companyPhone: z.string().optional(),
  companWebsite: z.string().url().optional(),
  mailService: z.enum(["Gmail", "Zoho", "SendGrid"]).optional(),
  smtpUser: z.string().optional(),
  smtpPass: z.string().optional(),
  paypalClientId: z.string().optional(),
  paypalSecret: z.string().optional(),
  paypalMode: z.enum(["Sandbox", "Production"]).optional(),
  facebookPixelId: z.string().optional(),
});

type SettingsInput = z.infer<typeof settingsSchema>;

function SettingsForm() {
  const [formData, setFormData] = useState<SettingsInput>({
    companyName: "",
    companyAddress: "",
    companyPhone: "",
    companWebsite: "",
    mailService: "Zoho",
    smtpUser: "",
    smtpPass: "",
    paypalClientId: "",
    paypalSecret: "",
    paypalMode: "Sandbox",
    facebookPixelId: "",
  });
  const [errors, setErrors] = useState<
    Partial<Record<keyof SettingsInput, string>>
  >({});
  const [loading, setLoading] = useState(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSelectChange = (key: keyof SettingsInput, value: string) => {
    setFormData({ ...formData, [key]: value });
  };
  const validateForm = () => {
    const result = settingsSchema.safeParse(formData);
    if (!result.success) {
      const errorMap: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        errorMap[err.path.join(".")] = err.message;
      });
      setErrors(errorMap);
      console.log(errorMap);

      return false;
    }
    setErrors({});
    return true;
  };

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Unauthorized: No token found");

        const res = await fetch(`${API_URL}/settings`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Có lỗi xảy ra khi lấy dữ liệu");

        const data = await res.json();
        console.log("Dữ liệu từ API:", data);

        // Cập nhật state với callback để đảm bảo dữ liệu mới nhất
        setFormData((prev) => ({ ...prev, ...data }));
      } catch (error) {
        console.error(error);
        toast.error("Không thể lấy dữ liệu review, thử lại sau!");
      }
    };

    fetchSettings();
  }, []);
  const handleSubmit = async () => {
    if (!validateForm()) return;
    setLoading(true);
    try {
      // Gửi dữ liệu lên API
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Unauthorized: No token found");

      const res = await fetch(`${API_URL}/settings`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Có lỗi xảy ra khi gửi dữ liệu");

      toast.success(`Cập nhật thành công!`);
    } catch (error) {
      console.error(error);
      toast.error("Không thể gửi settings, thử lại sau!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {" "}
      <div className="p-4">
        {" "}
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Dashboard", href: "/admin" },
            { label: "Settings", isCurrent: true }, // Trang hiện tại không có href
          ]}
        />
      </div>
      <div className="max-w-7xl w-full mx-auto p-6 bg-background rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Cài đặt hệ thống</h2>
        <fieldset disabled={loading} className="grid w-full grid-cols-2 gap-8 ">
          <div className="col-span-2 md:col-span-1 space-y-4">
            <div>
              <label className="block text-sm font-medium text-accent-foreground mb-1">
                Tên công ty
              </label>
              <Input
                placeholder="Company Name"
                name="companyName"
                onChange={handleChange}
                value={formData.companyName}
                aria-invalid={!!errors.companyName}
              />
              {errors.companyName && (
                <p className="text-destructive text-sm">{errors.companyName}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-accent-foreground mb-1">
                Số điện thoại
              </label>
              <Input
                placeholder="Company Phone"
                name="companyPhone"
                value={formData.companyPhone}
                aria-invalid={!!errors.companyPhone}
                onChange={handleChange}
              />
              {errors.companyPhone && (
                <p className="text-destructive text-sm">
                  {errors.companyPhone}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-accent-foreground mb-1">
                Địa chỉ công ty
              </label>
              <Input
                placeholder="Company Address"
                name="companyAddress"
                onChange={handleChange}
                value={formData.companyAddress}
                aria-invalid={!!errors.companyAddress}
              />
              {errors.companyAddress && (
                <p className="text-destructive text-sm">
                  {errors.companyAddress}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-accent-foreground mb-1">
                Website
              </label>
              <Input
                placeholder="Website URL"
                name="companWebsite"
                value={formData.companWebsite}
                aria-invalid={!!errors.companWebsite}
                onChange={handleChange}
              />
              {errors.companWebsite && (
                <p className="text-destructive text-sm">
                  {errors.companWebsite}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-accent-foreground mb-1">
                Facebook Pixel ID
              </label>
              <Input
                placeholder="Facebook Pixel ID"
                name="facebookPixelId"
                value={formData.facebookPixelId}
                aria-invalid={!!errors.facebookPixelId}
                onChange={handleChange}
              />
              {errors.companWebsite && (
                <p className="text-destructive text-sm">
                  {errors.facebookPixelId}
                </p>
              )}
            </div>
          </div>
          <div className="col-span-2 md:col-span-1 space-y-4">
            <div>
              <label className="block text-sm font-medium text-accent-foreground mb-1">
                Dịch vụ email
              </label>
              <Select
                defaultValue={formData.mailService}
                onValueChange={(value) =>
                  handleSelectChange("mailService", value)
                }
                value={formData.mailService}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Mail Service" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Gmail">Gmail</SelectItem>
                  <SelectItem value="Zoho">Zoho</SelectItem>
                  <SelectItem value="SendGrid">SendGrid</SelectItem>
                </SelectContent>
              </Select>
              {errors.mailService && (
                <p className="text-destructive text-sm">{errors.mailService}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-accent-foreground mb-1">
                Email SMTP
              </label>
              <Input
                placeholder="SMTP User"
                name="smtpUser"
                value={formData.smtpUser}
                aria-invalid={!!errors.smtpUser}
                onChange={handleChange}
              />
              {errors.smtpUser && (
                <p className="text-destructive text-sm">{errors.smtpUser}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-accent-foreground mb-1">
                Mật khẩu SMTP
              </label>
              <Input
                placeholder="SMTP Pass"
                name="smtpPass"
                value={formData.smtpPass}
                aria-invalid={!!errors.smtpPass}
                onChange={handleChange}
              />
              {errors.smtpPass && (
                <p className="text-destructive text-sm">{errors.smtpPass}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-accent-foreground mb-1">
                PayPal Mode
              </label>
              <Select
                defaultValue={formData.paypalMode}
                onValueChange={(value) =>
                  handleSelectChange("paypalMode", value)
                }
                value={formData.paypalMode}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select PayPal Mode" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Sandbox">Development</SelectItem>
                  <SelectItem value="Production">Production</SelectItem>
                </SelectContent>
              </Select>
              {errors.paypalMode && (
                <p className="text-destructive text-sm">{errors.paypalMode}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-accent-foreground mb-1">
                PayPal Client ID
              </label>
              <Input
                placeholder="PayPal Client ID"
                name="paypalClientId"
                value={formData.paypalClientId}
                aria-invalid={!!errors.paypalClientId}
                onChange={handleChange}
              />
              {errors.paypalClientId && (
                <p className="text-destructive text-sm">
                  {errors.paypalClientId}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-accent-foreground mb-1">
                PayPal Secret
              </label>
              <Input
                placeholder="PayPal Secret"
                name="paypalSecret"
                value={formData.paypalSecret}
                aria-invalid={!!errors.paypalSecret}
                onChange={handleChange}
              />
              {errors.paypalSecret && (
                <p className="text-destructive text-sm">
                  {errors.paypalSecret}
                </p>
              )}
            </div>
          </div>
          <div className="flex justify-end col-span-2">
            {" "}
            <Button onClick={handleSubmit}>Submit</Button>
          </div>
        </fieldset>
      </div>
    </div>
  );
}
