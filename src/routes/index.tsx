import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import MainLayout from "@/layout/main-layout";

import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: RouteComponent,
  // Removed meta property as it is not recognized
});

const products = [
  {
    imageUrl: "/img1.webp",
    title: "Bộ 3 Tranh Đàn Cá Koi Bơi Lại VW299",
    price: "Từ 1,620,000 ₫",
    description: "as Tú",
  },
  {
    imageUrl: "/img2.webp",
    title: "Tranh Nét Màu Trừu Tượng - V0077",
    price: "Từ 1,200,000 ₫",
    description: "Hết hàng",
  },
  {
    imageUrl: "/img3.webp",
    title: "Tranh Hoa Sen Trăng - VZ232",
    price: "Từ 1,160,000 ₫",
    description: "",
  },
  {
    imageUrl: "/img4.jpg",
    title: "Tranh Sơn Dầu Vệt Nắng - 5H119",
    price: "7,900,000 ₫",
    description: "",
  },
  {
    imageUrl: "/img5.webp",
    title: "Bộ 5 Tranh Hoa Lá Và Quotes - HD008",
    price: "1,200,000đ",
    description: "",
  },
  {
    imageUrl: "/img6.webp",
    title: "Bộ 5 Tranh Bình Hoa Tulip Sắc Trắng Tinh Tế - NT284",
    price: "1,600,000 ₫",
    description: "",
  },
  {
    imageUrl: "/img7.webp",
    title: "Bộ 3 Tranh Hươu Sắc Màu - HD044",
    price: "1,040,000 ₫",
    description: "",
  },
  {
    imageUrl: "/img8.webp",
    title: "Tranh Thế Giới Rộng Lớn - VB528",
    price: "1,650,000 ₫",
    description: "",
  },
];

function RouteComponent() {
  return (
    <MainLayout>
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-8">Sản Phẩm Nổi Bật</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {products.map((product, index) => (
            <ProductCard
              key={index}
              imageUrl={product.imageUrl}
              title={product.title}
              price={product.price}
              description={product.description}
            />
          ))}
        </div>
      </div>
    </MainLayout>
  );
}

interface ProductCardProps {
  imageUrl: string;
  title: string;
  price: string;
  description: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  imageUrl,
  title,
  price,
  description,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <img src={imageUrl} alt={title} className="w-full h-auto" />
      </CardContent>
      <CardFooter>
        <div className="flex justify-between items-center w-full">
          <p className="text-lg font-semibold">{price}</p>
          <Button>Xem chi tiết</Button>
        </div>
      </CardFooter>
    </Card>
  );
};
