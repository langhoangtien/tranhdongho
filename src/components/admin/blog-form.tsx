import { useEffect, useRef, useState } from "react";
import { z } from "zod";
import { Button } from "../ui/button";
import { Loader2Icon, X } from "lucide-react";
import { API_URL } from "@/config";
import { toSlug } from "@/lib/utils";
import { toast } from "sonner";
import { uploadImg } from "@/lib/common";
import { Input } from "../ui/input";
import { useNavigate } from "@tanstack/react-router";
import { Textarea } from "../ui/textarea";
import Editor from "../editor";
import { STORAGE_KEY } from "@/auth";
import Image from "../image";

const blogSchema = z.object({
  title: z.string().min(3, "Tiêu đề phải có ít nhất 3 ký tự").max(255),
  content: z.string().optional(),
  description: z.string().max(500).optional(),
  image: z.string().max(255, "URL ảnh quá dài").optional(),
  slug: z.string().max(255),
  collections: z.array(z.string()).optional(),
});

export default function BlogForm({ id }: { id?: string }) {
  const [formData, setFormData] = useState<{
    title: string;
    content: string;
    description: string;
    image: string;
    slug: string;
    collections: string[];
  }>({
    title: "",
    content: "",
    description: "",
    image: "",
    slug: "",
    collections: [],
  });

  const [value, setValue] = useState("");
  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  const editorRef = useRef<{ getContent: () => string } | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      fetchBlog(id);
    }
  }, [id]);

  const fetchBlog = async (id: string) => {
    try {
      const res = await fetch(`${API_URL}/blogs/${id}`);
      if (!res.ok) throw new Error("Có lỗi xảy ra khi lấy dữ liệu");
      const data = await res.json();
      setFormData(data);
    } catch (error) {
      console.error(error);
      toast.error("Không thể lấy dữ liệu blog, thử lại sau!");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && value.trim() !== "") {
      if (!formData.collections.includes(value))
        setFormData((prev) => ({
          ...prev,
          collections: [...prev.collections, value],
        }));

      setValue("");
      e.preventDefault();
    } else if (e.key === "Backspace" && value === "") {
      setFormData((prev) => ({
        ...prev,
        collections: prev.collections.slice(0, prev.collections.length - 1),
      }));
    }
  };

  const handleGetContent = () => {
    if (editorRef.current) {
      const content = editorRef.current.getContent();
      return content;
    }
    return "";
  };
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors((prevErrors) => {
        const newErrors = { ...prevErrors };
        delete newErrors[e.target.name];
        return newErrors;
      });
    }
  };

  const handleChangeImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = await uploadImg(e);
    if (!url) return;
    setFormData((prev) => ({ ...prev, image: url }));
  };

  const validateForm = () => {
    const result = blogSchema.safeParse(formData);
    if (!result.success) {
      const errorMap: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        errorMap[err.path.join(".")] = err.message;
      });
      setErrors(errorMap);
      return false;
    }
    setErrors({});
    return true;
  };

  const onSubmit = async () => {
    if (!validateForm()) return;
    setLoading(true);

    try {
      const token = localStorage.getItem(STORAGE_KEY);
      if (!token) throw new Error("Unauthorized: No token found");
      const slug = toSlug(formData.slug) || toSlug(formData.title);
      const content = handleGetContent();
      const dataClone = {
        ...formData,
        slug: slug,
        content: content,
      };
      const res = await fetch(`${API_URL}/blogs${id ? `/${id}` : ""}`, {
        method: id ? "PATCH" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(dataClone),
      });

      if (!res.ok) throw new Error("Có lỗi xảy ra khi gửi dữ liệu");
      toast.success(`Đã ${id ? "cập nhật" : "tạo mới"} thành công!`);
      navigate({ to: "/admin/blogs" });
    } catch (error) {
      console.error(error);
      toast.error("Không thể gửi dữ liệu, thử lại sau!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl w-full mx-auto p-6 bg-background rounded-lg">
      <h2 className="text-xl font-semibold mb-4">
        {id ? "Chỉnh sửa Blog" : "Thêm Blog Mới"}
      </h2>
      <fieldset disabled={loading} className="grid w-full grid-cols-2 gap-6">
        <div className="col-span-2">
          <label className="block text-sm font-medium mt-1">Tiêu đề*</label>
          <Input
            aria-invalid={!!errors.title}
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
          {errors.title && (
            <p className="text-destructive text-sm mb-0.5">{errors.title}</p>
          )}
        </div>
        <div className="col-span-2">
          <label className="block text-sm font-medium mt-1">Slug</label>
          <Input
            aria-invalid={!!errors.slug}
            name="slug"
            value={formData.slug}
            onChange={handleChange}
          />
          {errors.slug && (
            <p className="text-destructive text-sm mb-0.5">{errors.slug}</p>
          )}
        </div>
        <div className="col-span-2">
          <label className="block text-sm font-medium mt-1">Tags</label>
          <div className="flex flex-grow flex-wrap gap-2 min-h-10 border bg-background border-border p-2 rounded-md">
            {formData.collections.map((value, index) => (
              <button
                key={index}
                className="bg-gray-200 text-sm px-2 py-0.5 mr-2 rounded inline-flex items-center justify-center"
              >
                {value}
                <X
                  strokeWidth={1}
                  size={16}
                  className="ml-2 cursor-pointer"
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      collections: prev.collections.filter(
                        (_, i) => i !== index
                      ),
                    }))
                  }
                />
              </button>
            ))}
            <input
              placeholder="Gõ và nhân Enter để thêm giá trị VD: Techonogy"
              className="border-none focus:outline-none flex-grow"
              value={value}
              onChange={handleChangeValue}
              onKeyDown={handleKeyDown}
            />
          </div>
        </div>
        <div className="col-span-2">
          <label className="block text-sm font-medium mt-1">Mô tả</label>
          <Textarea
            aria-invalid={!!errors.description}
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
          />
        </div>
        <div className="col-span-2">
          <label className="block text-sm font-medium mt-1">Nội dung</label>
          <Editor ref={editorRef} initialContent={formData.content} />
          {errors.content && (
            <p className="text-destructive text-sm mb-0.5">{errors.content}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium mt-1">Ảnh bìa</label>
          <input type="file" onChange={handleChangeImage} />
          {formData.image && (
            <Image
              src={formData.image}
              alt="cover"
              className="mt-2 size-32 object-cover"
            />
          )}
        </div>
      </fieldset>
      <div className="flex justify-end mt-6">
        <Button onClick={onSubmit} disabled={loading}>
          {loading && <Loader2Icon className="animate-spin" />} Lưu lại
        </Button>
      </div>
    </div>
  );
}
