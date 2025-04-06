import Image from "@/components/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { API_URL } from "@/config";
import MainLayout from "@/layout/main-layout";
import { formatVNCurrency } from "@/lib/utils";

import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/")({
  component: RouteComponent,

  // Removed meta property as it is not recognized
});

// const products = [
//   {
//     imageUrl: "/img1.webp",
//     title: "Bộ 3 Tranh Đàn Cá Koi Bơi Lại VW299",
//     price: "Từ 1,620,000 ₫",
//     description: "as Tú",
//   },
//   {
//     imageUrl: "/img2.webp",
//     title: "Tranh Nét Màu Trừu Tượng - V0077",
//     price: "Từ 1,200,000 ₫",
//     description: "Hết hàng",
//   },
//   {
//     imageUrl: "/img3.webp",
//     title: "Tranh Hoa Sen Trăng - VZ232",
//     price: "Từ 1,160,000 ₫",
//     description: "",
//   },
//   {
//     imageUrl: "/img4.jpg",
//     title: "Tranh Sơn Dầu Vệt Nắng - 5H119",
//     price: "7,900,000 ₫",
//     description: "",
//   },
//   {
//     imageUrl: "/img5.webp",
//     title: "Bộ 5 Tranh Hoa Lá Và Quotes - HD008",
//     price: "1,200,000đ",
//     description: "",
//   },
//   {
//     imageUrl: "/img6.webp",
//     title: "Bộ 5 Tranh Bình Hoa Tulip Sắc Trắng Tinh Tế - NT284",
//     price: "1,600,000 ₫",
//     description: "",
//   },
//   {
//     imageUrl: "/img7.webp",
//     title: "Bộ 3 Tranh Hươu Sắc Màu - HD044",
//     price: "1,040,000 ₫",
//     description: "",
//   },
//   {
//     imageUrl: "/img8.webp",
//     title: "Tranh Thế Giới Rộng Lớn - VB528",
//     price: "1,650,000 ₫",
//     description: "",
//   },
// ];

type Product = {
  image: string;
  name: string;
  minPrice: string;
  description: string;
  slug: string;
};
function RouteComponent() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${API_URL}/products?limit=16`);
        const data = await response.json();
        const productMapping = data.data.map((item: any) => ({
          image: item.image || item.images[0] || "",
          name: item.name,
          minPrice: item.minPrice,
          description: item.description,
          slug: item.slug,
        }));
        console.log("Product Mapping:", productMapping);

        setProducts(productMapping);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const renderProducts = () => {
    console.log("Products:", products);

    return products.map((product: Product, index: number) => (
      <ProductCard
        key={index}
        image={product.image}
        name={product.name}
        minPrice={product.minPrice}
        description={product.description}
        slug={product.slug}
      />
    ));
  };

  const renderLoading = () => {
    return Array.from({ length: 8 }).map((_, index) => (
      <div
        key={index}
        className="animate-pulse bg-gray-200 aspect-4/5 w-full rounded"
      />
    ));
  };

  return (
    <MainLayout>
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-8">Sản Phẩm Nổi Bật</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {loading ? renderLoading() : renderProducts()}
        </div>
      </div>
    </MainLayout>
  );
}

const ProductCard: React.FC<Product> = ({
  image,
  name,
  minPrice,
  description,
  slug,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Image src={image} alt={name} className="w-full h-auto" />
      </CardContent>
      <CardFooter>
        <div className="flex justify-between items-center w-full">
          <p className="text-lg font-semibold">
            {formatVNCurrency(Number(minPrice))}
          </p>
          <Link to={`/products/${slug}`}>
            {" "}
            <Button>Xem chi tiết</Button>
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
};
