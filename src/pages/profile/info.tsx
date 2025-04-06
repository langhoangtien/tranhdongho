import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { add } from "date-fns";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const ProfileSchema = z.object({
  email: z.string().email("Email không hợp lệ!"),
  name: z.string().min(3, "Họ và tên phải có ít nhất 3 ký tự!"),
  code: z.string(),
  gender: z.enum(["0", "1"], { required_error: "Giới tính là bắt buộc!" }),
  dob: z.string(),
  phoneNumber: z.string().regex(/^\d{10,11}$/, "SĐT phải có 10-11 chữ số!"),
  identityCardNumber: z.string().min(9, "CMND/CCCD phải có ít nhất 9 ký tự!"),
  address: z.string().min(1, "Địa chỉ không được để trống!"),
  note: z.string().optional(),
  positions: z.string().optional(),
});

type ProfileData = z.infer<typeof ProfileSchema>;

export default function InfoTab() {
  const [formData, setFormData] = useState<ProfileData>({
    email: "",
    name: "",
    code: "LH987646",
    gender: "0",
    dob: add(new Date(), { years: -18 }).toISOString().split("T")[0],
    phoneNumber: "",
    identityCardNumber: "1234567890",
    address: "",
    note: "",
    positions: "",
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof ProfileData, string>>
  >({});

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setFormData((prev) => ({ ...prev, email: storedUsername }));
    }
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = (): boolean => {
    const result = ProfileSchema.safeParse(formData);
    if (!result.success) {
      const errorObj: Partial<Record<keyof ProfileData, string>> = {};
      result.error.errors.forEach((err) => {
        const field = err.path[0] as keyof ProfileData;
        errorObj[field] = err.message;
      });
      setErrors(errorObj);
      return false;
    }
    setErrors({});
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      console.log(formData);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Thông tin</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-x-4 gap-y-2 md:grid-cols-2">
            <div className="flex flex-col space-y-1">
              <label className="mb-1 font-semibold text-foreground">
                Mã Người dùng
              </label>
              <Input
                type="text"
                name="code"
                value={formData.code}
                disabled
                className="border p-2 rounded"
              />
            </div>
            <div className="flex flex-col space-y-1">
              <label className="mb-1 font-semibold text-foreground">
                Họ và tên
              </label>
              <Input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="border p-2 rounded"
              />
              {errors.name && (
                <p className="text-destructive text-sm">{errors.name}</p>
              )}
            </div>

            <div className="flex flex-col space-y-1">
              <label className="mb-1 font-semibold text-foreground">
                Giới tính
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="border p-2 rounded"
              >
                <option value="">Chọn giới tính</option>
                <option value="0">Nam</option>
                <option value="1">Nữ</option>
              </select>
              {errors.gender && (
                <p className="text-destructive text-sm">{errors.gender}</p>
              )}
            </div>

            <div className="flex flex-col space-y-1">
              {" "}
              <label className="mb-1 font-semibold text-foreground">
                Ngày sinh
              </label>
              <Input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                className="border p-2 rounded"
              />
              {errors.dob && (
                <p className="text-destructive text-sm">{errors.dob}</p>
              )}
            </div>
            <div className="flex flex-col space-y-1">
              <label className="mb-1 font-semibold text-foreground">
                Email
              </label>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="border p-2 rounded"
              />
              {errors.email && (
                <p className="text-destructive text-sm">{errors.email}</p>
              )}
            </div>

            <div className="flex flex-col space-y-1">
              <label className="mb-1 font-semibold text-foreground">
                Số CMND/CCCD
              </label>
              <Input
                type="text"
                name="identityCardNumber"
                value={formData.identityCardNumber}
                disabled
                className="border p-2 rounded"
              />

              {errors.identityCardNumber && (
                <p className="text-destructive text-sm">
                  {errors.identityCardNumber}
                </p>
              )}
            </div>
            <div className="flex flex-col space-y-1">
              <label className="mb-1 font-semibold text-foreground">SĐT</label>
              <Input
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="border p-2 rounded"
              />
              {errors.phoneNumber && (
                <p className="text-destructive text-sm">{errors.phoneNumber}</p>
              )}
            </div>
            <div className="flex flex-col space-y-1">
              <label className="mb-1 font-semibold text-foreground">
                Cấp bậc
              </label>
              <Input
                type="text"
                name="positions"
                value={formData.positions}
                onChange={handleChange}
                className="border p-2 rounded"
              />

              {errors.positions && (
                <p className="text-destructive text-sm">{errors.positions}</p>
              )}
            </div>
            <div className="flex flex-col space-y-1">
              <label className="mb-1 font-semibold text-foreground">
                Địa chỉ
              </label>
              <Textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="border p-2 rounded"
              ></Textarea>
              {errors.address && (
                <p className="text-destructive text-sm">{errors.address}</p>
              )}
            </div>
            <div className="flex flex-col space-y-1">
              <label className="mb-1 font-semibold text-foreground">
                Ghi chú
              </label>
              <Textarea
                name="note"
                value={formData.note}
                onChange={handleChange}
                className="border p-2 rounded"
              ></Textarea>
            </div>
          </div>
          <div className="flex justify-end space-x-2 mt-4">
            <Button
              variant="outline"
              type="button"
              onClick={() =>
                setFormData({
                  email: "",
                  name: "",
                  code: "LH987646",
                  gender: "0",
                  dob: add(new Date(), { years: -18 })
                    .toISOString()
                    .split("T")[0],
                  phoneNumber: "",
                  identityCardNumber: "1234567890",
                  address: "",
                  note: "",
                  positions: "",
                })
              }
            >
              Hủy
            </Button>
            <Button type="submit">Lưu</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
