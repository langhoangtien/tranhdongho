import { useEffect, useState } from "react";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

import { toast } from "sonner";
import { Loader2, UploadCloud, XIcon } from "lucide-react";

import { uploadImgs } from "@/lib/common";

import { DatePicker2 } from "@/components/ui/date-picker";
import { API_URL } from "@/config";
import { Select } from "../ui/select-custom";
import { useNavigate } from "@tanstack/react-router";
import { Checkbox } from "../ui/checkbox";
import Image from "../image";

// ✅ Định nghĩa schema validation bằng Zod
const reviewSchema = z.object({
  customer: z.string().min(3, "Tên phải có ít nhất 3 ký tự"),
  productId: z.string().min(1, "Product ID không được để trống"),
  title: z.string().min(5, "Tiêu đề phải có ít nhất 5 ký tự"),
  body: z.string().min(10, "Nội dung phải có ít nhất 10 ký tự"),
  rating: z.coerce.number().min(1).max(5),
  images: z.array(z.string().url("URL hình ảnh không hợp lệ")),
  videos: z.array(z.string().url("URL video không hợp lệ")),
  imageUploads: z.array(z.string()),
  liked: z.number().optional(),
  purchaseVerified: z.boolean().optional(),
  createdAt: z.string(),
});

export default function ReviewForm({ id }: { id?: string }) {
  const [loading, setLoading] = useState(false);
  const fetchReview = async (id: string) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Unauthorized: No token found");
      const res = await fetch(`${API_URL}/reviews/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error("Có lỗi xảy ra khi lấy dữ liệu");
      const data = await res.json();

      const dataClone = { ...data };
      setFormData(dataClone);
      console.log("dsdsd", dataClone);
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
  // State lưu dữ liệu form
  const [formData, setFormData] = useState({
    customer: "",
    productId: "",
    title: "",
    body: "",
    createdAt: new Date().toISOString(),
    rating: 5,
    liked: 0,
    purchaseVerified: false,
    images: [] as string[],
    videos: [] as string[],
    imageUploads: [] as string[],
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [imageUrl, setImageUrl] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const navigate = useNavigate();
  // Xử lý khi người dùng nhập dữ liệu
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUploadImages = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setIsUploading(true);

    const imagesUpload = await uploadImgs(e);
    if (!imagesUpload) {
      setIsUploading(false);
      return;
    }
    setFormData({
      ...formData,
      imageUploads: [...formData.imageUploads, ...imagesUpload],
    });
    setIsUploading(false);
  };

  // Xử lý thêm URL ảnh
  const addImage = () => {
    if (imageUrl.trim() !== "") {
      setFormData({
        ...formData,
        images: [...formData.images, imageUrl.trim()],
      });
      setImageUrl("");
    }
  };

  const removeImage = (
    e: React.MouseEvent<HTMLButtonElement>,
    index: number
  ) => {
    setFormData({
      ...formData,
      images: formData.images.filter((_, i) => i !== index),
    });
    e.preventDefault();
  };

  const removeImageUpload = (
    e: React.MouseEvent<HTMLButtonElement>,
    index: number
  ) => {
    setFormData({
      ...formData,
      imageUploads: formData.imageUploads.filter((_, i) => i !== index),
    });
    e.preventDefault();
  };
  const removeVideo = (
    e: React.MouseEvent<HTMLButtonElement>,
    index: number
  ) => {
    setFormData({
      ...formData,
      videos: formData.videos.filter((_, i) => i !== index),
    });
    e.preventDefault();
  };
  // Xử lý thêm URL video
  const addVideo = () => {
    if (videoUrl.trim() !== "") {
      setFormData({
        ...formData,
        videos: [...formData.videos, videoUrl.trim()],
      });
      setVideoUrl("");
    }
  };

  const validateForm = () => {
    const result = reviewSchema.safeParse(formData);
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
  // Xử lý gửi form
  const onSubmit = async () => {
    if (!validateForm()) return;
    setLoading(true);
    try {
      // Gửi dữ liệu lên API
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Unauthorized: No token found");

      const res = await fetch(`${API_URL}/reviews${id ? `/${id}` : ""}`, {
        method: id ? "PATCH" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Có lỗi xảy ra khi gửi dữ liệu");

      toast.success(`Đã ${id ? "cập nhật" : "tạo mới"} thành công!`);
      navigate({ to: "/admin/reviews" });
    } catch (error) {
      console.error(error);
      toast.error("Không thể gửi review, thử lại sau!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl w-full mx-auto p-6 bg-background rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Thêm Review Mới</h2>
      <fieldset disabled={loading} className="grid w-full grid-cols-2 gap-8 ">
        {/* Customer Name */}
        <div className="col-span-2 md:col-span-1">
          <label
            className="block text-sm font-medium text-accent-foreground mb-1"
            htmlFor="customer"
          >
            Tên khách hàng
          </label>
          <Input
            aria-invalid={!!errors.customer}
            name="customer"
            value={formData.customer}
            onChange={handleChange}
            placeholder="Nhập tên"
          />
          {errors.customer && (
            <p className="text-destructive text-sm mt-0.5">{errors.customer}</p>
          )}
        </div>
        <div className="col-span-2 md:col-span-1">
          <label
            className="block text-sm font-medium text-accent-foreground mb-1"
            htmlFor=""
          >
            Product ID
          </label>
          <Input
            aria-invalid={!!errors.productId}
            name="productId"
            value={formData.productId}
            onChange={handleChange}
            placeholder="Nhập ID sản phẩm"
          />
          {errors.productId && (
            <p className="text-destructive text-sm mt-0.5">
              {errors.productId}
            </p>
          )}
        </div>
        {/* Product ID */}
        <div className="col-span-2 md:col-span-1  ">
          <label
            className="block text-sm font-medium text-accent-foreground mb-1"
            htmlFor="liked"
          >
            Lượt thích
          </label>
          <div className="flex items-center space-x-4">
            {" "}
            <Input
              aria-invalid={!!errors.liked}
              name="liked"
              value={formData.liked}
              className="w-24"
              type="number"
              onChange={(e) =>
                setFormData({ ...formData, liked: +e.target.value })
              }
              placeholder="Số lượt thích"
            />
            <div className="space-x-2 flex items-center shrink-0">
              {" "}
              <Checkbox
                id="purchaseVerified"
                name="purchaseVerified"
                checked={formData.purchaseVerified}
                onCheckedChange={(value) =>
                  setFormData({ ...formData, purchaseVerified: !!value })
                }
              />
              <label
                htmlFor="purchaseVerified"
                className="text-sm shrink-0 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Xác nhận mua hàng
              </label>
            </div>
          </div>
        </div>

        {/* Title */}
        <div className="col-span-2 md:col-span-1">
          <label
            className="block text-sm font-medium text-accent-foreground mb-1"
            htmlFor="title"
          >
            Tiêu đề
          </label>
          <Input
            aria-invalid={!!errors.title}
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Nhập tiêu đề"
          />
          {errors.title && (
            <p className="text-destructive text-sm mt-0.5">{errors.title}</p>
          )}
        </div>

        {/* Ngày tạo */}
        <div className="col-span-2 md:col-span-1">
          <label
            className="block text-sm font-medium text-accent-foreground mb-1"
            htmlFor="createdAt"
          >
            Ngày tạo
          </label>
          <DatePicker2
            aria-invalid={!!errors.createdAt}
            value={
              formData.createdAt ? new Date(formData.createdAt) : undefined
            }
            setValue={(date: Date | undefined) =>
              setFormData({
                ...formData,
                createdAt: date ? date.toISOString() : "",
              })
            }
            className={
              errors.createdAt ? "border-destructive bg-destructive/10" : ""
            }
          />

          {errors.createdAt && (
            <p className="text-destructive text-sm mt-0.5">
              {errors.createdAt}
            </p>
          )}
        </div>

        {/* Body */}
        <div className="col-span-2 md:col-span-1">
          <label
            className="block text-sm font-medium text-accent-foreground mb-1"
            htmlFor="body"
          >
            Nội dung
          </label>
          <Textarea
            aria-invalid={!!errors.body}
            name="body"
            value={formData.body}
            onChange={handleChange}
            placeholder="Nhập nội dung"
          />
          {errors.body && (
            <p className="text-destructive text-sm mt-0.5">{errors.body}</p>
          )}
        </div>

        {/* Rating */}
        <div className="col-span-2 md:col-span-1">
          <label
            className="block text-sm font-medium text-accent-foreground mb-1"
            htmlFor="rating"
          >
            Đánh giá
          </label>

          <Select
            value={formData.rating}
            onChange={(e) =>
              setFormData({ ...formData, rating: +e.target.value })
            }
          >
            <option value="1">1 sao</option>
            <option value="2">2 sao</option>
            <option value="3">3 sao</option>
            <option value="4">4 sao</option>
            <option value="5">5 sao</option>
          </Select>
          {errors.rating && (
            <p className="text-destructive text-sm mt-0.5">{errors.rating}</p>
          )}
        </div>

        {/* Image URLs */}
        <div className="col-span-2 md:col-span-1">
          <label className="block text-sm font-medium text-accent-foreground mb-1">
            Hình ảnh (URL)
          </label>
          <div className="flex gap-2 items-center">
            <Input
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="Nhập URL hình ảnh"
            />
            <Button type="button" className="h-9" onClick={addImage}>
              Thêm
            </Button>
            <label className="cursor-pointer" htmlFor="images-upload">
              <input
                id="images-upload"
                className="hidden"
                type="file"
                disabled={isUploading}
                onChange={handleUploadImages}
                name="images"
                multiple
              />

              <Button className="pointer-events-none" size={"icon"}>
                <UploadCloud />
              </Button>
            </label>
          </div>
          <div className="flex gap-2 mt-2 flex-wrap">
            {formData.images.map((img, index) => (
              <div className="relative" key={index}>
                <button
                  onClick={(e) => removeImage(e, index)}
                  className="absolute z-10 top-1  right-1 bg-background p-1 rounded-full"
                >
                  <XIcon size={16} />
                </button>
                <img
                  key={index}
                  src={img}
                  alt="Hình ảnh"
                  className="size-16 md:size-20 object-cover rounded-md"
                />
              </div>
            ))}
            {formData.imageUploads?.map((img, index) => (
              <div className="relative" key={index}>
                <button
                  onClick={(e) => removeImageUpload(e, index)}
                  className="absolute z-10 top-1  right-1 bg-background p-1 rounded-full"
                >
                  <XIcon size={16} />
                </button>
                <Image
                  key={index}
                  src={img}
                  alt="Hình ảnh"
                  className="size-16 md:size-20 object-cover rounded-md"
                />
              </div>
            ))}
          </div>
          {errors.images && (
            <p className="text-destructive text-sm mt-0.5">{errors.images}</p>
          )}
        </div>

        {/* Video URLs */}
        <div className="col-span-2 md:col-span-1">
          <label>Videos (URL)</label>
          <div className="flex gap-2 items-center">
            <Input
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              placeholder="Nhập URL video"
            />
            <Button type="button" onClick={addVideo}>
              Thêm
            </Button>
          </div>
          <div className="flex gap-2 mt-2 flex-wrap">
            {formData.videos.map((vid, index) => (
              <div className="relative" key={index}>
                <button
                  onClick={(e) => removeVideo(e, index)}
                  className="absolute z-10 top-1  right-1 bg-background p-1 rounded-full"
                >
                  <XIcon size={16} />
                </button>
                <video
                  key={index}
                  src={vid}
                  controls
                  preload="none"
                  className="size-16 md:size-20 rounded-md"
                />
              </div>
            ))}
          </div>
          {errors.videos && (
            <p className="text-destructive text-sm mt-0.5">{errors.videos}</p>
          )}
        </div>
      </fieldset>
      <div className="flex justify-end">
        <Button onClick={onSubmit} disabled={loading} type="submit">
          {loading && <Loader2 strokeWidth={1.25} className="animate-spin" />}{" "}
          Lưu lại
        </Button>
      </div>
    </div>
  );
}
