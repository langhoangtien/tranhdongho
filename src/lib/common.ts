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
export const uploadImg = async (e: React.ChangeEvent<HTMLInputElement>) => {
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

    const imageUpload = data.file;
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
export const uploadImgs = async (e: React.ChangeEvent<HTMLInputElement>) => {
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

    return data.files;
  } catch (err) {
    console.error("Failed to upload images", err);
    toast.error("Failed to upload images");
    return null;
  }
};
const usSalesTax: Record<string, number> = {
  AL: 9.24,
  AK: 1.76,
  AZ: 8.4,
  AR: 9.47,
  CA: 8.82,
  CO: 7.77,
  CT: 6.35,
  DE: 0,
  FL: 7.02,
  GA: 7.35,
  HI: 4.44,
  ID: 6.02,
  IL: 8.82,
  IN: 7,
  IA: 6.94,
  KS: 8.7,
  KY: 6,
  LA: 9.55,
  ME: 5.5,
  MD: 6,
  MA: 6.25,
  MI: 6,
  MN: 7.49,
  MS: 7.07,
  MO: 8.29,
  MT: 0,
  NE: 6.94,
  NV: 8.23,
  NH: 0,
  NJ: 6.63,
  NM: 7.72,
  NY: 8.52,
  NC: 6.98,
  ND: 6.96,
  OH: 7.24,
  OK: 8.98,
  OR: 0,
  PA: 6.34,
  RI: 7,
  SC: 7.44,
  SD: 6.4,
  TN: 9.55,
  TX: 8.2,
  UT: 7.19,
  VT: 6.22,
  VA: 5.75,
  WA: 9.23,
  WV: 6.5,
  WI: 5.43,
  WY: 5.36,
};

const euVAT: Record<string, number> = {
  AT: 20,
  BE: 21,
  BG: 20,
  HR: 25,
  CY: 19,
  CZ: 21,
  DK: 25,
  EE: 20,
  FI: 24,
  FR: 20,
  DE: 19,
  GR: 24,
  HU: 27,
  IE: 23,
  IT: 22,
  LV: 21,
  LT: 21,
  LU: 16,
  MT: 18,
  NL: 21,
  PL: 23,
  PT: 23,
  RO: 19,
  SK: 20,
  SI: 22,
  ES: 21,
  SE: 25,
};

export function calculateTax(countryCode: string, stateCode?: string): number {
  let tax = 0;
  if (countryCode === "US" && stateCode) {
    tax = usSalesTax[stateCode.toUpperCase()] ?? 0;
    return tax / 100;
  }
  tax = euVAT[countryCode.toUpperCase()] ?? 0;
  return tax / 100;
}

// Test hàm
console.log(calculateTax("US", "CA")); // 7.25
console.log(calculateTax("DE")); // 19 (Germany)
console.log(calculateTax("US", "TX")); // 6.25
console.log(calculateTax("FR")); // 20 (France)
