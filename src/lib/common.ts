const FILE_SIZE = 2 * 1024 * 1024; // 2MB

import { toast } from "sonner";

import { convertIDToURL } from "./utils";
import { STORAGE_KEY } from "@/auth";
import { API_URL } from "@/config";

export const uploadImage = async (
  e: React.ChangeEvent<HTMLInputElement>,
  dimension?: number
) => {
  const file = e.target.files?.[0];
  if (!file) return null;
  const formData = new FormData();

  // Chỉ chấp nhận file ảnh (có thể thêm các loại khác)
  if (!file.type.startsWith("image/")) {
    toast.error(`"${file.name}" is not a valid image file.`);
    return null;
  }

  // Giới hạn kích thước file (2MB)
  if (file.size > FILE_SIZE) {
    toast.error(`"${file.name}" is too large. Max 2MB`);
    return null;
  }

  formData.append("image", file);
  try {
    const res = await fetch(`${API_URL}/uploads/single`, {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${localStorage.getItem(STORAGE_KEY)}`,
      },
    });

    const data: { message: string; file: string } = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Upload failed.");
    }

    const imageUpload = convertIDToURL(data.file, dimension ?? 250);
    return imageUpload;
  } catch (err) {
    console.error("Failed to upload images", err);
    toast.error("Failed to upload images");
    return null;
  }
};

export const uploadImages = async (e: React.ChangeEvent<HTMLInputElement>) => {
  const files = e.target.files;
  if (!files) return;

  const formData = new FormData();
  let validFilesCount = 0;

  for (let i = 0; i < files.length; i++) {
    const file = files[i];

    // Chỉ chấp nhận file ảnh (có thể thêm các loại khác)
    if (!file.type.startsWith("image/")) {
      toast.error(`"${file.name}" is not a valid image file.`);
      continue;
    }

    // Giới hạn kích thước file (2MB)
    if (file.size > FILE_SIZE) {
      toast.error(`"${file.name}" is too large. Max 2MB`);
      continue;
    }

    formData.append("images", file);
    validFilesCount++;
  }

  if (validFilesCount === 0) {
    toast.error("No valid images to upload.");
    return;
  }

  try {
    const res = await fetch(`${API_URL}/uploads/multiple`, {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${localStorage.getItem(STORAGE_KEY)}`,
      },
    });

    const data: { message: string; files: string[] } = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Upload failed.");
    }

    const images = data.files.map((file) => convertIDToURL(file, 250));
    return images;
  } catch (err) {
    console.error("Failed to upload images", err);
    toast.error("Failed to upload images");
    return null;
  }
};
