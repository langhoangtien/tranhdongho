import { useEffect, useState } from "react";
import { z } from "zod";
import { Button } from "../ui/button";
import { Loader2Icon, Trash2Icon, UserPenIcon } from "lucide-react";
import { API_URL } from "@/config";
import { convertIDToURL, convertURLToID } from "@/lib/utils";
import { toast } from "sonner";
import { uploadImage } from "@/lib/common";
import { Input } from "../ui/input";
import { useNavigate } from "@tanstack/react-router";

const userSchema = z.object({
  username: z
    .string()
    .min(3, "Username phải có ít nhất 3 ký tự")
    .max(255, "Họ và tên quá dài"),
  fullName: z
    .string()
    .min(3, "Họ và tên phải có ít nhất 3 ký tự")
    .max(255, "Họ và tên quá dài"),
  email: z.string().email("Email không hợp lệ"),
  image: z.string().max(255, "URL ảnh quá dài"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .optional(),
});

export default function UserForm({ id }: { id?: string }) {
  const [formData, setFormData] = useState({
    username: "",
    fullName: "",
    email: "",
    image: "",
    password: undefined,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const [editPassword, setEditPassword] = useState(false);
  const navigate = useNavigate();
  const validateForm = () => {
    const result = userSchema.safeParse(formData);
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
  const fetchReview = async (id: string) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Unauthorized: No token found");
      const res = await fetch(`${API_URL}/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error("Có lỗi xảy ra khi lấy dữ liệu");
      const data = await res.json();

      const image = data.image ? convertIDToURL(data.image) : "";
      const dataClone = { ...data, image, password: undefined };
      setFormData(dataClone);
    } catch (error) {
      console.error(error);
      toast.error("Không thể lấy dữ liệu review, thử lại sau!");
    }
  };
  useEffect(() => {
    if (id) {
      fetchReview(id);
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    // Xóa lỗi khi người dùng nhập lại
    if (errors[e.target.name]) {
      setErrors((prevErrors) => {
        const newErrors = { ...prevErrors };
        delete newErrors[e.target.name];
        return newErrors;
      });
    }
  };
  const handleChangeImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = await uploadImage(e);
    if (!url) return;
    setFormData((prev) => ({ ...prev, image: url }));
  };

  const handleSetEditPassword = () => {
    setEditPassword((prev) => !prev);
    setFormData((prev) => ({ ...prev, password: undefined }));
  };
  const onSubmit = async () => {
    if (!validateForm()) return;
    setLoading(true);
    try {
      // Gửi dữ liệu lên API
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Unauthorized: No token found");
      const dataClone = {
        ...formData,
        image: convertURLToID(formData.image) || "",
      };
      const res = await fetch(`${API_URL}/users${id ? `/${id}` : ""}`, {
        method: id ? "PATCH" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(dataClone),
      });

      if (!res.ok) throw new Error("Có lỗi xảy ra khi gửi dữ liệu");

      toast.success(`Đã ${id ? "cập nhật" : "tạo mới"} thành công!`);

      navigate({ to: "/admin/users" });
    } catch (error) {
      console.error(error);
      toast.error("Không thể gửi dữ liệu, thử lại sau!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl w-full mx-auto p-6 bg-background rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Thêm Người dùng mới</h2>
      <fieldset disabled={loading} className="grid w-full grid-cols-3 gap-8 ">
        <div className="col-span-3 md:col-span-1 flex items-center flex-col space-y-4 p-4 justify-center shadow-md rounded-md">
          <label
            htmlFor="image"
            className="cursor-pointer border-dashed border-2 bg-gray-200 p-2 border-border rounded-full  "
            title="Chọn ảnh bìa"
          >
            <img
              src={formData.image || "/no-img.svg"}
              alt="cover"
              className="size-24  object-cover rounded-full"
            />
            <input
              onChange={handleChangeImage}
              id="image"
              name="images"
              type="file"
              className="hidden"
            />
          </label>
          <Button
            disabled={!formData.image}
            onClick={() => setFormData((prev) => ({ ...prev, image: "" }))}
            variant={"outline"}
            size="icon"
          >
            <Trash2Icon strokeWidth={1} />
          </Button>
          <p className="text-sm text-accent-foreground">
            Allowed *.jpeg, *.jpg, *.png, *.webp max size of 2 Mb
          </p>
        </div>
        <div className="col-span-3 md:col-span-2 ">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2 md:col-span-1">
              <label className="block text-sm font-medium text-accent-foreground mb-1">
                Username
              </label>
              <Input
                type="text"
                name="username"
                aria-invalid={!!errors.username}
                value={formData.username}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
              {errors.username && (
                <p className="text-destructive text-sm mt-0.5">
                  {errors.username}
                </p>
              )}
            </div>
            <div className="col-span-2 md:col-span-1">
              <label className="block text-sm font-medium text-accent-foreground mb-1">
                Họ và tên
              </label>
              <Input
                type="text"
                aria-invalid={!!errors.fullName}
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
              {errors.fullName && (
                <p className="text-destructive text-sm mt-0.5">
                  {errors.fullName}
                </p>
              )}
            </div>
            <div className="col-span-2 md:col-span-1">
              <label className="block text-sm font-medium text-accent-foreground mb-1">
                Email
              </label>
              <Input
                aria-invalid={!!errors.email}
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
              {errors.email && (
                <p className="text-destructive text-sm mt-0.5">
                  {errors.email}
                </p>
              )}
            </div>
            <div className="col-span-2 md:col-span-1 ">
              <label className="block text-sm font-medium text-accent-foreground mb-1">
                Mật khẩu
              </label>
              <div className="relative">
                <Input
                  disabled={!editPassword}
                  aria-invalid={!!errors.password}
                  type="password"
                  placeholder="Password"
                  autoComplete="current-password"
                  name="password"
                  value={formData.password || ""}
                  onChange={handleChange}
                />
                <Button
                  type="button"
                  size="icon"
                  variant="ghost"
                  onClick={handleSetEditPassword}
                  className="absolute inset-y-0  right-0 flex items-center"
                >
                  <UserPenIcon
                    strokeWidth={1}
                    className={editPassword ? "text-primary" : ""}
                  />
                </Button>
              </div>
              {errors.email && (
                <p className="text-destructive text-sm mt-0.5">
                  {errors.email}
                </p>
              )}
            </div>
          </div>
        </div>
      </fieldset>
      <div className="flex justify-end mt-8">
        <Button onClick={onSubmit} disabled={loading} type="submit">
          {loading && (
            <Loader2Icon strokeWidth={1.25} className="animate-spin" />
          )}{" "}
          Lưu lại
        </Button>
      </div>
    </div>
  );
}
