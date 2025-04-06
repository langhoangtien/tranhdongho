import { useLoaderData } from "@tanstack/react-router";
import ProductDetailCarousel from "./views/product-carosel";

import { Heart, TruckIcon, Undo2Icon } from "lucide-react";

import ListPaymentMethod from "../list-payment-method";
import { IProduct, IVariant } from "@/routes/admin/products";
import StarIcon from "../icons/star-icon";
import ReviewList from "../reviews";
import { AddToCartSection } from "./views/add-to-cart";
import { formatVNCurrency } from "@/lib/utils";
interface IData extends IProduct {
  images: string[];
  variants: IVariant[];
}

export default function ProductPage() {
  const productData = useLoaderData({
    from: "/products/$productId",
  });

  const product: IData = {
    ...productData,
    variants: productData.variants.map((variant: IVariant) => ({
      ...variant,
      title: variant.attributes.map((i) => `${i.name}:${i.value}`).join(", "),
      image: variant.image || productData.image || productData.images[0] || "",
    })),
  };

  return (
    <div className="max-w-7xl mx-auto p-4 rounded-lg">
      <div className="grid grid-cols-12  gap-6">
        {/* Hình ảnh */}
        <div className="col-span-12 md:col-span-7 ">
          <ProductDetailCarousel slides={product.images} />
        </div>

        {/* Nội dung */}
        <div className="flex md:pl-4 lg:pl-8 flex-col col-span-12 md:col-span-5 space-y-4">
          <h2 className="text-2xl md:text-3xl  font-bold text-accent-foreground">
            {product.name}
            <span className="bg-destructive rounded-md text-white text-sm mx-2 p-1 align-top font-semibold">
              Today Only!
            </span>
          </h2>
          <div className="flex items-center justify-start space-x-2 text-gray-600  text-lg">
            <span className="flex space-x-1 text-yellow-400 text-lg mr-2">
              <StarIcon className="size-4" />
              <StarIcon className="size-4" />
              <StarIcon className="size-4" />
              <StarIcon className="size-4" />
              <StarIcon className="size-4" />
            </span>
            <span className="text-accent-foreground text-sm font-semibold">
              4.9 <span className="text-gray-500">(17.3k)</span>
            </span>
          </div>
          <div className="space-y-2 rounded-lg">
            <p className="text-4xl flex space-x-2 ">
              <span className="font-normal ">
                {" "}
                {formatVNCurrency(product.minPrice || 0)}
              </span>
              <span className="line-through  ">
                {!!product.minCompareAtPrice &&
                  formatVNCurrency(product.minCompareAtPrice)}
              </span>{" "}
            </p>
          </div>
          <div className="flex flex-col space-y-2">
            <p className="line-clamp-3">{product.introduction}</p>
          </div>
          <div className="mt-6">
            <AddToCartSection product={product} />
          </div>

          <div className="mx-2 flex items-center space-x-4 md:space-x-8 text-accent-foreground font-semibold    justify-around sm:text-sm">
            <span className="flex items-center space-y-2 flex-col  justify-center text-center">
              <Heart strokeWidth={1.5} size={30} />
              <span>Customer Favorite</span>
            </span>
            <span className="flex items-center space-y-2 flex-col justify-center text-center">
              <Undo2Icon strokeWidth={1.5} size={30} />
              <span>Money-back Guarantee</span>
            </span>
            <span className="flex items-center space-y-2 flex-col  justify-center text-center">
              <TruckIcon strokeWidth={1.5} size={30} />
              <span>Fast Shipping</span>
            </span>
          </div>
          <ListPaymentMethod />
        </div>
        <div
          className="col-span-2 tiptap"
          dangerouslySetInnerHTML={{ __html: productData.description }}
        ></div>
        <div className="col-span-2">
          {" "}
          <ReviewList />
        </div>
      </div>
    </div>
  );
}
