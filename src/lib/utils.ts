import { API_URL } from "@/config";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

enum SIZE_ENUM {
  THUMBNAIL = 100,
  MEDIUM = 250,
  LARGE = 400,
  EXTRA_LARGE = 800,
}
export const convertIDToURL = (id: string, size: SIZE_ENUM = 400) => {
  if (!id) return "";
  return `${API_URL}/files/${id}-${size}.avif`;
};

export const convertURLToID = (url: string): string | null => {
  const parts = url.split("/"); // Tách lấy phần cuối
  const fileName = parts.pop();

  if (!fileName) return "";

  return fileName.slice(0, -9);
};

export const toSlug = (str: string): string => {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
};

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}
