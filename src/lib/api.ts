import { API_URL } from "@/config";

export const getProductByIdOrSlug = async (id: string) => {
  try {
    const response = await fetch(`${API_URL}/products/${id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch product");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const getBlogByIdOrSlug = async (id: string) => {
  try {
    const response = await fetch(`${API_URL}/blogs/${id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch product");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};
