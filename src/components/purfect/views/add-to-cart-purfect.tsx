"use client";

import { Button } from "@/components/ui/button";

import { CartItem, useCart } from "@/cart";
import { IProduct, IVariant } from "@/routes/admin/products";

interface IvariantCart extends IVariant {
  title: string;
  description?: string;
}
interface IProductCart extends IProduct {}
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
  radioValue,
  setRadioValue,
  product,
}: {
  product: IProductCart;
  setRadioValue: (value: number) => void;
  radioValue: number;
}) {
  const { addItem } = useCart();

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
      <div>
        <div className="flex flex-col space-y-3">
          {product.variants.map((variant: IvariantCart, index: number) => (
            <label
              onClick={() => setRadioValue(index)}
              className={`flex text-background justify-between cursor-pointer items-center duration-300 transition-all rounded-full border h-19 py-6 px-4 border-border ${radioValue == index ? "dark:bg-gray-300 bg-gray-900 " : "dark:bg-gray-100 bg-gray-600"}`}
              htmlFor={variant._id}
              key={variant._id}
            >
              <div className="flex items-center relative space-x-4">
                <RadioCustom checked={radioValue == index} />
                <div className="space-y-0.5">
                  {" "}
                  <p className="text-xl ">{variant.title}</p>
                  <p className="text-sm">{variant.description}</p>
                </div>
              </div>
              <div>
                {" "}
                <p className=" text-xl">${variant.price}</p>
                <p className="line-through text-gray-500 text-sm">
                  ${variant.compareAtPrice}
                </p>
              </div>
            </label>
          ))}
        </div>
      </div>
      <Button
        onClick={handleAddToCart}
        variant="outline"
        className="w-full mt-2 h-12 text-base border-foreground border-2 font-semibold"
      >
        Add To Cart | 50% OFF ➜
      </Button>
    </div>
  );
}

const RadioCustom = ({ checked }: { checked: boolean }) => {
  return (
    <div className="flex border-2 border-background/80 items-center  justify-center rounded-full size-6">
      <span
        className={`${checked ? "size-3 bg-accent/80" : ""} rounded-full`}
      ></span>
    </div>
  );
};
