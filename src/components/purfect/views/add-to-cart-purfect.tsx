"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";

import { CartItem, useCart } from "@/cart";
import { IProduct, IVariant } from "@/routes/admin/products";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface IvariantCart extends IVariant {
  title: string;
  description?: string;
}
interface IProductCart extends IProduct {
  variants: IvariantCart[];
}
export default function AddToCart(product: CartItem) {
  // const variantsMapped = product.variants.map((variant: IVariant) => ({
  //   ...variant,
  //   title: variant.attributes.map((i) => `${i.name}:${i.value}`).join(", "),
  //   image: variant.image || product.image || product.images[0] || "",
  // }));
  const { addItem } = useCart();
  const handleAddToCart = () => {
    addItem(product);
  };
  return (
    <Button
      onClick={handleAddToCart}
      className="w-full rounded-full h-12 text-base font-semibold"
    >
      Add To Cart | 50% OFF ➜
    </Button>
  );
}

export function AddToCartPurfectSection({
  product,
}: {
  product: IProductCart;
}) {
  const { addItem } = useCart();

  const [radioValue, setRadioValue] = useState<number>(0);

  const handleAddToCart = () => {
    const sleclectedVariant = product.variants[radioValue];
    const id = sleclectedVariant._id;

    addItem({
      id,
      image: sleclectedVariant.image,
      title: sleclectedVariant.title,
      name: product.name,
      price: sleclectedVariant.price,
    });
  };

  // Khi user chọn option, tự động cập nhật lại variant

  return (
    <div className="space-y-4">
      <RadioGroup value={radioValue.toString()} defaultValue={"0"}>
        <div className="flex flex-col space-y-2">
          {product.variants.map((variant: IvariantCart, index: number) => (
            <label
              onClick={() => setRadioValue(index)}
              className={`flex  justify-between cursor-pointer items-center duration-300 transition-all rounded-md border h-18 py-6 px-2 border-border ${radioValue == index ? "bg-accent " : ""}`}
              htmlFor={variant._id}
              key={variant._id}
            >
              <div className="flex items-center relative space-x-4">
                <RadioGroupItem
                  className="size-5"
                  id={variant._id}
                  value={index.toString()}
                />
                <div className="space-y-0.5">
                  {" "}
                  <p className="text-xl font-semibold">{variant.title}</p>
                  <p className="text-sm">{variant.description}</p>
                </div>
              </div>
              <div>
                {" "}
                <p className="font-semibold tex-xl">${variant.price}</p>
                <p className="line-through text-xs">
                  ${variant.compareAtPrice}
                </p>
              </div>
            </label>
          ))}
        </div>
      </RadioGroup>
      <Button
        onClick={handleAddToCart}
        className="w-full  h-12 text-base font-semibold"
      >
        Add To Cart | 50% OFF ➜
      </Button>
    </div>
  );
}
