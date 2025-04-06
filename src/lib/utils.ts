import { API_URL } from "@/config";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

enum SIZE_ENUM {
  LARGE = 400,
  EXTRA_LARGE = 800,
}
export const convertIDToURL = (id: string, size: SIZE_ENUM = 400) => {
  if (!id) return "";

  return `${API_URL}/files/${id}-${size}.avif`;
};
export const convertIDToStaticURL = (id: string, size: SIZE_ENUM = 400) => {
  if (!id) return "";
  const folder = id.slice(0, 7);
  return `${API_URL}/static/${folder}/${id}-${size}.avif`;
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

export const formatVNCurrency = (amount: number): string => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};
