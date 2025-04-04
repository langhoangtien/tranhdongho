"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { CartItem, useCart } from "@/cart";
import { IProduct, IVariant } from "@/routes/admin/products";

interface IvariantCart extends IVariant {
  title: string;
}
interface IProductCart extends IProduct {
  variants: IvariantCart[];
}
export default function AddToCart(product: CartItem) {
  const { addItem } = useCart();
  const handleAddToCart = () => {
    addItem(product);
  };
  return (
    <Button
      onClick={handleAddToCart}
      className="w-full  h-12 text-base font-semibold"
    >
      Add To Cart | 50% OFF ➜
    </Button>
  );
}

export function AddToCartSection({ product }: { product: IProductCart }) {
  const { addItem } = useCart();
  const [variant, setVariant] = useState<{
    id: string;
    title: string;
    price: number;
    image?: string;
    quantity: number;
    name: string;
  } | null>(null);
  const [selectedOptions, setSelectedOptions] = useState<
    Record<string, string>
  >({});

  const handleOptionChange = (name: string, value: string) => {
    setSelectedOptions((prev: Record<string, string>) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddToCart = () => {
    if (!variant) {
      toast.error("Please select a variant");
      return;
    }

    const id = variant.id.split("/").pop();
    if (!id) {
      toast.error("Invalid variant id");
      return;
    }
    addItem({
      ...variant,
      id,
      image: variant.image || "",
    });
  };

  const getSelectedVariant = () => {
    const matchedVariant = product.variants.find((variant: IvariantCart) =>
      variant.attributes.every(
        (opt: { name: string; value: string }) =>
          selectedOptions[opt.name] === opt.value
      )
    );
    if (matchedVariant) {
      setVariant({
        id: matchedVariant._id,
        title: matchedVariant.attributes
          .map((i) => `${i.name}:${i.value}`)
          .join(", "),
        price: matchedVariant.price,
        image: matchedVariant.image,
        quantity: 1,
        name: product.name,
      });
    }
  };

  // Chọn sẵn variant đầu tiên
  useEffect(() => {
    const firstVariant = product.variants[0];

    if (firstVariant) {
      const defaultOptions = firstVariant.attributes.reduce(
        (
          acc: Record<string, string>,
          option: {
            name: string;
            value: string;
          }
        ) => {
          acc[option.name] = option.value;
          return acc;
        },
        {}
      );

      setSelectedOptions(defaultOptions);
      setVariant({
        id: firstVariant._id,
        title: firstVariant.title,
        price: firstVariant.price,
        image: firstVariant.image,
        quantity: 1,
        name: product.name,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Khi user chọn option, tự động cập nhật lại variant
  useEffect(() => {
    getSelectedVariant();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedOptions]);
  return (
    <div className="space-y-4">
      {product.variantOptions.map(
        (option: { name: string; values: string[] }) => (
          <div className="mt-6 flex flex-col space-y-4" key={option.name}>
            <h4>{option.name}</h4>
            <div className="flex flex-wrap gap-2">
              {option.values.map((value: string) => (
                <Button
                  variant={"outline"}
                  size="lg"
                  key={value}
                  onClick={() => handleOptionChange(option.name, value)}
                  className={`${
                    selectedOptions[option.name] === value
                      ? "border-primary dark:border-primary"
                      : "border-border "
                  }`}
                >
                  {value}
                </Button>
              ))}
            </div>
          </div>
        )
      )}

      <Button
        onClick={handleAddToCart}
        className="w-full  h-12 text-base font-semibold"
      >
        Add To Cart | 50% OFF ➜
      </Button>
    </div>
  );
}
